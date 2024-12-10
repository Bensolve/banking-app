"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AccountOverview from "@/components/AccountOverview";
import SpendingInsights from "@/components/SpendingInsights";
import RecentTransactions from "@/components/RecentTransactions";
import LogoutButton from "@/components/LogoutButton";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering chart plugins
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountType, setAccountType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [category, setCategory] = useState('');

  const handleTransaction = () => {
    const newTransaction = { ...transactionDetails, category };
    setTransactions([newTransaction, ...transactions]);
  };
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login"); // Redirect if user is not logged in
    } else {
      setName(user.name);
      const accountData = JSON.parse(localStorage.getItem("account")) || {
        balance: 1200.45,
        accountType: "Savings",
        transactions: [
          { date: "2024-12-01", description: "Groceries", amount: -50.0 },
          { date: "2024-11-30", description: "Salary", amount: 1500.0 },
          { date: "2024-11-28", description: "Utility Bill", amount: -100.0 },
        ],
      };
      setBalance(accountData.balance);
      setAccountType(accountData.accountType);
      setTransactions(accountData.transactions);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    router.push("/login");
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      const newTransaction = {
        date: new Date().toISOString(),
        description: "Deposit",
        amount: amount,
      };
      setTransactions([newTransaction, ...transactions]);
      setDepositAmount("");
      updateAccountData(newBalance, "Deposit", amount);
    } else {
      alert("Please enter a valid deposit amount");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      const newTransaction = {
        date: new Date().toISOString(),
        description: "Withdrawal",
        amount: -amount,
      };
      setTransactions([newTransaction, ...transactions]);
      setWithdrawAmount("");
      updateAccountData(newBalance, "Withdrawal", amount);
    } else {
      alert(
        "Please enter a valid withdrawal amount or ensure sufficient balance"
      );
    }
  };

  const updateAccountData = (newBalance, type, amount) => {
    const updatedAccount = {
      balance: newBalance,
      accountType: accountType,
      transactions: [
        { date: new Date().toISOString(), description: type, amount: amount },
        ...transactions,
      ],
    };
    localStorage.setItem("account", JSON.stringify(updatedAccount));
  };

  const chartData = {
    labels: transactions.map((transaction) => transaction.description),
    datasets: [
      {
        data: transactions.map((transaction) => Math.abs(transaction.amount)), // Use absolute value
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Customize this
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <Header name={name} />

      {/* Account Overview & Spending Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <AccountOverview accountType={accountType} balance={balance} />
        <SpendingInsights chartData={chartData} />
      </div>

      {/* Deposit and Withdrawal Section */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleDeposit}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Deposit
          </button>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter withdraw amount"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleWithdraw}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />

      {/* Logout Button */}
      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
}
