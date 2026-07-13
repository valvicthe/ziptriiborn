"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  MessageSquare, 
  Users, 
  Accessibility, 
  Briefcase, 
  Repeat, 
  UserRound, 
  MessagesSquare, 
  Download,
  Sparkles
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function Sidebar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>('Loading...');

  // Pull live identity from your active PostgreSQL User table row
  useEffect(() => {
    fetch(`${API_URL}/users/v1/users/1`)
      .then(res => res.json())
      .then(data => setUsername(data.username || 'User'))
      .catch(() => setUsername('ZiptriiUser'));
  }, []);

  // 1:1 Item schema mapping from your reference design image
  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Profile', path: '#', icon: User },
    { name: 'Messages', path: '#', icon: MessageSquare },
    { name: 'Friends', path: '#', icon: Users, notificationCount: 1 },
    { name: 'Avatar', path: '/avatar', icon: Accessibility },
    { name: 'Inventory', path: '#', icon: Briefcase },
    { name: 'Trade', path: '#', icon: Repeat },
    { name: 'Groups', path: '#', icon: UserRound },
    { name: 'Forums', path: '#', icon: MessagesSquare },
    { name: 'Download', path: '#', icon: Download },
  ];

  return (
    <aside className="w-[210px] bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-[calc(100vh-40px)] flex flex-col justify-between p-3 shrink-0 select-none font-sans text-sm">
      <div className="space-y-3">
        
        {/* User Identity Box Layout */}
        <div className="flex items-center gap-2.5 px-2 pb-2">
          <div className="w-7 h-7 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-sm shadow-sm">
            👤
          </div>
          <span className="font-semibold text-white text-[15px] tracking-tight truncate">
            {username}
          </span>
        </div>

        {/* Sharp structural split divider line */}
        <div className="border-t border-[var(--border-color)] w-full" />

        {/* Dynamic Link List Loop */}
        <nav className="space-y-[2px]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm font-medium text-[14px] transition-all group ${
                  isCurrent
                    ? 'bg-[var(--bg-card)] text-white font-bold border-l-2 border-white pl-2.5'
                    : 'text-gray-300 hover:bg-[var(--bg-card)]/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon 
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} 
                    strokeWidth={2.2} 
                  />
                  <span>{item.name}</span>
                </div>

                {/* Dark-theme safe custom counter bubble notification badge */}
                {item.notificationCount && (
                  <span className="bg-[#0055d2] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-sm">
                    {item.notificationCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Styled Call To Action Button Block */}
      <div className="pt-2">
        <button className="w-full bg-[#00B06F] hover:bg-[#00965e] active:scale-[0.99] text-white text-xs font-black uppercase tracking-wider py-2.5 rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-md">
          <Sparkles className="w-3.5 h-3.5" fill="currentColor" />
          <span>Upgrade Now</span>
        </button>
      </div>

    </aside>
  );
}
