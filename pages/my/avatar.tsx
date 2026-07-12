import React, { useState } from 'react';

export const AvatarEditor = ({ userInventory }) => {
  const [currentCategory, setCurrentCategory] = useState('Clothing');
  const [is3DMode, setIs3DMode] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Avatar Editor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Real-time Avatar Render Engine Viewport */}
        <div className="md:col-span-4 bg-[#1c1e20] border border-[#3c3f41] p-4 rounded flex flex-col items-center">
          <div className="w-full aspect-square bg-[#2b2d2f] rounded relative mb-4 flex items-center justify-center">
            {/* Live WebGL character renderer mesh or updated thumbnail snapshot placeholder */}
            <div className="text-center p-4">
              <span className="block text-sm text-gray-400">Character Render Frame</span>
            </div>
            <button 
              onClick={() => setIs3DMode(!is3DMode)}
              className="absolute bottom-3 right-3 bg-[#3c3f41] text-xs px-3 py-1.5 rounded hover:bg-gray-600 uppercase font-bold"
            >
              {is3DMode ? '2D View' : '3D Orbit'}
            </button>
          </div>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-sm font-bold rounded">Redraw Character</button>
        </div>

        {/* Right Side: Inventory Sorting Grid Panels */}
        <div className="md:col-span-8 bg-[#2b2d2f] border border-[#3c3f41] rounded overflow-hidden">
          {/* Sub-Category Sub-Header Selector Nav Bar */}
          <div className="flex bg-[#1c1e20] border-b border-[#3c3f41] text-sm">
            {['Characters', 'Clothing', 'Accessories', 'Animations'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCurrentCategory(cat)}
                className={`px-6 py-3 font-semibold ${currentCategory === cat ? 'bg-[#2b2d2f] border-t-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout Outputting Wearable Asset Box Arrays */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto">
            {userInventory.filter(item => item.category === currentCategory).map((asset) => (
              <div key={asset.id} className="bg-[#1c1e20] border border-[#3c3f41] rounded p-2 text-center relative group cursor-pointer hover:border-gray-400">
                <img src={asset.thumbnailUrl} alt={asset.name} className="w-full aspect-square object-contain rounded bg-[#2b2d2f] mb-2" />
                <div className="text-xs font-semibold truncate px-1 text-gray-200">{asset.name}</div>
                {asset.isEquipped && (
                  <span className="absolute top-2 right-2 bg-green-600 text-[10px] uppercase font-black px-1.5 py-0.5 rounded shadow">WEARING</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
