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
    currency: string;
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
                        currency: profile.currency,
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
            const updatedProfile = await updateUserProfile(userProfile.uid, updates);
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
        <div>
            

            {editMode ? (
                <form className="flex flex-col space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={updates.name || ''}
                                onChange={(e) => setUpdates({ ...updates, name: e.target.value })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={updates.phone || ''}
                                onChange={(e) => setUpdates({ ...updates, phone: e.target.value })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={updates.address || ''}
                                onChange={(e) => setUpdates({ ...updates, address: e.target.value })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                            <select
                                value={updates.currency || userProfile.currency}
                                onChange={(e) => setUpdates({ ...updates, currency: e.target.value })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={updates.notificationsEnabled || false}
                                onChange={(e) =>
                                    setUpdates({ ...updates, notificationsEnabled: e.target.checked })
                                }
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Enable Notifications</span>
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <p className="text-lg"><strong>Name:</strong> {userProfile.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {userProfile.email}</p>
                    <p className="text-lg"><strong>Phone:</strong> {userProfile.phone || 'Not provided'}</p>
                    <p className="text-lg"><strong>Address:</strong> {userProfile.address || 'Not provided'}</p>
                    <p className="text-lg"><strong>Currency:</strong> {userProfile.currency}</p>
                    <p className="text-lg">
                        <strong>Notifications:</strong>{' '}
                        {userProfile.notificationsEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                    <button
                        type="button"
                        onClick={() => setEditMode(true)}
                        className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}
