import React from 'react';
import { DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';

export default function ExchangeCard({ 
  inrAmount, 
  usdAmount, 
  onInrChange, 
  onUsdChange, 
  onExchange 
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-300 shadow-xl">
      <h3 className="font-semibold mb-6 text-lg">Money Exchange</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* INR Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <IndianRupee className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-200">INR</p>
              <p className="text-xs text-gray-400">Indian Rupee</p>
            </div>
          </div>
          <input
            type="number"
            value={inrAmount}
            onChange={(e) => onInrChange(e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400 transition-all"
            placeholder="0.0000"
          />
        </div>

        {/* USD Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-200">USD</p>
              <p className="text-xs text-gray-400">United States Dollar</p>
            </div>
          </div>
          <input
            type="number"
            value={usdAmount}
            onChange={(e) => onUsdChange(e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      <button 
        onClick={onExchange}
        className="w-full py-3 bg-lime-400/20 text-lime-400 rounded-lg font-semibold hover:bg-lime-400/30 transition-all duration-200 border border-lime-400/30 hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/20"
      >
        Exchange
      </button>

      <div className="mt-4 flex items-center gap-2 justify-center flex-wrap">
        <span className="text-xs text-gray-400">Supported Currency:</span>
        <div className="flex gap-2">
          <DollarSign className="w-4 h-4 text-lime-400 hover:scale-110 transition-transform" />
          <Euro className="w-4 h-4 text-lime-400 hover:scale-110 transition-transform" />
          <PoundSterling className="w-4 h-4 text-lime-400 hover:scale-110 transition-transform" />
          <IndianRupee className="w-4 h-4 text-lime-400 hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}