'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ThresholdProps {
  pillarScores: {
    name: string;
    score: number;
    threshold: number;
  }[];
}

const ThresholdVisualizer: React.FC<ThresholdProps> = ({ pillarScores }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card rounded-xl border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Pillar Thresholds & Scores
      </h3>
      
      <div className="space-y-6">
        {pillarScores.map((pillar) => (
          <div key={pillar.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">{pillar.name}</span>
              <span className="text-muted-foreground">
                Score: {pillar.score.toFixed(1)} / 10
              </span>
            </div>
            
            <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
              {/* Threshold line */}
              <div
                className="absolute h-full w-px bg-destructive"
                style={{ left: `${pillar.threshold * 10}%` }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-destructive" />
              </div>
              
              {/* Score bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pillar.score * 10}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${
                  pillar.score >= pillar.threshold
                    ? 'bg-primary'
                    : 'bg-destructive'
                }`}
              />
            </div>
            
            {pillar.score < pillar.threshold && (
              <p className="text-xs text-destructive">
                Below threshold ({pillar.threshold.toFixed(1)}) - Attention needed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThresholdVisualizer;