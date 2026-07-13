"use client";
import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function AvatarDressingRoom() {
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [equipped, setEquipped] = useState<any[]>([]);
  const [currentFilter, setCurrentFilter] = useState('Shirt');

  const syncState = () => {
    fetch(`${API_URL}/avatar/v1/users/1`)
      .then(res => res.json())
      .then(data => {
        setWardrobe(data.inventory || []);
        setEquipped(data.equipped || []);
      })
      .catch(err => console.error("Wardrobe out of sync:", err));
  };

  useEffect(() => { syncState(); }, []);

  const toggleEquipRow = async (assetId: number) => {
    try {
      await fetch(`${API_URL}/avatar/v1/equip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, assetId })
      });
      syncState(); // Mutate and forcefully push re-render frames
    } catch (err) {
      console.error("Mutation failed:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-sans text-xs">
      
      {/* 3D Character Avatar Rig Display Box */}
      <div className="md:col-span-4 bg-[#2b2d2f] border border-[#393b3d] p-4 flex flex-col items-center h-fit">
        <h3 className="font-bold text-white self-start mb-2">Current Avatar</h3>
        <div className="w-full aspect-square bg-[#1c1e20] border border-[#393b3d] flex flex-col items-center justify-center text-5xl relative">
          🧍
          <div className="absolute bottom-2 flex gap-1 justify-center w-full px-2 flex-wrap">
            {equipped.map(item => (
              <span key={item.id} className="bg-[#2b2d2f] text-[9px] font-bold px-1.5 py-0.5 border border-[#555] rounded-sm text-gray-300">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Wardrobe Inventory Grid Panels */}
      <div className="md:col-span-8 bg-[#2b2d2f] border border-[#393b3d] flex flex-col">
        <div className="flex bg-[#1c1e20] border-b border-[#393b3d]">
          {['Shirt', 'Pants', 'Hat'].map(filter => (
            <button
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`px-4 py-2 font-bold transition-all ${currentFilter === filter ? 'bg-[#2b2d2f] text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {filter}s
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto">
          {wardrobe.filter(item => item.asset.assetType === currentFilter).map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleEquipRow(item.asset.id)}
              className="bg-[#1c1e20] border border-[#393b3d] p-2 text-center rounded-sm cursor-pointer hover:border-gray-400 relative"
            >
              <div className="aspect-square bg-[#2b2d2f] mb-1.5 flex items-center justify-center text-xl">📦</div>
              <div className="font-bold text-gray-200 truncate">{item.asset.name}</div>
              {item.isEquipped && (
                <span className="absolute top-1 right-1 bg-[#00B06F] text-[8px] font-black px-1 text-white rounded-sm">EQUIPPED</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
