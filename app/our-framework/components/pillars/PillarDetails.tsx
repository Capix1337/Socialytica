'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pillar } from './types';
import SubAreaList from './SubAreaList';

interface PillarDetailsProps {
  isExpanded: boolean;
  pillar: Pillar;
}

const PillarDetails: React.FC<PillarDetailsProps> = ({ isExpanded, pillar }) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-border">
            <h4 className="text-lg font-medium text-foreground mb-3">
              Key Areas
            </h4>
            <SubAreaList subAreas={pillar.subAreas} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PillarDetails;