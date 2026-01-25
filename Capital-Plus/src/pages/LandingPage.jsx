// ============================================
// LANDING PAGE COMPONENT
// ============================================
// Impressive hero section with animations
// Feature showcase and smooth scroll effects
// ============================================

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Zap, 
  BarChart3,
  DollarSign,
  Lock,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track your spending with beautiful charts and insights'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Bank-level security and data protection'
    },
    {
      icon: TrendingUp,
      title: 'Financial Goals',
      description: 'Set and track your savings goals with progress indicators'
    },
    {
      icon: Zap,
      title: 'AI Insights',
      description: 'Get personalized recommendations powered by AI'
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency',
      description: 'Exchange and track currencies in real-time'
    },
    {
      icon: Lock,
      title: 'Budget Tracking',
      description: 'Stay on budget with smart notifications and alerts'
    }
  ];

  return (
    <div className="page-bg min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className={`
        relative overflow-hidden 
        min-h-screen 
        flex items-center justify-center
      `}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className={`
              absolute top-20 left-10 
              w-72 h-72 
              bg-lime-400/20 
              rounded-full 
              blur-3xl 
              animate-pulse
            `}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div 
            className={`
              absolute bottom-20 right-10 
              w-96 h-96 
              bg-cyan-400/20 
              rounded-full 
              blur-3xl 
              animate-pulse
            `}
            style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
          />
        </div>

        {/* Hero Content */}
        <div className={`
          relative z-10 
          text-center 
          px-4 
          max-w-4xl mx-auto
        `}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className={`
              px-4 py-2 
              bg-lime-400/20 
              text-lime-400 
              rounded-full 
              text-sm font-medium
            `}>
              Hackathon 2026
            </span>
          </div>
          
          <h1 className={`
            text-6xl md:text-7xl 
            font-bold mb-6 
            text-gradient
            animate-fade-in
          `}>
            Capital Plus
          </h1>
          
          <p className={`
            text-xl md:text-2xl 
            text-gray-300 mb-4 
            max-w-2xl mx-auto
          `}>
            Your AI-Powered Financial Management Platform
          </p>
          
          <p className={`
            text-lg 
            text-gray-400 mb-8 
            max-w-xl mx-auto
          `}>
            Track expenses, set goals, get insights, and take control of your finances with intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className={`
                btn-primary 
                px-8 py-4 
                text-lg 
                flex items-center gap-2
                hover:scale-105 
                transition-transform
              `}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className={`
                px-8 py-4 
                bg-gray-700 
                text-gray-200 
                rounded-lg 
                font-medium 
                hover:bg-gray-600 
                transition-all
              `}
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`
          absolute bottom-10 left-1/2 
          transform -translate-x-1/2 
          animate-bounce
        `}>
          <div className={`
            w-6 h-10 
            border-2 border-gray-400 
            rounded-full 
            flex justify-center
          `}>
            <div className={`
              w-1 h-3 
              bg-gray-400 
              rounded-full 
              mt-2
            `} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container py-20">
        <div className="text-center mb-16">
          <h2 className={`
            text-4xl md:text-5xl 
            font-bold mb-4 
            text-gradient
          `}>
            Powerful Features
          </h2>
          <p className={`
            text-xl 
            text-gray-400 
            max-w-2xl mx-auto
          `}>
            Everything you need to manage your finances like a pro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`
                  card 
                  hover:scale-105 
                  transition-all duration-300
                  hover:border-cyan-400/50
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`
                  w-12 h-12 
                  bg-cyan-400/20 
                  rounded-lg 
                  flex items-center justify-center 
                  mb-4
                `}>
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className={`
                  text-xl font-semibold mb-2 
                  text-gray-200
                `}>
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`
        page-container py-20 
        bg-gradient-to-r 
        from-lime-400/10 to-cyan-400/10 
        rounded-3xl 
        my-20
      `}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`
            text-4xl md:text-5xl 
            font-bold mb-6 
            text-gradient
          `}>
            Ready to Transform Your Finances?
          </h2>
          <p className={`
            text-xl 
            text-gray-300 mb-8
          `}>
            Join thousands of users taking control of their financial future
          </p>
          <Link
            to="/signup"
            className={`
              btn-primary 
              px-8 py-4 
              text-lg 
              inline-flex items-center gap-2
              hover:scale-105 
              transition-transform
            `}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
