'use client';

import React, { useState, useEffect } from 'react';
import UserInfo from '@/components/UserInfo';
import { TransactionsTable } from "@/components/TransactionsTable";
import { Pagination } from "@/components/Pagination";
import { IUser } from '@/lib/models/User';
import { useAuth } from '@/contexts/AuthContext';
import { createOrFetchUser } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';
import { formatAmount } from '@/lib/utils';

const TransactionHistory = () => {
  const searchParams = useSearchParams();
  const rowsPerPage = 10;
  const { user } = useAuth();

  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
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

  const transactions = userDetails?.transactions || [];
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const currentPage = Number(searchParams.get('page')) || 1;
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction).map(transaction => ({
    ...transaction,
    date: new Date(transaction.date).toISOString(), // Convert Date to string
  }));

  return (
    <div className="transactions">
      <div className="transactions-header">
        <UserInfo
          title="Transaction History"
          subtext="See your details and transactions."

        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">


          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {userDetails?.name || "Account Holder"}

              <p
        className="text-14 font-semibold tracking-[1.1px] text-white cursor-pointer"
        onClick={() => setIsRevealed((prev) => !prev)} // Toggle visibility on click
      >
        {isRevealed
          ? userDetails?.accountNumber || "No Account Number"
          : `●●●● ●●●● ●●●● ${userDetails?.accountNumber?.slice(-4) || "XXXX"}`}
      </p>

      {!isRevealed && (
        <p className="text-12 text-blue-25">(Click to reveal full account number)</p>
      )}
            </h2>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(userDetails?.balance || 0)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />

          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination
                totalPages={totalPages}
                page={currentPage}


              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
