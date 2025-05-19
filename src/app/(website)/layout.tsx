import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

// Define metadata for the website route group
export const metadata: Metadata = {
  title: {
    template: '%s | Slide',
    default: 'Slide - Transform Your Instagram Engagement',
  },
  description: 'Slide revolutionizes how you connect with your audience on Instagram.',
};

// Load Inter font with specific weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

type Props = {
  children: React.ReactNode;
};

export default function WebsiteLayout({ children }: Props) {
  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-gradient-to-b from-[#0a0f2d] to-[#1e2455] text-gray-100`}>
      {/* Main layout */}
      <div className="relative min-h-screen flex flex-col">
        {/* Content area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
