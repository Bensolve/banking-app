"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/app/lib/mongodb";
import User from "@/app/lib/models/User";
import Session from "@/app/lib/models/Session";

type SignInProps = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInProps) {
  try {
    await connectToDatabase();

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return { error: "Invalid credentials" };
    }

    const expiresAt = new Date(Date.now() + 3600000); // 1-hour expiration

    // Check if a session already exists for this user
    let session = await Session.findOne({ userId: user._id });
    if (!session) {
      // Generate a new unique session ID for this login
      const sessionId = `${user._id}-${Date.now()}`; 

      // Create a new session if none exists
      session = new Session({
        sessionId,
        userId: user._id,
        expiresAt,
      });
      await session.save();
    } else {
      // Update the expiration time of the existing session
      session.expiresAt = expiresAt;
      await session.save();
    }

    // Set session ID in cookies
    const responseCookies = await cookies();
    responseCookies.set("session-id", session.sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // const sessionId = user._id.toString();  // Generate session ID from user ID
    // const expiresAt = new Date(Date.now() + 3600000);  // Set expiration time (e.g., 1 hour from now)

    // const newSession = new Session({
    //   sessionId,
    //   userId: user._id,
    //   expiresAt,
    // });
    // await newSession.save();

    // // Get the ResponseCookies object for setting cookies
    // const responseCookies = await cookies();
    // responseCookies.set('session-id', user._id.toString(), {
    //   path: '/',
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   secure: process.env.NODE_ENV === 'production',
    // });

    return {
      message: "Login successful",
      name: user.name,
      email: user.email,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Sign-in error:", error.message);
      return{ error: error.message || "An error occurred during sign-in"};
     
    } else {
      console.error("Unknown error during sign-in:", error);
      return {error :"An unexpected error occurred."};
    }
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
    // Connect to MongoDB
    await connectToDatabase();

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    // Create a new user
    const newUser = new User({
      email,
      password, // Plain-text password (⚠ Note: not recommended for production)
      name, // Full name (e.g., "John Doe")
    });

    await newUser.save();

    // Create a session for the new user
    const sessionId = newUser._id.toString(); // Use user ID as session ID
    const expiresAt = new Date(Date.now() + 3600000); // Expire in 1 hour

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
    if (error instanceof Error) {
      console.error("Sign-up error:", error.message);
      throw new Error(error.message || "An error occurred during sign-up.");
    } else {
      console.error("Unknown error during sign-up:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
