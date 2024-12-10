// components/Footer.jsx
'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        <p>
          Contact Support:{' '}
          <a href="mailto:support@ecobank.com" className="text-blue-400">
            support@arrowbanking.com
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Arrow Investment Banking. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
