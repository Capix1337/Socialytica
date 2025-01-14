'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TheoryCard {
  title: string;
  description: string;
}

const theories: TheoryCard[] = [
  {
    title: "Family Systems Theory",
    description: "Highlights the interdependence of individuals within a relational system. Dysfunction in one area can ripple across the entire relationship, triggering conflict and dissatisfaction in seemingly unrelated areas."
  },
  {
    title: "Attachment Theory",
    description: "Groundbreaking work by John Bowlby and Mary Ainsworth underscored the importance of trust, emotional security, and reliability. The FPRT incorporates these principles by assessing trust and loyalty impacts."
  },
  {
    title: "Behavioral-Cognitive Models",
    description: "Explores tangible behaviors and thought patterns that influence relational outcomes. Focuses on conflict resolution styles, emotional disclosure, and active listening as key elements."
  }
];

const TheorySection = () => {
  return (
    <section id="theory" className="bg-card py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Theory Behind the Test
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our framework is built on decades of research and insights from leading 
              psychological and sociological theories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {theories.map((theory, index) => (
              <motion.div
                key={theory.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                className="relative rounded-2xl border border-border bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-xl font-semibold leading-7 text-foreground">
                  {theory.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground">
                  {theory.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 text-center text-base text-muted-foreground"
          >
            By integrating these theoretical perspectives, the FPRT provides a comprehensive 
            framework for understanding and improving relationships.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TheorySection;