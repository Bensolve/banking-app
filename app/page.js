'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in and redirect to dashboard
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/dashboard'); // Redirect if user is logged in
    }
  }, [router]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to My Banking App</h1>
      <p>Please sign up or log in to continue.</p>
      <button onClick={() => router.push('/signup')} style={{ margin: '1rem' }}>
        Signup
      </button>
      <button onClick={() => router.push('/login')} style={{ margin: '1rem' }}>
        Login
      </button>
    </div>
  );
}
