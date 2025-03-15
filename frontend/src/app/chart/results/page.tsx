"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BirthChart } from "@/components/BirthChart";
import { ChartDetails } from "@/components/ChartDetails";
import { astrologyApi, BirthData, ChartAndReadingData } from "@/lib/api";

// Mock data for fallback/development
import { MOCK_PLANETS, MOCK_ASPECTS, MOCK_READING } from "@/lib/mock-data";

export default function ChartResultsPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Friend";
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [readingContent, setReadingContent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get birth data from session storage
        const birthDataStr = sessionStorage.getItem('birthData');
        
        if (!birthDataStr) {
          // Fallback to mock data if no birth data is found
          setTimeout(() => {
            setChartData({
              planets: MOCK_PLANETS,
              aspects: MOCK_ASPECTS
            });
            setReadingContent(MOCK_READING.replace("[Name]", name));
            setIsLoading(false);
          }, 1000);
          return;
        }

        const birthData: BirthData = JSON.parse(birthDataStr);
        
        // Use real API in production, mock data in development
        if (process.env.NODE_ENV === 'production') {
          const data: ChartAndReadingData = await astrologyApi.generateFullAnalysis(birthData);
          setChartData(data.chart);
          setReadingContent(data.reading.content);
        } else {
          // Simulate API call with mock data in development
          setTimeout(() => {
            setChartData({
              planets: MOCK_PLANETS,
              aspects: MOCK_ASPECTS
            });
            setReadingContent(MOCK_READING.replace("[Name]", name));
          }, 1500);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.detail || "An error occurred while generating your chart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          {name}'s Astrological Chart
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
              ) : chartData?.planets ? (
                <BirthChart planets={chartData.planets} />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>No chart data available</p>
                </div>
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
              ) : chartData?.planets ? (
                <ChartDetails 
                  planets={chartData.planets} 
                  aspects={chartData.aspects || []}
                  houses={chartData.houses || []}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>No planetary data available</p>
                </div>
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
            ) : readingContent ? (
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
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No reading available</p>
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
