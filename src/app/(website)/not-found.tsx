import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">Page Not Found</h2>
      <p className="text-lg text-white/70 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 text-lg rounded-md"
        >
          Return Home
        </Button>
      </Link>
    </div>
  );
}
