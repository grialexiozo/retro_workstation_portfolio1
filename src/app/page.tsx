'use client';

import React from 'react';
import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Terminal />
    </main>
  );
}
