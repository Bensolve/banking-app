'use client';

import React from 'react';
import AccountManagement from '../../../components/AccountManagement'; // Adjust the path to the component
import { useRouter } from 'next/navigation';

export default function AccountManagementPage() {
    const router = useRouter();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Account Management</h1>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Back to Dashboard
                </button>
            </header>
            <AccountManagement />
        </div>
    );
}
