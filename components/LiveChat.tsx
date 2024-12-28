'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { fetchChatHistory } from '@/lib/actions/chat.actions';

let socket;

export default function LiveChat({ userId }: { userId: string }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch initial chat history
        async function loadChatHistory() {
            const history = await fetchChatHistory(userId);
            setMessages(history);
        }

        loadChatHistory();

        // Initialize WebSocket connection
        socket = io();

        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = { senderId: userId, receiverId: 'agent', message };
            socket.emit('send_message', newMessage);
            setMessages((prev) => [...prev, newMessage]);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Live Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.senderId === userId ? 'You' : 'Agent'}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}
