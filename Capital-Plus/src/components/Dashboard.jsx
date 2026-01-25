// ============================================
// DASHBOARD COMPONENT
// ============================================
// This is the main home page that shows:
// - Welcome message and hero section
// - Monthly income card
// - Recent transactions
// - Currency exchange calculator
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import TransactionCard from './TransactionCard';
import ExchangeCard from './ExchangeCard';

export default function Dashboard() {
  // ============================================
  // STATE VARIABLES
  // ============================================
  // These store the current values that can change
  
  // Amount in Indian Rupees (user can type this)
  const [rupeeAmount, setRupeeAmount] = useState('5.0000');
  
  // Amount in US Dollars (automatically calculated)
  const [dollarAmount, setDollarAmount] = useState('12.00');
  
  // Conversion rate: 1 rupee = 0.012 dollars
  const conversionRate = 0.012;

  // ============================================
  // DATA
  // ============================================
  // List of recent money transactions to display
  const transactionList = [
    { id: 1, name: 'Joel Kenley', amount: -68.00, type: 'Transaction' },
    { id: 2, name: 'Mark Smith', amount: -68.00, type: 'Transaction' },
    { id: 3, name: 'YourBank', amount: -68.00, type: 'Transaction' }
  ];

  // ============================================
  // FUNCTIONS
  // ============================================
  
  // When user types in the rupee input field
  const updateRupeeAmount = (newAmount) => {
    setRupeeAmount(newAmount);
    // Automatically calculate and update dollar amount
    const dollars = parseFloat(newAmount) * conversionRate;
    setDollarAmount(dollars.toFixed(2));
  };

  // When user types in the dollar input field
  const updateDollarAmount = (newAmount) => {
    setDollarAmount(newAmount);
    // Automatically calculate and update rupee amount
    const rupees = parseFloat(newAmount) / conversionRate;
    setRupeeAmount(rupees.toFixed(4));
  };

  // When user clicks the Exchange button
  const doExchange = () => {
    alert(`Exchanging ${rupeeAmount} INR to ${dollarAmount} USD`);
    // TODO: Connect this to backend to actually process the exchange
  };

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="page-bg">
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content container */}
      <div className="page-container">
        <div className="grid-dashboard">
          
          {/* ============================================
              LEFT SIDE: Hero Section
              ============================================ */}
          <div className="flex-col-spaced">
            
            {/* Badge showing benefits */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/30 animate-pulse">
                <span className="text-gray-900 text-xs font-bold">✓</span>
              </div>
              <span className="text-gray-300 font-medium">No LLC Required, No Credit Check.</span>
            </div>

            {/* Main heading */}
            <div>
              <h1 className="heading-hero">
                Welcome to YourBank<br />
                Empowering Your <span className="text-lime-400 text-gradient">Financial<br />Journey</span>
              </h1>
              <p className="text-gray-400 leading-relaxed max-w-lg text-base sm:text-lg">
                At YourBank, our mission is to provide comprehensive banking solutions that empower 
                individuals and businesses to achieve their financial goals. We are committed to delivering 
                personalized and innovative services that prioritize our customers' needs.
              </p>
            </div>

            {/* Call-to-action button */}
            <Link to="/signup" className="btn-primary-large">
              Open Account
            </Link>
          </div>

          {/* ============================================
              RIGHT SIDE: Dashboard Cards
              ============================================ */}
          <div className="space-y-6">
            
            {/* Monthly Income Card */}
            <div className="card relative overflow-hidden">
              {/* Background decoration icon */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <TrendingUp className="w-full h-full text-lime-400" />
              </div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="dot-pulse"></div>
                  <span className="text-2xl font-bold">+ $5000.00</span>
                </div>
                <p className="text-gray-400 text-sm">Monthly Income</p>
              </div>
            </div>

            {/* Recent Transactions Card */}
            <TransactionCard transactions={transactionList} />

            {/* Currency Exchange Card */}
            <ExchangeCard
              rupeeAmount={rupeeAmount}
              dollarAmount={dollarAmount}
              onRupeeChange={updateRupeeAmount}
              onDollarChange={updateDollarAmount}
              onExchangeClick={doExchange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
