'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InfoBlockProps {
  title?: string;
  content: string | React.ReactNode;
  variant?: 'default' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
  className?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  content,
  variant = 'default',
  icon,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-card border-border',
    warning: 'bg-destructive/10 border-destructive/20 text-destructive',
    info: 'bg-primary/10 border-primary/20',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-lg border p-4
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {title && (
            <h4 className="font-medium text-foreground">
              {title}
            </h4>
          )}
        </div>
      )}
      
      <div className={`text-sm ${
        variant === 'default' ? 'text-muted-foreground' : ''
      }`}>
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
};

export default InfoBlock;