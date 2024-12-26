import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
    uid: string; // Firebase UID
    email: string;
    name: string;
    phone?: string; // Optional phone number
    address?: string; // Optional address
    notificationsEnabled: boolean; // For notification preferences
    lastLogin?: Date; // Optional last
    balance: number;
    transactions: Array<{
        amount: number;
        type: 'credit' | 'debit';
        date: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema
const UserSchema = new Schema<IUser>(
    {
        uid: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        notificationsEnabled: { type: Boolean, default: true },
        lastLogin: { type: Date },
        balance: { type: Number, default: 0 },
        transactions: [
            {
                amount: { type: Number, required: true },
                type: { type: String, enum: ['credit', 'debit'], required: true },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt`
    }
);

// Export the model
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
