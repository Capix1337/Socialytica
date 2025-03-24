"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="relative w-full bg-[#f5f0e8]">
      {/* Top Right Section */}
      <div className="flex justify-end gap-0 ">
        <Link href="/dashboard" className="bg-gray-200 px-3 py-1 text-sm">
          Dashboard
        </Link>
        <Link href="/sign-in" className="bg-red-300 px-3 py-1 text-sm">
          Sign in
        </Link>
        <Link href="/create-account" className="bg-blue-500 text-white px-3 py-1 text-sm">
          Create Account
        </Link>
        <button className="bg-gray-300 p-2 ">
          <Globe size={16} />
        </button>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-1">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-lg font-bold italic">Socialytica</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <div className="relative group">
            <button className="px-3 py-1 rounded-md hover:bg-gray-300">Relationship Tests ▾</button>
          </div>
          <div className="relative group">
            <button className="px-3 py-1 rounded-md hover:bg-gray-300">Personality Tests ▾</button>
          </div>
          <div className="relative group">
            <button className="px-3 py-1 rounded-md hover:bg-gray-300">Career Tests ▾</button>
          </div>
          <div className="relative group">
            <button className="px-3 py-1 rounded-md hover:bg-gray-300">Mental Well-Being Tests ▾</button>
          </div>
          <Link href="/blog" className="px-3 py-1 rounded-md hover:bg-gray-300">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
