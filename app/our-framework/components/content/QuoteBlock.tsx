'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  source?: string;
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  author,
  source,
  className = '',
}) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl border-l-4 border-l-primary bg-card p-6 shadow-sm ${className}`}
    >
      {/* Quote Symbol */}
      <div className="absolute top-4 right-4 text-4xl text-primary/10">
        &quot;
      </div>

      {/* Quote Content */}
      <div className="relative">
        <p className="text-lg text-foreground italic mb-4">
          {quote}
        </p>
        
        {(author || source) && (
          <footer className="mt-2">
            {author && (
              <cite className="block text-sm font-medium text-foreground not-italic">
                — {author}
              </cite>
            )}
            {source && (
              <span className="block text-xs text-muted-foreground mt-1">
                {source}
              </span>
            )}
          </footer>
        )}
      </div>
    </motion.blockquote>
  );
};

export default QuoteBlock;