"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const sidebarRef = useRef();

  const menuItems = [
    { id: 1, name: "Home", path: "/dashboard" },
    { id: 2, name: "Explore", path: "/dashboard/explore" },
    { id: 3, name: "Your Courses", path: "/dashboard/user_courses" },
    { id: 4, name: "Logout", path: "/" },
  ];

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button for small screens */}
      <div className="md:hidden flex justify-between items-center p-4 shadow">
        <div className="flex items-center gap-2">
          <Image src="/online-education.png" alt="logo" width={30} height={30} />
          <h2 className="text-lg font-semibold">Course Maker AI</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-5 z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <Link href={"/dashboard"}>
          <div className="flex font-bold text-xl items-center mb-4">
            <Image src={"/online-education.png"} alt="logo" width={40} height={40} />
            <h2 className="ml-2">Course Maker AI</h2>
          </div>
        </Link>

        <hr className="my-5" />

        <ul>
          {menuItems.map((item) => (
            <Link key={item.id} href={item.path}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 
                ${item.path === path ? "bg-gray-200 text-black" : "text-gray-600"}`}
              >
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
