"use client";

import ExperiencePage from "./experience/page";
import HeroPage from "./home/page";
import About from "./about/page";
import Skills from "./skills/page";
import Contact from "./contact/page";
import Projects from "./projects/page";
import { useState, useEffect } from "react";
import GitHub from "./github/page";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Create grid pattern effect with CSS
  useEffect(() => {
    // Create a grid pattern element in the background
    const gridOverlay = document.createElement("div");
    gridOverlay.className = "absolute inset-0 z-[-1]";
    gridOverlay.style.backgroundImage =
      "linear-gradient(rgba(20, 255, 140, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 255, 140, 0.1) 1px, transparent 1px)";
    gridOverlay.style.backgroundSize = "40px 40px";
    gridOverlay.style.opacity = "0.15";

    const bgElement = document.getElementById("gradient-background");
    if (bgElement) {
      bgElement.appendChild(gridOverlay);
    }

    return () => {
      if (bgElement && bgElement.contains(gridOverlay)) {
        bgElement.removeChild(gridOverlay);
      }
    };
  }, []);

  return (
    <main
      className="main-content"
      id="main-content"
      data-theme-target="main-content"
    >
      {/* Dark tech background */}
      <div
        className="fixed inset-0 bg-black z-[-2]"
        id="page-background-base"
        data-theme-target="page-background-base"
      ></div>

      <div className="min-h-screen w-full text-white overflow-x-hidden relative">
        {/* Gradient cyberpunk background */}
        <div
          className="fixed inset-0 z-[-1] overflow-hidden"
          data-theme-target="gradient-background"
          id="gradient-background"
        >
          {/* Cyberpunk theme gradient blobs */}
          <div
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-emerald-600 to-teal-900 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"
            data-theme-target="gradient-blob-1"
            id="gradient-blob-1"
          />
          <div
            className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-bl from-violet-700 to-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"
            data-theme-target="gradient-blob-2"
            id="gradient-blob-2"
          />
          <div
            className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-tl from-cyan-800 to-cyan-950 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"
            data-theme-target="gradient-blob-3"
            id="gradient-blob-3"
          />

          {/* Overlay scanlines effect */}
          <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>
        </div>

        <section
          id="home"
          className="relative z-10"
          data-theme-target="home-section"
        >
          <HeroPage />
        </section>
      </div>

      {/* Main Sections with clear data attributes */}
      <section
        id="about"
        className="scroll-mt-20"
        data-theme-target="about-section"
      >
        <About />
      </section>

      <section
        id="experience"
        className="scroll-mt-20"
        data-theme-target="experience-section"
      >
        <ExperiencePage />
      </section>

      <section
        id="skills"
        className="scroll-mt-20"
        data-theme-target="skills-section"
      >
        <Skills />
      </section>

      <section
        id="projects"
        className="scroll-mt-20"
        data-theme-target="projects-section"
      >
        <Projects />
      </section>

      <section
        id="github"
        className="scroll-mt-20"
        data-theme-target="github-section"
      >
        <GitHub />
      </section>

      <section
        id="contact"
        className="scroll-mt-20"
        data-theme-target="contact-section"
      >
        <Contact />
      </section>
    </main>
  );
}
