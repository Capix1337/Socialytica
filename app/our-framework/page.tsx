// app/our-framework/page.tsx
import FrameworkHero from './components/hero/FrameworkHero';
import TheorySection from './components/hero/TheorySection';
import PillarContainer from './components/pillars/PillarContainer';

export default function FrameworkPage() {
  return (
    <main className="min-h-screen bg-background">
      <FrameworkHero />
      <TheorySection />
      <PillarContainer />
      {/* Other sections */}
    </main>
  );
}