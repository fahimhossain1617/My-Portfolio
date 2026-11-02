import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { DeveloperJourney } from "@/components/DeveloperJourney";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { BackToTop } from "@/components/BackToTop";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { WaveBackground } from "@/components/WaveBackground";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[var(--text)]">
      {/* Skip to Main Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[12px] focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-xs focus:font-medium focus:text-[var(--on-accent)]"
      >
        Skip to main content
      </a>

      <WaveBackground />
      <ScrollRevealProvider />
      <CustomCursor />
      <Navigation />
      <CommandPalette />

      <main id="main-content" className="relative z-[1]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <DeveloperJourney />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
