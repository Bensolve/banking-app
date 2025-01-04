'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUser, updateUserProfile } from '@/lib/actions/user.actions';

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    notificationsEnabled: boolean;
    currency: string;  // Added currency field
    lastLogin?: string;
}

export default function AccountManagement() {
    const { user, loading } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [updates, setUpdates] = useState<Partial<UserProfile>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && user) {
            const loadUserProfile = async () => {
                try {
                    const profile = await fetchUser(user.uid, true);
                    setUserProfile(profile);
                    setUpdates({
                        name: profile.name,
                        phone: profile.phone || '',
                        address: profile.address || '',
                        notificationsEnabled: profile.notificationsEnabled,
                        currency: profile.currency, // Set initial currency
                    });
                } catch (error) {
                    setError(error instanceof Error ? error.message : 'An unknown error occurred.');
                }
            };

            loadUserProfile();
        }
    }, [user, loading]);

    const handleSave = async () => {
        try {
            if (!userProfile) return;
            const updatesWithDate = {
                ...updates,
                lastLogin: updates.lastLogin ? new Date(updates.lastLogin) : undefined,
            };
            const updatedProfile = await updateUserProfile(userProfile.uid, updatesWithDate);
            setUserProfile(updatedProfile);
            setEditMode(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!userProfile) return <p>No user profile found.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold mb-6">Account Management</h1>

            {editMode ? (
                <div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={updates.name || ''}
                            onChange={(e) => setUpdates({ ...updates, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Phone"
                            value={updates.phone || ''}
                            onChange={(e) => setUpdates({ ...updates, phone: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Address"
                            value={updates.address || ''}
                            onChange={(e) => setUpdates({ ...updates, address: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Currency Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold">Currency</label>
                        <select
                            value={updates.currency || userProfile.currency}
                            onChange={(e) => setUpdates({ ...updates, currency: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            {/* Add more currencies as needed */}
                        </select>
                    </div>

                    {/* Notifications Toggle */}
                    <div className="mb-6">
                        <label className="inline-flex items-center cursor-pointer">
                            <span className="mr-2">Enable Notifications</span>
                            <input
                                type="checkbox"
                                checked={updates.notificationsEnabled || false}
                                onChange={(e) =>
                                    setUpdates({ ...updates, notificationsEnabled: e.target.checked })
                                }
                                className="form-checkbox h-5 w-5 text-green-500"
                            />
                        </label>
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Phone:</strong> {userProfile.phone || 'Not provided'}</p>
                    <p><strong>Currency:</strong> {userProfile.currency}</p>
                    <p><strong>Notifications:</strong> {userProfile.notificationsEnabled ? 'Enabled' : 'Disabled'}</p>
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-green-600 transition duration-200"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}
