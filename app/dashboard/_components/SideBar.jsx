"use client"
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  HiHome,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
  HiPower,
} from 'react-icons/hi2';

function SideBar({ onClose }) {
  const path = usePathname();

  const Menu = [
    { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiOutlineSquare3Stack3D />, path: '/dashboard/explore' },
    { id: 3, name: 'Your Courses', icon: <HiOutlineShieldCheck />, path: '/dashboard/user_courses' },
    { id: 4, name: 'Logout', icon: <HiPower />, path: '/' },
  ];

  return (
<aside className="h-full w-64 p-5 bg-white shadow-md flex flex-col justify-between">

      <Link href='/dashboard'>
        <div className='flex items-center font-bold text-xl'>
          <Image src='/online-education.png' alt='logo' width={40} height={40} />
          <span className='ml-2'>Course Maker AI</span>
        </div>
      </Link>

      <hr className='my-5' />

      <ul>
        {Menu.map((item) => (
          <Link
            href={item.path}
            key={item.id}
            onClick={onClose} // Close on mobile tap
            className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer
              ${path === item.path ? 'bg-gray-100 text-black' : 'text-gray-600'}
              hover:bg-gray-100 hover:text-black`}
          >
            <span className='text-2xl'>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </ul>
<div className='w-full'>
  <Progress value={33} />
  <p className='text-sm mt-2'>3 of 5 Courses Created</p>
  <p className='text-xs text-gray-500'>Upgrade for unlimited generation</p>
</div>

    
    </aside>
  );
}

export default SideBar;
