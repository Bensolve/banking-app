import React from 'react';
import Image from 'next/image';

const AboutUs: React.FC = () => {
    return (
        <section>
            <div className="text-center py-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight md:text-5xl lg:text-6xl mb-4">
                    Empowering the Future of Finance
                </h1>
                <p className="text-lg text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 mb-6 leading-relaxed">
                    At Arrow Banking, we leverage cutting-edge technology, innovation, and a vision for growth to unlock endless financial opportunities. Together, we’re shaping a future where every potential is realized.
                </p>
            </div>

            {/* Vision Section */}
            <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-md dark:bg-gray-800 gap-12 px-8 py-8 md:px-16 md:py-16">
                <div className="relative w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden">
                    <Image
                        className="object-cover w-full h-full"
                        src="/icons/hero.jpg"
                        alt="Arrow Banking Vision"
                        layout="intrinsic"
                        width={800}
                        height={400}
                    />
                </div>
                <div className="flex flex-col justify-center p-8 w-full md:w-1/2">
                    <h5 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Vision that drives our Team</h5>
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-6">
                        Explore the foundations of Arrow and how our purpose-driven start has shaped our identity. From initial challenges to realizing our vision of simplifying cross-border payments, this purposeful journey has led Arrow to become a leading force in the financial revolution.
                    </p>
                </div>
            </div>

            {/* Users Section */}
            <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8 md:gap-16 px-8 py-8 w-full justify-between">
                <div className="flex flex-col items-center text-center">
                    <h5 className="text-4xl font-bold text-blue-600 mb-2">7M</h5>
                    <p className="text-lg text-gray-700 dark:text-gray-400">Registered Users</p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h5 className="text-4xl font-bold text-blue-600 mb-2">1.6M</h5>
                    <p className="text-lg text-gray-700 dark:text-gray-400">Regular Users</p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <h5 className="text-4xl font-bold text-blue-600 mb-2">170+</h5>
                    <p className="text-lg text-gray-700 dark:text-gray-400">Countries with our coverage</p>
                </div>
            </div>

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
