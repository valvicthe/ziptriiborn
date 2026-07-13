"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function Navbar() {
  const [userData, setUserData] = useState<{ displayName: string; robux: number } | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/users/v1/users/1`)
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error("Navbar sync failed:", err));
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[40px] bg-[#1c1e20] border-b border-[#393b3d] flex items-center justify-between px-4 z-50 select-none">
      {/* Platform Branding & Tabs */}
      <div className="flex items-center gap-4">
        <span className="font-sans font-black tracking-tighter text-white text-lg uppercase cursor-pointer">
          ZIPTRII
        </span>
        <nav className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-300">
          <Link href="/games" className="hover:text-white py-2">Discover</Link>
          <Link href="/catalog" className="hover:text-white py-2">Avatar Shop</Link>
          <span className="text-[#00B06F] bg-[#00B06F]/10 px-2 py-0.5 rounded cursor-not-allowed">Create</span>
        </nav>
      </div>

      {/* Global Boxy Search Header Field */}
      <div className="flex-1 max-w-[400px] mx-4 relative">
        <input 
          type="text" 
          placeholder="Search items, places..." 
          className="w-full bg-[#2b2d2f] border border-[#555] rounded-sm px-3 py-0.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-black"
        />
      </div>

      {/* Sync User Display & Real Robux Tilted-Square Currency Meter */}
      <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
        <Link href="/" className="hover:text-white hidden md:inline">
          {userData?.displayName || 'Loading...'}
        </Link>
        
        <div className="flex items-center gap-1.5 cursor-pointer hover:text-white">
          <svg className="w-3.5 h-3.5 text-white fill-current transform rotate-[15deg]" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4V4zm5 5v6h6V9H9z" />
          </svg>
          <span className="text-white text-[13px] font-sans">
            {userData?.robux !== undefined ? userData.robux.toLocaleString() : '0'}
          </span>
        </div>
      </div>
    </header>
  );
}
