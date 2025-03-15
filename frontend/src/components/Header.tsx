import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-purple-400" />
          <span className="font-bold text-lg">Stellar Insights</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/chart" className="text-sm font-medium hover:text-primary transition-colors">
            Birth Chart
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/chart">Create Chart</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
