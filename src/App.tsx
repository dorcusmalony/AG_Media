/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OurWorkView from './components/OurWorkView';
import MediaView from './components/MediaView';
import ServicesView from './components/ServicesView';
import NewsroomView from './components/NewsroomView';
import SearchModal from './components/SearchModal';
import { Project, Article } from './types';
import { PROJECTS_DATA, ARTICLES_DATA, FOUNDER_DATA, TEAM_MEMBERS_DATA } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Landmark, ChevronRight, Video, Calendar, ShieldCheck, Mail, Send, CheckCircle2, Bookmark, Globe, MessageSquare, Heart, Info, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigateToSearchItem = (type: string, item: any) => {
    if (type === 'project') {
      setSelectedProject(item as Project);
      setView('work');
    } else if (type === 'article') {
      setSelectedArticle(item as Article);
      setView('newsroom');
    } else if (type === 'video' || type === 'podcast') {
      setView('media');
      // Set autoplay/active item in local storage and trigger custom event
      localStorage.setItem('ag_media_autoplay_id', item.id);
      window.dispatchEvent(new CustomEvent('ag-media-autoplay', { detail: { id: item.id } }));
    } else if (type === 'service') {
      setView('services');
      // Wait for layout to mount and scroll to target card
      setTimeout(() => {
        const element = document.getElementById(`service-card-${item.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactInquiryType, setContactInquiryType] = useState('Civic Partnership');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [loggedContacts, setLoggedContacts] = useState<any[]>([]);

  // Join Support Form states
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPath, setSupportPath] = useState('Institutional Sponsorship');
  const [supportPledge, setSupportPledge] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [loggedPledges, setLoggedPledges] = useState<any[]>([]);

  // Load submissions from session memory
  useEffect(() => {
    const savedContacts = localStorage.getItem('ag_contact_inquiries');
    if (savedContacts) setLoggedContacts(JSON.parse(savedContacts));

    const savedPledges = localStorage.getItem('ag_support_pledges');
    if (savedPledges) setLoggedPledges(JSON.parse(savedPledges));
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    const newInquiry = {
      id: Math.random().toString(),
      name: contactName,
      email: contactEmail,
      org: contactOrg || 'Independent Practitioner',
      type: contactInquiryType,
      message: contactMessage,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updated = [newInquiry, ...loggedContacts];
    setLoggedContacts(updated);
    localStorage.setItem('ag_contact_inquiries', JSON.stringify(updated));

    // Reset Form
    setContactName('');
    setContactEmail('');
    setContactOrg('');
    setContactMessage('');
    setContactSuccess(true);

    setTimeout(() => {
      setContactSuccess(false);
    }, 6000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportPledge) return;

    const newPledge = {
      id: Math.random().toString(),
      name: supportName,
      email: supportEmail,
      path: supportPath,
      pledge: supportPledge,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updated = [newPledge, ...loggedPledges];
    setLoggedPledges(updated);
    localStorage.setItem('ag_support_pledges', JSON.stringify(updated));

    // Reset Form
    setSupportName('');
    setSupportEmail('');
    setSupportPledge('');
    setSupportSuccess(true);

    setTimeout(() => {
      setSupportSuccess(false);
    }, 6000);
  };

  const navigateToView = (view: string, resetSubSelection: boolean = true) => {
    setView(view);
    if (resetSubSelection) {
      setSelectedProject(null);
      setSelectedArticle(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-sand-50 selection:bg-clay-100 selection:text-clay-500">
      {/* Universal Sticky Navigation */}
      <Header 
        currentView={currentView} 
        setView={(v) => navigateToView(v)} 
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Global Search Interface */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigateToItem={handleNavigateToSearchItem} 
      />

      {/* Main Interactive Stage */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id="view-transition-wrapper"
          >
            {/* =================== VIEW: HOME =================== */}
            {currentView === 'home' && (
              <div className="space-y-20 pb-20" id="home-view">
                {/* Hero section */}
                <section className="bg-ochre-500 text-sand-50 py-24 border-b-8 border-clay-500" id="home-hero">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-8 space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold font-sans text-sand-300">
                          <Scale className="w-3.5 h-3.5 shrink-0 text-clay-500" />
                          <span>AN INDEPENDENT SOUTH SUDANESE-AUSTRALIAN COALITION</span>
                        </div>
                        
                        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none text-white uppercase text-balance">
                          Architecting <br />
                          <span className="text-clay-500 font-black italic">Narrative Sovereignty</span>
                        </h1>
                        
                        <p className="font-sans text-sm md:text-base leading-relaxed text-sand-100/90 max-w-2xl font-light">
                          AG Media is a serious media, communications, and cultural documentation platform. Combining Australian professional media standards with South Sudanese oral heritage, we deliver high-fidelity archives, constitutional literacy programmes, and rigorous documentary films. We speak with journalistic clarity and ancestral memory.
                        </p>
                        
                        {/* Call To Actions */}
                        <div className="flex flex-wrap gap-4 pt-4 font-sans">
                          <button
                            onClick={() => navigateToView('work')}
                            className="bg-clay-500 hover:bg-clay-600 text-white px-8 py-3 rounded-none text-[11px] uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                          >
                            <span>Examine Archives</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => navigateToView('media')}
                            className="bg-white/10 hover:bg-white/15 text-white border border-sand-200/20 px-8 py-3 rounded-none text-[11px] uppercase tracking-widest font-bold transition-all cursor-pointer"
                          >
                            Watch Flagship Footage
                          </button>

                          <button
                            onClick={() => navigateToView('newsroom')}
                            className="bg-transparent hover:text-clay-500 text-sand-100 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer underline decoration-clay-500 underline-offset-4"
                          >
                            Read Legal Monographs
                          </button>
                        </div>
                      </div>

                      {/* Side Stat Block / Aesthetic Accent */}
                      <div className="lg:col-span-4 bg-charcoal-900 border border-sand-200/10 p-8 space-y-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-clay-500/10 rounded-full blur-2xl"></div>
                        <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-clay-500 border-b border-sand-200/10 pb-2">
                          Institutional Audits
                        </h3>
                        <div className="space-y-4 font-sans">
                          <div>
                            <p className="text-[10px] text-sand-300/50 uppercase tracking-widest">Digital Conservation</p>
                            <p className="text-xl font-bold text-white mt-0.5">140+ Hours</p>
                            <p className="text-[10px] text-sand-300/70">Of high-fidelity ancestral oral legal systems archived</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-sand-300/50 uppercase tracking-widest">Public Outreach</p>
                            <p className="text-xl font-bold text-white mt-0.5">400+ Youth</p>
                            <p className="text-[10px] text-sand-300/70">Connected across Melbourne-Juba dialogue streams</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-sand-300/50 uppercase tracking-widest">Editorial Standard</p>
                            <p className="text-xl font-bold text-clay-500 mt-0.5">AS 4825-2023</p>
                            <p className="text-[10px] text-sand-300/70">Compliance rating for digital legal preservation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Core Pillars Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="home-pillars">
                  <div className="text-center space-y-2 max-w-2xl mx-auto">
                    <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Rigour & Authority</p>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-900">The Foundations of AG Media</h2>
                    <p className="text-xs text-charcoal-900/80 font-sans leading-relaxed">
                      We reject casual blogging, commercial influencers, and short-term advocacy. Our operations are anchored upon three verified pillars.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white border border-sand-200 p-8 space-y-4 shadow-2xs">
                      <div className="w-10 h-10 bg-clay-500/10 text-clay-500 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-charcoal-900">Narrative Defense</h3>
                      <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                        Establishing permanent domestic and diaspora ownership of South Sudan's history. We gather firsthand oral precedents, preventing foreign distortion and narrative exploitation.
                      </p>
                    </div>

                    <div className="bg-white border border-sand-200 p-8 space-y-4 shadow-2xs">
                      <div className="w-10 h-10 bg-clay-500/10 text-clay-500 flex items-center justify-center">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-charcoal-900">Constitutional Literacy</h3>
                      <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                        Democratising constitutional drafting knowledge. We translate abstract statutory frameworks into local languages and culturally resonant metaphors.
                      </p>
                    </div>

                    <div className="bg-white border border-sand-200 p-8 space-y-4 shadow-2xs">
                      <div className="w-10 h-10 bg-sand-50 border border-sand-200 text-charcoal-900 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-charcoal-900">Bilateral Standards</h3>
                      <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                        Adhering to strict Australian media guidelines and metadata preservation rules, ensuring all records hold rigorous legal and academic weight.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Flagship Documentary Spotlight banner */}
                <section className="bg-sand-50 border-y border-sand-200 py-16" id="home-featured-doc">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-5 h-80 overflow-hidden relative border border-sand-200 grayscale shadow-md">
                        <img 
                          src="https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=800&h=600" 
                          alt="White Nile Sunset" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-clay-500 text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1">
                          Cinema Spotlight
                        </div>
                      </div>

                      <div className="lg:col-span-7 space-y-5">
                        <p className="text-[10px] text-clay-500 font-bold uppercase tracking-widest font-sans">Flagship Documentary Project</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-900 leading-tight">
                          The River of Return: Post-Conflict Resettlement
                        </h2>
                        <p className="text-xs text-charcoal-900/90 leading-relaxed font-sans">
                          Our landmark 18-month documentary captures the intimate realities of voluntary repatriation along the Nile basin. It documents customary land arbitration, agricultural revival, and the preservation of legal integrity in remote rural districts.
                        </p>
                        <div className="pt-2 font-sans">
                          <button
                            onClick={() => {
                              setSelectedProject(PROJECTS_DATA[0]);
                              navigateToView('work', false);
                            }}
                            className="bg-charcoal-900 hover:bg-clay-500 text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all inline-flex items-center space-x-2 cursor-pointer"
                          >
                            <span>Examine Project Ledger</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Latest Editorials section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="home-editorials">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-sand-200 pb-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">The Intellectual Front</p>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal-900">Recent Publications & Monographs</h2>
                    </div>
                    <button
                      onClick={() => navigateToView('newsroom')}
                      className="text-xs font-sans font-bold text-clay-500 uppercase tracking-wider hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Access Newsroom Archive</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ARTICLES_DATA.slice(0, 2).map((article) => (
                      <div 
                        key={article.id} 
                        className="bg-white border border-sand-200 p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:border-clay-500 transition-colors cursor-pointer group"
                        onClick={() => {
                          setSelectedArticle(article);
                          navigateToView('newsroom', false);
                        }}
                      >
                        <div className="space-y-3">
                          <span className="bg-sand-50 border border-sand-200 text-clay-500 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 font-sans">
                            {article.category}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-clay-500 transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs text-charcoal-900/80 font-sans leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-sand-200/50 flex justify-between items-center text-[10px] font-sans">
                          <span className="text-charcoal-900/50">By {article.author}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-charcoal-900/50 mr-2">{article.readTime}</span>
                            <span className="text-clay-500 font-bold uppercase tracking-wider text-[10px] group-hover:underline flex items-center space-x-1">
                              <span>Read More</span>
                              <span>→</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* =================== VIEW: ABOUT US =================== */}
            {currentView === 'about' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="about-view">
                
                {/* Section Header */}
                <div className="border-b border-sand-200 pb-6 space-y-3">
                  <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Institutional Genealogy</p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
                    About AG Media
                  </h1>
                  <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
                    Striving to protect ancestral memory with absolute newsroom discipline. Our mission is to document culture and foster constitutional literacy under rigorous intellectual custody.
                  </p>
                </div>

                {/* Core Mission & Narrative */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8 space-y-6">
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-charcoal-900">
                      Bridging High-Fidelity Capture with Sovereign Custody
                    </h2>
                    <div className="font-serif text-base leading-relaxed text-charcoal-900/90 space-y-4 text-justify">
                      <p>
                        AG Media was founded in response to a persistent deficit: the visual and historical representation of South Sudan has long been monopolised by foreign humanitarian agents. While international efforts document crises, they routinely strip our ethnolinguistic communities of their intellectual authority, complex local law frameworks, and native architectural/agricultural resilience.
                      </p>
                      <p>
                        We operate on a transnational axis, linking professional media standards and academic structures in Victoria, Australia, with civic researchers, legal practitioners, and tribal councils on the ground in South Sudan. By maintaining strict, non-partisan editorial frameworks, our digital conservation campaigns serve as a validated source of truth for international bodies, legal scholars, and domestic education institutions.
                      </p>
                      <p>
                        We believe that narrative sovereignty is not a theoretical luxury; it is a foundational pillar of nation-building. When citizens understand their own constitutional rights, and when elders see their customary agreements recorded with dignity, legal literacy increases, and communal structures remain stable and independent.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-sand-50 border border-sand-200 p-8 space-y-6">
                    <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-clay-500 border-b border-sand-200 pb-2">
                      Institutional Code of Trust
                    </h3>
                    <ul className="space-y-4 text-xs font-sans text-charcoal-900/95 leading-relaxed">
                      <li className="flex space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-clay-500 shrink-0" />
                        <div>
                          <strong className="text-charcoal-900">Bilateral Accuracy:</strong> Every transcription of customary legal proceedings undergoes double-blind translations from local dialects to English.
                        </div>
                      </li>
                      <li className="flex space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-ochre-500 shrink-0" />
                        <div>
                          <strong className="text-charcoal-900">Sovereign Ownership:</strong> Captured materials remain the permanent intellectual property of local community trusts; AG Media acts solely as secure digital custodian.
                        </div>
                      </li>
                      <li className="flex space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-charcoal-900 shrink-0" />
                        <div>
                          <strong className="text-charcoal-900">Absolute Non-Partisanship:</strong> We refuse political sponsorship, commercial lobbying, or promotional advocacy that threatens our educational objectivity.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Founder Professional Profile */}
                <section className="bg-white border border-sand-200 p-8 lg:p-12" id="founder-profile">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Portrait Placeholder */}
                    <div className="lg:col-span-4 max-w-sm mx-auto w-full h-96 overflow-hidden border border-sand-200 grayscale relative shadow-md">
                      <img 
                        src={FOUNDER_DATA.image} 
                        alt={FOUNDER_DATA.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-4 left-4 bg-charcoal-900 text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 font-sans">
                        Founder Portrait
                      </div>
                    </div>

                    {/* Biographical & Professional Credentials */}
                    <div className="lg:col-span-8 space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] text-clay-500 font-sans font-bold uppercase tracking-widest">Platform leadership</p>
                        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-charcoal-900">{FOUNDER_DATA.name}</h2>
                        <p className="text-xs text-clay-500 font-semibold uppercase tracking-wider font-sans">{FOUNDER_DATA.role}</p>
                      </div>

                      <p className="font-serif text-sm leading-relaxed text-charcoal-900/90 text-justify">
                        {FOUNDER_DATA.bio}
                      </p>

                      {FOUNDER_DATA.qualifications && (
                        <div className="space-y-3 pt-4 border-t border-sand-200">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal-900 font-sans">Verified Academic & Civil Credentials:</h4>
                          <ul className="space-y-2 text-xs font-sans text-charcoal-900/95">
                            {FOUNDER_DATA.qualifications.map((qual, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <Bookmark className="w-4 h-4 text-clay-500 shrink-0 mt-0.5" />
                                <span>{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                </section>

                {/* Team Professional Grid */}
                <section className="space-y-8" id="production-team">
                  <div className="border-b border-sand-200 pb-4 space-y-2">
                    <p className="text-[10px] text-clay-500 font-sans font-bold uppercase tracking-widest">Operational Strength</p>
                    <h2 className="font-serif text-2xl font-bold text-charcoal-900">Our Production Team</h2>
                    <p className="text-xs text-charcoal-900/70 max-w-3xl leading-relaxed font-sans">
                      AG Media operates with a compact and highly functional team. Each member holds specialised expertise while remaining capable of operating across multiple production roles. This structure allows the company to maintain quality control, production efficiency and editorial coherence. From field recording to final edit and publication, AG Media delivers structured, culturally grounded and professionally managed productions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TEAM_MEMBERS_DATA.map((member) => (
                      <div key={member.id} className="bg-white border border-sand-200 flex flex-col h-full group hover:border-clay-500 transition-colors">
                        {/* Portrait Container */}
                        <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all border-b border-sand-200 relative bg-sand-50">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute bottom-3 left-3 bg-charcoal-900 text-white text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 font-sans">
                            AG Team
                          </div>
                        </div>

                        {/* Text Metadata info */}
                        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-serif text-lg font-bold text-charcoal-900 leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-[10px] text-clay-500 font-bold uppercase tracking-widest font-sans">
                              {member.role}
                            </p>
                            <p className="text-xs text-charcoal-900/80 leading-relaxed font-sans text-justify pt-1">
                              {member.bio}
                            </p>
                          </div>

                          {member.qualifications && member.qualifications.length > 0 && (
                            <div className="pt-4 border-t border-sand-100 space-y-2">
                              <p className="text-[9px] uppercase tracking-wider font-bold text-charcoal-900">Key Expertise:</p>
                              <ul className="space-y-1 text-[10px] text-charcoal-900/75 font-sans">
                                {member.qualifications.map((q, idx) => (
                                  <li key={idx} className="flex items-start space-x-1.5">
                                    <span className="w-1 h-1 bg-clay-500 rounded-full mt-1 shrink-0" />
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* =================== VIEW: OUR WORK =================== */}
            {currentView === 'work' && (
              <OurWorkView 
                selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} 
              />
            )}

            {/* =================== VIEW: MEDIA & CONTENT =================== */}
            {currentView === 'media' && (
              <MediaView />
            )}

            {/* =================== VIEW: SERVICES =================== */}
            {currentView === 'services' && (
              <ServicesView />
            )}

            {/* =================== VIEW: NEWSROOM =================== */}
            {currentView === 'newsroom' && (
              <NewsroomView 
                selectedArticle={selectedArticle} 
                setSelectedArticle={setSelectedArticle} 
              />
            )}

            {/* =================== VIEW: JOIN & SUPPORT =================== */}
            {currentView === 'support' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="support-view">
                
                {/* Section Header */}
                <div className="border-b border-sand-200 pb-6 space-y-3">
                  <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Strategic Alliance</p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
                    Join & Support
                  </h1>
                  <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
                    Sovereign documentation requires robust, non-partisan alliances. Explore our three structural support tracks to collaborate on regional legal and cultural campaigns.
                  </p>
                </div>

                {/* Engagement Tracks cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white border border-sand-200 p-8 space-y-4">
                    <div className="w-10 h-10 bg-clay-500/10 text-clay-500 flex items-center justify-center">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900">Institutional Sponsor</h3>
                    <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                      For NGOs, foundations, and universities seeking to fund comprehensive digital archiving or constitutional literacy field campaigns. Supports full metadata compliance.
                    </p>
                  </div>

                  <div className="bg-white border border-sand-200 p-8 space-y-4">
                    <div className="w-10 h-10 bg-clay-500/10 text-clay-500 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900">Academic Fellow</h3>
                    <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                      For linguists, constitutional scholars, and legal historians interested in contributing verbatim translations or peer-reviewing customary court records.
                    </p>
                  </div>

                  <div className="bg-white border border-sand-200 p-8 space-y-4">
                    <div className="w-10 h-10 bg-sand-50 border border-sand-200 text-charcoal-900 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-clay-500" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900">Diaspora Advocacy</h3>
                    <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed">
                      Connecting South Sudanese-Australian youth with Juba cohorts to build mutual legal databases, participate in exchange modules, and acquire technical skills.
                    </p>
                  </div>
                </section>

                {/* Pledge Intake Form */}
                <section className="bg-sand-50 border border-sand-200 p-8 max-w-3xl mx-auto shadow-2xs">
                  <div className="border-b border-sand-200 pb-4 mb-6 space-y-1">
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">Register an Institutional Support Pledge</h3>
                    <p className="text-xs text-charcoal-900/70 font-sans">
                      Outline your professional criteria. Pledges are cataloged inside our active session log and reviewed by board trustees.
                    </p>
                  </div>

                  {supportSuccess ? (
                    <div className="bg-white border border-ochre-500 p-6 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-ochre-500 mx-auto" />
                      <p className="text-sm font-bold text-charcoal-900">Pledge Logged to Archival Ledger</p>
                      <p className="text-xs text-charcoal-900/80 leading-relaxed">
                        Thank you. Your support pledge has been registered under active review. An executive advisor will initiate a secure vetting protocol shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSupportSubmit} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={supportName}
                            onChange={(e) => setSupportName(e.target.value)}
                            placeholder="e.g. Dr. Rebecca Lado"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={supportEmail}
                            onChange={(e) => setSupportEmail(e.target.value)}
                            placeholder="e.g. academic@melbourne.edu"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Select Support Path *</label>
                        <select
                          value={supportPath}
                          onChange={(e) => setSupportPath(e.target.value)}
                          className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                        >
                          <option value="Institutional Sponsorship">Institutional Sponsorship</option>
                          <option value="Academic Fellowship">Academic Fellowship</option>
                          <option value="Diaspora Advocacy volunteering">Diaspora Advocacy volunteering</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Pledge Brief / Technical Capabilities *</label>
                        <textarea
                          rows={4}
                          required
                          value={supportPledge}
                          onChange={(e) => setSupportPledge(e.target.value)}
                          placeholder="Detail your capacity: linguistic proficiency, academic credentials, research topics, or planned financial co-sponsorship parameters."
                          className="w-full bg-white border border-sand-200 p-3 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-clay-500 hover:bg-clay-600 text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Log Pledge</span>
                      </button>
                    </form>
                  )}

                  {/* Registered Pledges Log */}
                  {loggedPledges.length > 0 && (
                    <div className="mt-8 border-t border-sand-200 pt-6 space-y-3">
                      <h4 className="font-serif text-xs font-bold text-charcoal-900 uppercase tracking-widest">
                        Logged Pledges (Active Session Ledger)
                      </h4>
                      {loggedPledges.map((p) => (
                        <div key={p.id} className="bg-white border border-sand-200 p-4 text-xs font-sans flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div>
                            <span className="bg-clay-500/15 text-clay-500 font-bold px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider">
                              {p.path}
                            </span>
                            <p className="font-bold text-charcoal-900 mt-2">{p.name}</p>
                            <p className="text-[10px] text-charcoal-900/60 font-semibold uppercase">{p.email}</p>
                            <p className="mt-1.5 text-charcoal-900/85 italic font-serif leading-relaxed line-clamp-2">
                              "{p.pledge}"
                            </p>
                          </div>
                          <span className="text-[10px] text-charcoal-900/50 font-semibold">{p.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* =================== VIEW: CONTACT =================== */}
            {currentView === 'contact' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="contact-view">
                
                {/* Section Header */}
                <div className="border-b border-sand-200 pb-6 space-y-3">
                  <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Direct Channels</p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
                    Contact Coordinates
                  </h1>
                  <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
                    Have an inquiry regarding documentary production, customary archive access, or diaspora liaisons? File a formal message using our professional channels below.
                  </p>
                </div>

                {/* Bilateral Offices coordinates cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border-t-4 border-clay-500 border-x border-b border-sand-200 p-8 space-y-4">
                    <p className="text-[10px] text-clay-500 font-sans font-bold uppercase tracking-widest">East African Headquarters</p>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">Juba Desk</h3>
                    <div className="space-y-2 text-xs font-sans text-charcoal-900/90 leading-relaxed">
                      <p><strong className="text-charcoal-900">Address:</strong> Hai Jalaba Civic Block, Juba, Central Equatoria, South Sudan</p>
                      <p><strong className="text-charcoal-900">Coordinates:</strong> Liaison Room 12, Equatoria Customary Assembly District</p>
                      <p><strong className="text-charcoal-900">Direct Email:</strong> juba@agmedia.org.ss</p>
                    </div>
                  </div>

                  <div className="bg-white border-t-4 border-ochre-500 border-x border-b border-sand-200 p-8 space-y-4">
                    <p className="text-[10px] text-ochre-500 font-sans font-bold uppercase tracking-widest">Australian Secretariat</p>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">Melbourne Desk</h3>
                    <div className="space-y-2 text-xs font-sans text-charcoal-900/90 leading-relaxed">
                      <p><strong className="text-charcoal-900">Address:</strong> Victoria Diaspora Hub, RMIT District, Melbourne, VIC 3000, Australia</p>
                      <p><strong className="text-charcoal-900">Coordinates:</strong> Liaison Suite 404, Melbourne Professional Media Secretariat</p>
                      <p><strong className="text-charcoal-900">Direct Email:</strong> melbourne@agmedia.org.au</p>
                    </div>
                  </div>
                </section>

                {/* Main Contact Form */}
                <section className="bg-sand-50 border border-sand-200 p-8 max-w-3xl mx-auto shadow-2xs">
                  <div className="border-b border-sand-200 pb-4 mb-6 space-y-1">
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">File a Formal Communication Brief</h3>
                    <p className="text-xs text-charcoal-900/70 font-sans">
                      All messages are logged securely inside our active session database and routed to the corresponding regional secretariat.
                    </p>
                  </div>

                  {contactSuccess ? (
                    <div className="bg-white border border-ochre-500 p-6 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-ochre-500 mx-auto" />
                      <p className="text-sm font-bold text-charcoal-900">Communication Logged to Registry</p>
                      <p className="text-xs text-charcoal-900/80 leading-relaxed">
                        Your strategic message brief has been logged under registry reference. An executive consultant will initiate official communications within 48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. Emmanuel Lado Loro"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="e.g. emmanuel@loro.org"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Organisation / Institution</label>
                          <input
                            type="text"
                            value={contactOrg}
                            onChange={(e) => setContactOrg(e.target.value)}
                            placeholder="e.g. Monash School of Law / Independent Scholar"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Inquiry Category *</label>
                          <select
                            value={contactInquiryType}
                            onChange={(e) => setContactInquiryType(e.target.value)}
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                          >
                            <option value="Civic Partnership">Civic Partnership Proposal</option>
                            <option value="Archival Campaign">Archival Campaign Cooperation</option>
                            <option value="Documentary Production">Documentary Production Commission</option>
                            <option value="Strategic Advisory">Strategic advisory inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Narrative Message *</label>
                        <textarea
                          rows={5}
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Provide a formal, clear description of your proposal or academic query. Refrain from promotional fluff."
                          className="w-full bg-white border border-sand-200 p-3 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-charcoal-900 hover:bg-clay-500 text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Message Brief</span>
                      </button>
                    </form>
                  )}

                  {/* Registered Contacts Log to show absolute session state */}
                  {loggedContacts.length > 0 && (
                    <div className="mt-8 border-t border-sand-200 pt-6 space-y-3">
                      <h4 className="font-serif text-xs font-bold text-charcoal-900 uppercase tracking-widest">
                        Logged Transmissions (Active Session Ledger)
                      </h4>
                      {loggedContacts.map((c) => (
                        <div key={c.id} className="bg-white border border-sand-200 p-4 text-xs font-sans flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div>
                            <span className="bg-charcoal-900 text-sand-50 font-bold px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider">
                              {c.type}
                            </span>
                            <p className="font-bold text-charcoal-900 mt-2">{c.name}</p>
                            <p className="text-[10px] text-charcoal-900/60 font-semibold uppercase">{c.org} | {c.email}</p>
                            <p className="mt-1.5 text-charcoal-900/85 italic font-serif leading-relaxed line-clamp-2">
                              "{c.message}"
                            </p>
                          </div>
                          <span className="text-[10px] text-charcoal-900/50 font-semibold">{c.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer setView={(v) => navigateToView(v)} />
    </div>
  );
}
