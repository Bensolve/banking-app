

import { getLoggedInUser } from "@/app/lib/actions/user.actions";
import HeaderBox from '@/components/HeaderBox';




export default async function DashboardPage() {
  const loggedIn = await getLoggedInUser();
 

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

       
        </header>
      </div>
    </section>
  );
}