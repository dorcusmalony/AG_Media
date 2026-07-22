/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from './BrandLogo';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  onNavigateToItem?: () => void;
  onSearchClick: () => void;
}

export default function Header({ currentView, setView, onNavigateToItem, onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'work', label: 'Our Work' },
    { id: 'media', label: 'Media & Content' },
    { id: 'services', label: 'Services' },
    { id: 'newsroom', label: 'Newsroom' },
    { id: 'support', label: 'Join & Support' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setMobileMenuOpen(false);
    if (onNavigateToItem) {
      onNavigateToItem();
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sand-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Block - Clear & Prominent */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer group py-1 flex items-center space-x-2"
            id="header-brand-logo"
            title="AG Media - Return to Home"
          >
            <BrandLogo className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-200 group-hover:scale-105" showText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 lg:space-x-1" id="desktop-navigation">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2 lg:px-2.5 xl:px-3.5 py-2 text-xs xl:text-sm font-sans tracking-tight font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-clay-500 font-bold' : 'text-charcoal-900 hover:text-clay-500'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 xl:left-3.5 xl:right-3.5 h-0.5 bg-clay-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center space-x-3 border-l border-sand-200 pl-4">
            <button
              onClick={onSearchClick}
              className="flex items-center space-x-2 px-3.5 py-2 border border-sand-200 hover:border-clay-500 bg-sand-50 hover:bg-clay-50/50 text-charcoal-900 transition-all duration-200 cursor-pointer shadow-2xs group"
              title="Search archives"
              id="header-search-btn-desktop"
            >
              <Search className="w-4 h-4 text-clay-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">Search</span>
            </button>
          </div>

          {/* Mobile Right Container (Search + Menu Toggle) */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 border border-sand-200 bg-sand-50 text-charcoal-900 hover:text-clay-500 focus:outline-hidden cursor-pointer"
              aria-label="Open Search"
              id="header-search-btn-mobile"
            >
              <Search className="w-5 h-5 text-clay-500" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-900 hover:text-clay-500 focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-sand-200 bg-white shadow-lg"
            id="mobile-navigation-drawer"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 text-base font-sans font-medium transition-colors ${
                      isActive 
                        ? 'bg-clay-50 text-clay-500 font-bold border-l-4 border-clay-500' 
                        : 'text-charcoal-900 hover:bg-sand-50 hover:text-clay-500'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
