'use client';

import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

interface PillarNode {
  id: string;
  label: string;
  score: number;
}

interface SynergyLink {
  source: string;
  target: string;
  strength: number;
}

interface SynergyGraphProps {
  pillars: PillarNode[];
  relationships: SynergyLink[];
}

const SynergyGraph: React.FC<SynergyGraphProps> = ({ pillars, relationships }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGraph = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate positions (circular layout)
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      const radius = Math.min(center.x, center.y) - 60;
      
      const pillarPositions = new Map<string, { x: number; y: number }>();
      
      // Position pillars in a circle
      pillars.forEach((pillar, index) => {
        const angle = (index / pillars.length) * 2 * Math.PI;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        pillarPositions.set(pillar.id, { x, y });
      });

      // Draw relationships
      relationships.forEach(rel => {
        const source = pillarPositions.get(rel.source);
        const target = pillarPositions.get(rel.target);
        
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = `rgba(var(--primary), ${rel.strength})`;
          ctx.lineWidth = rel.strength * 3;
          ctx.stroke();
        }
      });

      // Draw pillar nodes
      pillars.forEach(pillar => {
        const pos = pillarPositions.get(pillar.id);
        if (pos) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
          ctx.fillStyle = 'hsl(var(--primary))';
          ctx.fill();
          
          // Add labels
          ctx.fillStyle = 'hsl(var(--primary-foreground))';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '12px sans-serif';
          ctx.fillText(pillar.label, pos.x, pos.y);
        }
      });
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGraph();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [pillars, relationships]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card rounded-xl border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Pillar Synergy Visualization
      </h3>
      
      <canvas
        ref={canvasRef}
        className="w-full aspect-square"
        style={{ maxHeight: '600px' }}
      />
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Line thickness represents relationship strength between pillars
      </div>
    </div>
  );
};

export default SynergyGraph;