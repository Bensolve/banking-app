'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdCalendarMonth, MdEmail, MdAccountCircle } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

interface MenuItem {
    name: string;
    path?: string; // Optional for expandable menus
    icon: React.ReactNode;
    subItems?: MenuItem[]; // For expandable menus
    badge?: string; // Optional badge for the menu
}

const menuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <AiOutlineDashboard />,
        badge: '3',
    },
    {
        name: 'Calendar',
        path: '/calendar',
        icon: <MdCalendarMonth />,
    },
    {
        name: 'Email',
        icon: <MdEmail />,
        subItems: [
            { name: 'Inbox', path: '/email/inbox', icon: undefined },
            { name: 'Email Read', path: '/email/read', icon: undefined },
            { name: 'Email Compose', path: '/email/compose', icon: undefined },
        ],
    },
    {
        name: 'Authentication',
        icon: <MdAccountCircle />,
        subItems: [
            { name: 'Login', path: '/auth', icon: undefined },
            { name: 'Register', path: '/auth', icon: undefined },
            { name: 'Recover Password', path: '/auth/recover-password', icon: undefined },
            { name: 'Lock Screen', path: '/auth/lock-screen', icon: undefined },
        ],
    },
    {
        name: 'Settings',
        icon: <FiSettings />,
        subItems: [
            { name: 'Starter Page', path: '/pages/starter', icon: undefined },
            { name: 'Maintenance', path: '/pages/maintenance', icon: undefined },
            { name: 'Coming Soon', path: '/pages/coming-soon', icon: undefined },
            { name: 'FAQs', path: '/pages/faqs', icon: undefined },
        ],
    },
];

export default function HomePageSidebar() {
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]); // Track expanded menus
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleMenu = (menuName: string) => {
        setExpandedMenus((prev) =>
            prev.includes(menuName)
                ? prev.filter((name) => name !== menuName)
                : [...prev, menuName]
        );
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div>
            {/* Mobile Menu Icon */}
            <button
                className="md:hidden fixed top-4 left-2 z-50 p-2 bg-gray-800 text-white rounded"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-40 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:relative md:w-64 transition-transform duration-300`}
            >
                <div
                    className={`p-4 ${
                        isSidebarOpen ? 'mt-16' : '' // Add margin-top when sidebar is open on smaller screens
                    }`}
                >
                    <h2 className="text-lg font-bold mb-6">BankX Sidebar</h2>

                    <ul className="space-y-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.subItems ? (
                                    <>
                                        <button
                                            className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                                            onClick={() => toggleMenu(item.name)}
                                        >
                                            <span className="flex items-center gap-2">
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </span>
                                            {expandedMenus.includes(item.name) ? (
                                                <IoIosArrowUp />
                                            ) : (
                                                <IoIosArrowDown />
                                            )}
                                        </button>

                                        {expandedMenus.includes(item.name) && (
                                            <ul className="mt-2 ml-4 space-y-2">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.path || '#'}
                                                            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.path || '#'}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-green-600 text-xs font-bold px-2 py-1 rounded">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}
