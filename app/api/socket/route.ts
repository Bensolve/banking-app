import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import ChatMessage from '@/lib/models/ChatMessage';
import { connectToDatabase } from '@/lib/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!res.socket) {
        res.status(500).json({ error: 'Socket connection not available' });
        return;
    }

    const server = res.socket.server;

    // Ensure the server has an io instance
    if (!server.io) {
        await connectToDatabase();

        const io = new SocketIOServer(server);
        server.io = io;

        io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            socket.on('send_message', async (data) => {
                const { senderId, receiverId, message } = data;

                // Save message to MongoDB
                const newMessage = new ChatMessage({ senderId, receiverId, message });
                await newMessage.save();

                // Broadcast the message to all clients
                io.emit('receive_message', data);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });

        console.log('Socket.IO server initialized');
    }

    res.end();
}
