"use client";
import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/users/v1/users/1`).then(res => res.json()),
      fetch(`${API_URL}/friends/v1/users/1/friends`).then(res => res.json())
    ])
    .then(([profileData, friendsData]) => {
      setProfile(profileData);
      setFriends(friendsData.data || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-xs text-center font-bold text-gray-400 py-12 uppercase tracking-widest">Loading...</div>;

  return (
    <div className="space-y-4 max-w-[900px] mx-auto font-sans text-xs">
      
      {/* 2020 User Details Wrapper Banner */}
      <div className="flex items-center gap-4 bg-[#2b2d2f] p-4 border border-[#393b3d]">
        <div className="w-14 h-14 rounded-full bg-[#1c1e20] border border-[#555] flex items-center justify-center text-xl relative">
          👤
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00B06F] rounded-full border-2 border-[#2b2d2f]" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">
            {profile?.displayName} <span className="text-xs text-gray-400 font-normal">@{profile?.username}</span>
          </h1>
          <p className="text-gray-400 mt-0.5 italic text-[11px]">"{profile?.description}"</p>
        </div>
      </div>

      {/* Friends Horizontal Connection List */}
      <div className="bg-[#2b2d2f] border border-[#393b3d]">
        <div className="px-4 py-2 border-b border-[#393b3d] font-bold text-white">
          Friends ({friends.length})
        </div>
        <div className="p-4 flex gap-6 overflow-x-auto">
          {friends.length === 0 ? (
            <div className="text-gray-500 py-1">Add some Friends to see their current activity!</div>
          ) : (
            friends.map((friend) => (
              <div key={friend.id} className="flex flex-col items-center gap-1 min-w-[65px]">
                <div className="w-11 h-11 rounded-full bg-[#1c1e20] border border-[#393b3d] flex items-center justify-center text-lg relative">
                  👤
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00B06F] rounded-full border border-[#2b2d2f]" />
                </div>
                <span className="font-semibold text-gray-200 text-center truncate w-full">{friend.displayName}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
