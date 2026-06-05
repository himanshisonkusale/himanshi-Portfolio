import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Hero = ({ onExploreClick }) => {
  const { scrollY } = useScroll();
  // Parallax effects for text and video
  const yText = useTransform(scrollY, [0, 800], [0, -120]);
  const yVideo = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)]" />

      {/* 3D Floor Grid for VR / Real 3D matching aesthetic */}
      <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden pointer-events-none" style={{ perspective: "1000px" }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 75, y: 200 }}
          animate={{ opacity: 1, rotateX: 75, y: 100 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[200vw] h-[150vh] origin-bottom transform-gpu"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(59,130,246,0.1) 2px, transparent 2px)',
            backgroundSize: '4rem 4rem',
            maskImage: 'linear-gradient(to top, black 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Main Grid Layout - Holographic Embedded Center */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center text-center">
        
        {/* Center: Holographic Scene & Name */}
        <div className="relative w-full max-w-xl lg:max-w-3xl xl:max-w-4xl flex justify-center items-center z-10">
          
          {/* Holographic Video (Reduced Size by ~30%) */}
          <motion.div 
            style={{ y: yVideo, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center items-center pointer-events-none"
          >
            {/* Subtle Glow Behind */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-cyan-500/20 blur-[100px] z-0"
            />
            
            {/* Video Container */}
            <motion.div 
              initial={{ rotateY: -10, rotateX: 5 }}
              animate={{ rotateY: 10, rotateX: -5 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              className="relative w-[130%] md:w-[110%] lg:w-[120%] aspect-square transform-gpu z-10"
              style={{
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
              }}
            >
              <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter saturate-[1.3] contrast-[1.3] brightness-100 mix-blend-screen"
            >
              <source src="/videos/Holographic_structures_emerging.mp4" type="video/mp4" />
            </video>
            
            {/* Dark Vignette Overlay Behind Text for Readability */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,3,5,0.85)_0%,transparent_50%)] pointer-events-none mix-blend-multiply z-10" />
          </motion.div>
        </motion.div>

          {/* Embedded Name (Floating inside the hologram, signature layout) */}
          <motion.h1
            style={{ y: yText, fontFamily: "'Instrument Serif', serif" }}
            className="absolute z-20 flex flex-col items-center justify-center text-center leading-[0.9] transform-gpu pointer-events-none mb-20 md:mb-32 px-4 w-full"
          >
            {/* Himanshi */}
            <div className="flex overflow-visible text-[4rem] md:text-[6.5rem] lg:text-[8rem] text-white drop-shadow-[0_15px_25px_rgba(0,0,0,1)]">
              {"Himanshi".split('').map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.0, delay: 1.0 + index * 0.08, type: "spring", bounce: 0.4 }}
                  className="inline-block"
                  style={{ textShadow: "0 0 30px rgba(0,0,0,1), 0 0 10px rgba(255,255,255,0.4)" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* Sonkusale */}
            <div className="flex overflow-visible text-[4rem] md:text-[6.5rem] lg:text-[8rem] text-cyan-200 drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] mt-2 md:mt-4">
              {"Sonkusale".split('').map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.0, delay: 1.4 + index * 0.08, type: "spring", bounce: 0.4 }}
                  className="inline-block"
                  style={{ textShadow: "0 0 20px rgba(34,211,238,0.6)" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </div>

        {/* Role / Title (Fades in below after name) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-cyan-400 text-xs md:text-sm tracking-[0.4em] mt-8 font-bold uppercase z-30 flex items-center justify-center gap-4"
        >
          <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent block shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
          AI & Software Engineer
          <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent block shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 z-30"
        >
          <button
            onClick={onExploreClick}
            className="group relative px-12 py-5 overflow-hidden rounded-full border border-cyan-500/30 bg-[#08080c]/80 text-sm font-bold tracking-[0.2em] text-white transition-all duration-500 shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] hover:border-cyan-400 backdrop-blur-xl cursor-pointer"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-600/40 to-purple-600/40 transition-all duration-500 ease-out group-hover:w-full" />
            <span className="relative z-10 flex items-center justify-center gap-4">
              EXPLORE WORK
              <motion.span 
                animate={{ y: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.span>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
        onClick={onExploreClick}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/50 mb-3 font-semibold">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[2px] h-12 bg-gradient-to-b from-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </motion.div>
    </section>
  );
};
