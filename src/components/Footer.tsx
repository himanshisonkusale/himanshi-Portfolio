import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#030305] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Subtle Glow at the top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-32 bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-16">
          {/* Left CTA */}
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight mb-6 leading-tight"
            >
              Ready to build <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                something extraordinary?
              </span>
            </motion.h2>
            <p className="text-white/50 text-sm md:text-base tracking-wide font-light max-w-sm leading-relaxed">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>

          {/* Right Navigation Links */}
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col space-y-5">
              <span className="text-[10px] tracking-[0.2em] text-white/30 font-bold uppercase mb-2">Navigation</span>
              {['Home', 'Projects', 'Tech'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => onNavigate(sec.toLowerCase())}
                  className="text-left text-sm text-white/70 hover:text-cyan-400 transition-colors"
                >
                  {sec}
                </button>
              ))}
            </div>
            <div className="flex flex-col space-y-5">
              <span className="text-[10px] tracking-[0.2em] text-white/30 font-bold uppercase mb-2">Socials</span>
              {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-left text-sm text-white/70 hover:text-purple-400 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-[10px] tracking-[0.1em] text-white/40 uppercase font-mono">
          <p>&copy; {new Date().getFullYear()} SOFTWARE ENGINEER. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <span>BUILT WITH REACT & FRAMER</span>
            <span className="hidden md:inline">&bull;</span>
            <span>DESIGNED FOR THE FUTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
