import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
    uid: string; // Firebase UID
    email: string;
    name: string;
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
