import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="font-bold">Stellar Insights</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 md:mb-0">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/chart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Birth Chart
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Stellar Insights
          </div>
        </div>
      </div>
    </footer>
  );
}
