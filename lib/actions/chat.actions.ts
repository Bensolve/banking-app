'use server';

import ChatMessage from '@/lib/models/ChatMessage';
import { connectToDatabase } from '@/lib/mongoose';

export async function fetchChatHistory(userId: string) {
    await connectToDatabase();

    const messages = await ChatMessage.find({ senderId: userId }).sort({ timestamp: 1 }).lean();
    return messages;
}
