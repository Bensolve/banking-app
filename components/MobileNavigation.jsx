'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from '@/constants/index';


const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="mobile-header flex items-center justify-between px-4 py-2 ">
      {/* Logo */}
      <Image
        src="/icons/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="h-auto"
      />

      {/* Mobile Menu Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/icons/menu.svg"
            alt="Menu"
            width={30}
            height={30}
          />
        </SheetTrigger>

        {/* Mobile Menu Content */}
        <SheetContent className="shad-sheet h-screen px-4 bg-gray-50">
          {/* Navigation Links */}
          <nav className="mobile-nav">
            <ul className="mobile-nav-list space-y-4">
            {NAV_LINKS.map(({ url, name }) => (
                <li key={name}>
                  <Link
                    href={url}
                    className="flex items-center gap-4 p-2 text-lg rounded-md hover:bg-blue-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
