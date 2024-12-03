'use client';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
        // Redirect to the dashboard or homepage on successful login
        alert('Login successful! Redirecting...');
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
          style={{ padding: '0.5rem', margin: '0.5rem' }}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: '0.5rem', margin: '0.5rem' }}
        />
        <br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
