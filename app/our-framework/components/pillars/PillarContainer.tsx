'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PillarCard from './PillarCard';
import { Pillar } from './types';

const pillars: Pillar[] = [
  {
    id: 'values',
    title: 'Common Values, Goals, & Dreams',
    description: 'This pillar examines how well partners align on foundational life philosophies, future plans, and individual ambitions.',
    subAreas: [
      {
        title: 'Shared Future Plans',
        description: 'Couples are evaluated on their ability to align on long-term objectives, such as marriage, parenthood, career aspirations, and lifestyle choices.'
      },
      {
        title: 'Life Philosophy Congruence',
        description: 'Addresses deeper existential and moral questions, including religious beliefs, ethical stances, and cultural values.'
      },
      {
        title: 'Individual Goal Support',
        description: 'Evaluates whether partners champion each other\'s career goals, creative pursuits, and personal growth.'
      }
    ]
  },
  {
    id: 'intimacy',
    title: 'Emotional & Physical Intimacy',
    description: 'Focuses on the depth of emotional connection and physical compatibility between partners.',
    subAreas: [
      {
        title: 'Emotional Vulnerability',
        description: 'Ability to share feelings, fears, and desires openly while feeling emotionally safe and understood.'
      },
      {
        title: 'Physical Connection',
        description: 'Compatibility in physical intimacy, affection expression, and mutual satisfaction in intimate moments.'
      },
      {
        title: 'Quality Time & Bonding',
        description: 'Dedication to maintaining emotional closeness through shared experiences and meaningful interactions.'
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication & Conflict Resolution',
    description: 'Evaluates the effectiveness of dialogue patterns and ability to navigate disagreements constructively.',
    subAreas: [
      {
        title: 'Active Listening',
        description: 'Capacity to truly hear and understand partner\'s perspective without immediate judgment or defense.'
      },
      {
        title: 'Conflict Management',
        description: 'Skills in addressing disagreements respectfully, finding compromises, and maintaining connection during disputes.'
      },
      {
        title: 'Daily Communication',
        description: 'Effectiveness in routine information sharing, emotional expression, and maintaining open dialogue.'
      }
    ]
  },
  {
    id: 'trust',
    title: 'Trust & Mutual Support',
    description: 'Measures the foundation of reliability, loyalty, and reciprocal care in the relationship.',
    subAreas: [
      {
        title: 'Reliability & Consistency',
        description: 'Dependability in following through on commitments and maintaining consistent behavior patterns.'
      },
      {
        title: 'Emotional Safety',
        description: 'Creating an environment where both partners feel secure sharing vulnerabilities and concerns.'
      },
      {
        title: 'Mutual Support System',
        description: 'Active participation in supporting each other through challenges, stress, and personal growth.'
      }
    ]
  }
];

const PillarContainer = () => {
  return (
    <section id="pillars" className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            The Four Pillars
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our framework is built on four fundamental pillars that form the foundation of healthy relationships.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PillarCard pillar={pillar} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarContainer;