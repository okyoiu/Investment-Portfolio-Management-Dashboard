// ============================================
// ACCOUNT CARD COMPONENT
// ============================================
// Beautiful account card with hover animations
// Slides out and pops up on hover
// ============================================

import React, { useState } from 'react';
import { Wallet, CreditCard, Building2, PiggyBank, TrendingUp, MoreVertical, Plus } from 'lucide-react';

export default function AccountCard({ 
  account, 
  isSelected, 
  onSelect, 
  onEdit,
  index 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Get icon based on account type
  const getAccountIcon = (type) => {
    switch (type) {
      case 'checking': return Wallet;
      case 'savings': return PiggyBank;
      case 'credit': return CreditCard;
      case 'investment': return TrendingUp;
      default: return Building2;
    }
  };

  // Get color scheme based on account type
  const getAccountColor = (type) => {
    switch (type) {
      case 'checking': return { bg: 'bg-cyan-400/20', border: 'border-cyan-400/50', text: 'text-cyan-400', icon: 'text-cyan-400' };
      case 'savings': return { bg: 'bg-lime-400/20', border: 'border-lime-400/50', text: 'text-lime-400', icon: 'text-lime-400' };
      case 'credit': return { bg: 'bg-purple-400/20', border: 'border-purple-400/50', text: 'text-purple-400', icon: 'text-purple-400' };
      case 'investment': return { bg: 'bg-yellow-400/20', border: 'border-yellow-400/50', text: 'text-yellow-400', icon: 'text-yellow-400' };
      default: return { bg: 'bg-gray-400/20', border: 'border-gray-400/50', text: 'text-gray-400', icon: 'text-gray-400' };
    }
  };

  const Icon = getAccountIcon(account.type);
  const colors = getAccountColor(account.type);

  return (
    <div
      className={`
        relative 
        transition-all duration-300 ease-out
      `}
      style={{
        transform: isHovered 
          ? `translateY(-${Math.min(index * 12, 40)}px) translateX(${Math.min(index * 16, 60)}px)` 
          : 'translateY(0) translateX(0)',
        zIndex: isHovered ? 50 : 10 - index
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(account.id)}
    >
      {/* Glow effect behind card on hover */}
      {isHovered && (
        <div 
          className={`
            absolute -inset-1 
            ${colors.bg.replace('/20', '/10')}
            rounded-lg
            blur-xl
            -z-10
            opacity-75
          `}
        />
      )}
      
      <div
        className={`
          card 
          cursor-pointer 
          border-2
          ${isSelected ? colors.border : 'border-gray-700'}
          ${colors.bg}
          transition-all duration-300 ease-out
          ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
        `}
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px ${colors.border.replace('/50', '/30')}` 
            : undefined
        }}
      >
        {/* Account Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`
              p-3 rounded-lg 
              ${colors.bg}
              border ${colors.border}
            `}>
              <Icon className={`w-5 h-5 ${colors.icon}`} />
            </div>
            <div>
              <h3 className={`
                font-semibold text-lg 
                text-gray-200
              `}>
                {account.name}
              </h3>
              <p className="text-sm text-gray-400">
                {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account.id);
            }}
            className={`
              p-2 rounded-lg 
              hover:bg-gray-700 
              transition-colors
            `}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Account Details - Moved Up */}
        <div className={`
          mb-4 pb-4 border-b border-gray-700
          flex items-center justify-between
        `}>
          <div>
            <p className="text-xs text-gray-500">Account Number</p>
            <p className="text-sm font-medium text-gray-300">
              •••• {account.accountNumber.slice(-4)}
            </p>
          </div>
          {account.bankName && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Bank</p>
              <p className="text-sm font-medium text-gray-300">
                {account.bankName}
              </p>
            </div>
          )}
        </div>

        {/* Account Balance */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Available Balance</p>
          <p 
            className={`
              text-3xl font-bold 
              ${colors.text}
              transition-transform duration-300
            `}
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

      </div>
    </div>
  );
}
