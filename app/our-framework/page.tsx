// app/our-framework/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hero and Theory Components
import FrameworkHero from './components/hero/FrameworkHero';
import TheorySection from './components/hero/TheorySection';

// Pillar Components
import PillarContainer from './components/pillars/PillarContainer';
import PillarNavigation from './components/interactive/PillarNavigation';

// Interactive Components
import ThresholdVisualizer from './components/interactive/ThresholdVisualizer';
import SynergyGraph from './components/interactive/SynergyGraph';

// Content Components
// import TheoryCard from './components/content/TheoryCard';
import InfoBlock from './components/content/InfoBlock';
import QuoteBlock from './components/content/QuoteBlock';

// Loading and Error Components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const ErrorBlock = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <InfoBlock
      variant="warning"
      title="Error Loading Framework"
      content={message}
    />
  </div>
);

// Framework Data
const frameworkData = {
  pillarScores: [
    { name: 'Common Values, Goals, & Dreams', score: 7.5, threshold: 6.0 },
    { name: 'Sexuality', score: 6.8, threshold: 6.0 },
    { name: 'Communication & Conversation', score: 8.2, threshold: 6.0 },
    { name: 'Trust & Loyalty', score: 7.9, threshold: 6.0 },
  ],
  synergePillars: [
    { id: 'values', label: 'Values & Goals', score: 7.5 },
    { id: 'sexuality', label: 'Sexuality', score: 6.8 },
    { id: 'communication', label: 'Communication', score: 8.2 },
    { id: 'trust', label: 'Trust', score: 7.9 },
  ],
  synergyRelationships: [
    { source: 'values', target: 'trust', strength: 0.8 },
    { source: 'communication', target: 'trust', strength: 0.9 },
    { source: 'sexuality', target: 'communication', strength: 0.7 },
    { source: 'values', target: 'communication', strength: 0.85 },
    { source: 'trust', target: 'sexuality', strength: 0.75 },
    { source: 'values', target: 'sexuality', strength: 0.6 },
  ],
};

export default function FrameworkPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const loadFramework = async () => {
      try {
        // Simulate data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        // Properly handle the error
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    loadFramework();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorBlock message={error} />;

  return (
    <AnimatePresence>
      <main className="min-h-screen bg-background">
        {/* Fixed Navigation */}
        <div className="fixed top-4 left-0 right-0 z-50 px-4">
          <PillarNavigation activeSection={activeSection} />
        </div>

        {/* Hero Section */}
        <section id="hero">
          <FrameworkHero />
        </section>

        {/* Theory Section */}
        <section id="theory" className="py-20">
          <TheorySection />
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pillars Section */}
          <section id="pillars" className="py-20">
            <PillarContainer />
          </section>

          {/* Threshold Analysis */}
          <section id="thresholds" className="py-20 bg-card/50 rounded-3xl my-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  Relationship Health Indicators
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Visualizing the current state of each pillar against established thresholds.
                </p>
              </div>
              <ThresholdVisualizer pillarScores={frameworkData.pillarScores} />
            </motion.div>
          </section>

          {/* Synergy Analysis */}
          <section id="synergy" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                  Pillar Synergy Analysis
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding how different aspects of your relationship interact.
                </p>
              </div>
              <SynergyGraph 
                pillars={frameworkData.synergePillars}
                relationships={frameworkData.synergyRelationships}
              />
            </motion.div>
          </section>

          {/* Call to Action */}
          <section id="cta" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <QuoteBlock
                quote="Understanding your relationship dynamics is the first step toward creating lasting bonds."
                author="FPRT Framework"
                className="mb-8"
              />
              
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Take the Assessment
                </button>
                <button className="px-6 py-3 rounded-full border border-border hover:bg-accent transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Footer Space */}
        <div className="h-24" />
      </main>
    </AnimatePresence>
  );
}