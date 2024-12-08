// components/HeroSection.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    // <section className="bg-blue-700 text-white py-20">
    //   <div className="container mx-auto text-center">
    //     <h2 className="text-4xl font-bold mb-4">Banking Made Easy</h2>
    //     <p className="text-lg mb-8">
    //       Your trusted partner in financial growth. Secure your future today with Ecobank.
    //     </p>
    //     <div className="space-x-4">
    //       <Link href="/signup">
    //         <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">Get Started</button>
    //       </Link>
    //       <Link href="/login">
    //         <button className="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-gray-100">Login</button>
    //       </Link>
    //     </div>
    //   </div>
    // </section>
<section className="relative bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] items-center px-8 pt-14 lg:px-12 gap-12">
    {/* Left Column - Text Content */}
    <div className="mx-auto lg:pl-16 max-w-3xl lg:max-w-none py-32 sm:py-48 lg:py-56 text-center lg:text-left">
      <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
        Banking Made Easy
        <span className="block mt-2">Make your money work for you</span>
      </h1>
      <p className="mt-8 text-lg text-gray-500 sm:text-xl">
        Your trusted partner in financial growth. Secure your future today with Arrow Investment Bank.
      </p>
      <div className="mt-10 flex justify-center lg:justify-start gap-4 items-center">
  <Link
    href="/login"
    className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
  >
    Get Started
  </Link>
  <Link
    href="/about"
    className="text-sm font-semibold text-gray-900 hover:underline"
  >
    Learn more <span aria-hidden="true">→</span>
  </Link>
</div>

    </div>

    {/* Right Column - Phone Mockup */}
    <div className="flex justify-center items-center lg:justify-end">
      <div className="relative w-full max-w-sm">
        <Image
          src="/phone-mockup.png" // Replace with the actual phone mockup path
          alt="Phone Mockup"
          width={300}
          height={600}
          className="mx-auto drop-shadow-lg"
        />
      </div>
    </div>
  </div>
</section>




  );
};

export default HeroSection;
