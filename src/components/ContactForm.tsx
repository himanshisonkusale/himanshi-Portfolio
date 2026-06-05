import React from 'react';
import { motion } from 'motion/react';

interface ContactFormProps {
  highlighted?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ highlighted }) => {

  const SOCIAL_LINKS = [
    {
      name: 'Email Me',
      description: 'Reach out for opportunities',
      href: '#',
      color: 'from-cyan-500 to-blue-500',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      description: 'Connect professionally',
      href: '#',
      color: 'from-blue-500 to-indigo-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      description: 'Explore my repositories',
      href: '#',
      color: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <section
      id="contact"
      className={`relative w-full bg-[#050508] px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5 transition-all duration-1000 ${
        highlighted ? 'shadow-[inset_0_0_50px_rgba(34,211,238,0.05)]' : ''
      }`}
      style={{
        paddingTop: 'clamp(40px, 5vw, 80px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Background Animated Blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/[0.04] rounded-full filter blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/[0.04] rounded-full filter blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Personality & Intro */}
        <div className="relative">
          {/* Floating Decorative Symbols */}
          <div className="absolute -top-10 -left-6 pointer-events-none opacity-20 text-3xl text-cyan-500 font-mono">
            <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              {`</>`}
            </motion.div>
          </div>
          <div className="absolute top-1/2 -right-10 pointer-events-none opacity-20 text-4xl text-purple-500 font-mono">
            <motion.div animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity }}>
              {`{}`}
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight mb-6"
          >
            Let's Connect & <br />
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Build Something Great
            </span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-white/90 font-light mb-8"
          >
            Have an idea, opportunity, or collaboration in mind?
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5 text-white/60 text-base md:text-lg font-light mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <p>Passionate about building scalable web apps</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
              <p>Interested in AI + Full Stack projects</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <p>Actively looking for opportunities</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Contact Banners */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto space-y-4"
        >
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className="group relative flex items-center justify-between p-6 md:p-8 rounded-3xl bg-[#08080c]/80 border border-white/5 backdrop-blur-2xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 block"
            >
              {/* Hover Gradient Sweep */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${link.color} transition-opacity duration-500`} />
              
              <div className="flex items-center gap-6 relative z-10">
                {/* Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/80 group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </div>
                
                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-xl font-light text-white tracking-wide mb-1">
                    {link.name}
                  </span>
                  <span className="text-xs text-white/50 tracking-wider">
                    {link.description}
                  </span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="relative z-10 text-white/20 group-hover:text-white transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
