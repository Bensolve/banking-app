export default function HomePromotional() {
    return (
      <div className="bg-white">
        <div className="relative w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-gray-900">
          {/* Image or background on the left side */}
          <div
            className="relative w-full h-96 lg:w-1/2 lg:h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/hero.jpg')" }}
          />
  
          {/* Content Section */}
          <div className="relative z-10 mx-auto px-6 py-16 sm:px-8 md:px-12 lg:px-24 lg:py-24 flex flex-col items-start justify-center w-full lg:w-1/2 text-white">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              A Home of Your Own
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              With low down payment options on a fixed-rate mortgage, owning your dream home is easier than ever. Take the first step toward your future today.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 lg:flex-row lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  