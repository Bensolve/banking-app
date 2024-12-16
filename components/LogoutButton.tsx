import { logoutAccount } from '@/app/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) {
      router.push('/sign-in');
    }
  };

  return (
    <footer className="footer">
  <div onClick={handleLogOut} className="footer-image flex items-center space-x-2 cursor-pointer">
    <div className="relative w-6 h-6">
      <Image src="/assets/logout.svg" alt="Logout" fill />
    </div>
    <span className="text-gray-700 text-sm font-medium">Sign Out</span>
  </div>
</footer>

   
  );
};

export default LogoutButton;
