import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export const Section = ({ title, children, description }: SectionProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};