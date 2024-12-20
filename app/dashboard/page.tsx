import { Suspense } from "react";
import { getLoggedInUser } from "@/app/lib/actions/user.actions";
import HeaderBox from "@/components/HeaderBox";

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

export default function DashboardPage() {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Suspense fallback={<div>Loading your dashboard...</div>}>
            <UserGreeting />
          </Suspense>
        </header>
      </div>
    </section>
  );
}
