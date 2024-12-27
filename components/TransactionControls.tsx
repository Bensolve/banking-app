"use client";
import { useState } from 'react';

interface TransactionControlsProps {
    onDeposit: (amount: number) => Promise<void>;
    onWithdraw: (amount: number) => Promise<void>;
}

export default function TransactionControls({ onDeposit, onWithdraw }: TransactionControlsProps) {
    const [amount, setAmount] = useState<number>(0);

    const handleDeposit = async () => {
        if (amount > 0) {
            await onDeposit(amount);
        } else {
            alert('Please enter a valid deposit amount.');
        }
    };

    const handleWithdraw = async () => {
        if (amount > 0) {
            await onWithdraw(amount);
        } else {
            alert('Please enter a valid withdrawal amount.');
        }
    };

    return (
        <div className="flex flex-col space-y-4 bg-white p-4 rounded-md shadow-md">
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="p-2 border rounded-md"
            />
            <div className="flex space-x-4">
                <button onClick={handleDeposit} className="bg-green-600 text-white px-4 py-2 rounded-md">
                    Deposit
                </button>
                <button onClick={handleWithdraw} className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Withdraw
                </button>
            </div>
        </div>
    );
}

