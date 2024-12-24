'use client';

import { useAuth } from '../../contexts/AuthContext';
import LogoutButton from '../../components/LogoutButton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth'); // Redirect to the login page if not authenticated
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>; // Show a loading state while checking auth
    }

    if (!user) {
        return null; // Avoid flashing content before redirect
    }

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>You are logged in as: {user.email}</p>
            <LogoutButton /> {/* Use the LogoutButton component */}
        </div>
    );
}
