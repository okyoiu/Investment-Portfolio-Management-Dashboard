// ============================================
// EXCHANGE CARD COMPONENT
// ============================================
// This component shows a multi-currency exchange calculator
// - Supports multiple fiat currencies (USD, EUR, GBP, INR, etc.)
// - Supports cryptocurrencies (Solana, Bitcoin, Ethereum, etc.)
// - Uses real-time exchange rates from APIs
// - Converts any currency to USD or between any currencies
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Euro, 
  PoundSterling, 
  IndianRupee,
  RefreshCw,
  ArrowLeftRight
} from 'lucide-react';
import { 
  FIAT_CURRENCIES, 
  CRYPTO_CURRENCIES,
  convertCurrency,
  getExchangeRate
} from '../services/exchangeAPI';

export default function ExchangeCard() {
  // ============================================
  // STATE VARIABLES
  // ============================================
  
  // Selected currencies
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  
  // Amounts
  const [fromAmount, setFromAmount] = useState('100');
  const [toAmount, setToAmount] = useState('0');
  
  // Exchange rate
  const [exchangeRate, setExchangeRate] = useState(0);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Currency type (fiat or crypto)
  const [currencyType, setCurrencyType] = useState('fiat'); // 'fiat' or 'crypto'
  
  // All available currencies
  const allCurrencies = currencyType === 'fiat' ? FIAT_CURRENCIES : CRYPTO_CURRENCIES;

  // ============================================
  // FUNCTIONS
  // ============================================

  // Update exchange rate when currencies change
  useEffect(() => {
    updateExchangeRate();
  }, [fromCurrency, toCurrency, currencyType]);

  // Update exchange rate
  const updateExchangeRate = async () => {
    setIsLoading(true);
    try {
      const rate = await getExchangeRate(
        fromCurrency, 
        toCurrency, 
        currencyType === 'crypto'
      );
      setExchangeRate(rate);
      
      // Auto-convert current amount
      if (fromAmount) {
        convertFromAmount(fromAmount);
      }
    } catch (error) {
      console.error('Error updating exchange rate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert from amount
  const convertFromAmount = async (amount) => {
    if (!amount || amount === '') {
      setToAmount('0');
      return;
    }

    setIsLoading(true);
    try {
      const converted = await convertCurrency(
        fromCurrency,
        toCurrency,
        amount,
        currencyType === 'crypto'
      );
      setToAmount(converted.toFixed(4));
    } catch (error) {
      console.error('Error converting currency:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle from amount change
  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    convertFromAmount(value);
  };

  // Handle to amount change (reverse conversion)
  const handleToAmountChange = async (value) => {
    setToAmount(value);
    if (!value || value === '') {
      setFromAmount('0');
      return;
    }

    setIsLoading(true);
    try {
      const converted = await convertCurrency(
        toCurrency,
        fromCurrency,
        value,
        currencyType === 'crypto'
      );
      setFromAmount(converted.toFixed(4));
    } catch (error) {
      console.error('Error converting currency:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  // Get currency icon
  const getCurrencyIcon = (code) => {
    const currency = allCurrencies.find(c => c.code === code);
    return currency?.icon || '💵';
  };

  // Get currency name
  const getCurrencyName = (code) => {
    const currency = allCurrencies.find(c => c.code === code);
    return currency?.name || code;
  };

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="card">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`
          font-semibold text-lg 
          text-gray-200
        `}>
          Currency Exchange
        </h3>
        <button
          onClick={updateExchangeRate}
          className={`
            p-2 rounded-lg 
            hover:bg-gray-700/50 
            transition-colors
            ${isLoading ? 'animate-spin' : ''}
          `}
          disabled={isLoading}
        >
          <RefreshCw className={`
            w-4 h-4 
            text-gray-400
          `} />
        </button>
      </div>

      {/* Currency Type Selector */}
      <div className={`
        flex gap-2 mb-4 
        p-1 
        bg-gray-700/50 
        rounded-lg
      `}>
        <button
          onClick={() => {
            setCurrencyType('fiat');
            setFromCurrency('INR');
            setToCurrency('USD');
          }}
          className={`
            flex-1 py-2 px-3 rounded-lg 
            text-sm font-medium 
            transition-all
            ${currencyType === 'fiat' 
              ? 'bg-lime-400 text-gray-900' 
              : 'text-gray-400 hover:text-gray-200'}
          `}
        >
          Fiat Currency
        </button>
        <button
          onClick={() => {
            setCurrencyType('crypto');
            setFromCurrency('SOL');
            setToCurrency('USD');
          }}
          className={`
            flex-1 py-2 px-3 rounded-lg 
            text-sm font-medium 
            transition-all
            ${currencyType === 'crypto' 
              ? 'bg-lime-400 text-gray-900' 
              : 'text-gray-400 hover:text-gray-200'}
          `}
        >
          Cryptocurrency
        </button>
      </div>

      {/* From Currency */}
      <div className="mb-4">
        <label className={`
          block text-sm font-medium mb-2 
          text-gray-300
        `}>
          From
        </label>
        <div className="flex gap-2">
          {/* Currency Selector */}
          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              convertFromAmount(fromAmount);
            }}
            className={`
              px-3 py-2 
              bg-gray-700/50 
              border border-gray-600 
              rounded-lg 
              text-white 
              focus:outline-none 
              focus:ring-2 focus:ring-lime-400/50
            `}
          >
            {allCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.icon} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Amount Input */}
        <input
          type="number"
          value={fromAmount}
          onChange={(e) => handleFromAmountChange(e.target.value)}
          className={`
            w-full mt-2 
            input-number
          `}
          placeholder="0.00"
          step="0.01"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={swapCurrencies}
          className={`
            p-2 rounded-full 
            bg-gray-700/50 
            hover:bg-gray-700 
            transition-all
          `}
        >
          <ArrowLeftRight className={`
            w-5 h-5 
            text-gray-400
          `} />
        </button>
      </div>

      {/* To Currency */}
      <div className="mb-6">
        <label className={`
          block text-sm font-medium mb-2 
          text-gray-300
        `}>
          To
        </label>
        <div className="flex gap-2">
          {/* Currency Selector */}
          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              convertFromAmount(fromAmount);
            }}
            className={`
              px-3 py-2 
              bg-gray-700/50 
              border border-gray-600 
              rounded-lg 
              text-white 
              focus:outline-none 
              focus:ring-2 focus:ring-lime-400/50
            `}
          >
            {allCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.icon} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Amount Input */}
        <input
          type="number"
          value={toAmount}
          onChange={(e) => handleToAmountChange(e.target.value)}
          className={`
            w-full mt-2 
            input-number
          `}
          placeholder="0.00"
          step="0.01"
          readOnly={isLoading}
        />
      </div>

      {/* Exchange Rate Display */}
      {exchangeRate > 0 && (
        <div className={`
          p-3 mb-4 
          bg-gray-700/30 
          rounded-lg 
          text-center
        `}>
          <p className={`
            text-xs text-gray-400 mb-1
          `}>
            Exchange Rate
          </p>
          <p className={`
            text-sm font-semibold 
            text-lime-400
          `}>
            1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
          </p>
        </div>
      )}

      {/* Exchange Button */}
      <button 
        onClick={() => {
          alert(`Exchanging ${fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`);
        }}
        className={`
          btn-secondary 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={isLoading}
      >
        {isLoading ? 'Converting...' : 'Exchange'}
      </button>

      {/* Supported Currencies Info */}
      <div className={`
        mt-4 pt-4 
        border-t border-gray-700 
        text-center
      `}>
        <p className={`
          text-xs text-gray-500 mb-2
        `}>
          {currencyType === 'fiat' 
            ? `Supports ${FIAT_CURRENCIES.length} fiat currencies` 
            : `Supports ${CRYPTO_CURRENCIES.length} cryptocurrencies including Solana`}
        </p>
        <p className={`
          text-xs 
          text-gray-600
        `}>
          Real-time rates • Updated automatically
        </p>
      </div>
    </div>
  );
}
