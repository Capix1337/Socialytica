'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubArea } from './types';

interface SubAreaListProps {
  subAreas: SubArea[];
}

const SubAreaList: React.FC<SubAreaListProps> = ({ subAreas }) => {
  return (
    <ul className="space-y-4">
      {subAreas.map((subArea, index) => (
        <motion.li
          key={subArea.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg bg-background p-4"
        >
          <h5 className="text-base font-medium text-foreground mb-2">
            {subArea.title}
          </h5>
          <p className="text-sm text-muted-foreground">
            {subArea.description}
          </p>
        </motion.li>
      ))}
    </ul>
  );
};

export default SubAreaList;