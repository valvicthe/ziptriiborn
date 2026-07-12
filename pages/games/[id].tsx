import React, { useState } from 'react';

export const GameProfilePage = ({ gameData }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'store' | 'servers'>('about');

  const handlePlayClick = () => {
    // Revival Protocol Handler Launch Hook
    window.location.href = `ziptrii-player://launch/${gameData.id}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#2b2d2f] p-6 rounded-md shadow-md border border-[#3c3f41]">
      {/* Left Column: Media Panel & Interaction Details */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold font-sans tracking-wide">{gameData.title}</h1>
        <p className="text-sm text-gray-400">By <span className="text-blue-400 cursor-pointer hover:underline">{gameData.creatorName}</span></p>
        
        <div className="aspect-video bg-black w-full rounded relative overflow-hidden group border border-[#1b1c1e]">
          <img src={gameData.thumbnailUrl} alt="Game Showcase" className="w-full h-full object-cover" />
        </div>

        {/* 2020 Tab Control Bar */}
        <div className="flex border-b border-[#3c3f41] gap-6 text-sm font-semibold">
          {['about', 'store', 'servers'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 uppercase tracking-wider ${activeTab === tab ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Context Container */}
        <div className="py-4">
          {activeTab === 'about' && <p className="text-gray-300 leading-relaxed whitespace-pre-line">{gameData.description}</p>}
          {activeTab === 'store' && <div className="grid grid-cols-4 gap-4">{/* Gamepass mappings hook */}</div>}
          {activeTab === 'servers' && <div className="space-y-2">{/* Server allocation instances */}</div>}
        </div>
      </div>

      {/* Right Column: Interaction Controls & System Tallies */}
      <div className="bg-[#1c1e20] p-6 rounded-md flex flex-col justify-between border border-[#2b2d2f] h-fit">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-[#2b2d2f] pb-3">
            <span className="text-gray-400">Active Explorers</span>
            <span className="font-bold text-green-400">{gameData.activePlayers}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-[#2b2d2f] pb-3">
            <span className="text-gray-400">Total Visits</span>
            <span className="font-bold">{gameData.visits.toLocaleString()}</span>
          </div>
        </div>

        {/* 2020 Large Bright Green Play System Launch Trigger Button */}
        <button 
          onClick={handlePlayClick}
          className="w-full mt-6 bg-[#02b757] hover:bg-[#029e4b] active:scale-[0.99] text-white text-2xl font-bold py-4 rounded shadow-lg transition-all flex items-center justify-center gap-3 group"
        >
          <span>Play</span>
        </button>
      </div>
    </div>
  );
};
