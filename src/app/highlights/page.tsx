import React from 'react';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import HighlightsGallery from '@/components/sections/HighlightsGallery';

async function getAllPosters() {
  try {
    await connectDB();
    const posters = await Content.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posters));
  } catch (error) {
    console.error("Error fetching all posters:", error);
    return [];
  }
}

export default async function HighlightsPage() {
  const posters = await getAllPosters();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-sm uppercase tracking-[0.4em] text-[var(--accent)] font-medium mb-4">Gallery</h1>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-glow">Restaurant Highlights</h2>
          <div className="w-24 h-[2px] bg-[var(--accent)] mx-auto mt-8"></div>
        </div>

        <HighlightsGallery initialPosters={posters} />
      </div>
    </div>
  );
}
