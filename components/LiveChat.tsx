'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
    senderId: string;
    message: string;
}

interface LiveChatProps {
    userId: string;
}

export default function LiveChat({ userId }: LiveChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance: Socket = io('/api/socket', {
            path: '/api/socket',
        });
        setSocket(socketInstance);

        socketInstance.on('receive_message', (message: ChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket && newMessage.trim()) {
            const messageData: ChatMessage = {
                senderId: userId,
                message: newMessage,
            };

            socket.emit('send_message', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setNewMessage('');
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-bold mb-4">Live Chat</h2>
            <div className="mb-4 max-h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
                        <p className="inline-block p-2 bg-gray-200 rounded">{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
