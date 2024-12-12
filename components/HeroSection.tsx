'use client';

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Left Column */}
          <div className="relative z-10 bg-white pt-20 pb-8 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-28 xl:pb-32">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Empower your business with</span>{' '}
                  <span className="block text-indigo-600 xl:inline">cutting-edge solutions</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque, dui sit amet vehicula venenatis,
                  nulla neque efficitur ligula, at sollicitudin lorem metus in ligula.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-200 md:py-4 md:px-10 md:text-lg"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Right Column with Phone Mockup */}
          <div className="relative lg:-mr-16">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/assets/phone-mockup.png"
                alt="Phone Mockup"
                width={600}
                height={800}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
