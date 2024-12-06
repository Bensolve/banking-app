'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Home', route: '/' },
  { label: 'Login', route: '/login' },
  { label: 'Sign Up', route: '/signup' },
  { label: 'About', route: '/about' },
  { label: 'Support', route: '/support' },
];

const NavBar = () => {
  const navContainerRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      navContainerRef.current.style.transform = isNavVisible ? 'translateY(0)' : 'translateY(-100%)';
      navContainerRef.current.style.opacity = isNavVisible ? '1' : '0';
    }
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
            <img src="/icons/logo.svg" alt="logo" className="w-10" />
            <h1 className="text-lg font-bold text-blue-900">Horizon Bank</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => router.push(item.route)}
                className={clsx(
                  'text-gray-700 hover:text-blue-700',
                  pathname === item.route && 'text-blue-700 font-bold'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
