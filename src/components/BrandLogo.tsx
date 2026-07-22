/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({ className = "w-12 h-12", showText = false }: BrandLogoProps) {
  return (
    <div className="flex items-center space-x-3 select-none">
      <svg 
        viewBox="0 0 200 200" 
        className={`${className} shrink-0 drop-shadow-xs`}
        xmlns="http://www.w3.org/2000/svg"
        id="ag-media-vector-logo"
      >
        <defs>
          {/* Top text path - radius 72 */}
          <path 
            id="logo-text-top" 
            d="M 28,100 A 72,72 0 0,1 172,100" 
            fill="none" 
          />
          {/* Bottom text path - radius 72 */}
          <path 
            id="logo-text-bottom" 
            d="M 172,100 A 72,72 0 0,1 28,100" 
            fill="none" 
          />
        </defs>

        {/* Clean crisp white background disk */}
        <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#F1EFEA" strokeWidth="2" />

        {/* Outer Royal Blue Ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#0062C4" strokeWidth="4" />
        
        {/* Inner Kelly Green Arc Ring */}
        <path 
          d="M 26,108 A 76,76 0 0,0 174,108" 
          fill="none" 
          stroke="#129207" 
          strokeWidth="5" 
          strokeLinecap="round"
        />

        {/* Curved Text - Top: MEDIA PRODUCTIONS */}
        <text fontFamily="sans-serif" fontSize="13.5" fontWeight="900" fill="#0062C4" letterSpacing="2.2">
          <textPath href="#logo-text-top" startOffset="50%" textAnchor="middle">
            MEDIA PRODUCTIONS
          </textPath>
        </text>

        {/* Curved Text - Bottom: THE PROMOTERS OF CULTURE AND MUSIC */}
        <text fontFamily="sans-serif" fontSize="8" fontWeight="800" fill="#111111" letterSpacing="0.9">
          <textPath href="#logo-text-bottom" startOffset="50%" textAnchor="middle">
            THE PROMOTERS OF CULTURE AND MUSIC
          </textPath>
        </text>

        {/* Central AG Graphics block */}
        <g transform="translate(0, -4)">
          {/* 'A' in Kelly Green */}
          <text 
            x="74" 
            y="110" 
            fontFamily="sans-serif" 
            fontSize="48" 
            fontWeight="900" 
            fill="#129207"
            textAnchor="middle"
          >
            A
          </text>
          
          {/* 'G' in Royal Blue */}
          <text 
            x="124" 
            y="110" 
            fontFamily="sans-serif" 
            fontSize="48" 
            fontWeight="900" 
            fill="#0062C4"
            textAnchor="middle"
          >
            G
          </text>

          {/* Central Swoosh crossing the letters */}
          <path 
            d="M 58,95 Q 100,75 138,82 Q 100,81 58,95" 
            fill="#0062C4" 
          />
          
          {/* Accent Line under AG */}
          <line x1="62" y1="116" x2="138" y2="116" stroke="#129207" strokeWidth="2" />

          {/* "AG MEDIA" horizontal text */}
          <text 
            x="100" 
            y="134" 
            fontFamily="sans-serif" 
            fontSize="15" 
            fontWeight="900" 
            fill="#0062C4"
            letterSpacing="0.8"
            textAnchor="middle"
          >
            AG MEDIA
          </text>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-lg sm:text-xl md:text-2xl font-black tracking-tight text-charcoal-900 leading-tight flex items-center space-x-1">
            <span>AG MEDIA</span>
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-wider sm:tracking-widest text-clay-500 font-sans uppercase font-bold mt-0.5 whitespace-nowrap">
            Promoters of Culture & Music
          </span>
        </div>
      )}
    </div>
  );
}
