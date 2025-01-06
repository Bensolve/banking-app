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
    currency: string; // Added currency field
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
        <div className="bg-white rounded-lg shadow">
            {editMode ? (
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={updates.name || ''}
                                onChange={(e) => setUpdates({ ...updates, name: e.target.value })}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                value={updates.phone || ''}
                                onChange={(e) => setUpdates({ ...updates, phone: e.target.value })}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={updates.address || ''}
                                onChange={(e) => setUpdates({ ...updates, address: e.target.value })}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                            <select
                                value={updates.currency || userProfile.currency}
                                onChange={(e) => setUpdates({ ...updates, currency: e.target.value })}
                                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Notifications</label>
                            <div className="mt-1">
                                <input
                                    type="checkbox"
                                    checked={updates.notificationsEnabled || false}
                                    onChange={(e) =>
                                        setUpdates({ ...updates, notificationsEnabled: e.target.checked })
                                    }
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2 text-gray-700">Enable Notifications</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <button
                            onClick={() => setEditMode(false)}
                            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-white shadow rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Name:</span>
                        <span className="text-gray-900">{userProfile.name}</span>
                    </div>
            
                    {/* Email */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-900">{userProfile.email}</span>
                    </div>
            
                    {/* Phone */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Phone:</span>
                        <span className="text-gray-900">
                            {userProfile.phone || 'Not provided'}
                        </span>
                    </div>
            
                    {/* Address */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Address:</span>
                        <span className="text-gray-900">
                            {userProfile.address || 'Not provided'}
                        </span>
                    </div>
            
                    {/* Currency */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Currency:</span>
                        <span className="text-gray-900">{userProfile.currency}</span>
                    </div>
            
                    {/* Notifications */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Notifications:</span>
                        <span className="text-gray-900">
                            {userProfile.notificationsEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                </div>
            
                {/* Edit Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setEditMode(true)}
                        className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
            
            )}
        </div>
    );
}
