"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Planet {
  name: string;
  sign: string;
  degrees: number;
  house?: number;
  retrograde: boolean;
}

interface PlanetPositionsProps {
  planets: Planet[];
}

// Sign symbols mapping
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

export function PlanetPositions({ planets }: PlanetPositionsProps) {
  if (!planets || planets.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No planetary data available</p>
      </div>
    );
  }

  // Sort planets in a traditional order
  const traditionalOrder = [
    "Sun", "Moon", "Mercury", "Venus", "Mars", 
    "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
    "North Node", "South Node", "Chiron"
  ];
  
  const sortedPlanets = [...planets].sort((a, b) => {
    return traditionalOrder.indexOf(a.name) - traditionalOrder.indexOf(b.name);
  });

  return (
    <div className="grid grid-cols-1 gap-2">
      {sortedPlanets.map((planet) => {
        const planetSymbol = planetSymbols[planet.name] || '';
        const signSymbol = signSymbols[planet.sign] || '';
        
        return (
          <Card key={planet.name} className="bg-card/60">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{planetSymbol}</span>
                  <span className="font-medium">{planet.name}</span>
                  {planet.retrograde && (
                    <span className="ml-2 text-xs text-red-400">Retrograde</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">{signSymbol}</span>
                  <span>{planet.sign}</span>
                  <span className="text-sm ml-2 text-muted-foreground">
                    {planet.degrees.toFixed(1)}°
                  </span>
                  {planet.house && (
                    <span className="text-sm ml-3 px-2 py-1 bg-secondary/40 rounded-md">
                      House {planet.house}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
