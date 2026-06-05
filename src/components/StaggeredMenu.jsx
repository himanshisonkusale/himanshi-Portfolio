import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const StaggeredMenu = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // GSAP context to ensure proper scoping and cleanup on unmount
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray('.menu-layer');
      const links = gsap.utils.toArray('.menu-link');
      const details = gsap.utils.toArray('.menu-detail');

      if (isOpen) {
        // Toggle interactivity
        gsap.set(containerRef.current, { pointerEvents: 'auto' });
        if (overlayRef.current) gsap.set(overlayRef.current, { pointerEvents: 'auto' });

        // Build animation timeline
        gsap.timeline()
          .to(overlayRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          })
          .to(
            layers,
            {
              x: '0%',
              duration: 0.8,
              stagger: 0.1,
              ease: 'power4.out',
            },
            0
          )
          .fromTo(
            links,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
            },
            '-=0.3'
          )
          .fromTo(
            details,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      } else {
        // Close timeline
        gsap.timeline({
          onComplete: () => {
            gsap.set(containerRef.current, { pointerEvents: 'none' });
            if (overlayRef.current) gsap.set(overlayRef.current, { pointerEvents: 'none' });
          },
        })
          .to(links, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in',
          })
          .to(
            details,
            {
              opacity: 0,
              y: 10,
              duration: 0.3,
              stagger: 0.04,
              ease: 'power2.in',
            },
            '-=0.2'
          )
          .to(
            layers,
            {
              x: '100%',
              duration: 0.7,
              stagger: 0.07,
              ease: 'power3.inOut',
            },
            '-=0.3'
          )
          .to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            },
            '-=0.4'
          );
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleLinkClick = (sectionId) => {
    onClose();
    setTimeout(() => {
      onNavigate(sectionId);
    }, 600); // Wait for the exit animation before scrolling
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      {/* Background Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 opacity-0 pointer-events-none backdrop-blur-sm cursor-pointer"
      />

      {/* Layer 1: Transition background overlay */}
      <div className="menu-layer absolute top-0 right-0 h-full w-full md:w-[460px] bg-blue-300/10 pointer-events-auto translate-x-full z-10" />

      {/* Layer 2: Main menu panel */}
      <div className="menu-layer absolute top-0 right-0 h-full w-full md:w-[460px] bg-[#0c0c0e] border-l border-white/5 pointer-events-auto translate-x-full z-20 flex flex-col justify-between p-12 md:p-16">
        {/* Menu Header / Close action */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6 menu-detail">
          <span className="text-[10px] tracking-[0.3em] text-blue-300 font-semibold">
            NAVIGATION INDEX
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            &#x2715;
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col space-y-8 my-auto py-8">
          {[
            { label: 'HOME', id: 'home' },
            { label: 'SELECTED PROJECTS', id: 'projects' },
            { label: 'TECH STACK', id: 'tech' },
            { label: 'GET IN TOUCH', id: 'contact' },
          ].map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="menu-link text-left text-3xl md:text-4xl tracking-[0.1em] font-light text-white hover:text-blue-300 transition-colors focus:outline-none flex items-center group relative cursor-pointer"
            >
              <span className="text-xs font-bold text-white/35 mr-4 font-mono">
                0{index + 1}
              </span>
              <span className="relative">
                {item.label}
                <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-blue-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </span>
            </button>
          ))}
        </nav>

        {/* Footer Details */}
        <div className="border-t border-white/5 pt-8 flex flex-col space-y-6 menu-detail">
          {/* Social Links */}
          <div className="flex space-x-6 text-[10px] tracking-[0.25em]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              LINKEDIN
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              TWITTER
            </a>
          </div>

          <p className="text-[9px] text-white/20 tracking-[0.2em]">
            &copy; {new Date().getFullYear()} CODE-CRAFT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
};
