/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data';
import { Calendar, User, Eye, ArrowLeft, Layers, Landmark, Info, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OurWorkViewProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export default function OurWorkView({ selectedProject, setSelectedProject }: OurWorkViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Documentary', 'Cultural Archive', 'Civic Project'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    return selectedFilter === 'All' || project.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="our-work-container">
      {selectedProject ? (
        /* =================== DETAILED PROJECT DISPLAY =================== */
        <div className="space-y-8" id={`project-detail-${selectedProject.id}`}>
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedProject(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold tracking-wider uppercase text-clay-500 hover:text-clay-600 transition-colors cursor-pointer"
            id="back-to-projects"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Ledger</span>
          </button>

          {/* Core Banner with Hero Image Overlay */}
          <div className="relative h-96 w-full overflow-hidden shadow-xs border border-sand-200">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
            
            {/* Title Block Embedded in Image */}
            <div className="absolute bottom-8 left-6 right-6 text-white space-y-2">
              <span className="bg-clay-500 text-white text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                {selectedProject.category}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                {selectedProject.title}
              </h1>
              <p className="font-sans text-xs text-sand-100/90 font-medium">
                {selectedProject.subtitle}
              </p>
            </div>
          </div>

          {/* Grid Layout: Impact summary on left, Narrative on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            
            {/* Left Block: Core Stats and Production Credits */}
            <div className="lg:col-span-4 space-y-6">
              {/* Impact Card */}
              {selectedProject.impactMetric && (
                <div className="bg-clay-500/5 border border-clay-500/30 p-6">
                  <p className="text-[10px] text-clay-500 font-sans font-bold uppercase tracking-widest">Flagship Milestone</p>
                  <p className="font-serif text-3xl font-extrabold text-clay-500 mt-1">{selectedProject.impactMetric}</p>
                  <p className="text-xs text-charcoal-900/80 font-sans font-semibold mt-1">{selectedProject.impactLabel}</p>
                </div>
              )}

              {/* Administrative metadata */}
              <div className="bg-sand-50 border border-sand-200 p-6 space-y-4">
                <h3 className="font-serif text-sm font-bold text-charcoal-900 uppercase tracking-wider border-b border-sand-200 pb-2 flex items-center space-x-2">
                  <Landmark className="w-4 h-4 text-clay-500" />
                  <span>Project Metadata</span>
                </h3>
                <div className="space-y-2 text-xs font-sans text-charcoal-900">
                  <div className="flex justify-between border-b border-sand-200/50 pb-1.5">
                    <span className="text-charcoal-900/60">REGISTRY STATUS</span>
                    <span className="font-bold text-clay-500">COMPLETED & VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-sand-200/50 pb-1.5">
                    <span className="text-charcoal-900/60">CHRONOLOGY</span>
                    <span className="font-semibold">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-900/60">GEOGRAPHIC SCOPE</span>
                    <span className="font-semibold">Bilateral (SS/AU)</span>
                  </div>
                </div>
              </div>

              {/* Official production credits */}
              <div className="bg-charcoal-900 text-sand-50 p-6">
                <h3 className="font-serif text-xs font-bold text-white uppercase tracking-widest border-b border-charcoal-800 pb-2 mb-4">
                  Bilateral Production Credits
                </h3>
                <ul className="space-y-3 text-xs">
                  {selectedProject.credits.map((cred, i) => (
                    <li key={i} className="flex justify-between border-b border-charcoal-800 pb-2 last:border-0 last:pb-0">
                      <span className="text-sand-100/50 font-sans">{cred.role}</span>
                      <span className="font-medium text-white font-sans">{cred.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Block: Long Narrative Description */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal-900">
                Institutional Context & Objectives
              </h2>
              <div className="font-serif text-base leading-relaxed text-charcoal-900/95 space-y-4 text-justify">
                {selectedProject.longDescription ? (
                  selectedProject.longDescription.split('\n\n').map((para, i) => (
                    <p key={i} className="indent-4 sm:indent-8 first:indent-0">
                      {para}
                    </p>
                  ))
                ) : (
                  <p>{selectedProject.description}</p>
                )}
              </div>

              {/* Strategic Value block */}
              <div className="border-l-4 border-clay-500 bg-sand-50 p-5">
                <p className="font-serif text-sm font-semibold text-charcoal-900">Documentation Principle</p>
                <p className="text-xs text-charcoal-900/80 leading-relaxed mt-1 font-sans">
                  "Sovereign digital archiving is the fundamental mechanism of narrative defense. When we document our own peace accords, customary jurisprudence, and local family struggles, we neutralize external historical distortion."
                </p>
                <p className="text-[10px] text-clay-500 font-bold uppercase tracking-wider mt-2 font-sans">— AG Media Board of Trustees Directive</p>
              </div>

              {/* Call to Collaborate */}
              <div className="bg-clay-500/5 border border-clay-500/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                <div className="space-y-1">
                  <p className="font-serif text-base font-bold text-charcoal-900">Interested in collaborating on historical archives?</p>
                  <p className="text-xs text-charcoal-900/80 font-sans">We partner with universities, researchers, and local municipal councils.</p>
                </div>
                <button
                  onClick={() => {
                    // Navigate to contact state
                    const contactTab = document.getElementById('nav-item-contact');
                    if (contactTab) contactTab.click();
                  }}
                  className="bg-clay-500 hover:bg-clay-600 text-white px-4 py-2.5 text-xs uppercase tracking-widest font-bold transition-all inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Propose Coalition</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* =================== PROJECTS GRID =================== */
        <div className="space-y-12">
          {/* Section Header */}
          <div className="border-b border-sand-200 pb-6 space-y-3">
            <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Historical & Civic Audits</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
              Bilateral Flagship Initiatives
            </h1>
            <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
              Unvarnished visual evidence and structural archives. Review our validated work across documentary cinema, sovereign local archiving, and cross-diaspora legal education.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex border-b border-sand-200 pb-1 space-x-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 text-xs font-sans font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedFilter === cat
                    ? 'border-clay-500 text-clay-500'
                    : 'border-transparent text-charcoal-900/60 hover:text-clay-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-sand-200 overflow-hidden flex flex-col justify-between shadow-2xs cursor-pointer group"
                onClick={() => {
                  setSelectedProject(project);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="space-y-4">
                  {/* Photo with subtle grayscale hover overlay */}
                  <div className="h-48 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute bottom-3 left-3 bg-charcoal-900 text-sand-50 text-[8px] uppercase tracking-widest font-bold px-2 py-0.5">
                      {project.category}
                    </span>
                  </div>

                  {/* Narrative details */}
                  <div className="px-6 space-y-2">
                    <p className="text-[10px] text-clay-500 font-semibold uppercase tracking-widest font-sans">{project.year} Registry</p>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900 leading-snug group-hover:text-clay-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-charcoal-900/85 font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-4 mt-4 border-t border-sand-200/50 flex items-center justify-between text-xs font-sans">
                  <span className="text-clay-500 font-bold uppercase tracking-wider text-[10px]">
                    Examine Registry →
                  </span>
                  <span className="text-charcoal-900/50 text-[10px]">{project.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
