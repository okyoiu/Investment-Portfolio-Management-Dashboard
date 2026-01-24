import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import TransactionCard from './TransactionCard';
import ExchangeCard from './ExchangeCard';

export default function Dashboard() {
  const [inrAmount, setInrAmount] = useState('5.0000');
  const [usdAmount, setUsdAmount] = useState('12.00');
  const exchangeRate = 0.012;

  const transactions = [
    { id: 1, name: 'Joel Kenley', amount: -68.00, type: 'Transaction' },
    { id: 2, name: 'Mark Smith', amount: -68.00, type: 'Transaction' },
    { id: 3, name: 'YourBank', amount: -68.00, type: 'Transaction' }
  ];

  const handleInrChange = (value) => {
    setInrAmount(value);
    setUsdAmount((parseFloat(value) * exchangeRate).toFixed(2));
  };

  const handleUsdChange = (value) => {
    setUsdAmount(value);
    setInrAmount((parseFloat(value) / exchangeRate).toFixed(4));
  };

  const handleExchange = () => {
    alert(`Exchanging ${inrAmount} INR to ${usdAmount} USD`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Hero */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                <span className="text-gray-900 text-xs">✓</span>
              </div>
              <span className="text-gray-300">No LLC Required, No Credit Check.</span>
            </div>

            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Welcome to YourBank<br />
                Empowering Your <span className="text-lime-400">Financial<br />Journey</span>
              </h1>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                At YourBank, our mission is to provide comprehensive banking solutions that empower 
                individuals and businesses to achieve their financial goals. We are committed to delivering 
                personalized and innovative services that prioritize our customers' needs.
              </p>
            </div>

            <button className="px-8 py-4 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-300 transition shadow-lg shadow-lime-400/20">
              Open Account
            </button>
          </div>

          {/* Right Section - Dashboard Cards */}
          <div className="space-y-6">
            {/* Income Card */}
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <TrendingUp className="w-full h-full text-lime-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                <span className="text-2xl font-bold">+ $5000.00</span>
              </div>
              <p className="text-gray-400 text-sm">Monthly Income</p>
            </div>

            {/* Transaction Card */}
            <TransactionCard transactions={transactions} />

            {/* Exchange Card */}
            <ExchangeCard
              inrAmount={inrAmount}
              usdAmount={usdAmount}
              onInrChange={handleInrChange}
              onUsdChange={handleUsdChange}
              onExchange={handleExchange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}