'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router for redirection

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize router

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        // Store user data in localStorage (temporary solution)
        localStorage.setItem('user', JSON.stringify({ email }));
        alert('Login successful! Redirecting to dashboard...');
        router.push('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
