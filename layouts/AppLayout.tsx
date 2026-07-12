import React, { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import RightNotificationPanel from '../components/panels/RightNotificationPanel';

interface AppLayoutProps {
  children: React.ReactNode;
  user: { username: string; robux: number; userId: number; isAdmin: boolean };
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // 2020 Default Toggle

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#232527] text-white' : 'bg-[#E3E3E3] text-[#393B3D]'} font-sans`}>
      {/* 2020 Fixed Global Top Navigation Header */}
      <Navbar user={user} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex pt-[60px] h-[calc(100vh-60px)] overflow-hidden">
        {/* Collapsible Left Side Menu Wrapper */}
        <Sidebar isOpen={isSidebarOpen} isAdmin={user.isAdmin} />
        
        {/* Dynamic Route Container Box */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 transition-all duration-200">
          <div className="max-w-[1200px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Realtime Messaging/Chat Overlay Platform Hook */}
      <RightNotificationPanel userId={user.userId} />
    </div>
  );
};
