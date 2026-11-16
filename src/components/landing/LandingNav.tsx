import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface LandingNavProps {
  onOpenDemoModal: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onOpenDemoModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-12 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-subtle py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" showTagline={false} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
            <a href="#platform" className="hover:text-forest transition-colors">
              Platform
            </a>
            <a href="#features" className="hover:text-forest transition-colors">
              Features
            </a>
            <a href="#journey" className="hover:text-forest transition-colors">
              How It Works
            </a>
            <a href="#showcase" className="hover:text-forest transition-colors">
              Product Tour
            </a>
            <a href="#pricing" className="hover:text-forest transition-colors">
              Pricing
            </a>
            <Link to="/architecture" className="hover:text-forest text-sage-600 font-semibold transition-colors flex items-center gap-1">
              Architecture
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-2 text-sm font-medium text-charcoal hover:text-forest transition-colors"
            >
              Log In
            </Link>

            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-forest text-white hover:bg-forest-light shadow-subtle hover:shadow-card transition-all"
            >
              <Sparkles className="w-4 h-4 text-linen" />
              <span>Explore Demo</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenDemoModal}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-forest text-white"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:bg-black/5 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white px-6 py-6 shadow-drawer animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-base font-medium text-charcoal">
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-forest py-1"
            >
              Platform
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-forest py-1"
            >
              Features
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-forest py-1"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-forest py-1"
            >
              Pricing
            </a>
            <Link
              to="/architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sage-600 font-semibold py-1"
            >
              Architecture & Audit
            </Link>

            <div className="pt-4 border-t border-border flex flex-col gap-2.5">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-border text-sm font-semibold text-charcoal hover:bg-secondary"
              >
                Log In
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-forest text-white text-center shadow-subtle"
              >
                Explore Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
