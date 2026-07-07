import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function Logo({ className = '', size = 80, animated = false }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="25 40 350 318"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Rising Sun Rays (Arch over the top) */}
        <g className={animated ? "animate-[pulse_3s_infinite]" : ""}>
          {/* Radial glow background */}
          <circle cx="200" cy="150" r="75" fill="url(#sunGlow)" />
          <circle cx="200" cy="150" r="45" fill="url(#sunInner)" />

          {/* Saffron-yellow radiating triangular sunrays */}
          {Array.from({ length: 13 }).map((_, i) => {
            const startAngle = 195;
            const endAngle = 345;
            const angle = startAngle + (i * (endAngle - startAngle)) / 12;
            const rad = (angle * Math.PI) / 180;
            
            // Triangle base on the sun rim
            const baseLeftRad = ((angle - 5) * Math.PI) / 180;
            const baseRightRad = ((angle + 5) * Math.PI) / 180;
            
            const rInner = 60;
            const rOuter = 100;
            
            const x1 = 200 + rInner * Math.cos(baseLeftRad);
            const y1 = 150 + rInner * Math.sin(baseLeftRad);
            const x2 = 200 + rInner * Math.cos(baseRightRad);
            const y2 = 150 + rInner * Math.sin(baseRightRad);
            const xTip = 200 + rOuter * Math.cos(rad);
            const yTip = 150 + rOuter * Math.sin(rad);

            return (
              <polygon
                key={i}
                points={`${x1},${y1} ${xTip},${yTip} ${x2},${y2}`}
                fill="url(#rayGradient)"
                opacity="0.9"
              />
            );
          })}
        </g>

        {/* Central Dharma Wheel (Dharmachakra) */}
        <g className={animated ? "animate-[spin_60s_linear_infinite] origin-[200px_150px]" : "origin-[200px_150px]"}>
          {/* Outer Ring Shadow and Border */}
          <circle cx="200" cy="150" r="49" stroke="#b8860b" strokeWidth="1.5" fill="none" />
          
          {/* Main Gold Outer Rim */}
          <circle cx="200" cy="150" r="44" stroke="url(#goldGradient)" strokeWidth="8" fill="none" />
          <circle cx="200" cy="150" r="39" stroke="#8b6508" strokeWidth="0.8" fill="none" />
          <circle cx="200" cy="150" r="48" stroke="#ffd700" strokeWidth="0.8" fill="none" />

          {/* Inner Rim */}
          <circle cx="200" cy="150" r="32" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" />
          <circle cx="200" cy="150" r="30" stroke="#8b6508" strokeWidth="0.5" fill="none" />

          {/* Hub - concentric rings */}
          <circle cx="200" cy="150" r="14" fill="url(#goldGradient)" stroke="#8b6508" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="10" fill="#fff" stroke="#ffd700" strokeWidth="1" />
          <circle cx="200" cy="150" r="5" fill="#0d47a1" />

          {/* 8 Spokes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const xStart = 200 + 14 * cos;
            const yStart = 150 + 14 * sin;
            const xEnd = 200 + 38 * cos;
            const yEnd = 150 + 38 * sin;

            return (
              <g key={i}>
                {/* Main Spoke Line */}
                <line
                  x1={xStart}
                  y1={yStart}
                  x2={xEnd}
                  y2={yEnd}
                  stroke="url(#goldGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Spoke dark core outline */}
                <line
                  x1={xStart}
                  y1={yStart}
                  x2={xEnd}
                  y2={yEnd}
                  stroke="#8b6508"
                  strokeWidth="1.2"
                />
                {/* Spoke Decorative center diamonds */}
                <circle
                  cx={200 + 26 * cos}
                  cy={150 + 26 * sin}
                  r="3"
                  fill="#ffd700"
                  stroke="#8b6508"
                  strokeWidth="0.8"
                />
                {/* Spoke Head Knobs on Outer Rim */}
                <circle
                  cx={200 + 44 * cos}
                  cy={150 + 44 * sin}
                  r="4.5"
                  fill="#ffd700"
                  stroke="#8b6508"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </g>

        {/* LEFT SIDE: CUPS-SHAPED GREEN HANDS, PLANT & RED HEART WITH OPEN BOOK */}
        <g id="left-group">
          {/* Green Plant Cupped Hand */}
          <path
            d="M 52,175 C 50,162 60,154 75,158 C 84,160 88,168 90,174 C 82,171 74,169 66,172 C 60,174 56,178 54,182"
            stroke="#2e7d32"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Green Sprout & Leaves */}
          <path d="M 68,158 Q 70,145 71,135" stroke="#2e7d32" strokeWidth="2.5" fill="none" />
          {/* Left Leaf */}
          <path d="M 69,146 Q 58,142 63,134 Q 69,136 69,146" fill="#4caf50" stroke="#2e7d32" strokeWidth="0.5" />
          {/* Right Leaf */}
          <path d="M 70,142 Q 81,139 76,131 Q 70,133 70,142" fill="#1b5e20" stroke="#2e7d32" strokeWidth="0.5" />
          {/* Top Leaf */}
          <path d="M 71,135 Q 71,122 75,124 Q 73,132 71,135" fill="#4caf50" stroke="#2e7d32" strokeWidth="0.5" />

          {/* Red Heart Cradled by Orange/Peach Hands */}
          {/* Orange cradling hands */}
          <path
            d="M 102,178 C 104,169 114,168 122,174 C 114,178 106,178 102,178"
            stroke="#e65100"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 106,181 C 112,172 124,171 130,178 C 122,181 114,182 106,181"
            stroke="#ff8f00"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Red Heart */}
          <path
            d="M 115,160 C 108,148 100,158 116,172 C 132,158 124,148 117,160 C 116,155 116,155 115,160 Z"
            fill="#d32f2f"
            stroke="#c62828"
            strokeWidth="0.5"
          />

          {/* Open Book beneath sprout and heart */}
          {/* Left page */}
          <path
            d="M 94,191 Q 80,184 60,189 L 60,197 Q 80,192 94,199 Z"
            fill="#ffffff"
            stroke="#ff6f00"
            strokeWidth="1.5"
          />
          {/* Right page */}
          <path
            d="M 94,191 Q 108,184 128,189 L 128,197 Q 108,192 94,199 Z"
            fill="#ffffff"
            stroke="#ff6f00"
            strokeWidth="1.5"
          />
        </g>

        {/* RIGHT SIDE: DOCTOR WITH STETHOSCOPE, PRAYING FIGURE, HOUSE & FAMILY */}
        <g id="right-group">
          {/* Doctor with white coat and blue mask */}
          {/* White coat shoulders */}
          <path
            d="M 252,185 C 255,168 261,159 272,159 L 282,159 C 293,159 299,168 302,185 Z"
            fill="#ffffff"
            stroke="#1565c0"
            strokeWidth="1.5"
          />
          {/* Blue scrub V-neck */}
          <path d="M 272,159 L 277,168 L 282,159 Z" fill="#1565c0" />
          
          {/* Face and Head */}
          <circle cx="277" cy="145" r="10" fill="#ffcc80" stroke="#1565c0" strokeWidth="0.8" />
          
          {/* Blue doctor surgical cap */}
          <path d="M 267,141 Q 277,133 287,141 Z" fill="#1e88e5" />
          
          {/* Surgical face mask */}
          <path d="M 270,147 Q 277,152 284,147 L 282,143 Q 277,142 272,143 Z" fill="#e0f7fa" stroke="#00acc1" strokeWidth="0.8" />
          <line x1="270" y1="145" x2="267" y2="147" stroke="#00acc1" strokeWidth="0.5" />
          <line x1="284" y1="145" x2="287" y2="147" stroke="#00acc1" strokeWidth="0.5" />

          {/* Hanging Stethoscope */}
          <path d="M 270,147 Q 270,166 277,170 Q 284,166 284,147" stroke="#37474f" strokeWidth="1.2" fill="none" />
          <circle cx="277" cy="170" r="2" fill="#cfd8dc" stroke="#37474f" strokeWidth="0.8" />

          {/* Dark Blue Praying Silhouette (Hands folded in Namaste) */}
          <circle cx="304" cy="148" r="7.5" fill="#0d47a1" />
          <path
            d="M 293,185 C 295,172 299,163 306,163 Q 309,171 312,163 C 318,163 322,172 324,185 Z"
            fill="#0d47a1"
          />
          {/* Folded hands (line detail) */}
          <path d="M 306,165 Q 308,157 310,165" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* House and Family Silhouette */}
          {/* House Silhouette */}
          <path d="M 324,174 L 336,161 L 348,174 L 348,185 L 324,185 Z" fill="#1565c0" />
          {/* Chimney */}
          <path d="M 342,161 L 342,154 L 345,154 L 345,164 Z" fill="#1565c0" />
          
          {/* Family Silhouettes */}
          {/* Figure 1 (Parent) */}
          <circle cx="330" cy="175" r="2" fill="#0d47a1" />
          <path d="M 328.5,185 L 328.5,177 L 331.5,177 L 331.5,185" fill="#0d47a1" />
          
          {/* Figure 2 (Parent) */}
          <circle cx="337" cy="173" r="2" fill="#0d47a1" />
          <path d="M 335.5,185 L 335.5,175 L 338.5,175 L 338.5,185" fill="#0d47a1" />
          
          {/* Figure 3 (Child) */}
          <circle cx="343" cy="179" r="1.2" fill="#0d47a1" />
          <path d="M 342,185 L 342,180.2 L 344,180.2 L 344,185" fill="#0d47a1" />
        </g>

        {/* NAVY BLUE SEPARATING TWIN CURVES */}
        <g id="navy-dividing-curves">
          <path
            d="M 35,210 Q 200,221 365,210"
            stroke="#1a237e"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 45,216 Q 200,226 355,216"
            stroke="#311b92"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* TEXT SECTION: ORANGE-RED AND GREEN DEVANAGARI TYPOGRAPHY */}
        <g id="typography">
          {/* धर्मार्थ जनकल्याण */}
          <text
            x="200"
            y="256"
            textAnchor="middle"
            fill="#e65100"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1"
            className="font-extrabold select-none"
          >
            धर्मार्थ जनकल्याण
          </text>

          {/* फाउंडेशन */}
          <text
            x="200"
            y="290"
            textAnchor="middle"
            fill="#2e7d32"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1"
            className="font-extrabold select-none"
          >
            फाउंडेशन
          </text>
        </g>

        {/* BOTTOM SECTION: TRICOLOR NATIONAL WAVES & SACRED OM (ॐ) */}
        <g id="national-waves">
          {/* Orange Ribbon Wave (Left-centered) */}
          <path
            d="M 75,314 Q 200,346 325,314 Q 262,336 200,336 Q 138,336 75,314 Z"
            fill="#ff6f00"
          />
          
          {/* Green Ribbon Wave (Right-centered) */}
          <path
            d="M 95,328 Q 200,358 305,328 Q 252,348 200,348 Q 148,348 95,328 Z"
            fill="#2e7d32"
          />

          {/* Sacred Devanagari Om Symbol (ॐ) in Bottom Center */}
          <g transform="translate(186, 300) scale(0.72)" className={animated ? "animate-[pulse_2.5s_infinite]" : ""}>
            <path
              d="M 14,21 C 11,21 8,19 6,16 C 4,13 4,9 7,6 C 10,3 15,3 18,6 C 21,9 21,13 18,16 M 18,16 C 22,16 26,19 27,23 C 28,27 26,31 22,33 C 18,35 12,34 9,31 M 18,16 C 23,16 28,14 30,10 M 30,10 Q 33,4 31,1"
              stroke="#e65100"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 28,13 C 33,13 36,9 35,4"
              stroke="#e65100"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Chandrabindu Dot */}
            <circle cx="34" cy="1" r="2.2" fill="#e65100" />
          </g>
        </g>

        {/* DEFINITIONS FOR GRADIENTS AND FILTERS */}
        <defs>
          {/* Sun background glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9c4" stopOpacity="1" />
            <stop offset="60%" stopColor="#ffecb3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="sunInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe082" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
          </radialGradient>

          {/* Sun Ray Gradient */}
          <linearGradient id="rayGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffe082" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffb300" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff6f00" stopOpacity="1" />
          </linearGradient>

          {/* Gold Gradient for the Wheel */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="35%" stopColor="#e0a910" />
            <stop offset="70%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
