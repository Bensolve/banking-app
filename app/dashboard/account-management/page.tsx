'use client';

import React from 'react';
import AccountManagement from '../../../components/AccountManagement'; // Adjust the path to the component


export default function AccountManagementPage() {


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Account Management</h1>
         
            </header>
            <AccountManagement />
        </div>
    );
}
