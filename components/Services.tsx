import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-blue-600 mb-4 mx-auto text-center leading-tight sm:leading-snug">
          Adapted to your <br /> needs, discover what <br /> we have
        </h1>
      </div>

      {/* Large Section 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 bg-white">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 leading-tight mb-6">
            Freedom to send, <br />
            request money globally
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            From sending money to friends and family to receiving payments from
            around the world, Plax Consumer offers you a simple and instant
            experience.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Learn more →
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/icons/portfolio-mobile.png"
            alt="Global money transfer"
            width={500}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Large Section 2 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 bg-gray-100">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 leading-tight mb-6">
            Secure Transactions <br />
            at Your Fingertips
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Experience peace of mind with our highly secure payment system,
            ensuring your transactions are safe and protected at all times.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Learn more →
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/icons/secure-transactions.jpg"
            alt="Secure transactions"
            width={500}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Large Section 3 */}
     

      {/* Large Section 4 */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 bg-gray-100">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 leading-tight mb-6">
            Instant Notifications
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Never miss a moment! Receive real-time notifications for all your
            transactions and updates right at your fingertips.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Learn more →
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/icons/instant-notifications.png"
            alt="Instant notifications"
            width={500}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Services;
