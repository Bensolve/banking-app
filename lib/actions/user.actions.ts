'use server';

import { connectToDatabase } from '../mongoose';
import UserModel from '../models/User';
import {  parseStringify } from "../utils";

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

    
    return parseStringify(user);
    
}



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
