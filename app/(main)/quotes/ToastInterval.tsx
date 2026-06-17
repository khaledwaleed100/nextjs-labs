'use client';

import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

export default function ToastInterval({ quotes }: { quotes: Quote[] }) {
  const indexRef = useRef(0);

  useEffect(() => {
    if (!quotes || quotes.length === 0) return;

    // Trigger a toast every 5 seconds
    const intervalId = setInterval(() => {
      const currentQuote = quotes[indexRef.current];
      
      toast.success(`"${currentQuote.quote}" - ${currentQuote.author}`, {
        duration: 4000,
      });

      // Move to next quote, loop back to start if at the end
      indexRef.current = (indexRef.current + 1) % quotes.length;
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [quotes]);

  return null; // This component strictly handles logic, no UI rendered directly
}