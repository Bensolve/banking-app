'use client';

import { useState, useEffect } from 'react';
import { IUser } from '@/lib/models/User';
import { createOrFetchUser, deposit, withdraw } from '@/lib/actions/user.actions';
import UserInfo from '@/components/UserInfo';
import UserBalance from '@/components/UserBalance';
import { useAuth } from '@/contexts/AuthContext'; // Assuming this provides user data context
import { RecentTransactions } from '@/components/RecentTransactions';

export default function HomePage({ searchParams: { page } }: SearchParamProps) {
    const currentPage = Number(page as string) || 1;
    const { user } = useAuth(); // Use this to get `uid`, `email`, and `name` dynamically
    const [userDetails, setUserDetails] = useState<IUser | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user) {
                try {
                    const email = user.email || '';
                    const name = user.displayName || 'Guest';
                    const uid = user.uid;
                    const userData = await createOrFetchUser(uid, email, name);
                    setUserDetails(userData);
                } catch (error) {
                    setFetchError(error instanceof Error ? error.message : 'An unknown error occurred.');
                }
            }
        };

        fetchUserDetails();
    }, [user]);

    if (fetchError) return <p>Error: {fetchError}</p>;

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <UserInfo
                        type="greeting"
                        title="Welcome"
                        subtext="Access your account details and manage transactions efficiently."
                        user={userDetails?.name || 'Guest'}
                    />
                    <UserBalance
                        balance={userDetails?.balance}
                        onDeposit={async (amount) => {
                            if (userDetails) {
                                const updatedUser = await deposit(userDetails.uid, amount);
                                setUserDetails(updatedUser);
                            }
                        }}
                        onWithdraw={async (amount) => {
                            if (userDetails) {
                                const updatedUser = await withdraw(userDetails.uid, amount);
                                setUserDetails(updatedUser);
                            }
                        }}
                    />

                </header>

                <RecentTransactions
                    transactions={userDetails?.transactions?.map((txn) => ({
                        amount: txn.amount,
                        type: txn.type,
                        date: new Date(txn.date).toISOString(),
                    })) || []}
                    page={currentPage}
                />
                {/* 
                <TransactionControls
                    onDeposit={async (amount) => {
                        if (userDetails) {
                            const updatedUser = await deposit(userDetails.uid, amount);
                            setUserDetails(updatedUser);
                        }
                    }}
                    onWithdraw={async (amount) => {
                        if (userDetails) {
                            const updatedUser = await withdraw(userDetails.uid, amount);
                            setUserDetails(updatedUser);
                        }
                    }}
                /> */}
            </div>
        </section>
    );
}
