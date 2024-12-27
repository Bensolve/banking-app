'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/models/User';
import { createOrFetchUser, deposit, withdraw } from '@/lib/actions/user.actions';
import UserInfo from '@/components/UserInfo';
import UserBalance from '@/components/UserBalance';
import TransactionControls from '@/components/TransactionControls';


export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<IUser | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
            return;
        }

        const fetchUserDetails = async () => {
            if (user) {
                try {
                    const email = user.email || '';
                    const name = user.displayName || 'Guest';
                    const userData = await createOrFetchUser(user.uid, email, name);
                    setUserDetails(userData);
                } catch (error) {
                    setFetchError(error instanceof Error ? error.message : 'An unknown error occurred.');
                }
            }
        };

        if (user) {
            fetchUserDetails();
        }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;
    if (fetchError) return <p>Error: {fetchError}</p>;

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <UserInfo email={user.email} name={userDetails?.name} />
            <UserBalance
                balance={userDetails?.balance}
                transactions={userDetails?.transactions?.map((txn) => ({
                    amount: txn.amount,
                    type: txn.type,
                    date: new Date(txn.date).toISOString(), // Convert to Date and then to string
                })) || []}
            />


            <TransactionControls

                onDeposit={async (amount) => {
                    const updatedUser = await deposit(user.uid, amount);
                    setUserDetails(updatedUser);
                }}
                onWithdraw={async (amount) => {
                    const updatedUser = await withdraw(user.uid, amount);
                    setUserDetails(updatedUser);
                }}
            />

        </div>
    );
}
