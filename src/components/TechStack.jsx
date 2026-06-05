import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Restructured the data to fit a logical Architecture Flowchart (Top-Down)
const ARCHITECTURE_LAYERS = [
  {
    id: '01',
    layer: 'INTERFACE & CLIENT LAYER',
    title: 'FULL-STACK PRESENTATION',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
    glowColor: 'rgba(34, 211, 238, 0.2)', // Neon Cyan
    borderColor: 'border-cyan-500/30',
    connectionText: 'REST APIs & WebSockets',
  },
  {
    id: '02',
    layer: 'APPLICATION & SERVICE LAYER',
    title: 'CORE ARCHITECTURE & BACKEND',
    tags: ['Node.js', 'Express.js', 'REST & Fast APIs', 'Python', 'C++', 'Java', 'OOPs', 'DSA'],
    glowColor: 'rgba(59, 130, 246, 0.2)', // Blue
    borderColor: 'border-blue-500/30',
    connectionText: 'Data Pipelining & RPC',
  },
  {
    id: '03',
    layer: 'INFRASTRUCTURE & DATA LAYER',
    title: 'ADVANCED CLOUD & SYSTEMS',
    tags: ['AWS', 'Docker', 'Linux', 'MongoDB', 'SQL', 'Distributed Systems', 'System Design', 'Cloud Computing', 'Apache Hadoop', 'Fault Tolerance', 'Operating Systems'],
    glowColor: 'rgba(168, 85, 247, 0.2)', // Purple
    borderColor: 'border-purple-500/30',
    connectionText: 'High-Bandwidth AI Inference Bus',
  },
  {
    id: '04',
    layer: 'INTELLIGENCE LAYER',
    title: 'AI & MACHINE LEARNING',
    tags: ['Generative AI', 'Agentic Workflows', 'LLMs', 'Prompt Engineering', 'Gemini API', 'Agentic AI', 'Computer Vision', 'Machine Learning'],
    glowColor: 'rgba(236, 72, 153, 0.2)', // Pink
    borderColor: 'border-pink-500/30',
    connectionText: null,
  },
];

const FlowNode = ({ layer, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* The 3D Hoverable Node */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative group cursor-crosshair z-10"
      >
        {/* Background Radial Glow */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 rounded-3xl blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${layer.glowColor}, transparent 70%)`,
          }}
        />

        {/* Node Card */}
        <div 
          className={`relative z-10 bg-[#08080c]/60 backdrop-blur-2xl border ${layer.borderColor} p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row gap-6 md:gap-10 overflow-hidden transition-all duration-500 hover:bg-[#08080c]/80 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]`}
        >
          {/* Neon Top Border Accent */}
          <div 
            className="absolute top-0 left-0 h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${layer.glowColor.replace('0.2', '0.8')}, transparent)`,
            }}
          />

          {/* Left Column: Layer Identification */}
          <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-8" style={{ transform: 'translateZ(30px)' }}>
            <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.3em] mb-2 font-bold block">
              {layer.id} // {layer.layer}
            </span>
            <h3 className="text-white text-xl md:text-2xl font-light tracking-[0.05em] leading-tight">
              {layer.title}
            </h3>
          </div>

          {/* Right Column: Tags */}
          <div className="md:w-2/3 flex flex-wrap gap-2 md:gap-3 items-center content-center" style={{ transform: 'translateZ(40px)' }}>
            {layer.tags.map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-block text-xs md:text-sm text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-md backdrop-blur-md tracking-wider uppercase transition-colors hover:bg-white/10 hover:border-white/30 hover:text-white"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connection SVG to next node */}
      {layer.connectionText && (
        <div className="relative w-full h-24 md:h-32 flex justify-center items-center -my-2 z-0">
          {/* Animated Connecting Line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <motion.div
              className="w-full h-1/2"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                background: `linear-gradient(to bottom, transparent, ${layer.glowColor.replace('0.2', '1')}, transparent)`,
              }}
            />
          </div>

          {/* Connection Protocol Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute bg-[#030305] border border-white/10 px-4 py-1.5 rounded-full z-10 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: layer.glowColor.replace('0.2', '1') }}
            />
            <span className="text-[8px] md:text-[9px] text-white/50 tracking-[0.2em] font-mono uppercase">
              {layer.connectionText}
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export const TechStack = ({ highlighted }) => {
  return (
    <section
      id="tech"
      className={`relative w-full bg-[#030305] overflow-hidden border-t border-white/5 transition-all duration-1000 ${
        highlighted ? 'shadow-[inset_0_0_50px_rgba(34,211,238,0.05)]' : ''
      }`}
      style={{
        paddingTop: 'clamp(40px, 5vw, 80px)',
        paddingBottom: 'clamp(40px, 5vw, 80px)',
      }}
    >
      {/* Dark Ambience Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep radial gradient to focus on the center flow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#050508_0%,#030305_80%)]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] tracking-[0.3em] text-cyan-400 font-semibold mb-3 block font-mono"
            >
              SYSTEMS ARCHITECTURE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-4xl md:text-6xl tracking-[0.05em] font-light leading-none"
            >
              THE TECH STACK
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-xs md:text-sm tracking-[0.2em] max-w-sm font-light leading-relaxed uppercase"
          >
            A TOP-DOWN FLOWCHART OF QUANTIFIABLE COMPETENCE ACROSS STACKS FROM USER INTERFACE TO AI CORE.
          </motion.p>
        </div>

        {/* 3D Flowchart Container */}
        <div className="max-w-5xl mx-auto px-4 md:px-12 relative">
          {/* Optional: Add a subtle 3D perspective to the entire flowchart on large screens */}
          <div className="w-full relative flex flex-col items-center pb-8" style={{ perspective: '1500px' }}>
            <motion.div
              initial={{ rotateX: 10, scale: 0.95, opacity: 0 }}
              whileInView={{ rotateX: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {ARCHITECTURE_LAYERS.map((layer, index) => (
                <FlowNode key={layer.id} layer={layer} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
