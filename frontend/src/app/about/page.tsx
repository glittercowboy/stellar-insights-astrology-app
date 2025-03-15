import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex justify-center items-center p-4 md:p-24">
      <Card className="max-w-3xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
            About Stellar Insights
          </CardTitle>
          <CardDescription className="text-center">
            A modern approach to ancient astrological wisdom
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground">
              Stellar Insights combines the ancient practice of astrology with modern technology to provide 
              you with personalized, detailed insights about your astrological birth chart. Our mission is 
              to make astrology accessible and meaningful for everyone, regardless of their prior knowledge.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">The Technology</h2>
            <p className="text-muted-foreground">
              We utilize the Swiss Ephemeris for precise astronomical calculations, ensuring that your 
              birth chart is generated with the highest accuracy. Paired with advanced AI technology 
              through GPT-4o, we create personalized readings that interpret your unique planetary 
              positions and aspects.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Privacy & Data</h2>
            <p className="text-muted-foreground">
              We respect your privacy. Your birth data is only used to generate your astrological chart 
              and readings. We do not store or share your personal information with third parties. All 
              chart calculations are performed securely on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
            <p className="text-muted-foreground">
              Astrology is an ancient practice that many find meaningful, but it is not scientifically 
              validated. The readings provided should be considered for entertainment and reflection 
              purposes only. Important life decisions should not be based solely on astrological advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
