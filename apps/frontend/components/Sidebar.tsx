import React from 'react';

export default function Sidebar() {
  const links = [
    { name: 'Home', active: true },
    { name: 'Profile', active: false },
    { name: 'Messages', active: false },
    { name: 'Friends', active: false },
    { name: 'Avatar Shop', active: false },
    { name: 'Avatar Editor', active: false },
    { name: 'Inventory', active: false },
    { name: 'Trade', active: false },
    { name: 'Groups', active: false },
    { name: 'Creations', active: false },
  ];

  return (
    <aside className="w-[240px] bg-[#1c1e20] border-r border-[#3c3f41] hidden lg:flex flex-col py-4 h-[calc(100vh-60px)] shrink-0 select-none">
      <nav className="flex-1 px-2 space-y-1">
        {links.map((link) => (
          <button
            key={link.name}
            className={`w-full text-left px-4 py-2.5 rounded text-sm font-semibold tracking-wide transition-all ${
              link.active 
                ? 'bg-[#2b2d2f] text-white border-l-4 border-blue-500 pl-3' 
                : 'text-gray-400 hover:bg-[#2b2d2f]/50 hover:text-white'
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
