'use server';

import { connectToDatabase } from '../mongoose';
import UserModel from '../models/User';

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

        // Save the updated user
        await existingUser.save();
        return existingUser.toObject(); // Return plain JavaScript object
    }

    // If the user doesn't exist, create a new one
    const newUser = new UserModel({
        uid,
        email,
        name,
        balance: 1000,  // Set default balance
        transactions: [], // Default empty transactions
    });

    await newUser.save();
    console.log('New user created:', newUser);
    return newUser.toObject(); // Return plain JavaScript object
}


export async function fetchUser(uid: string) {
    await connectToDatabase();

    // Fetch the user by their UID
    const user = await UserModel.findOne({ uid });

    if (!user) {
        throw new Error('User not found');
    }

    return user.toObject(); 
}