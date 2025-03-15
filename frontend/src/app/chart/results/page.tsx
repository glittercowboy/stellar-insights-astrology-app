"use client";

import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BirthChart } from "@/components/BirthChart";
import { ChartDetails } from "@/components/ChartDetails";

// Mock data for development - will be replaced with API data
const MOCK_PLANETS = [
  { name: "Sun", sign: "Aries", degrees: 15.5, house: 10, retrograde: false },
  { name: "Moon", sign: "Cancer", degrees: 8.2, house: 1, retrograde: false },
  { name: "Mercury", sign: "Pisces", degrees: 28.7, house: 9, retrograde: true },
  { name: "Venus", sign: "Taurus", degrees: 2.3, house: 11, retrograde: false },
  { name: "Mars", sign: "Capricorn", degrees: 20.1, house: 7, retrograde: false },
  { name: "Jupiter", sign: "Sagittarius", degrees: 10.8, house: 6, retrograde: false },
  { name: "Saturn", sign: "Libra", degrees: 5.4, house: 4, retrograde: true },
  { name: "Uranus", sign: "Aquarius", degrees: 22.9, house: 8, retrograde: false },
  { name: "Neptune", sign: "Scorpio", degrees: 18.6, house: 5, retrograde: false },
  { name: "Pluto", sign: "Virgo", degrees: 12.3, house: 3, retrograde: false },
];

const MOCK_ASPECTS = [
  { planet1: "Sun", planet2: "Moon", aspect: "Trine", orb: 1.2 },
  { planet1: "Sun", planet2: "Mercury", aspect: "Square", orb: -2.5 },
  { planet1: "Moon", planet2: "Venus", aspect: "Sextile", orb: 0.8 },
  { planet1: "Mars", planet2: "Saturn", aspect: "Opposition", orb: 3.1 },
  { planet1: "Jupiter", planet2: "Uranus", aspect: "Conjunction", orb: -0.5 },
  { planet1: "Venus", planet2: "Neptune", aspect: "Trine", orb: 1.7 },
  { planet1: "Mercury", planet2: "Pluto", aspect: "Square", orb: -2.9 },
  { planet1: "Moon", planet2: "Saturn", aspect: "Opposition", orb: 2.3 },
];

const MOCK_READING = `
# Astrological Reading for [Name]

## Sun in Aries (10th House)
Your Sun in Aries in the 10th house suggests a natural leadership quality and a strong desire for professional achievement. You have a pioneering spirit when it comes to your career and public reputation. This placement gives you courage, initiative, and a competitive edge in your professional endeavors.

## Moon in Cancer (1st House)
With your Moon in Cancer in the 1st house, your emotional nature is very apparent to others. You likely come across as nurturing, sensitive, and protective. This placement suggests strong intuitive abilities and a deep connection to your feelings. Your emotional well-being is closely tied to your sense of security and home.

## Mercury in Pisces (9th House - Retrograde)
Mercury retrograde in Pisces in the 9th house gives you a contemplative and intuitive mind. Your thinking process tends to be more abstract and imaginative than logical. This placement suggests a deep interest in philosophical or spiritual subjects, but you may sometimes struggle to communicate your complex thoughts clearly.

## Venus in Taurus (11th House)
Your Venus in Taurus in the 11th house indicates that you value stable and reliable friendships. You likely attract loyal friends who appreciate your grounded nature. This placement suggests you find pleasure in simple, sensual experiences and may have artistic talents that you share with your social circle.

## Key Aspects

### Sun Trine Moon
This harmonious aspect between your core identity (Sun) and emotional nature (Moon) suggests an inner balance and coherence between your conscious goals and subconscious needs. This alignment helps you feel comfortable with who you are.

### Mars Opposition Saturn
The opposition between Mars and Saturn creates a tension between your drive for action and your sense of caution or limitation. You may sometimes feel frustrated when attempting to push forward with plans but can ultimately achieve sustainable success by balancing assertiveness with patience.

### Jupiter Conjunction Uranus
This powerful aspect combines expansive Jupiter with revolutionary Uranus, suggesting sudden opportunities for growth and a progressive outlook. You likely value freedom and have an interest in humanitarian causes or unconventional philosophies.

## Overall Themes
Your chart shows a balance between fire elements (enthusiasm, action) and water elements (emotion, intuition), suggesting you can both take initiative and remain sensitive to others' needs. The presence of several retrograde planets indicates an introspective quality and a tendency to revisit past experiences for deeper understanding.

The emphasis on the angular houses (1st, 4th, 7th, 10th) in your chart suggests you may play significant roles in your immediate environment and have a strong impact on others. Your chart suggests particular potential in leadership positions that allow you to express both your pioneering spirit and your emotional intelligence.
`;

export default function ChartResultsPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Friend";
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [readingContent, setReadingContent] = useState<string>("");

  // In a real app, we would fetch data from the API
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setTimeout(() => {
        setChartData({
          planets: MOCK_PLANETS,
          aspects: MOCK_ASPECTS
        });
        setReadingContent(MOCK_READING.replace("[Name]", name));
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
  }, [name]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          {name}'s Astrological Chart
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Birth Chart</CardTitle>
              <CardDescription>
                Your celestial blueprint at the time of birth
              </CardDescription>
            </CardHeader>
            <CardContent className="aspect-square flex items-center justify-center">
              {isLoading ? (
                <div className="text-center text-muted-foreground">
                  <p>Calculating chart...</p>
                </div>
              ) : (
                <BirthChart planets={chartData.planets} />
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Planetary Details</CardTitle>
              <CardDescription>
                Explore your planetary positions and aspects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center text-muted-foreground">
                  <p>Loading planetary data...</p>
                </div>
              ) : (
                <ChartDetails 
                  planets={chartData.planets} 
                  aspects={chartData.aspects}
                />
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Your Astrological Reading</CardTitle>
            <CardDescription>
              Personalized insights based on your birth chart
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center text-muted-foreground">
                <p>Generating your personalized reading...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {readingContent.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.replace('# ', '')}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{paragraph.replace('## ', '')}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                  } else {
                    return <p key={index} className="my-3">{paragraph}</p>;
                  }
                })}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/chart">Create Another Chart</Link>
          </Button>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
