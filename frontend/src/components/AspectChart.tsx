"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
}

interface AspectChartProps {
  aspects: Aspect[];
}

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

// Aspect symbols
const aspectSymbols: Record<string, string> = {
  "Conjunction": "☌",
  "Opposition": "☍",
  "Trine": "△",
  "Square": "□",
  "Sextile": "⚹"
};

// Aspect colors
const aspectColors: Record<string, string> = {
  "Conjunction": "bg-blue-500",
  "Opposition": "bg-red-500",
  "Trine": "bg-green-500",
  "Square": "bg-orange-500",
  "Sextile": "bg-purple-500"
};

export function AspectChart({ aspects }: AspectChartProps) {
  if (!aspects || aspects.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No aspect data available</p>
      </div>
    );
  }

  // We'll focus just on traditional major aspects
  const majorAspects = aspects.filter(
    (aspect) => [
      "Conjunction", "Opposition", "Trine", "Square", "Sextile"
    ].includes(aspect.aspect)
  );

  // Sort by aspect type and orb (closer orbs first)
  const sortedAspects = [...majorAspects].sort((a, b) => {
    if (a.aspect !== b.aspect) {
      const aspectOrder = [
        "Conjunction", "Opposition", "Trine", "Square", "Sextile"
      ];
      return aspectOrder.indexOf(a.aspect) - aspectOrder.indexOf(b.aspect);
    }
    return Math.abs(a.orb) - Math.abs(b.orb);
  });

  // Take only the first 12 aspects to avoid overwhelming display
  const limitedAspects = sortedAspects.slice(0, 12);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {limitedAspects.map((aspect, index) => {
        const aspectSymbol = aspectSymbols[aspect.aspect] || '';
        const planet1Symbol = planetSymbols[aspect.planet1] || '';
        const planet2Symbol = planetSymbols[aspect.planet2] || '';
        const colorClass = aspectColors[aspect.aspect] || 'bg-gray-500';
        
        return (
          <Card key={index} className="bg-card/60">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-lg mr-1">{planet1Symbol}</span>
                  <span className="text-sm">{aspect.planet1}</span>
                </div>
                <div className="flex items-center mx-1">
                  <span className={`text-xl mx-2 px-2 py-1 rounded-full text-black ${colorClass}`}>
                    {aspectSymbol}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-1">{planet2Symbol}</span>
                  <span className="text-sm">{aspect.planet2}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  {Math.abs(aspect.orb).toFixed(1)}°
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
