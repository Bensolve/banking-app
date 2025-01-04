'use client';

import React from 'react';
import AccountManagement from '../../../components/AccountManagement'; // Adjust the path to the component

export default function AccountManagementPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto bg-gray-50">
            <header className="flex justify-between items-center mb-8 bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800">Account Management</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => alert("Navigate to settings")}
                >
                    Settings
                </button>
            </header>

            <section className="bg-white shadow-lg rounded-lg p-6">
                <AccountManagement />
            </section>
        </div>
    );
}
