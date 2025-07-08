"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiBars3 } from 'react-icons/hi2';

function Header({ toggleSidebar }) {
  return (
    <header className='flex justify-between items-center p-5 shadow-sm bg-white'>
      <div className='flex items-center gap-4'>
        {/* Hamburger icon for mobile */}
        <button className='md:hidden text-2xl' onClick={toggleSidebar}>
          <HiBars3 />
        </button>
        <Link href='/dashboard'>
          <Image src='/online-education.png' alt='logo' width={40} height={40} />
        </Link>
        <h2 className="hidden sm:block font-bold text-lg ml-2">Course Maker AI</h2>
      </div>

      <UserButton />
    </header>
  );
}

export default Header;
