import React from 'react';

export const AdminModerationQueue = ({ queueItems, onResolveAction }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#1c1e20] p-4 rounded border border-red-900/30">
        <div>
          <h1 className="text-xl font-bold text-red-400">Admin Panel</h1>
          <p className="text-xs text-gray-400">asset evaluation queue and user report actions.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#2b2d2f] px-4 py-2 rounded text-center border border-[#3c3f41]">
            <span className="block text-lg font-black text-yellow-500">{queueItems.length}</span>
            <span className="text-[10px] uppercase text-gray-400 font-bold">Pending Tickers</span>
          </div>
        </div>
      </div>

      {/* Asset Evaluation Row List */}
      <div className="space-y-3">
        {queueItems.map((ticket) => (
          <div key={ticket.id} className="bg-[#2b2d2f] border border-[#3c3f41] p-4 rounded flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              {/* Asset Snapshot Thumbnail Box */}
              <div className="w-16 h-16 bg-[#1c1e20] rounded border border-[#3c3f41] overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src={ticket.targetAssetUrl} alt="Inspection Source File" className="max-w-full max-h-full object-contain" />
              </div>
              
              {/* Ticket Details Core Metadata Text Area */}
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold truncate text-white">{ticket.assetName}</span>
                  <span className="text-[10px] font-mono bg-[#1c1e20] text-gray-400 px-1.5 py-0.5 rounded border border-[#3c3f41]">{ticket.type}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Uploaded by: <span className="text-blue-400 cursor-pointer">{ticket.creatorName}</span></p>
                <p className="text-xs text-amber-400 italic truncate">Reason Flagged: "{ticket.flagReason}"</p>
              </div>
            </div>

            {/* Admin Management Button Suite Actions Container */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={() => onResolveAction(ticket.id, 'approve')}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 text-xs font-bold rounded text-white tracking-wider uppercase transition-colors"
              >
                Approve Asset
              </button>
              <button 
                onClick={() => onResolveAction(ticket.id, 'reject')}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-xs font-bold rounded text-white tracking-wider uppercase transition-colors"
              >
                Deny & Scrub
              </button>
              <button 
                onClick={() => onResolveAction(ticket.id, 'ban_user')}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-red-600/50 text-red-400 text-xs font-bold rounded tracking-wider uppercase transition-colors"
              >
                Ban Account
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
