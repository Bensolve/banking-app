'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNavigation from './MobileNavigation';
import { NAV_LINKS } from '@/constants/index';

const Navbar = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileNavigation user={user} />
      ) : (
        <header className=" py-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-6">
            <div className="flex items-center">
              <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
              <h1 className="text-xl font-semibold ml-3">Arrow Investment Banking</h1>
            </div>
            <nav className="space-x-4">
            {NAV_LINKS.map(({ url, name }) => (
            <Link key={name} href={url} className="hover:text-gray-300">
              {name}
            </Link>
          ))}
            </nav>
          </div>
        </header>
      )}
    </div>
  );
};

export default Navbar;
