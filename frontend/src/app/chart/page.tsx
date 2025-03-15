import { BirthChartForm } from "@/components/BirthChartForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChartPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
            Create Your Birth Chart
          </CardTitle>
          <CardDescription className="text-center">
            Enter your birth details to generate a personalized astrological chart and reading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BirthChartForm />
        </CardContent>
      </Card>
    </main>
  );
}
