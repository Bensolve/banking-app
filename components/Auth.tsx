'use client';

import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createOrFetchUser } from '../lib/actions/user.actions'; // Import server action

export default function Auth() {
    const [email, setEmail] = useState<string>(''); // Ensure email is always a string
    const [password, setPassword] = useState<string>(''); // Ensure password is always a string
    const [name, setName] = useState<string>(''); // Ensure name is always a string
    const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and signup
    const [loading, setLoading] = useState<boolean>(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                // Handle login
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Handle signup
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const firebaseUser = userCredential.user;

                if (!firebaseUser.email) {
                    throw new Error('Firebase did not return an email address');
                }

                // Call the server action to create or fetch the user in MongoDB
                await createOrFetchUser(firebaseUser.uid, firebaseUser.email, name);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleAuth}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value || '')} // Handle null/undefined values
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value || '')} // Handle null/undefined values
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value || '')} // Handle null/undefined values
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
                </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
            </button>
        </div>
    );
}