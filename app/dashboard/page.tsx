import { Suspense } from "react";
import { getLoggedInUser, getLoggedInUserAccounts } from "@/app/lib/actions/user.actions";
import HeaderBox from "@/components/HeaderBox";
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

export default function DashboardPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Suspense fallback={<div>Loading your dashboard...</div>}>
            <UserGreeting />
          </Suspense>
        </header>
        <div className="home-balance">
          <Suspense fallback={<div>Loading account details...</div>}>
            <UserAccounts />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
