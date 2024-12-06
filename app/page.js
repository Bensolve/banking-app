'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-semibold ml-3">Arrow Investment Banking </h1>
          </div>
          <nav className="space-x-4">
            {/* Remove <a> tag and rely on Link for navigation */}
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/support" className="hover:text-gray-300">
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Banking Made Easy</h2>
          <p className="text-lg mb-8">
            Your trusted partner in financial growth. Secure your future today with Ecobank.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-gray-100">
                Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Savings Accounts</h3>
              <p className="text-gray-600">
                Grow your wealth with our high-yield savings accounts tailored for you.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Loans</h3>
              <p className="text-gray-600">
                Get the financial support you need with competitive interest rates.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-3">Cards</h3>
              <p className="text-gray-600">
                Secure and flexible debit and credit card options for your daily needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center space-y-4">
          <p>
            Contact Support:{' '}
            <a href="mailto:support@ecobank.com" className="text-blue-400">
              support@ecobank.com
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Ecobank. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
