"use client";
import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function DiscoverGames() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/games/v2/discover`)
      .then(res => res.json())
      .then(data => { setPlaces(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#2b2d2f] border border-[#393b3d] p-4 font-sans text-xs">
      <h2 className="text-sm font-bold text-white border-b border-[#393b3d] pb-2 mb-4">Popular</h2>
      
      {loading ? (
        <div className="text-center py-6 text-gray-400 font-bold uppercase tracking-widest">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {places.map(place => (
            <div key={place.id} className="cursor-pointer group flex flex-col gap-1">
              <div className="aspect-square bg-[#1c1e20] border border-[#393b3d] rounded-sm flex items-center justify-center text-4xl group-hover:border-gray-400 transition-colors">
                🎮
              </div>
              <div className="font-bold text-white truncate px-0.5 group-hover:underline">{place.name}</div>
              <div className="text-[10px] text-gray-400 px-0.5 truncate">By {place.creator?.displayName}</div>
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 px-0.5 mt-0.5">
                <span className="text-green-400">👍 {place.upVotes}%</span>
                <span>👥 {place.activeUsers} Active</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
