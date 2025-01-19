import React from 'react';
import Image from 'next/image';

const AboutUs: React.FC = () => {
    const stats = [
        { id: 1, value: '7M', label: 'Registered Users' },
        { id: 2, value: '1.6M', label: 'Regular Users' },
        { id: 3, value: '170+', label: 'Countries with our coverage' },
      ];
    return (
        <section>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-blue-600 mb-4 mx-auto text-center leading-tight sm:leading-snug">
                    Empowering the Future of Finance
                </h1>
                <p className="text-lg text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 mb-6 leading-relaxed">
                    At Arrow Banking, we leverage cutting-edge technology, innovation, and a vision for growth to unlock endless financial opportunities. Together, we’re shaping a future where every potential is realized.
                </p>
            </div>


            <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 bg-white">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        The Vision that drives our Team
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore the foundations of Arrow and how our purpose-driven start has shaped our identity. From initial challenges to realizing our vision of simplifying cross-border payments, this purposeful journey has led Arrow to become a leading force in the financial revolution.

                    </p>

                </div>

                {/* Image */}
                <div className="md:w-1/2 flex justify-center">
                    <Image
                        src="/icons/hero.jpg"
                        alt="Global money transfer"
                        width={500}
                        height={600}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>


            <section className="bg-white py-16 sm:py-32">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8 md:gap-16 px-8 py-8 w-full justify-between">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center text-center">
            <h5 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h5>
            <p className="text-lg text-gray-700 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>

            {/* Users Section */}
           

            {/* Transparency Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-screen-lg mx-auto text-center px-4 md:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">At Arrow Banking, Transparency is Key</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                        &quot;Transparency is not just a promise; it is the cornerstone of our relationship with you. We believe that trust is built with clear policies and coherent actions.&quot;
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">- Arrow Banking Team</p>
                </div>

                {/* Privacy & Data Protection Section */}
                <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-16 px-4 md:px-8">
                    <div className="flex-1 bg-white rounded-xl shadow-xl p-10 transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-2xl">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Privacy Policies</h3>
                        <p className="text-lg text-gray-700 dark:text-gray-400">
                            Your privacy is our priority. We never share your information with third parties without your express consent.
                        </p>
                    </div>

                    <div className="flex-1 bg-white rounded-xl shadow-xl p-10 transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-2xl">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Data Protection</h3>
                        <p className="text-lg text-gray-700 dark:text-gray-400">
                            We are committed to protecting your personal and financial data with the highest security measures.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
