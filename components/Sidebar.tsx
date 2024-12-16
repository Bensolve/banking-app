'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Arrow Banking</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`sidebar-link ${isActive ? 'bg-bank-gradient' : ''}`}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={`${isActive ? 'brightness-[3] invert-0' : ''}`}
                />
              </div>
              <p className={`sidebar-label ${isActive ? '!text-white' : ''}`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
