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
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!userProfile) return <p>No user profile found.</p>;

    return (
        <div>
            <h1>Account Management</h1>
            {editMode ? (
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={updates.name || ''}
                        onChange={(e) => setUpdates({ ...updates, name: e.target.value })}
                    />
                      <input
                        type="text"
                        placeholder="Phone"
                        value={updates.phone || ''}
                        onChange={(e) => setUpdates({ ...updates, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={updates.address || ''}
                        onChange={(e) => setUpdates({ ...updates, address: e.target.value })}
                    />
                    <div>
                        <label>
                            Notifications Enabled
                            <input
                                type="checkbox"
                                checked={updates.notificationsEnabled || false}
                                onChange={(e) =>
                                    setUpdates({ ...updates, notificationsEnabled: e.target.checked })
                                }
                            />
                        </label>
                        </div>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Name: {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Phone: {userProfile.phone || 'Not provided'}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}
