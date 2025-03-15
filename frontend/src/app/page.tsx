import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          Stellar Insights
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-slate-300">
          Discover your cosmic blueprint with our modern astrology app
        </p>
        <div className="space-y-4">
          <p className="text-lg text-slate-400 mb-6">
            Generate detailed birth charts and get personalized astrological readings powered by AI.
          </p>
          <Link 
            href="/chart"
            className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-3 text-lg font-medium text-white hover:opacity-90 transition-opacity"
          >
            Create Your Birth Chart
          </Link>
        </div>
      </div>
    </main>
  );
}
