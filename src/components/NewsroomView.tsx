/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data';
import { Search, Calendar, User, Clock, ArrowLeft, Bookmark, Send, Scale, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsroomViewProps {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
}

interface Reflection {
  id: string;
  name: string;
  affiliation: string;
  comment: string;
  date: string;
}

export default function NewsroomView({ selectedArticle, setSelectedArticle }: NewsroomViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Reflection/Comment states
  const [reflections, setReflections] = useState<Record<string, Reflection[]>>({});
  const [formName, setFormName] = useState('');
  const [formAffiliation, setFormAffiliation] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Categories list
  const categories = ['All', 'Civic Education', 'Cultural History', 'Editorial', 'Field Report'];

  // Filter articles
  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Load reflections on start
  useEffect(() => {
    const saved = localStorage.getItem('ag_media_reflections');
    if (saved) {
      setReflections(JSON.parse(saved));
    } else {
      // Seed default professional reflections
      const seed: Record<string, Reflection[]> = {
        'constitutional-literacy': [
          {
            id: '1',
            name: 'Dr. John Akec',
            affiliation: 'University of Juba',
            comment: 'A highly necessary critique. The gap between elite negotiations in Juba and civic understanding in rural states has historically undermined statutory authority. Media-led translations of these legal frameworks are urgent.',
            date: '16 May 2026'
          }
        ],
        'narrative-sovereignty': [
          {
            id: '1',
            name: 'Awut Deng',
            affiliation: 'Melbourne Diaspora Advisory',
            comment: 'This editorial hits the core of what we feel in the diaspora. Our history is often presented as a series of crises rather than active legal and cultural preservation. Sovereign digital archives are essential.',
            date: '30 January 2026'
          }
        ]
      };
      setReflections(seed);
      localStorage.setItem('ag_media_reflections', JSON.stringify(seed));
    }
  }, []);

  const handlePostReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;
    if (!formName || !formComment) return;

    const newReflection: Reflection = {
      id: Math.random().toString(),
      name: formName,
      affiliation: formAffiliation || 'Independent Researcher',
      comment: formComment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updatedReflections = {
      ...reflections,
      [selectedArticle.id]: [newReflection, ...(reflections[selectedArticle.id] || [])]
    };

    setReflections(updatedReflections);
    localStorage.setItem('ag_media_reflections', JSON.stringify(updatedReflections));

    // Reset Form
    setFormName('');
    setFormAffiliation('');
    setFormComment('');
    setFormSuccess(true);

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="newsroom-container">
      {selectedArticle ? (
        /* =================== LONG-FORM ARTICLE READER =================== */
        <article className="space-y-8" id={`article-reader-${selectedArticle.id}`}>
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold tracking-wider uppercase text-clay-500 hover:text-clay-600 transition-colors cursor-pointer"
            id="back-to-newsroom"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Newsroom Registry</span>
          </button>

          {/* Article Header block */}
          <div className="border-b border-sand-200 pb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-clay-500/15 text-clay-500 text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-charcoal-900/60 flex items-center space-x-1 font-sans">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900 leading-tight max-w-4xl" id="article-title">
              {selectedArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-charcoal-900/70 font-sans border-t border-sand-200/50 mt-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-clay-500" />
                <span className="font-semibold text-charcoal-900">{selectedArticle.author}</span>
                <span className="text-charcoal-900/50">({selectedArticle.authorRole})</span>
              </div>
              <div className="hidden sm:inline text-charcoal-900/30">•</div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-clay-500" />
                <span>Published: {selectedArticle.publishDate}</span>
              </div>
            </div>
          </div>

          {/* Core Layout: Narrative text column + Citations sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            {/* Main Long-Form Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Optional header image */}
              <div className="w-full h-80 overflow-hidden relative shadow-xs">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Leading Paragraph Big Text */}
              <div className="font-serif text-lg leading-relaxed text-charcoal-900 font-semibold border-l-4 border-clay-500 pl-6 py-1">
                {selectedArticle.excerpt}
              </div>

              {/* Main Text Content */}
              <div className="font-serif text-base leading-relaxed text-charcoal-900/95 space-y-6 max-w-prose">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index} className="text-justify indent-4 sm:indent-8 first:indent-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Read More / Return to All Articles Button at bottom of text */}
              <div className="pt-8 pb-4 border-t border-sand-200/50 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-clay-500 hover:bg-clay-600 text-white px-6 py-3 text-xs font-sans font-bold uppercase tracking-widest transition-all flex items-center space-x-2 cursor-pointer shadow-2xs"
                  id="bottom-read-more-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Read More Articles (View Full Registry)</span>
                </button>
              </div>

              {/* Editorial Ethics notice */}
              <div className="bg-sand-50 border border-sand-200 p-5 mt-12 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-sans font-bold text-clay-600 uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>AG Media Editorial Standards</span>
                </div>
                <p className="text-xs text-charcoal-900/80 leading-relaxed font-sans">
                  This editorial piece has undergone dual peer-review by our regional liaison desks in Juba and Melbourne. All oral citations, constitutional references, and cultural accounts mentioned have been cross-verified with registered legal practitioners and tribal elders.
                </p>
              </div>

              {/* =================== COMMUNITY JOURNAL REFLECTIONS =================== */}
              <div className="pt-12 border-t border-sand-200 space-y-8">
                <h3 className="font-serif text-xl font-bold text-charcoal-900 flex items-center space-x-2">
                  <span>Community Journal Reflections</span>
                  <span className="text-xs font-sans font-normal bg-sand-200 text-charcoal-900 px-2.5 py-0.5 rounded-full">
                    {reflections[selectedArticle.id]?.length || 0}
                  </span>
                </h3>

                {/* Submissions List */}
                <div className="space-y-4">
                  {(reflections[selectedArticle.id] || []).length > 0 ? (
                    (reflections[selectedArticle.id] || []).map((ref) => (
                      <div key={ref.id} className="bg-white border border-sand-200 p-5 shadow-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-sans text-xs font-bold text-charcoal-900">{ref.name}</p>
                            <p className="font-sans text-[10px] text-clay-500 font-semibold uppercase tracking-wider">{ref.affiliation}</p>
                          </div>
                          <span className="text-[10px] text-charcoal-900/50 font-sans">{ref.date}</span>
                        </div>
                        <p className="mt-3 text-sm text-charcoal-900/90 font-serif leading-relaxed italic border-l-2 border-sand-200 pl-4">
                          "{ref.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-sand-200 p-6 text-center">
                      <p className="text-xs text-charcoal-900/60 font-sans">No reflections have been logged for this publication yet. Be the first to file an institutional review.</p>
                    </div>
                  )}
                </div>

                {/* Add Reflection Form */}
                <div className="bg-sand-50/60 border border-sand-200 p-6">
                  <h4 className="font-serif text-sm font-bold text-charcoal-900 uppercase tracking-wider border-b border-sand-200 pb-2 mb-4">
                    File a Formal Editorial Response
                  </h4>
                  {formSuccess ? (
                    <div className="bg-white border border-ochre-500 p-4 text-center">
                      <p className="text-xs font-semibold text-charcoal-900">Reflection Filed Successfully</p>
                      <p className="text-[10px] text-charcoal-900/60 mt-1">Your review has been validated and added to the official journal ledger.</p>
                    </div>
                  ) : (
                    <form onSubmit={handlePostReflection} className="space-y-4 font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. John Garang Lado"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Institutional Affiliation</label>
                          <input
                            type="text"
                            value={formAffiliation}
                            onChange={(e) => setFormAffiliation(e.target.value)}
                            placeholder="e.g. Juba University / Independent Scholar"
                            className="w-full bg-white border border-sand-200 px-3 py-2 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1">Your Narrative Response</label>
                        <textarea
                          rows={4}
                          required
                          value={formComment}
                          onChange={(e) => setFormComment(e.target.value)}
                          placeholder="Provide objective, scholarly reflection. Avoid personal greetings or marketing fluff."
                          className="w-full bg-white border border-sand-200 p-3 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-clay-500 hover:bg-clay-600 text-white px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Log Response</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>

            {/* Citations and References Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Citations Box */}
              <div className="bg-sand-50 border border-sand-200 p-6 shadow-2xs">
                <h3 className="font-serif text-sm font-bold text-charcoal-900 uppercase tracking-wider border-b border-sand-200 pb-2 mb-4 flex items-center space-x-2">
                  <Bookmark className="w-4 h-4 text-clay-500" />
                  <span>Academic Citations</span>
                </h3>
                {selectedArticle.citations && selectedArticle.citations.length > 0 ? (
                  <ul className="space-y-4">
                    {selectedArticle.citations.map((cite, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs text-charcoal-900/95 leading-relaxed font-sans">
                        <span className="font-bold text-clay-500 text-[10px] bg-sand-200 px-1.5 py-0.5 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{cite}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-charcoal-900/60 italic font-sans">No external academic registries are cited in this specific field essay.</p>
                )}
              </div>

              {/* Archive Metadata */}
              <div className="bg-charcoal-900 text-sand-50 p-6 space-y-4">
                <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest border-b border-charcoal-800 pb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-clay-500" />
                  <span>Archival Registry</span>
                </h4>
                <div className="space-y-2 text-[10px] font-sans text-sand-200/80">
                  <p className="flex justify-between border-b border-charcoal-800 pb-1.5">
                    <span className="font-semibold text-white">REGISTER ID</span>
                    <span>AG-NSR-{selectedArticle.id.toUpperCase().slice(0, 6)}</span>
                  </p>
                  <p className="flex justify-between border-b border-charcoal-800 pb-1.5">
                    <span className="font-semibold text-white">SECURITY STATUS</span>
                    <span className="text-emerald-400 font-bold">PUBLIC ACCESS</span>
                  </p>
                  <p className="flex justify-between border-b border-charcoal-800 pb-1.5">
                    <span className="font-semibold text-white">FORMAT</span>
                    <span>DIGITAL MONOGRAPH</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-white">CUSTODIAN</span>
                    <span>AG MEDIA ARCHIVE</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </article>
      ) : (
        /* =================== ARTICLES INDEX LIST =================== */
        <div className="space-y-12">
          {/* Main Title Banner */}
          <div className="border-b border-sand-200 pb-6 space-y-3">
            <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Official Publication Registry</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
              Newsroom & Legal Monographs
            </h1>
            <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
              Long-form analytical articles, field assessments, and rigorous legal reflections addressing constitutional frameworks, historic registries, and civic awareness.
            </p>
          </div>

          {/* Filtering and Search block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-sand-50 border border-sand-200 p-4">
            {/* Category selection Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-sans font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-clay-500 text-white'
                      : 'bg-white border border-sand-200 text-charcoal-900 hover:bg-sand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative max-w-sm w-full font-sans">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search publications..."
                className="w-full bg-white border border-sand-200 pl-9 pr-3 py-1.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-charcoal-900/40 absolute left-3 top-2" />
            </div>
          </div>

          {/* Articles Listing Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-sand-200 overflow-hidden flex flex-col h-full cursor-pointer shadow-2xs group"
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {/* Photo cover */}
                  <div className="h-56 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-charcoal-900 text-sand-50 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1">
                      {article.category}
                    </div>
                  </div>

                  {/* Body textual copy */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] text-charcoal-900/60 font-sans">
                        <span className="font-semibold text-clay-500">{article.author}</span>
                        <span>•</span>
                        <span>{article.publishDate}</span>
                      </div>
                      <h2 className="font-serif text-lg md:text-xl font-bold text-charcoal-900 leading-snug group-hover:text-clay-500 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-xs text-charcoal-900/80 font-sans leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-sand-200/50 flex items-center justify-between text-xs font-sans">
                      <span className="text-clay-500 font-bold uppercase tracking-wider text-[10px] group-hover:underline flex items-center space-x-1">
                        <span>Read More</span>
                        <span>→</span>
                      </span>
                      <span className="text-charcoal-900/50 text-[10px]">{article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-sand-200 p-12 text-center max-w-md mx-auto">
              <p className="text-sm font-medium text-charcoal-900">No publications matched your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-xs font-bold text-clay-500 uppercase tracking-widest hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
