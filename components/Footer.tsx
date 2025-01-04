'use client';

import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const Footer = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Log out the user via Firebase
      router.push('/sign-in'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <footer className="footer">
    <div className="footer_image" onClick={handleLogOut}>
      {/* Use Next.js Image with defined size */}
      <Image 
        src="icons/logout.svg" 
        width={24} 
        height={24} 
        alt="Logout Icon" 
      />
      {/* Place text beside the image */}
      <span className="text-xl font-bold text-gray-700">Logout</span>
    </div>
  </footer>
  
  );
};

export default Footer;
