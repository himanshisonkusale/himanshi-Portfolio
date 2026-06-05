import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const ProjectCard = ({
  project,
  idx,
  onViewCaseStudy,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full h-[480px] md:h-[550px] rounded-2xl bg-[#08080c] cursor-pointer font-serif uppercase tracking-wider flex flex-col border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(34,211,238,0.3)] hover:border-cyan-500/30 transition-all duration-700 overflow-hidden"
    >
      {/* Glossy light sweep animation on hover */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={isHovered ? { x: '150%', opacity: 0.15 } : { x: '-150%', opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 w-[200%]"
      />

      {/* Neon Laser Borders using Framer Motion */}
      <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl overflow-hidden">
        {/* Top */}
        <motion.div
          initial={{ left: '-100%' }}
          animate={isHovered ? { left: '100%' } : { left: '-100%' }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent"
        />
        {/* Right */}
        <motion.div
          initial={{ top: '-100%' }}
          animate={isHovered ? { top: '100%' } : { top: '-100%' }}
          transition={{ duration: 1, delay: 0.25, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#c084fc] to-transparent"
        />
        {/* Bottom */}
        <motion.div
          initial={{ right: '-100%' }}
          animate={isHovered ? { right: '100%' } : { right: '-100%' }}
          transition={{ duration: 1, delay: 0.5, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute bottom-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#22d3ee] to-transparent"
        />
        {/* Left */}
        <motion.div
          initial={{ bottom: '-100%' }}
          animate={isHovered ? { bottom: '100%' } : { bottom: '-100%' }}
          transition={{ duration: 1, delay: 0.75, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
          className="absolute left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-[#c084fc] to-transparent"
        />
      </div>

      {/* Background Video Preview (Top Section) */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-[#050508]">
        {/* Main Video (object-cover fills the placeholder completely) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out filter brightness-[0.95] contrast-[1.1] group-hover:brightness-[1.1] z-0"
        >
          <source src={project.videoSrc} type="video/mp4" />
        </video>
        
        {/* Fade into bottom section */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#08080c] to-transparent pointer-events-none z-10" />
      </div>

      {/* Structured Info Panel (Bottom Section) */}
      <div 
        className="relative flex flex-col px-4 pb-4 pt-6 md:px-5 md:pb-5 md:pt-7 bg-[#08080c]/90 backdrop-blur-xl z-10 transition-all duration-500 group-hover:bg-[#0c0c12]/90 shrink-0"
        style={{ transform: 'translateZ(30px)' }} // Slight 3D depth pop-out for text area
      >
        {/* Soft Divider */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Optional Neon Badge */}
        {project.badge && (
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-3 self-start text-[7px] md:text-[8px] tracking-[0.2em] font-bold text-[#22d3ee] bg-[#22d3ee]/10 px-2.5 py-1 rounded-full border border-[#22d3ee]/30 font-mono shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {project.badge}
          </motion.div>
        )}

        {/* Project Index */}
        <span className="text-[9px] tracking-[0.3em] text-white/50 font-mono mb-1.5 block transition-colors duration-500 group-hover:text-cyan-400/80">
          PROJECT {project.index}
        </span>

        {/* Project Name */}
        <h3 className="text-white text-lg md:text-xl font-light tracking-[0.05em] mb-2 leading-none drop-shadow-md">
          {project.name}
        </h3>

        {/* Tech Stack */}
        <p className="text-[8px] md:text-[9px] text-[#22d3ee]/70 tracking-[0.2em] mb-3 font-mono font-bold leading-relaxed drop-shadow-sm line-clamp-1">
          {project.tech}
        </p>
        
        {/* Description */}
        <p className="text-[10px] md:text-[11px] text-white/70 tracking-wider mb-5 leading-relaxed normal-case font-sans line-clamp-3 md:line-clamp-4">
          {project.description}
        </p>

        {/* View Case Study Button */}
        <div className="w-full mt-auto pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewCaseStudy();
            }}
            className="w-full py-2.5 px-4 text-[9px] tracking-[0.25em] font-semibold text-center text-white border border-cyan-400/20 rounded-lg bg-cyan-400/5 hover:bg-cyan-400 hover:text-[#030305] hover:border-cyan-400 transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            VIEW CASE STUDY
          </button>
        </div>
      </div>
    </motion.div>
  );
};
