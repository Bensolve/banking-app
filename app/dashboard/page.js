'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/api/session');
      const data = await res.json();
      if (res.ok) {
        setUser(data.user); // Set user from session cookie
      } else {
        router.push('/login'); // Redirect if not authenticated
      }
    };
    checkSession();
  }, [router]); // Add 'router' to dependency array

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user}!</p>
          <button
            onClick={async () => {
              await fetch('/api/logout', { method: 'POST' });
              alert('You have been logged out.');
              router.push('/login'); // Use 'router' inside event handler
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '1rem',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
