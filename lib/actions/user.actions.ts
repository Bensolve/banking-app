'use server';

import { connectToDatabase } from '../mongoose';
import UserModel from '../models/User';
import {  parseStringify } from "../utils";
import { IUser } from '../models/User'; // Adjust the path if necessary

export async function createOrFetchUser(uid: string, email: string, name: string) {
    await connectToDatabase();

    // Check if the user already exists in MongoDB
    const existingUser = await UserModel.findOne({ uid });

    if (existingUser) {
        console.log('User already exists:', existingUser);
        
        // If the user is missing data (e.g., balance, transactions), update it
        if (!existingUser.balance) {
            existingUser.balance = 1000;  // Set a default balance
        }
        if (!existingUser.transactions) {
            existingUser.transactions = []; // Default empty transactions
        }

        if (existingUser.notificationsEnabled === undefined) {
            existingUser.notificationsEnabled = true; // Default notification preference
        }
        if (!existingUser.phone) {
            existingUser.phone = ''; // Set default empty phone
        }
        if (!existingUser.address) {
            existingUser.address = ''; // Set default empty address
        }
        if (!existingUser.lastLogin) {
            existingUser.lastLogin = new Date(); // Set lastLogin to current time if not present
        }
        // Save the updated user
        await existingUser.save();
        // return existingUser.toObject(); 
        return parseStringify(existingUser);// Return plain JavaScript object
    }

    // If the user doesn't exist, create a new one
    const newUser = new UserModel({
        uid,
        email,
        name,
        balance: 1000,  // Set default balance
        transactions: [], // Default empty transactions
        notificationsEnabled: true, // Default notifications enabled
        phone: '', // Default empty phone
        address: '', // Default empty address
        lastLogin: new Date(), 
    });

    await newUser.save();
    console.log('New user created:', newUser);
    return newUser.toObject(); // Return plain JavaScript object
}


// export async function fetchUser(uid: string) {
//     await connectToDatabase();

//     // Fetch the user by their UID
//     const user = await UserModel.findOne({ uid });

//     if (!user) {
//         throw new Error('User not found');
//     }

    
//     return parseStringify(user);
    
// }



// Deposit Function
export async function deposit(uid: string, amount: number) {
    if (amount <= 0) {
        throw new Error('Deposit amount must be greater than zero.');
    }

    await connectToDatabase();

    // Update balance and add a credit transaction
    const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        {
            $inc: { balance: amount }, // Increment the balance
            $push: {
                transactions: {
                    amount,
                    type: 'credit',
                    date: new Date(),
                },
            },
        },
        { new: true } // Return the updated user document
    );

    if (!updatedUser) {
        throw new Error('User not found.');
    }

    return parseStringify(updatedUser); // Sanitize the object for React compatibility
}
// Withdraw Function
export async function withdraw(uid: string, amount: number) {
    if (amount <= 0) {
        throw new Error('Withdrawal amount must be greater than zero.');
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by their UID
    const user = await UserModel.findOne({ uid });

    if (!user) {
        throw new Error('User not found.');
    }

    // Check if the user has enough balance to withdraw
    if (user.balance < amount) {
        throw new Error('Insufficient balance for the withdrawal.');
    }

    // Update balance and add a debit transaction
    const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        {
            $inc: { balance: -amount }, // Decrease the balance by withdrawal amount
            $push: {
                transactions: {
                    amount,
                    type: 'debit',
                    date: new Date(),
                },
            },
        },
        { new: true } // Return the updated user document
    );

    if (!updatedUser) {
        throw new Error('Error occurred during withdrawal.');
    }

    return parseStringify(updatedUser); // Return the updated user data as a plain object
}






// Fetch User (Full or Profile-Specific)
export async function fetchUser(uid: string, profileOnly = false) {
    await connectToDatabase();

    const user = await UserModel.findOne({ uid });

    if (!user) {
        throw new Error('User not found');
    }

    // If profileOnly, return limited data
    if (profileOnly) {
        const profile = {
            uid: user.uid,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            notificationsEnabled: user.notificationsEnabled,
            lastLogin: user.lastLogin,
        };
        return parseStringify(profile);
    }

    // Return full user data
    return parseStringify(user);
}

// Update User Profile
export async function updateUserProfile(uid: string, updates: Partial<IUser>) {
    await connectToDatabase();

    const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        { $set: updates },
        { new: true } // Return updated document
    );

    if (!updatedUser) {
        throw new Error('Failed to update user');
    }

    return parseStringify(updatedUser);
}

