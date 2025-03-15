import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChartResultsPage({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const name = searchParams.name || "Friend";

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
              <div className="text-center text-muted-foreground">
                <p>Chart visualization will appear here</p>
                <p className="text-sm">(Backend integration pending)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Planetary Positions</CardTitle>
              <CardDescription>
                The location of planets at your time of birth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense fallback={<div>Loading planetary data...</div>}>
                <div className="text-center text-muted-foreground">
                  <p>Planetary positions will appear here</p>
                  <p className="text-sm">(Backend integration pending)</p>
                </div>
              </Suspense>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Your Astrological Reading</CardTitle>
            <CardDescription>
              Personalized insights generated with GPT-4o
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Generating your personalized reading...</div>}>
              <div className="prose prose-invert max-w-none">
                <p className="text-center text-muted-foreground">
                  Your personalized reading will appear here once the backend is integrated.
                </p>
              </div>
            </Suspense>
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
