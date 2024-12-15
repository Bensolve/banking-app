'use client';

import { useEffect, useState } from 'react';
import HeaderBox from '@/components/HeaderBox';

import { useRouter } from 'next/navigation';


export default function DashboardPage() {
  const [userName, setUserName] = useState<string>('Guest');

 

  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from localStorage on page load
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser && storedUser.name) {
      setUserName(storedUser.name); // Set the user's name from localStorage
    } else {
      async function fetchUserData() {
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'test@example.com', // Replace with the correct email
              password: 'password123',  // Replace with the correct password
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.user?.name) {
              setUserName(data.user.name); // Set the user's name from the API response
              localStorage.setItem('user', JSON.stringify(data.user)); // Store in localStorage
            } else {
              console.error('Unexpected API response:', data);
            }
          } else {
            console.error('Failed to fetch user data:', await response.text());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      fetchUserData();
    }

    // Use global mock accounts data
  
  }, [router]);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={userName}
            subtext="Access and manage your account and transactions efficiently."
          />

       
        </header>
      </div>
    </section>
  );
}