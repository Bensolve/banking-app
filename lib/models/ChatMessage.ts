import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
    senderId: string; // Firebase UID of the user
    receiverId: string; // Typically "agent" or another UID
    message: string;
    timestamp: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
