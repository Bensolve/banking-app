'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



const MobileSidebar = ({ }) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] bg-white">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        aria-label="Open Menu"
      >
        <Image
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          alt="menu"
          className="cursor-pointer"
        />
        <span>Menu</span>
      </button>
      <div className="flex flex-col gap-6 p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-bold text-black-1">Horizon</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                key={item.label}
                href={item.route}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-bank-gradient text-white' : 'text-black-2'
                }`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={isActive ? 'brightness-[3] invert-0' : ''}
                />
                <p className="text-16 font-semibold">{item.label}</p>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        
      </div>
    </section>
  );
};

export default MobileSidebar;
