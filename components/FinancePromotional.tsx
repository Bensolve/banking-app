import Image from "next/image";
export default function FinanceSection() {
    return (
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-indigo-600">Manage Your Finances</h2>
            <p className="mt-4 text-lg text-gray-700">
              Explore essential tools and tips to take control of your finances and secure your future.
            </p>
          </div>
  
          {/* Bento Grid with Three Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
  
            {/* Section 1: Save. Invest. Retire well. */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Image for this section */}
                <Image
                  className="w-full h-64 object-cover object-center" // Increased height here
                  src="/icons/retire.jpg"
                  alt="Retirement Planning"
                  width={400}
                  height={200}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              </div>
              <div className="relative p-8 text-center">
                <h3 className="text-2xl font-semibold text-indigo-600">Save. Invest. Retire well.</h3>
                <p className="mt-4 text-lg text-gray-700">
                  Discover how to start saving to meet your retirement goals. Get ready for retirement.
                </p>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                  >
                    Get ready for retirement
                  </a>
                </div>
              </div>
            </div>
  
            {/* Section 2: Reduce debt. Build credit. Enjoy life. */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Image for this section */}
                <Image
                  className="w-full h-64 object-cover object-center" // Increased height here
                  src="/icons/debt.jpg"
                  alt="Debt Reduction"
                  width={200}
                  height={200}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              </div>
              <div className="relative p-8 text-center">
                <h3 className="text-2xl font-semibold text-indigo-600">Reduce debt. Build credit. Enjoy life.</h3>
                <p className="mt-4 text-lg text-gray-700">
                  Discover four steps that may help you reduce debt and strengthen credit. Build credit and reduce debt.
                </p>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                  >
                    Build credit and reduce debt
                  </a>
                </div>
              </div>
            </div>
  
            {/* Section 3: Get tools. Get tips. Get peace of mind. */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Image for this section */}
                <Image
                  className="w-full h-64 object-cover object-center" // Increased height here
                  src="/icons/tools.jpg"
                  alt="Digital Tools"
                  width={200}
                  height={200}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              </div>
              <div className="relative p-8 text-center">
                <h3 className="text-2xl font-semibold text-indigo-600">Get tools. Get tips. Get peace of mind.</h3>
                <p className="mt-4 text-lg text-gray-700">
                  Discover digital tools to help you budget, save, manage credit, and more.
                </p>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                  >
                    Access the toolkit
                  </a>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  