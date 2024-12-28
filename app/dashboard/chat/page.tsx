'use client';

import LiveChat from '@/components/LiveChat';
import { useAuth } from '@/contexts/AuthContext';

export default function ChatPage() {
    const { user } = useAuth();

    if (!user) {
        return <p>Please log in to access the chat feature.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Live Chat</h1>
            <LiveChat userId={user.uid} />
        </div>
    );
}
