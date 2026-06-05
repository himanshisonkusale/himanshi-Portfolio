import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RippleTrail } from './components/RippleTrail';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { TechStack } from './components/TechStack';
import { StaggeredMenu } from './components/StaggeredMenu';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PreLoader } from './components/PreLoader';

function App() {
  // Intro State
  const [siteEntered, setSiteEntered] = useState(false);

  // Core Portfolio States (Required)
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Helper State to identify which project modal to display
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Smooth navigation scroll handler
  const handleNavigate = (sectionId) => {
    // If navigating to 'about', open the modal
    if (sectionId === 'about') {
      setAboutOpen(true);
      return;
    }

    // Set state flags when targeting specific sections
    if (sectionId === 'tech') {
      setStackOpen(true);
    } else {
      setStackOpen(false);
    }

    if (sectionId === 'contact') {
      setContactOpen(true);
    } else {
      setContactOpen(false);
    }

    // Scroll to DOM node
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProject = (projectId) => {
    setSelectedProjectId(projectId);
    setProjectOpen(true);
  };

  const handleCloseProjectModal = () => {
    setProjectOpen(false);
    // Delay clearing ID until exit transitions finish
    setTimeout(() => {
      setSelectedProjectId(null);
    }, 600);
  };

  return (
    <>
      {/* 1. Custom Interactive Canvas Cursor Trail (Rendered globally) */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <RippleTrail />
      </div>

      <AnimatePresence mode="wait">
        {!siteEntered ? (
          <PreLoader key="preloader" onEnter={() => setSiteEntered(true)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 2. Floating Pill Navigation */}
            <Header
              onMenuToggle={() => setMenuOpen(!menuOpen)}
              onHireMeClick={() => handleNavigate('contact')}
              onNavigate={handleNavigate}
            />

            {/* 3. Sliding GSAP Staggered Drawer Menu */}
            <StaggeredMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              onNavigate={handleNavigate}
            />

            {/* 4. Fullscreen Hero Section */}
            <Hero onExploreClick={() => handleNavigate('projects')} />

            {/* Main Core Showcase Sections */}
            <main className="relative z-10">
              {/* 5. Projects Section (Yacht Cards Grid) */}
              <ProjectGrid onViewProject={handleViewProject} />

              {/* 6. Tech Stack Section (Academy Progress Grid overlaying video) */}
              <TechStack highlighted={stackOpen} />

              {/* 7. Contact Inquiry Form (Concierge charcoal variant) */}
              <ContactForm highlighted={contactOpen} />
            </main>

            {/* 8. Fullscreen Video Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* 9. Floating About Details Modal (Controlled by aboutOpen) */}
            <AnimatePresence>
              {aboutOpen && (
                <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
              )}
            </AnimatePresence>

            {/* 10. Selected Project Case Study Drawer/Modal (Controlled by projectOpen) */}
            <AnimatePresence>
              {projectOpen && (
                <CaseStudyModal
                  projectId={selectedProjectId}
                  onClose={handleCloseProjectModal}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
