'use client';

import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../../components/LogoutButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/models/User'; // Assuming this exists
import { createOrFetchUser } from '@/lib/actions/user.actions'; // Assuming this exists

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // State for user details fetched from MongoDB
    const [userDetails, setUserDetails] = useState<IUser | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        // If the user is not authenticated, redirect to login page
        if (!loading && !user) {
            router.push('/auth');
            return;
        }

        // If the user is authenticated, fetch their details
        const fetchUserDetails = async () => {
            if (user) {
                try {
                    // Ensure email is not null before passing it
                    const email = user.email || ''; // Fallback to empty string if null
                    const name = user.displayName || 'Guest'; // Fallback to 'Guest' if null

                    // Create or fetch user details from MongoDB
                    const userData: IUser = await createOrFetchUser(user.uid, email, name);
                    setUserDetails(userData); // Set the fetched user details
                } catch (error) {
                    // Handle any errors that occur while fetching user details
                    setFetchError(error instanceof Error ? error.message : 'An unknown error occurred.');
                }
            }
        };

        if (user) {
            fetchUserDetails();
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // Show a loading state while checking auth
    }

    if (!user) {
        return null; // Avoid flashing content before redirecting
    }

    if (fetchError) {
        return <p>Error: {fetchError}</p>; // Display any errors that occur during the fetch
    }

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>You are logged in as: {user.email}</p>
            <p>You are logged in as: {userDetails?.name}</p>

            {/* Display user details fetched from MongoDB */}
            {userDetails ? (
                <>
                    <p>Balance: ${userDetails.balance}</p>
                    <h2>Transactions:</h2>
                    <ul>
                        {userDetails.transactions.map((txn, index) => (
                            <li key={index}>
                                {new Date(txn.date).toLocaleString()}: {txn.type} ${txn.amount}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading user details...</p> // Show loading state while user details are being fetched
            )}

            <LogoutButton /> {/* Logout button to handle user sign-out */}
        </div>
    );
}
