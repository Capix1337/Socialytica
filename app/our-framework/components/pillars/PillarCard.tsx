'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pillar } from './types';
import PillarDetails from './PillarDetails';

interface PillarCardProps {
  pillar: Pillar;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {pillar.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {pillar.description}
        </p>
        <button
          className="text-primary hover:text-primary/80 font-medium transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Show Less' : 'Learn More'} 
          <span className="ml-1" aria-hidden="true">
            {isExpanded ? '↑' : '↓'}
          </span>
        </button>
      </div>

      <PillarDetails
        isExpanded={isExpanded}
        pillar={pillar}
      />
    </motion.div>
  );
};

export default PillarCard;