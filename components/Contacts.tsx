import React from 'react'

const Contacts = () => {
  return (
    <section className="bg-white py-10">
    <div className="text-center">
      <h2 className="text-5xl font-bold text-blue-600">
        Connect with Us: We are Here to Help You
      </h2>
    </div>

    <section className=" py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input
        type="text"
        placeholder="Telephone number"
        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Message"
        rows={5}
        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div className="flex items-start space-x-2">
        <input type="checkbox" id="agreement" className="w-5 h-5" />
        <label htmlFor="agreement" className="text-gray-600">
          I agree that the data submitted, collected and stored *
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  </div>
</section>

<section className=" py-10">
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      We are available on the following channels:
    </h2>
    <ul className="space-y-4 text-gray-700">
      <li>
        <strong>Address:</strong> 999 Rue du Cherche-Midi, 7755500666 Paris, France
      </li>
      <li>
        <strong>Telephone:</strong> +001 (808) 555-0111
      </li>
      <li>
        <strong>Fax:</strong> +001 (808) 555-0112
      </li>
      <li className="flex items-center">
        <strong className="mr-2">Email:</strong>
        <span className="flex items-center text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 15.75L21 12m0 0L14.25 8.25M21 12H3"
            />
          </svg>
          support@yourdomain.network
        </span>
      </li>
    </ul>
  </div>
</section>


  </section>
  
  )
}

export default Contacts