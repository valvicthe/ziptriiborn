"use client";
import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[40px] bg-[#1c1e20] border-b border-[#393b3d] flex items-center justify-between px-4 z-50 select-none">
      {/* Left Menu & Iconic Tilt Logo */}
      <div className="flex items-center gap-3">
        <button className="flex flex-col gap-1 justify-center items-center w-8 h-8 hover:bg-[#2b2d2f] rounded transition-colors group">
          <span className="w-5 h-[2px] bg-gray-300 group-hover:bg-white" />
          <span className="w-5 h-[2px] bg-gray-300 group-hover:bg-white" />
          <span className="w-5 h-[2px] bg-gray-300 group-hover:bg-white" />
        </button>
        {/* The classic stylized Roblox header logo font-weight */}
        <span className="font-sans font-black tracking-[ -0.05em] text-white text-lg uppercase cursor-pointer hover:opacity-90">
          Ziptrii
        </span>
        
        <nav className="hidden sm:flex items-center gap-4 pl-4 text-xs font-semibold text-gray-300">
          <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-white py-2">Discover</span>
          <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-white py-2">Avatar Shop</span>
          <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-white py-2">Create</span>
          <span className="text-[#00B06F] bg-[#00B06F]/10 px-2 py-0.5 rounded cursor-pointer hover:bg-[#00B06F]/20">Robux</span>
        </nav>
      </div>

      {/* 2020 Boxy Search Field */}
      <div className="flex-1 max-w-[450px] mx-4 relative">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-[#2b2d2f] border border-[#555] rounded-sm px-3 py-0.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-black focus:placeholder-gray-600"
        />
        <button className="absolute right-2 top-1 text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>

      {/* Right Side Widgets: Real Robux Tilt-Square & Settings */}
      <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
        <span className="cursor-pointer hover:text-white hidden md:inline">ZiptriiDeveloper</span>
        
        {/* Actual 2020 Hollow Tilted Square Robux Icon */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <svg className="w-4 h-4 text-white fill-current transform rotate-[15deg]" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4V4zm5 5v6h6V9H9z" />
          </svg>
          <span className="text-white font-sans text-[13px]">15,402</span>
        </div>

        {/* Notifications and Settings Gear */}
        <button className="hover:text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
        </button>
        <button className="hover:text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.1-.25-.3-.42-.56-.47l-1-.2a.75.75 0 00-.86.86l.2 1a.5.5 0 01-.47.56l-1 .1a.75.75 0 00-.65.65l-.1 1a.5.5 0 01-.56.47l-1-.2a.75.75 0 00-.86.86l.2 1a.5.5 0 01-.47.56l-1 .1a.75.75 0 00-.65.65l-.1 1a.5.5 0 01-.56.47l-1-.2a.75.75 0 00-.86.86l.2 1a.5.5 0 01-.47.56l-1 .1a.75.75 0 00-.86.86z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </header>
  );
}
