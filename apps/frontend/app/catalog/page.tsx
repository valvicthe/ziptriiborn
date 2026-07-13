"use client";
import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-ziptrii.up.railway.app';

export default function CatalogShop() {
  const [assets, setAssets] = useState<any[]>([]);
  const [currentType, setCurrentType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/catalog/v1/search?type=${currentType}`)
      .then(res => res.json())
      .then(data => { setAssets(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [currentType]);

  return (
    <div className="flex gap-4 font-sans text-xs">
      {/* Category Side Rails */}
      <div className="w-[150px] shrink-0 bg-[#2b2d2f] border border-[#393b3d] p-2 h-fit space-y-0.5">
        <h3 className="font-bold text-white px-2 pb-1.5 border-b border-[#393b3d] mb-1.5">Category</h3>
        {['All', 'Shirt', 'Pants', 'Hat'].map(type => (
          <button 
            key={type}
            onClick={() => { setCurrentType(type); setLoading(true); }}
            className={`w-full text-left px-2 py-1.5 rounded-sm font-semibold ${currentType === type ? 'bg-[#1c1e20] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {type}s
          </button>
        ))}
      </div>

      {/* Main Asset Canvas Display */}
      <div className="flex-1 bg-[#2b2d2f] border border-[#393b3d] p-4">
        <h2 className="text-sm font-bold text-white mb-4 border-b border-[#393b3d] pb-2">Catalog (BETA) ({currentType})</h2>
        
        {loading ? (
          <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {assets.map(asset => (
              <div key={asset.id} className="bg-[#1c1e20] border border-[#393b3d] p-2 hover:border-gray-400 cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="aspect-square bg-[#2b2d2f] border border-[#393b3d] flex items-center justify-center text-3xl mb-1.5">
                    {asset.assetType === 'Shirt' ? '👕' : asset.assetType === 'Hat' ? '👒' : '👖'}
                  </div>
                  <div className="font-bold text-white truncate px-0.5">{asset.name}</div>
                </div>
                <div className="flex items-center gap-1 mt-2 px-0.5 font-bold">
                  <svg className="w-3 h-3 text-white fill-current transform rotate-[15deg]" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm5 5v6h6V9H9z" /></svg>
                  <span className="text-white text-[11px]">{asset.priceRobux}</span>
                  {asset.isLimited && <span className="ml-auto bg-[#9c27b0] text-[8px] font-black px-1 rounded-sm text-white">LIMITED</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
