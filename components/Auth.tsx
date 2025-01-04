'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createOrFetchUser } from '@/lib/actions/user.actions';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'; // Sign-in or sign-up form type
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const isSignIn = type === 'sign-in';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) {
        // Firebase sign-in
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/'); // Redirect to the home page
      } else {
        // Firebase sign-up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        if (!firebaseUser.email) {
          throw new Error('Firebase did not return an email address');
        }

        // Save user to MongoDB
        await createOrFetchUser(firebaseUser.uid, firebaseUser.email, name);
        router.push('/'); // Redirect to the home page
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      {/* Header */}
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {isSignIn ? 'Welcome back! Please sign in to continue.' : 'Create a new account to get started.'}
          </p>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleAuth} className="space-y-8">
        {!isSignIn && (
          <div className="flex gap-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="flex gap-2">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-2">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {/* Footer */}
      <footer className="flex justify-center gap-1 mt-4">
        <p className="text-14 font-normal text-gray-600">
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="text-blue-500 underline">
          {isSignIn ? 'Sign up' : 'Sign in'}
        </Link>
      </footer>
    </section>
  );
}
