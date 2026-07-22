/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Search, FileText, Video, Headphones, FolderGit2, ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, ARTICLES_DATA, MEDIA_CONTENT_DATA, SERVICES_DATA } from '../data';
import { Project, Article, MediaContent, ServiceItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToItem: (type: string, item: any) => void;
}

interface SearchIndexItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'article' | 'video' | 'podcast' | 'project' | 'service';
  category: string;
  description: string;
  fullContentToSearch: string;
  originalItem: any;
}

export default function SearchModal({ isOpen, onClose, onNavigateToItem }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'article' | 'video' | 'podcast' | 'project' | 'service'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow animation to complete
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Build the complete search index
  const searchIndex = useMemo<SearchIndexItem[]>(() => {
    const items: SearchIndexItem[] = [];

    // 1. Projects
    PROJECTS_DATA.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: p.subtitle,
        type: 'project',
        category: p.category,
        description: p.description,
        fullContentToSearch: `${p.title} ${p.subtitle || ''} ${p.category} ${p.description} ${p.longDescription} ${p.impactLabel || ''} ${p.credits?.map(c => `${c.name} ${c.role}`).join(' ') || ''}`.toLowerCase(),
        originalItem: p,
      });
    });

    // 2. Articles (Newsroom)
    ARTICLES_DATA.forEach((a) => {
      items.push({
        id: `article-${a.id}`,
        title: a.title,
        type: 'article',
        category: a.category,
        description: a.excerpt,
        fullContentToSearch: `${a.title} ${a.excerpt} ${a.author} ${a.authorRole || ''} ${a.category} ${a.content.join(' ')} ${a.citations?.join(' ') || ''}`.toLowerCase(),
        originalItem: a,
      });
    });

    // 3. Media Content (Videos, Podcasts, Photo-essays)
    MEDIA_CONTENT_DATA.forEach((m) => {
      items.push({
        id: `media-${m.id}`,
        title: m.title,
        type: m.type === 'video' ? 'video' : m.type === 'podcast' ? 'podcast' : 'article', // Treat photo essays as articles or group with type
        category: m.category,
        description: m.description,
        fullContentToSearch: `${m.title} ${m.category} ${m.description} ${m.type} ${m.durationOrPages || ''}`.toLowerCase(),
        originalItem: m,
      });
    });

    // 4. Services
    SERVICES_DATA.forEach((s) => {
      items.push({
        id: `service-${s.id}`,
        title: s.title,
        type: 'service',
        category: 'Institutional Offering',
        description: s.description,
        fullContentToSearch: `${s.title} ${s.description} ${s.deliverables.join(' ')} ${s.audience} ${s.consultationFocus}`.toLowerCase(),
        originalItem: s,
      });
    });

    return items;
  }, []);

  // Compute stats/counts for filter buttons
  const counts = useMemo(() => {
    const rawCounts = {
      all: searchIndex.length,
      article: 0,
      video: 0,
      podcast: 0,
      project: 0,
      service: 0,
    };

    searchIndex.forEach((item) => {
      rawCounts[item.type] = (rawCounts[item.type] || 0) + 1;
    });

    return rawCounts;
  }, [searchIndex]);

  // Filter and Rank results based on query
  const searchResults = useMemo(() => {
    const cleanedQuery = query.trim().toLowerCase();
    if (!cleanedQuery) {
      // Default recommended / popular items when search is empty
      return searchIndex
        .filter((item) => activeFilter === 'all' || item.type === activeFilter)
        .slice(0, 4); // Show top 4 items as suggestions
    }

    const words = cleanedQuery.split(/\s+/).filter(Boolean);

    // Filter index
    const matched = searchIndex.filter((item) => {
      // If filter active, enforce type
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }

      // Must match ALL search terms somewhere in contentToSearch
      return words.every((word) => item.fullContentToSearch.includes(word));
    });

    // Score and Rank results
    const scored = matched.map((item) => {
      let score = 0;

      // Exact phrase match in title (Highest weight)
      if (item.title.toLowerCase().includes(cleanedQuery)) score += 50;

      // Single word match in title
      words.forEach((word) => {
        if (item.title.toLowerCase().includes(word)) score += 15;
        if (item.subtitle?.toLowerCase().includes(word)) score += 8;
        if (item.category.toLowerCase().includes(word)) score += 5;
        if (item.description.toLowerCase().includes(word)) score += 3;
      });

      return { item, score };
    });

    // Sort by descending score
    return scored
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }, [query, activeFilter, searchIndex]);

  // Utility to clean regex escape characters
  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // HIGHLIGHT KEYWORDS IN RENDERING
  const highlightText = (text: string, searchHighlightQuery: string) => {
    if (!searchHighlightQuery.trim()) return text;
    const words = searchHighlightQuery.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return text;

    // Create a regular expression matching any of the search words
    const regex = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, idx) => 
          regex.test(part) ? (
            <mark key={idx} className="bg-clay-100 text-clay-600 font-bold px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // EXTRACT DYNAMIC SNIPPET AROUND SEARCH KEYWORD
  const getDynamicSnippet = (item: SearchIndexItem, searchQuery: string): React.ReactNode => {
    const rawText = item.fullContentToSearch;
    const cleanQuery = searchQuery.trim().toLowerCase();

    if (!cleanQuery) {
      // Just return standard description if query is empty
      return item.description;
    }

    const words = cleanQuery.split(/\s+/).filter(Boolean);
    let matchIdx = -1;

    // Find the first index of any matching search word
    for (const word of words) {
      const idx = item.fullContentToSearch.indexOf(word);
      if (idx !== -1) {
        matchIdx = idx;
        break;
      }
    }

    // Fallback if no match was found (shouldn't happen since we filtered)
    if (matchIdx === -1) {
      return item.description;
    }

    // Pull from original content instead of lowercase index for high-fidelity rendering
    // But wait, the original item has full content in pieces, let's assemble it
    let textToSlice = "";
    if (item.type === 'project') {
      textToSlice = `${item.originalItem.title}. ${item.originalItem.subtitle || ''}. ${item.originalItem.description} ${item.originalItem.longDescription}`;
    } else if (item.type === 'article') {
      textToSlice = `${item.originalItem.title}. ${item.originalItem.excerpt} ${item.originalItem.content.join(' ')}`;
    } else if (item.type === 'service') {
      textToSlice = `${item.originalItem.title}. ${item.originalItem.description}. Deliverables: ${item.originalItem.deliverables.join(', ')}`;
    } else {
      textToSlice = `${item.title}. ${item.description}`;
    }

    const origMatchIdx = textToSlice.toLowerCase().indexOf(cleanQuery);
    const centerIdx = origMatchIdx !== -1 ? origMatchIdx : matchIdx;

    const maxLength = 160;
    let start = Math.max(0, centerIdx - Math.floor(maxLength / 2));
    let end = Math.min(textToSlice.length, start + maxLength);

    // Adjust start if end is full
    if (end - start < maxLength) {
      start = Math.max(0, end - maxLength);
    }

    let snippet = textToSlice.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < textToSlice.length) snippet = snippet + '...';

    return highlightText(snippet, searchQuery);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-clay-500" />;
      case 'podcast':
        return <Headphones className="w-4 h-4 text-ochre-500" />;
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-indigo-600" />;
      case 'service':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4 text-charcoal-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'article': return 'Legal Monograph / Article';
      case 'video': return 'Cinematic Footage / Film';
      case 'podcast': return 'Broadcasting / Radio Pod';
      case 'project': return 'Project Ledger / Archive';
      case 'service': return 'Advisory / Civic Offering';
      default: return 'Asset';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-md flex items-start justify-center p-4 md:p-10 lg:p-20"
          id="search-overlay-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -10, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-4xl bg-white border border-sand-200 shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
            id="search-dialog-box"
          >
            {/* SEARCH INPUT HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200 bg-sand-50">
              <div className="flex items-center space-x-3 flex-grow max-w-2xl">
                <Search className="w-5 h-5 text-clay-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type keywords (e.g. customary law, Nile, Victoria, Juba)..."
                  className="w-full bg-transparent text-charcoal-900 font-sans font-medium text-base outline-hidden placeholder-charcoal-900/40"
                  id="search-input-field"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs uppercase font-bold tracking-widest text-charcoal-900/40 hover:text-charcoal-900 px-1.5 py-1 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-charcoal-900/50 hover:text-clay-500 hover:bg-sand-200/40 transition-colors cursor-pointer"
                aria-label="Close search"
                id="search-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FILTER CATEGORY SHINGLES */}
            <div className="px-6 py-3 border-b border-sand-200/60 flex items-center space-x-1.5 overflow-x-auto bg-white whitespace-nowrap scrollbar-none font-sans">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-clay-500 hover:text-clay-500'
                }`}
              >
                All Content ({counts.all})
              </button>
              
              <button
                onClick={() => setActiveFilter('project')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'project'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-indigo-600 hover:text-indigo-600'
                }`}
              >
                Projects ({counts.project})
              </button>

              <button
                onClick={() => setActiveFilter('article')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'article'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-emerald-600 hover:text-emerald-600'
                }`}
              >
                Monographs & Articles ({counts.article})
              </button>

              <button
                onClick={() => setActiveFilter('video')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'video'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-clay-500 hover:text-clay-500'
                }`}
              >
                Films & Cinema ({counts.video})
              </button>

              <button
                onClick={() => setActiveFilter('podcast')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'podcast'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-ochre-500 hover:text-ochre-500'
                }`}
              >
                Audio & Radio ({counts.podcast})
              </button>

              <button
                onClick={() => setActiveFilter('service')}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-all cursor-pointer ${
                  activeFilter === 'service'
                    ? 'bg-clay-500 border-clay-500 text-white'
                    : 'bg-white border-sand-200 text-charcoal-900/70 hover:border-amber-500 hover:text-amber-500'
                }`}
              >
                Offerings ({counts.service})
              </button>
            </div>

            {/* RESULTS CONTAINER */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-sand-50/20 max-h-[50vh]">
              {searchResults.length > 0 ? (
                <div className="space-y-3" id="search-results-list">
                  {!query && (
                    <div className="text-[10px] uppercase font-bold tracking-widest text-charcoal-900/40 pb-1 flex items-center space-x-1.5">
                      <span>Featured Assets & Sovereign Studies</span>
                    </div>
                  )}

                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => {
                        onNavigateToItem(result.type, result.originalItem);
                        onClose();
                      }}
                      className="bg-white border border-sand-200 p-5 hover:border-clay-500 hover:bg-clay-50/5 transition-all duration-200 cursor-pointer group flex flex-col md:flex-row justify-between gap-4 items-start"
                      id={`search-result-item-${result.id}`}
                    >
                      <div className="space-y-2 flex-1">
                        {/* Type Tag & Category */}
                        <div className="flex items-center space-x-2 text-[10px] font-sans font-bold uppercase tracking-wider">
                          <span className="flex items-center space-x-1.5 py-0.5 px-2 bg-sand-100 text-charcoal-900">
                            {getIcon(result.type)}
                            <span>{getTypeName(result.type)}</span>
                          </span>
                          <span className="text-charcoal-900/55">•</span>
                          <span className="text-clay-500">{result.category}</span>
                        </div>

                        {/* Title & Subtitle */}
                        <h4 className="font-serif text-base font-bold text-charcoal-900 group-hover:text-clay-500 transition-colors leading-snug">
                          {highlightText(result.title, query)}
                          {result.subtitle && (
                            <span className="font-sans font-normal text-xs text-charcoal-900/60 block mt-0.5">
                              {highlightText(result.subtitle, query)}
                            </span>
                          )}
                        </h4>

                        {/* Dynamic snippet mapping matches */}
                        <p className="text-xs text-charcoal-900/75 font-sans leading-relaxed">
                          {getDynamicSnippet(result, query)}
                        </p>
                      </div>

                      {/* Launch Indicator in corner */}
                      <div className="hidden md:flex items-center space-x-1 text-[10px] uppercase tracking-widest font-bold text-charcoal-900/30 group-hover:text-clay-500 transition-colors shrink-0 pt-1.5">
                        <span>Examine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3" id="search-no-results">
                  <X className="w-10 h-10 text-charcoal-900/20 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">No sovereign resources match your criteria</h4>
                  <p className="text-xs text-charcoal-900/60 font-sans max-w-sm mx-auto leading-relaxed">
                    Ensure correct terminology spelling, or select "All Content" to remove filtering restrictions.
                  </p>
                </div>
              )}
            </div>

            {/* SEED SUGGESTIONS AND HELPFUL CONTROLS */}
            <div className="px-6 py-4 border-t border-sand-200 bg-sand-50 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans text-charcoal-900/50 gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold uppercase tracking-wider">Try searching:</span>
                <button
                  onClick={() => setQuery('customary law')}
                  className="bg-white hover:bg-clay-100 hover:text-clay-500 border border-sand-200 px-2 py-1 text-[10px] transition-all cursor-pointer font-semibold"
                >
                  customary law
                </button>
                <button
                  onClick={() => setQuery('repatriation')}
                  className="bg-white hover:bg-clay-100 hover:text-clay-500 border border-sand-200 px-2 py-1 text-[10px] transition-all cursor-pointer font-semibold"
                >
                  repatriation
                </button>
                <button
                  onClick={() => setQuery('Melbourne')}
                  className="bg-white hover:bg-clay-100 hover:text-clay-500 border border-sand-200 px-2 py-1 text-[10px] transition-all cursor-pointer font-semibold"
                >
                  Melbourne
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <CornerDownRight className="w-3 h-3 text-clay-500" />
                  <span>[Esc] to Dismiss</span>
                </span>
                <span>•</span>
                <span>AG Media Digital Search v1.4</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
