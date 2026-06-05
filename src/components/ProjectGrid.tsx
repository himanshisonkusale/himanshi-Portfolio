import React from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: string;
  index: string;
  name: string;
  description: string;
  tech: string;
  videoSrc: string;
  badge?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'finbuzz-ai',
    index: '01',
    name: 'FINBUZZ.AI',
    description: 'Autonomous Agentic AI Financial Ecosystem engineered with multi-agent workflows.',
    tech: 'GenAI // Agentic Workflows // LLMs // Gemini API // Next.js',
    videoSrc: '/videos/project-finbuzz.mp4',
    badge: 'NATIONAL WINNER // AIROTHON',
  },
  {
    id: 'interviewiq',
    index: '02',
    name: 'INTERVIEWIQ',
    description: 'Full-stack AI interview simulator engineered with WebRTC for hyper-realistic real-time technical evaluation.',
    tech: 'AI Mock Interviews // LLMs // WebRTC // PostgreSQL // Node.js',
    videoSrc: '/videos/project-interviewiq.mp4',
  },
  {
    id: 'skycrate',
    index: '03',
    name: 'SKYCRATE',
    description: 'Distributed, fault-tolerant cloud storage infrastructure replicating highly scalable AWS Drive mechanisms.',
    tech: 'Cloud Automation // AWS S3 // Distributed Systems // React.js',
    videoSrc: '/videos/project-skycrate.mp4',
  },
  {
    id: 'smartconnect',
    index: '04',
    name: 'SMARTCONNECT WITH LOSTLOOP',
    description: 'Resilient, fault-tolerant network orchestration layer optimized for real-time edge computing.',
    tech: 'System Design // IoT Edge // Fault Tolerance // MongoDB',
    videoSrc: '/videos/project-smartconnect.mp4',
  },
];

interface ProjectGridProps {
  onViewProject: (projectId: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onViewProject }) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#030305] px-6 md:px-12 lg:px-24 border-t border-white/5"
      style={{
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(40px, 5vw, 80px)',
        perspective: '2000px',
      }}
    >
      {/* Background radial soft cyan/purple highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full filter blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 font-serif uppercase tracking-wider">
        {/* Header Block */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] tracking-[0.3em] text-cyan-400 font-semibold mb-3 block font-mono"
            >
              SELECTED WORK
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-4xl md:text-6xl tracking-[0.05em] font-light leading-none"
            >
              FEATURED PROJECTS
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-xs md:text-sm tracking-[0.2em] max-w-sm leading-relaxed"
          >
            A SELECTION OF PROJECTS SOLVING DEEP ARCHITECTURAL AND SYSTEMS PROBLEMS.
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onViewCaseStudy={() => onViewProject(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
