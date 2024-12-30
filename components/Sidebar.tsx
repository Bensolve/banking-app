'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';

import LogoutButton from './LogoutButton'; // Import the LogoutButton
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true); // Controls sidebar visibility
    const [isMobile, setIsMobile] = useState(false); // Tracks if the screen is small
    const router = useRouter();

    const navigationItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <AiOutlineHome size={24} /> },
        { name: 'Account Management', path: '/dashboard/account-management', icon: <FiSettings size={24} /> },
        { name: 'Transactions', path: '/dashboard/transactions', icon: <MdOutlineAccountBalanceWallet size={24} /> },
    ];

    // Detect if the screen size is small (mobile view)
    useEffect(() => {
        const handleResize = () => {
            const isNowMobile = window.innerWidth < 768; // Less than 768px = mobile view
            setIsMobile(isNowMobile);

            if (isNowMobile) {
                setIsOpen(false); // Automatically collapse on mobile
            } else {
                setIsOpen(true); // Expand by default on large screens
            }
        };

        handleResize(); // Check on component mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col min-h-screen p-4 ${
                isOpen ? 'w-64' : 'w-16'
            } transition-all duration-300`}
        >
            {/* Logo */}
            <div className="mb-8">
                <h1 className={`text-lg font-bold ${!isOpen && 'hidden md:block'} transition-all`}>
                    BankX
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-6">
                {navigationItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => router.push(item.path)}
                        className="flex items-center gap-4 hover:text-gray-300 w-full text-left"
                    >
                        {item.icon}
                        <span className={`${!isOpen && 'hidden md:block'} transition-all`}>
                            {item.name}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="mt-auto">
                <LogoutButton isMobile={isMobile} /> {/* Pass isMobile prop */}
            </div>
        </div>
    );
}