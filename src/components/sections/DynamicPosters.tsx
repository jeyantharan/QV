import React from 'react';
import connectDB from '@/lib/mongodb';
import Content from '@/lib/models/Content';
import PosterShowcase from './PosterShowcase';

async function getPosters() {
  try {
    await connectDB();
    const posters = await Content.find({}).sort({ createdAt: -1 }).limit(10);
    return JSON.parse(JSON.stringify(posters));
  } catch (error) {
    console.error("Error fetching posters:", error);
    return [];
  }
}

export default async function DynamicPosters() {
  const posters = await getPosters();

  if (!posters || posters.length === 0) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--accent)] font-medium mb-3">Highlights</h2>
          <h3 className="text-4xl md:text-5xl font-playfair font-bold text-glow">Special Announcements</h3>
        </div>

        <PosterShowcase posters={posters} />
      </div>
    </section>
  );
}
