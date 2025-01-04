'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthCheck() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in'); // Redirect to login page if not authenticated
        }
    }, [user, loading, router]);

    return { user, loading };
}
