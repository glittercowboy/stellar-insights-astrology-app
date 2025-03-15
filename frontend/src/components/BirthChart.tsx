"use client";

import React from 'react';

interface Planet {
  name: string;
  sign: string;
  degrees: number;
  house?: number;
  retrograde: boolean;
}

interface BirthChartProps {
  planets: Planet[];
  aspectsData?: any[];
  housesData?: any[];
}

// Zodiac sign symbols
const signSymbols: Record<string, string> = {
  "Aries": "♈",
  "Taurus": "♉",
  "Gemini": "♊",
  "Cancer": "♋",
  "Leo": "♌",
  "Virgo": "♍",
  "Libra": "♎",
  "Scorpio": "♏",
  "Sagittarius": "♐",
  "Capricorn": "♑",
  "Aquarius": "♒",
  "Pisces": "♓"
};

// Planet symbols
const planetSymbols: Record<string, string> = {
  "Sun": "☉",
  "Moon": "☽",
  "Mercury": "☿",
  "Venus": "♀",
  "Mars": "♂",
  "Jupiter": "♃",
  "Saturn": "♄",
  "Uranus": "♅",
  "Neptune": "♆",
  "Pluto": "♇",
  "North Node": "☊",
  "South Node": "☋",
  "Chiron": "⚷"
};

export function BirthChart({ planets, aspectsData = [], housesData = [] }: BirthChartProps) {
  const radius = 175;
  const centerX = 200;
  const centerY = 200;
  
  // Calculate positions for zodiac signs (12 equal divisions of the circle)
  const getZodiacSignPosition = (index: number) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle };
  };
  
  // Calculate positions for planets based on their degree in the zodiac
  const getPlanetPosition = (sign: string, degree: number, planetIndex: number, totalPlanets: number) => {
    // Get sign index (0-11)
    const signNames = Object.keys(signSymbols);
    const signIndex = signNames.indexOf(sign);
    
    // Convert degrees within sign to overall degrees in the chart
    // (Adjusting for the chart starting at the top with Aries at the right)
    const totalDegree = signIndex * 30 + degree;
    const angleInRadians = ((totalDegree - 90) * Math.PI) / 180;
    
    // Calculate inner radius based on planet index
    const innerRadius = radius * 0.5;
    
    // Calculate position
    const x = centerX + innerRadius * Math.cos(angleInRadians);
    const y = centerY + innerRadius * Math.sin(angleInRadians);
    
    return { x, y };
  };
  
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {/* Background color */}
      <circle cx={centerX} cy={centerY} r={radius + 25} fill="#151525" />
      
      {/* Outer circle */}
      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#444" strokeWidth={1} />
      
      {/* Inner circle */}
      <circle cx={centerX} cy={centerY} r={radius * 0.75} fill="none" stroke="#444" strokeWidth={1} />
      
      {/* Center point */}
      <circle cx={centerX} cy={centerY} r={3} fill="#666" />
      
      {/* Zodiac sign divisions */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = centerX + radius * 0.75 * Math.cos(angle);
        const y1 = centerY + radius * 0.75 * Math.sin(angle);
        const x2 = centerX + radius * Math.cos(angle);
        const y2 = centerY + radius * Math.sin(angle);
        
        return (
          <line
            key={`division-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#444"
            strokeWidth={1}
          />
        );
      })}
      
      {/* Zodiac signs labels */}
      {Object.entries(signSymbols).map((sign, i) => {
        const pos = getZodiacSignPosition(i);
        const outerPos = {
          x: centerX + (radius + 20) * Math.cos(pos.angle),
          y: centerY + (radius + 20) * Math.sin(pos.angle)
        };
        
        return (
          <text
            key={`sign-${sign[0]}`}
            x={outerPos.x}
            y={outerPos.y}
            fontSize="14"
            fill="#ccc"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {sign[1]}
          </text>
        );
      })}
      
      {/* Planets */}
      {planets.map((planet, i) => {
        const pos = getPlanetPosition(planet.sign, planet.degrees, i, planets.length);
        
        return (
          <g key={`planet-${planet.name}`}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={12}
              fill="#222246"
              stroke={planet.retrograde ? "#ff6b6b" : "#6b6bff"}
              strokeWidth={2}
            />
            <text
              x={pos.x}
              y={pos.y}
              fontSize="14"
              fill="#fff"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {planetSymbols[planet.name] || planet.name.charAt(0)}
            </text>
          </g>
        );
      })}
      
      {/* Title label */}
      <text
        x={centerX}
        y={20}
        fontSize="16"
        fontWeight="bold"
        fill="#ccc"
        textAnchor="middle"
      >
        Birth Chart
      </text>
    </svg>
  );
}
