'use client';

import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from 'react-icons/ai';

export default function LogoutButton({ isMobile }: { isMobile: boolean }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Log out the user
            router.push('/auth'); // Redirect to the login page
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-4 hover:text-gray-300 w-full text-left"
        >
            <AiOutlineLogout size={24} /> {/* Display icon */}
            {!isMobile && (
                <span className="ml-2">Logout</span> // Show text only on larger screens
            )}
        </button>
    );
}

