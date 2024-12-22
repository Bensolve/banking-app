"use server";

import { cookies } from 'next/headers';
import connectToDatabase from '@/app/lib/mongodb';
import Account from "@/app/lib/models/Account";
import User from '@/app/lib/models/User';
import Session from '@/app/lib/models/Session';

type SignInProps = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInProps) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    if (!email || !password) {
      return { error: 'Email and password are required' };
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return { error: 'Invalid credentials' };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // NEW CHANGE: Extend session expiry to 24 hours

    // Upsert session (create or update in one step)
    const session = await Session.findOneAndUpdate(
      { userId: user._id }, // Query for an existing session
      { sessionId: `${user._id}-${Date.now()}`, userId: user._id, expiresAt }, // NEW CHANGE: Ensure session is updated or created
      { upsert: true, new: true } // Upsert ensures creation if not found
    );

    // Set session ID in cookies
    const responseCookies = await cookies();
    responseCookies.set('session-id', session.sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: 'Login successful',
      name: user.name,
      email: user.email,
    };
  } catch (error: unknown) {
    console.error('Sign-in error:', error);
    return { error: 'An error occurred during sign-in' };
  }
}



export const logoutAccount = async (): Promise<boolean> => {
  try {
    // Retrieve the session ID from cookies
    const sessionCookie = (await cookies()).get("session-id");
    if (!sessionCookie) {
      console.warn("No session cookie found.");
      return false;
    }

    const sessionId = sessionCookie.value;

    // Connect to MongoDB (only if needed, MongoDB connection should be established globally if possible)

    // Delete the session document from MongoDB
    const deleteResult = await Session.deleteOne({ sessionId });

    // Remove the session cookie
    (await cookies()).delete("session-id");

    if (deleteResult.deletedCount === 1) {
      console.log("Session successfully deleted.");
      return true;
    } else {
      console.warn("Session not found in the database.");
      return false;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};

export async function getLoggedInUser() {
  try {
    // Retrieve the session ID from cookies
    const sessionCookie = (await cookies()).get("session-id");
    if (!sessionCookie) {
      console.warn("No session cookie found.");
      return null;
    }

    const sessionId = sessionCookie.value;

    // Connect to MongoDB (ensure this is called globally elsewhere if possible)
    await connectToDatabase();

    // Retrieve the session document from the database
    const session = await Session.findOne({ sessionId });
    if (!session || new Date() > new Date(session.expiresAt)) {
      console.warn("Session not found or expired.");
      return null;
    }

    // Retrieve the associated user document
    const user = await User.findById(session.userId);
    if (!user) {
      console.warn("User not found for the current session.");
      return null;
    }

    // Return user details
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("Error retrieving logged-in user:", error);
    return null;
  }
}

type SignUpParams = {
  email: string;
  password: string;
  name: string; // Full name (first and last name combined)
};

export const signUp = async ({ email, password, name }: SignUpParams) => {
  try {
    await connectToDatabase(); // Ensure database connection

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    // Create a new user
    const newUser = new User({
      email,
      password, // Plain-text password (⚠ Not recommended for production)
      name, // Full name (e.g., "John Doe")
    });

    await newUser.save();

    // Create an account for the new user
    const account = new Account({
      userId: newUser._id, // Correctly reference the user's _id
      accountType: "Checking", // Default account type
      balance: 0, // Initial balance
    });

    await account.save();

    // Create a session for the new user
    const sessionId = `${newUser._id}-${Date.now()}`; // Unique session ID
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24-hour expiration

    const newSession = new Session({
      sessionId,
      userId: newUser._id,
      expiresAt,
    });

    await newSession.save();

    // Set session ID in cookies
    const responseCookies = await cookies();
    responseCookies.set("session-id", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Return success response
    return {
      message: "Sign up successful",
      name: newUser.name,
      email: newUser.email,
    };
  } catch (error: unknown) {
    console.error("Sign-up error:", error);
    throw new Error("An error occurred during sign-up.");
  }
};



// Cleanup function for expired sessions
async function cleanupExpiredSessions() {
  await connectToDatabase(); // Ensure the database is connected
  const result = await Session.deleteMany({ expiresAt: { $lte: new Date() } });
  console.log(`🗑️ Cleaned up ${result.deletedCount} expired sessions`);
}

// Schedule cleanup every hour
setInterval(cleanupExpiredSessions, 3600000); // 1 hour in milliseconds

// Call it once on startup as well
cleanupExpiredSessions().catch((err) =>
  console.error('Error during session cleanup:', err)
);

// Continue initializing your application...


export interface Account {
  _id: string; // MongoDB ObjectId as a string
  userId: string; // MongoDB ObjectId as a string
  accountType: string;
  balance: number;
}

export async function getLoggedInUserAccounts(): Promise<{
  accounts: Account[];
  totalCurrentBalance: number;
}> {
  await connectToDatabase();

  // Explicitly cast the result to Account[]
  const accounts = (await Account.find().lean() as unknown) as Account[];

  // Validate that all required properties exist
  const validAccounts = accounts.map((account) => ({
    _id: account._id.toString(), // Ensure _id is a string
    userId: account.userId.toString(), // Ensure userId is a string
    accountType: account.accountType || "Checking",
    balance: account.balance,
  }));

  // Calculate the total balance
  const totalCurrentBalance = validAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  return {
    accounts: validAccounts,
    totalCurrentBalance,
  };
}


import Transaction from "@/app/lib/models/Transaction";

export async function getRecentTransactions(userId: string, limit = 5) {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Unable to fetch recent transactions");
  }
}
