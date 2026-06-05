import React from 'react';
import { motion } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-2xl rounded-3xl p-8 md:p-12 border-white/10 bg-[#0d0d0f]/90 relative z-10 max-h-[85vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          &#x2715;
        </button>

        {/* Content */}
        <div>
          <span className="text-[10px] tracking-[0.3em] text-blue-300 font-bold mb-3 block">
            THE ARCHITECT
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.05em] mb-8">
            ABOUT THE CRAFTSMAN
          </h2>

          <div className="space-y-6 text-xs md:text-sm tracking-wider text-white/70 leading-relaxed">
            <p>
              I AM A SYSTEMS ARCHITECT AND FULL-STACK ENGINEER DEDICATED TO DEVELOPING HIGH-PERFORMANCE, HARDENED DIGITAL INFRASTRUCTURE.
            </p>
            <p>
              FOR OVER EIGHT YEARS, I HAVE COLLABORATED WITH LEADING RESEARCH LABS AND FINANCIAL SYNDICATES TO BUILD CUSTOM RUST ENGINE DRIVERS, DISTRIBUTED RAFT DATABASES IN GO, AND LOW-LATENCY COMPILER UTILITIES IN C++.
            </p>
            <p>
              MY ENGINEERING PHILOSOPHY IS ROOTED IN MINIMALISM, EXTREME PERFORMANCE METRICS, AND UNCOMPROMISING SECURITY PRINCIPLES. EVERY BYTE IS MANAGED, EVERY ALLOCATION IS SCRUTINIZED, AND EVERY INTERACTION IS INTENDED TO EXUDE PRECISION.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/5 text-center">
            <div>
              <span className="text-xl md:text-2xl text-blue-200 block font-light tracking-wide">
                8+ YRS
              </span>
              <span className="text-[9px] tracking-widest text-white/30 block mt-1">
                EXPERIENCE
              </span>
            </div>
            <div>
              <span className="text-xl md:text-2xl text-blue-200 block font-light tracking-wide">
                30+
              </span>
              <span className="text-[9px] tracking-widest text-white/30 block mt-1">
                SYSTEMS BUILT
              </span>
            </div>
            <div>
              <span className="text-xl md:text-2xl text-blue-200 block font-light tracking-wide">
                99.99%
              </span>
              <span className="text-[9px] tracking-widest text-white/30 block mt-1">
                UPTIME ARCH
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
