"use client";

import { useState } from 'react';
import { Button } from './ui/button';

interface TransactionControlsProps {
    onDeposit: (amount: number) => Promise<void>;
    onWithdraw: (amount: number) => Promise<void>;
}

export default function TransactionControls({ onDeposit, onWithdraw }: TransactionControlsProps) {
    const [amount, setAmount] = useState<string>(''); // Controlled input state

    const handleSubmit = async (e: React.FormEvent, action: 'deposit' | 'withdraw') => {
        e.preventDefault(); // Prevent default form submission
        const numericAmount = Number(amount);
        if (numericAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        if (action === 'deposit') await onDeposit(numericAmount);
        if (action === 'withdraw') await onWithdraw(numericAmount);
        setAmount(''); // Reset input
    };

    return (
        <form className="flex flex-col space-y-4 bg-white p-4 rounded-md shadow-md">
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-class"
                required
                min={0.01}
            />
            <div className="flex space-x-4">
                <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'deposit')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Deposit
                </Button>
                <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e, 'withdraw')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                    Withdraw
                </Button>
            </div>
        </form>
    );
}
