// app/our-framework/page.tsx

'use client';

import React from 'react';
import FrameworkHero from './components/hero/FrameworkHero';
import TheorySection from './components/hero/TheorySection';
import PillarContainer from './components/pillars/PillarContainer';
import PillarNavigation from './components/interactive/PillarNavigation';
import ThresholdVisualizer from './components/interactive/ThresholdVisualizer';
import SynergyGraph from './components/interactive/SynergyGraph';

// Sample data for the interactive components
const pillarScores = [
  { name: 'Common Values, Goals, & Dreams', score: 7.5, threshold: 6.0 },
  { name: 'Sexuality', score: 6.8, threshold: 6.0 },
  { name: 'Communication & Conversation', score: 8.2, threshold: 6.0 },
  { name: 'Trust & Loyalty', score: 7.9, threshold: 6.0 },
];

const synergePillars = [
  { id: 'values', label: 'Values & Goals', score: 7.5 },
  { id: 'sexuality', label: 'Sexuality', score: 6.8 },
  { id: 'communication', label: 'Communication', score: 8.2 },
  { id: 'trust', label: 'Trust', score: 7.9 },
];

const synergyRelationships = [
  { source: 'values', target: 'trust', strength: 0.8 },
  { source: 'communication', target: 'trust', strength: 0.9 },
  { source: 'sexuality', target: 'communication', strength: 0.7 },
  { source: 'values', target: 'communication', strength: 0.85 },
  { source: 'trust', target: 'sexuality', strength: 0.75 },
  { source: 'values', target: 'sexuality', strength: 0.6 },
];

export default function FrameworkPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <PillarNavigation />
      </div>

      {/* Hero Section */}
      <FrameworkHero />

      {/* Theory Section */}
      <TheorySection />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillars Section */}
        <section id="pillars" className="py-20">
          <PillarContainer />
        </section>

        {/* Threshold Section */}
        <section id="thresholds" className="py-20 bg-card/50 rounded-3xl my-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Relationship Health Indicators
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visualizing the current state of each pillar against established thresholds for healthy relationships.
              </p>
            </div>
            <ThresholdVisualizer pillarScores={pillarScores} />
          </div>
        </section>

        {/* Synergy Section */}
        <section id="synergy" className="py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Pillar Synergy Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding how different aspects of your relationship interact and influence each other.
              </p>
            </div>
            <SynergyGraph 
              pillars={synergePillars}
              relationships={synergyRelationships}
            />
          </div>
        </section>

        {/* Summary Section */}
        <section id="summary" className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Transform Your Relationship Understanding
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Four-Pillar Relationship Test provides a comprehensive framework for 
              understanding and improving relationships through scientific analysis and 
              practical insights.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Take the Test
              </button>
              <button className="px-6 py-3 rounded-full border border-border hover:bg-accent transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Space */}
      <div className="h-24" />
    </main>
  );
}