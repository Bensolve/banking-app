'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router.push('/login'); // Redirect if user is not logged in
    } else {
      setName(user.name); // Set the user's name from localStorage
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('You have been logged out.');
    router.push('/login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome, {name || 'User'}!</h1>
      <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>
        Logout
      </button>
    </div>
  );
}
