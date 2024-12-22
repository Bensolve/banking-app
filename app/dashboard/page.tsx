import { Suspense } from "react";
import { getLoggedInUser, getLoggedInUserAccounts } from "@/app/lib/actions/user.actions";
import HeaderBox from "@/components/HeaderBox";
import { getRecentTransactions } from "@/app/lib/actions/user.actions";
import TotalBalanceBox from "@/components/TotalBalanceBox";

// Create a dedicated server component to fetch user data
async function UserGreeting() {
  const loggedIn = await getLoggedInUser();
  return (
    <HeaderBox
      type="greeting"
      title="Welcome"
      user={loggedIn?.name || "Guest"}
      subtext="Access and manage your account and transactions efficiently."
    />
  );
}

// Create a dedicated server component to fetch account data
async function UserAccounts() {
  const { accounts, totalCurrentBalance } = await getLoggedInUserAccounts();
  return (
    <TotalBalanceBox
      accounts={accounts}
      totalCurrentBalance={totalCurrentBalance}
    />
  );
}
async function RecentTransactions() {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    return <p>No recent transactions available</p>;
  }

  const transactions = await getRecentTransactions(loggedIn.id);

  return (
    <div className="recent-transactions">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="transaction-item mb-2">
            <div>
              <span className="transaction-description">
                {transaction.description}
              </span>
              <span
                className={`transaction-amount ${
                  transaction.type === "credit"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </span>
            </div>
            <span className="transaction-date text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default function DashboardPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Suspense fallback={<div>Loading your dashboard...</div>}>
            <UserGreeting />
          </Suspense>

          <div className="home-balance">
          <Suspense fallback={<div>Loading account details...</div>}>
            <UserAccounts />
          </Suspense>
        </div>
        </header>
       

        <div className="home-transactions mt-8">
          <Suspense fallback={<div>Loading recent transactions...</div>}>
            <RecentTransactions />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
