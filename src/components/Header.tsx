import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  onMenuToggle: () => void;
  onHireMeClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  onHireMeClick,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4"
    >
      <div
        className={`glass-panel rounded-full flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? 'w-[90%] max-w-4xl py-2.5 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10'
            : 'w-[95%] max-w-5xl py-4 px-8 border-white/5'
        }`}
      >
        {/* Left Side: Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-white font-bold text-lg tracking-[0.2em] focus:outline-none hover:text-cyan-400 transition-colors"
        >
          CODE-CRAFT
        </button>

        {/* Center: Navigation Links (hidden on mobile, visible on desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.15em]">
          {['Projects', 'Tech', 'About'].map((link) => (
            <button
              key={link}
              onClick={() => onNavigate(link.toLowerCase())}
              className="text-white/60 hover:text-white transition-colors relative group py-1"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Side: CTA Button & Hamburg Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onHireMeClick}
            className="px-5 py-2 text-xs font-semibold tracking-[0.15em] border border-cyan-400/30 bg-cyan-400/5 text-cyan-200 rounded-full hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 focus:outline-none"
          >
            HIRE ME
          </button>

          <button
            onClick={onMenuToggle}
            aria-label="Toggle Menu"
            className="flex flex-col space-y-1.5 justify-center items-center w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
          >
            <span className="w-4 h-[1px] bg-white block" />
            <span className="w-4 h-[1px] bg-white block" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};
