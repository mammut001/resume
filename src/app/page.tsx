import { Header } from "@/components/resume/header";
import { Hero } from "@/components/resume/hero";
import { About } from "@/components/resume/about";
import { Experience } from "@/components/resume/experience";
import { Education } from "@/components/resume/education";
import { Coursework } from "@/components/resume/coursework";
import { Skills } from "@/components/resume/skills";
import { Projects } from "@/components/resume/projects";
import { Research } from "@/components/resume/research";
import { Heatmap } from "@/components/resume/heatmap";

export default function Page() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <div className="relative mx-auto max-w-screen-lg px-4 pb-16 pt-6 md:px-16 md:pt-10 print:p-0">
        <div className="mx-auto w-full space-y-12 bg-background md:space-y-14 print:space-y-6">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Research />
          <Skills />
          <Heatmap />
          <Coursework />
        </div>
      </div>
    </main>
  );
}
