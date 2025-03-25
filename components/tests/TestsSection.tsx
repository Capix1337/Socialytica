import { motion } from "framer-motion";
import TestsCarousel from "./TestsCarousel";

export default function TestsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-4">
            Science-Based Tests for Real Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful insights with our expertly designed personality and relationship assessments
          </p>
        </motion.div>

        <TestsCarousel />
      </div>
    </section>
  );
}
