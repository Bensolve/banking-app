// components/Navbar.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center">
            <Image src="/assets/logo.svg" alt="Arrow Banking Logo" width={24} height={24} className="w-6 h-6" />
            <span className="text-white text-lg font-semibold">Arrow Banking</span>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              ATMs/Locations
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Help
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Español
            </a>

            {/* Search Icon */}
            <button
              type="button"
              aria-label="Search"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
            >
              <Image src="/assets/search.svg" alt="Search" width={24} height={24} className="w-5 h-5" />
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              aria-label="Sign in"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
           
            >
            <Link
              href="/sign-in"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <Image
                src={isMobileMenuOpen ? '/assets/close.svg' : '/assets/menu.svg'}
                alt={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              >
                ATMs/Locations
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              >
                Help
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              >
                Español
              </a>

              {/* Search Icon */}
              <button
                type="button"
                aria-label="Search"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium flex items-center"
              >
                <Image src="/assets/search.svg" alt="Search" width={24} height={24} className="w-5 h-5" />
              </button>

              {/* Sign In Button */}
              <button
                type="button"
                aria-label="Sign in"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
