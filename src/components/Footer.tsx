/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, FileText, HelpCircle, Check, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [activeModal, setActiveModal] = useState<'editorial' | 'cultural' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid institutional or personal email address.');
      return;
    }
    setSubscribed(true);
    setError('');
    setEmail('');
    // Store in local storage for session integrity
    const existing = JSON.parse(localStorage.getItem('ag_newsletter_signups') || '[]');
    localStorage.setItem('ag_newsletter_signups', JSON.stringify([...existing, { email, date: new Date().toISOString() }]));
  };

  const handleNav = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-900 text-sand-200 border-t-4 border-clay-500 font-sans pt-16 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-sand-200/10">
          
          {/* Brand and Mission Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BrandLogo className="w-10 h-10" showText={false} />
              <span className="font-serif text-lg font-bold tracking-tight text-white">AG MEDIA</span>
            </div>
            <p className="text-xs text-sand-300/85 leading-relaxed">
              An independent, dual-hemisphere media institution dedicated to high-fidelity cultural archiving, civic constitutional literacy, and rigorous documentary production. We operate under strict journalistic guidelines.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-ochre-500 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered Civic Archive</span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase border-b border-sand-200/10 pb-2">
              Directory
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleNav('home')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Home</button>
              <button onClick={() => handleNav('about')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">About Us</button>
              <button onClick={() => handleNav('work')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Our Work</button>
              <button onClick={() => handleNav('media')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Media & Content</button>
              <button onClick={() => handleNav('services')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Services</button>
              <button onClick={() => handleNav('newsroom')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Newsroom</button>
              <button onClick={() => handleNav('support')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Join & Support</button>
              <button onClick={() => handleNav('contact')} className="text-left text-sand-300 hover:text-clay-500 transition-colors cursor-pointer">Contact</button>
            </div>
          </div>

          {/* Bilateral Desks / Coordinates */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase border-b border-sand-200/10 pb-2">
              Bilateral Desks
            </h4>
            <div className="space-y-3 text-xs text-sand-300/90">
              <div>
                <p className="font-semibold text-ochre-500 uppercase tracking-wider text-[10px]">Homeland Headquarters</p>
                <p className="mt-0.5">Juba, Central Equatoria, South Sudan</p>
                <p className="text-[10px] text-sand-300/60">Liaison Area: Hai Jalaba Civic Block</p>
              </div>
              <div>
                <p className="font-semibold text-ochre-500 uppercase tracking-wider text-[10px]">Australian Secretariat</p>
                <p className="mt-0.5">Melbourne Desk, Victoria, Australia</p>
                <p className="text-[10px] text-sand-300/60">Liaison Area: RMIT District & Diaspora hub</p>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase border-b border-sand-200/10 pb-2">
              Official Bulletin
            </h4>
            <p className="text-xs text-sand-300/80 leading-relaxed">
              Register to receive our quarterly journal, field summaries, and priority documentary announcements. No commercial advertising.
            </p>
            {subscribed ? (
              <div className="bg-charcoal-950 border border-ochre-500 p-3 flex items-start space-x-2.5">
                <div className="bg-ochre-500/20 p-1 rounded-none text-ochre-500">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Institutional Register Updated</p>
                  <p className="text-[10px] text-sand-300/60">Check your inbox for official confirmation.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="official@institution.org"
                    className="w-full bg-charcoal-950 border border-sand-200/10 focus:border-clay-500 focus:outline-hidden text-xs text-white px-3 py-2.5 pr-10"
                    aria-label="Email address for bulletin"
                  />
                  <button
                    type="submit"
                    className="absolute right-0.5 top-0.5 bottom-0.5 px-2 bg-clay-500 hover:bg-clay-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Submit bulletin registration"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-[10px] text-red-400">{error}</p>}
              </form>
            )}
          </div>

        </div>

        {/* Legal & Editorial Standard Notice */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-sand-300/50 space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-1">
            <p>© {new Date().getFullYear()} AG Media Group. All rights reserved under British-Australian and South Sudanese legal jurisdictions.</p>
            <p className="flex items-center space-x-2">
              <span className="bg-charcoal-950 text-ochre-500 px-1.5 py-0.5 text-[9px] uppercase font-bold">Standard of Trust</span>
              <span>Content curated in compliance with AS 4825-2023 Digital Archiving Guidelines.</span>
            </p>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => setActiveModal('editorial')} className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer">
              <FileText className="w-3.5 h-3.5 text-clay-500" />
              <span>Editorial Code</span>
            </button>
            <button onClick={() => setActiveModal('cultural')} className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5 text-clay-500" />
              <span>Cultural Protocol</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs" onClick={() => setActiveModal(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-sand-200 p-6 md:p-8 max-w-lg w-full text-charcoal-900 shadow-xl space-y-4 relative rounded-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1.5 text-charcoal-900/40 hover:text-clay-500 hover:bg-sand-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === 'editorial' ? (
                <div className="space-y-4 font-sans">
                  <p className="text-[10px] text-clay-500 font-bold uppercase tracking-widest leading-none">Sovereign Standard</p>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">AG Media Editorial Code</h3>
                  <div className="text-xs text-charcoal-900/80 space-y-3 leading-relaxed">
                    <p><strong>1. Absolute Narrative Sovereignty:</strong> We protect and preserve direct, uncompromised community voices against external stereotyping or media dilution.</p>
                    <p><strong>2. Dual-Source Historical Cross-Verification:</strong> All oral testimonies, customary law judgments, and historical archives are cross-verified by regional elders and academic experts before distribution.</p>
                    <p><strong>3. Dignified, Trauma-Informed Representation:</strong> We eschew sensationalist, trauma-focused visuals, depicting South Sudanese people with cultural sovereignty, dignity, and agency.</p>
                    <p><strong>4. Multilingual Public Access:</strong> Archives and constitutional guidelines are made free and accessible to youth, educators, and community councils in both local languages and English.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-sans">
                  <p className="text-[10px] text-ochre-500 font-bold uppercase tracking-widest leading-none">Digital Conservation</p>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">Cultural & Archival Protocol</h3>
                  <div className="text-xs text-charcoal-900/80 space-y-3 leading-relaxed">
                    <p><strong>Custody & Ownership:</strong> All cultural media, recordings, and transcription materials collected by AG Media remain the permanent intellectual property of the originating community trusts and councils of elders.</p>
                    <p><strong>Long-term Metadata Integrity:</strong> Metadata is fully structured using the Dublin Core standard to enable seamless cataloguing, safe offline recovery, and long-term search preservation.</p>
                    <p><strong>Respect for Taboos:</strong> Field recordists are fully trained to recognize and respect regional taboos, traditional rest periods, and family permissions prior to any digital recording.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
