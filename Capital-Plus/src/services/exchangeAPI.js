// ============================================
// EXCHANGE RATE API SERVICE
// ============================================
// This file handles fetching real-time exchange rates
// - Supports multiple fiat currencies
// - Includes Solana and other cryptocurrencies
// - Uses free exchange rate APIs
// ============================================

// Free exchange rate API (no API key needed for basic usage)
// Alternative: You can use exchangerate-api.com, fixer.io, or coinbase API
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Crypto API for Solana and other cryptocurrencies
const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// ============================================
// SUPPORTED CURRENCIES
// ============================================
export const FIAT_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', icon: '💵' },
  { code: 'EUR', name: 'Euro', symbol: '€', icon: '💶' },
  { code: 'GBP', name: 'British Pound', symbol: '£', icon: '💷' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', icon: '💴' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', icon: '💴' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', icon: '💵' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', icon: '💵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', icon: '💴' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', icon: '💵' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', icon: '💵' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', icon: '💵' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', icon: '💴' }
];

export const CRYPTO_CURRENCIES = [
  { code: 'SOL', name: 'Solana', symbol: 'SOL', icon: '🔷' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', icon: '₿' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', icon: 'Ξ' },
  { code: 'USDC', name: 'USD Coin', symbol: 'USDC', icon: '💲' },
  { code: 'USDT', name: 'Tether', symbol: 'USDT', icon: '💲' }
];

// ============================================
// API FUNCTIONS
// ============================================

// Get exchange rates for fiat currencies
export async function getFiatExchangeRates() {
  try {
    const response = await fetch(EXCHANGE_API_URL);
    const data = await response.json();
    
    if (data.rates) {
      // Convert to base USD rates (invert if needed)
      return data.rates;
    }
    throw new Error('Failed to fetch exchange rates');
  } catch (error) {
    console.error('Error fetching fiat rates:', error);
    // Return fallback rates if API fails
    return {
      EUR: 0.92,
      GBP: 0.79,
      INR: 83.0,
      JPY: 149.0,
      CAD: 1.35,
      AUD: 1.52,
      CNY: 7.24,
      CHF: 0.88,
      MXN: 17.0,
      BRL: 4.95,
      KRW: 1320.0
    };
  }
}

// Get cryptocurrency prices in USD
export async function getCryptoPrices() {
  try {
    const cryptoIds = {
      'SOL': 'solana',
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'USDC': 'usd-coin',
      'USDT': 'tether'
    };
    
    const ids = Object.values(cryptoIds).join(',');
    const response = await fetch(`${CRYPTO_API_URL}?ids=${ids}&vs_currencies=usd`);
    const data = await response.json();
    
    // Convert to our format
    const prices = {};
    Object.entries(cryptoIds).forEach(([code, id]) => {
      if (data[id] && data[id].usd) {
        prices[code] = data[id].usd;
      }
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return fallback prices if API fails
    return {
      SOL: 95.0,
      BTC: 42000.0,
      ETH: 2500.0,
      USDC: 1.0,
      USDT: 1.0
    };
  }
}

// Convert amount from one currency to another
export async function convertCurrency(fromCurrency, toCurrency, amount, isCrypto = false) {
  try {
    if (isCrypto) {
      // For crypto, get prices in USD
      const cryptoPrices = await getCryptoPrices();
      const fromPrice = cryptoPrices[fromCurrency] || 1;
      const toPrice = cryptoPrices[toCurrency] || 1;
      
      // Convert: amount * (fromPrice / toPrice)
      return (parseFloat(amount) * fromPrice) / toPrice;
    } else {
      // For fiat, get exchange rates
      const rates = await getFiatExchangeRates();
      
      // If converting to USD
      if (toCurrency === 'USD') {
        // Rate is already in USD base, so divide
        const rate = rates[fromCurrency] || 1;
        return parseFloat(amount) / rate;
      }
      
      // If converting from USD
      if (fromCurrency === 'USD') {
        const rate = rates[toCurrency] || 1;
        return parseFloat(amount) * rate;
      }
      
      // Converting between two non-USD currencies
      const fromRate = rates[fromCurrency] || 1;
      const toRate = rates[toCurrency] || 1;
      // Convert to USD first, then to target currency
      const usdAmount = parseFloat(amount) / fromRate;
      return usdAmount * toRate;
    }
  } catch (error) {
    console.error('Error converting currency:', error);
    return 0;
  }
}

// Get exchange rate between two currencies
export async function getExchangeRate(fromCurrency, toCurrency, isCrypto = false) {
  try {
    if (isCrypto) {
      const cryptoPrices = await getCryptoPrices();
      const fromPrice = cryptoPrices[fromCurrency] || 1;
      const toPrice = cryptoPrices[toCurrency] || 1;
      return fromPrice / toPrice;
    } else {
      const rates = await getFiatExchangeRates();
      
      if (fromCurrency === 'USD') {
        return rates[toCurrency] || 1;
      }
      if (toCurrency === 'USD') {
        return 1 / (rates[fromCurrency] || 1);
      }
      
      // Between two non-USD currencies
      const fromRate = rates[fromCurrency] || 1;
      const toRate = rates[toCurrency] || 1;
      return toRate / fromRate;
    }
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    return 1;
  }
}
