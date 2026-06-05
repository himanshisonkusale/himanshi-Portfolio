import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreLoaderProps {
  onEnter: () => void;
}

export const PreLoader: React.FC<PreLoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress from 0 to 100 over 2.5 seconds
    const duration = 2500;
    const intervalTime = 20;
    const increment = (100 / (duration / intervalTime));

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingComplete(true);
          // Trigger the exit after a short delay for the glow animation
          setTimeout(() => {
            onEnter();
          }, 1000);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(15px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020202] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.03)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/[0.01] rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-6">
        
        {/* Animated Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative flex items-center justify-center"
        >
          {/* Outer glowing rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32 rounded-full border border-dashed border-cyan-500/30"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 rounded-full border border-cyan-500/10 border-t-cyan-500/40"
          />
          
          <h1 className="relative text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-gray-500 tracking-[0.2em] font-light drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10">
            HS
            
            {/* The passing glow effect when loading is complete */}
            <AnimatePresence>
              {loadingComplete && (
                <motion.div
                  initial={{ left: "-50%", opacity: 0 }}
                  animate={{ left: "150%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg]"
                  style={{ pointerEvents: "none" }}
                />
              )}
            </AnimatePresence>
          </h1>
        </motion.div>

        {/* Messaging */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-white/40 text-[9px] md:text-[10px] tracking-[0.4em] font-light uppercase mb-16 text-center"
        >
          AI Engineer <span className="text-cyan-500/40 mx-3">•</span> Software Developer
        </motion.p>

        {/* Loading Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="w-full max-w-[200px] flex flex-col items-center"
        >
          {/* Progress Bar */}
          <div className="w-full h-[2px] bg-white/5 relative overflow-hidden mb-4 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Percentage */}
          <div className="text-[10px] tracking-[0.35em] text-cyan-400/80 font-mono">
            {Math.floor(progress).toString().padStart(3, '0')}%
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
