'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TheoryCardProps {
  title: string;
  description: string;
  keyPoints?: string[];
  icon?: React.ReactNode;
  className?: string;
}

const TheoryCard: React.FC<TheoryCardProps> = ({
  title,
  description,
  keyPoints,
  icon,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 space-y-2"
        >
          {keyPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default TheoryCard;