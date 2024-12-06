'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push('/login'); // Redirect if user is not logged in
    } else {
      setName(user.name);
      // Mock fetching account data from local storage (simulate API call)
      const accountData = JSON.parse(localStorage.getItem('account')) || {
        balance: 1200.45,
        accountType: 'Savings',
        transactions: [
          { date: '2024-12-01', description: 'Groceries', amount: -50.0 },
          { date: '2024-11-30', description: 'Salary', amount: 1500.0 },
          { date: '2024-11-28', description: 'Utility Bill', amount: -100.0 },
        ],
      };
      setBalance(accountData.balance);
      setAccountType(accountData.accountType);
      setTransactions(accountData.transactions);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('You have been logged out.');
    router.push('/login');
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {name || 'User'}!
        </h1>
        <p className="text-gray-600 mb-6">Access and manage your account and transactions efficiently:</p>

        {/* Account Overview */}
        <div className="text-left">
          <p className="text-lg font-medium text-gray-700">
            Account Type: <span className="font-bold">{accountType}</span>
          </p>
          <p className="text-lg font-medium text-gray-700">
            Balance: <span className="font-bold">${balance.toFixed(2)}</span>
          </p>
        </div>

        {/* Recent Transactions */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8">Recent Transactions</h2>
        <ul className="mt-4 space-y-2">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 p-3 rounded-lg"
            >
              <span>{transaction.date}</span>
              <span>{transaction.description}</span>
              <span
                className={`font-bold ${
                  transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                ${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
