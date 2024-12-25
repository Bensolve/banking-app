'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 p-6 sm:p-12">
      {/* Header Section */}
      <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center gap-4">
          <Image
            src="/bank-logo.svg" // Replace with your logo
            alt="Bank Logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-gray-800">MyBank</h1>
        </div>
        <button
          onClick={() => window.location.href = '/auth'} // Redirect to login page
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center text-center gap-8 mt-12">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">
          Secure Banking at Your Fingertips
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
          Manage your accounts, make transactions, and track your finances—all in one place. Join us for a seamless banking experience.
        </p>
        <div className="flex gap-6">
          <a
            href="/auth"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition text-lg"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition text-lg"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 px-4 sm:px-8">
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
          <Image
            src="/feature1.svg"
            alt="Feature 1"
            width={50}
            height={50}
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Easy Transfers
          </h3>
          <p className="text-gray-600 mt-2">
            Send and receive money instantly with zero hassle.
          </p>
        </div>
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
          <Image
            src="/feature2.svg"
            alt="Feature 2"
            width={50}
            height={50}
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            Secure Transactions
          </h3>
          <p className="text-gray-600 mt-2">
            Your data and money are protected with industry-leading security.
          </p>
        </div>
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
          <Image
            src="/feature3.svg"
            alt="Feature 3"
            width={50}
            height={50}
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            24/7 Support
          </h3>
          <p className="text-gray-600 mt-2">
            Our team is always available to assist you with any queries.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full max-w-7xl mt-16 px-4 sm:px-8 py-6 bg-white shadow-md rounded-lg text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} MyBank. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
