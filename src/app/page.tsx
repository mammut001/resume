"use client"

import { Header } from "@/components/resume/header";
import { Hero } from "@/components/resume/hero";
import { About } from "@/components/resume/about";
import { Experience } from "@/components/resume/experience";
import { Education } from "@/components/resume/education";
import { Skills } from "@/components/resume/skills";
import { Projects } from "@/components/resume/projects";
import { Research } from "@/components/resume/research";

export default function Page() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <div className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 max-w-screen-lg">
        <section className="mx-auto w-full space-y-8 bg-background print:space-y-4">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Research />
          <Skills />
          <Projects />
        </section>
      </div>
    </main>
  );
}
