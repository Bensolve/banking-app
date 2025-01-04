'use server';

import { connectToDatabase } from '../mongoose';
import UserModel from '../models/User';
import {  parseStringify } from "@/lib/utils";
import { IUser } from '../models/User'; // Adjust the path if necessary
import { generateAccountNumber } from '@/lib/utils'; // Adjust the path if necessary

// Get the currently logged-in user


export async function createOrFetchUser(uid: string, email: string, name: string) {
    await connectToDatabase();

    const existingUser = await UserModel.findOne({ uid });

    if (existingUser) {
        console.log('User already exists:', existingUser);
        
        // If accountNumber is missing, generate one and update the user
        if (!existingUser.accountNumber) {
            let accountNumber;
            do {
                accountNumber = generateAccountNumber();
                console.log('Generated Account Number:', accountNumber); // Log generated account number
            } while (await UserModel.exists({ accountNumber }));

            existingUser.accountNumber = accountNumber;
            console.log('Saving User with Account Number:', existingUser.accountNumber); // Log before saving
            await existingUser.save();
        }

        // Other updates for user properties
        if (!existingUser.balance) {
            existingUser.balance = 1000;
        }
        if (!existingUser.transactions) {
            existingUser.transactions = [];
        }
        if (existingUser.notificationsEnabled === undefined) {
            existingUser.notificationsEnabled = true;
        }
        if (!existingUser.phone) {
            existingUser.phone = '';
        }
        if (!existingUser.address) {
            existingUser.address = '';
        }
        if (!existingUser.lastLogin) {
            existingUser.lastLogin = new Date();
        }

        await existingUser.save();
        return parseStringify(existingUser); // Return plain JavaScript object
    }

    // New user creation
    let accountNumber;
    do {
        accountNumber = generateAccountNumber();
        console.log('Generated Account Number for New User:', accountNumber); // Log generated account number
    } while (await UserModel.exists({ accountNumber }));

    const newUser = new UserModel({
        uid,
        email,
        name,
        balance: 1000,
        transactions: [],
        notificationsEnabled: true,
        phone: '',
        address: '',
        lastLogin: new Date(),
        accountNumber,
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
            accountNumber: user.accountNumber,
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

// Transfer Function
// Transfer Function
export async function transferFunds(senderAccountNumber: string, recipientAccountNumber: string, amount: number, description = '') {
    if (amount <= 0) {
        throw new Error('Transfer amount must be greater than zero.');
    }

    try {
        await connectToDatabase();

        // Fetch sender and recipient
        const sender = await UserModel.findOne({ accountNumber: senderAccountNumber });
        const recipient = await UserModel.findOne({ accountNumber: recipientAccountNumber });

        if (!sender) {
            throw new Error('Sender not found.');
        }
        if (!recipient) {
            throw new Error('Recipient not found.');
        }

        // Check if sender has sufficient balance
        if (sender.balance < amount) {
            throw new Error('Insufficient balance.');
        }

        // Perform the transfer: deduct from sender, add to recipient
        sender.balance -= amount;
        recipient.balance += amount;

        // Add transactions for both users
        sender.transactions.push({
            amount: -amount,
            type: 'debit',
            date: new Date(),
            description: `Transfer to ${recipient.email}: ${description}`,
        });

        recipient.transactions.push({
            amount,
            type: 'credit',
            date: new Date(),
            description: `Transfer from ${sender.email}: ${description}`,
        });

        // Save both users
        await sender.save();
        await recipient.save();

        // Return success message with user data
        return {
            message: 'Transfer successful',
            sender: parseStringify(sender),
            recipient: parseStringify(recipient),
        };

    } catch (error) {
        console.error('Transfer Error:', error);
        throw new Error('Transfer failed due to an error.');
    }
}
