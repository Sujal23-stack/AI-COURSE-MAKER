"use client"
import React, { useState } from 'react';
import SideBar from './_components/SideBar';
import Header from './_components/Header';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex'>
      {/* Desktop Sidebar */}
      <div className='hidden md:block'>
        <SideBar />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed md:hidden top-0 left-0 z-50 bg-white w-64 h-full shadow-lg transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideBar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className='flex-1 w-full'>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className='p-5 md:p-10'>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

