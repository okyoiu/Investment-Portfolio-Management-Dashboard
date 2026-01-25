// ============================================
// EXCHANGE CARD COMPONENT
// ============================================
// This component shows a currency exchange calculator
// - User can enter amount in Rupees or Dollars
// - Automatically converts between the two
// - Has an Exchange button to process the exchange
// ============================================

import React from 'react';
import { DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';

export default function ExchangeCard({ 
  rupeeAmount,      // Current amount in Indian Rupees
  dollarAmount,     // Current amount in US Dollars
  onRupeeChange,    // Function to call when user changes rupee amount
  onDollarChange,   // Function to call when user changes dollar amount
  onExchangeClick   // Function to call when user clicks Exchange button
}) {
  return (
    <div className="card">
      {/* Card title */}
      <h3 className="font-semibold mb-6 text-lg">Money Exchange</h3>
      
      {/* Currency input fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        
        {/* ============================================
            INDIAN RUPEE (INR) INPUT
            ============================================ */}
        <div>
          {/* Currency label with icon */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <IndianRupee className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-200">INR</p>
              <p className="text-xs text-gray-400">Indian Rupee</p>
            </div>
          </div>
          
          {/* Amount input field */}
          <input
            type="number"
            value={rupeeAmount}
            onChange={(event) => onRupeeChange(event.target.value)}
            className="input-number"
            placeholder="0.0000"
          />
        </div>

        {/* ============================================
            US DOLLAR (USD) INPUT
            ============================================ */}
        <div>
          {/* Currency label with icon */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-200">USD</p>
              <p className="text-xs text-gray-400">United States Dollar</p>
            </div>
          </div>
          
          {/* Amount input field */}
          <input
            type="number"
            value={dollarAmount}
            onChange={(event) => onDollarChange(event.target.value)}
            className="input-number"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Exchange button */}
      <button onClick={onExchangeClick} className="btn-secondary">
        Exchange
      </button>

      {/* Supported currencies display */}
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
