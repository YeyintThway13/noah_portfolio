import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Check, 
  ChevronDown, 
  HelpCircle,
  Home,
  Folder,
  Briefcase,
  Wrench,
  MessageSquare,
  Flame,
  Layers,
  Layout,
  ArrowRight,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import * as Icons from 'lucide-react';

import { personalInfo, skills, projects, experiences, tools, faqs } from './data';
import type { Project } from './types';
import { ProjectModal } from './components/ProjectModal';
import { Confetti } from './components/Confetti';
import developerPortrait from './assets/developer_portrait.png';

// Custom social SVG icons to replace deprecated brand icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Dynamic Tool Icon rendering helper
const ToolIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  
  // Contact Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [engagementType, setEngagementType] = useState<'Full-Time' | 'Project'>('Full-Time');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  // Filter projects
  const filteredProjects = projects.filter(proj => {
    if (activeCategory === 'all') return true;
    return proj.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Scroll spy detection with window scroll range
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'experience', 'tools', 'faq', 'contact'];
      const triggerLine = window.innerHeight * 0.45;
      
      let active = 'home';
      
      // Edge-case: if scrolled to the very bottom, always active contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        active = 'contact';
      } else {
        sections.forEach((secId) => {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
              active = secId;
            }
          }
        });
      }
      
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Custom cursor logic
  useEffect(() => {
    const dot = document.getElementById('custom-cursor-dot');
    const ring = document.getElementById('custom-cursor-ring');
    
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update dot position instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      // Easing factor for trailing effect (smooth lag)
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animFrame = requestAnimationFrame(animateRing);

    // Hover state classes for custom cursor (expand when hovering over interactive elements)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.project-card') || 
        target.closest('.tool-card') || 
        target.closest('.experience-card-body') || 
        target.closest('.social-link') ||
        target.classList.contains('interactive')
      ) {
        ring.classList.add('hovered');
        dot.classList.add('hovered');
      } else {
        ring.classList.remove('hovered');
        dot.classList.remove('hovered');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Hide custom cursor on touch devices or when mouse leaves window
    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            from_name: name,
            email: email,
            subject: `Portfolio Inquiry [${engagementType === 'Full-Time' ? 'Full-Time Role' : 'Project / Contract'}] - ${name}`,
            engagement_type: engagementType === 'Full-Time' ? 'Hire Full-Time' : 'Just for a Project',
            message: message,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Failed to send message. Please try again.');
        }
      } else {
        // Fallback simulation if no API access key is configured yet
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setIsSubmitting(false);
      setFormSubmitted(true);
      setTriggerConfetti(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setIsSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background glow overlays */}
      <div className="glow-spot" style={{ top: '-100px', left: '-50px' }} />
      <div className="glow-spot glow-orange" style={{ top: '40%', right: '-50px' }} />
      <div className="glow-spot" style={{ bottom: '-100px', left: '20%' }} />

      <Confetti active={triggerConfetti} onComplete={() => setTriggerConfetti(false)} />

      {/* FLOATING CAPSULE NAVIGATION MENU */}
      <nav className="floating-nav">
        <button
          onClick={() => scrollToSection('home')}
          className={`nav-icon-btn ${activeSection === 'home' ? 'active' : ''}`}
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
          <span className="nav-tooltip">Home</span>
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className={`nav-icon-btn ${activeSection === 'projects' ? 'active' : ''}`}
          aria-label="Projects"
        >
          <Folder className="w-4 h-4" />
          <span className="nav-tooltip">Projects</span>
        </button>
        <button
          onClick={() => scrollToSection('experience')}
          className={`nav-icon-btn ${activeSection === 'experience' ? 'active' : ''}`}
          aria-label="Experience"
        >
          <Briefcase className="w-4 h-4" />
          <span className="nav-tooltip">Experience</span>
        </button>
        <button
          onClick={() => scrollToSection('tools')}
          className={`nav-icon-btn ${activeSection === 'tools' ? 'active' : ''}`}
          aria-label="Tools"
        >
          <Wrench className="w-4 h-4" />
          <span className="nav-tooltip">Tools</span>
        </button>
        <button
          onClick={() => scrollToSection('faq')}
          className={`nav-icon-btn ${activeSection === 'faq' ? 'active' : ''}`}
          aria-label="FAQ"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="nav-tooltip">FAQ</span>
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`nav-icon-btn ${activeSection === 'contact' ? 'active' : ''}`}
          aria-label="Contact"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="nav-tooltip">Hire Me</span>
        </button>
      </nav>

      {/* HERO SECTION - SPLIT GRID LAYOUT */}
      <section id="home" className="hero-section">
        <div className="container hero-split-grid">
          {/* Left Column: Bio & Core Info */}
          <div className="hero-main-content">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-developer-name">
                Yeyint Thway
              </h1>
              <h2 className="hero-main-title">
                FULLSTACK <span className="text-outline">DEVELOPER</span>
              </h2>
              <div className="hero-tagline-quote">
                "{personalInfo.tagline}"
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-main-desc"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Social Links inside the content block */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hero-socials-row"
            >
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-btn"
                aria-label="Github Profile"
              >
                <GithubIcon /> <span>Github</span>
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="hero-social-btn"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" /> <span>Email</span>
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-stats-row"
            >
              <div className="hero-stat-col">
                <span className="hero-stat-num">{personalInfo.stats.experience}</span>
                <span className="hero-stat-lbl">Years of<br />Experience</span>
              </div>
              <div className="hero-stat-col">
                <span className="hero-stat-num">{personalInfo.stats.projects}</span>
                <span className="hero-stat-lbl">Projects<br />Completed</span>
              </div>
              <div className="hero-stat-col">
                <span className="hero-stat-num">{personalInfo.stats.clients}</span>
                <span className="hero-stat-lbl">Worldwide<br />Clients</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Large Featured Portrait Card with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hero-portrait-card"
          >
            {/* Giant Background Outline Text */}
            <div className="hero-portrait-bg-text">{personalInfo.nickname.toUpperCase()}</div>

            <div className="hero-portrait-frame">
              <img 
                src={developerPortrait} 
                alt="Yeyint Thway portrait" 
                className="hero-portrait-img"
              />
              <div className="hero-portrait-badge">
                <Flame className="w-5 h-5" />
                <span>Available for Hire</span>
              </div>
            </div>

            {/* Floating Glass Badges */}
            <div className="floating-badge badge-top-left">
              <span className="badge-dot green" />
              <span>TypeScript / Node.js</span>
            </div>

            <div className="floating-badge badge-bottom-right">
              <span className="badge-dot orange" />
              <span>Go / AWS Cloud</span>
            </div>
          </motion.div>
        </div>

        {/* Highlights Row below the main grid */}
        <div className="container hero-highlights-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-highlights-row"
          >
            <div 
              onClick={() => scrollToSection('experience')}
              className="highlight-card orange"
            >
              <div>
                <div className="highlight-icon-wrap">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="highlight-text-title">
                  Real-time Systems
                </h3>
              </div>
              <div>
                <p className="highlight-text-desc">
                  Socket.io, Websockets & Redis streams
                </p>
                <div className="highlight-arrow-btn">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => scrollToSection('projects')}
              className="highlight-card lime"
            >
              <div>
                <div className="highlight-icon-wrap">
                  <Layout className="w-8 h-8" />
                </div>
                <h3 className="highlight-text-title">
                  Scalable Cloud
                </h3>
              </div>
              <div>
                <p className="highlight-text-desc">
                  React, NextJS, Docker, AWS & CI/CD
                </p>
                <div className="highlight-arrow-btn">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      <section className="skills-marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            {skills.map((skill, idx) => (
              <div key={idx} className="skill-tag">
                <span>{skill}</span>
                <span className="skill-dot" />
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {skills.map((skill, idx) => (
              <div key={`dup-${idx}`} className="skill-tag">
                <span>{skill}</span>
                <span className="skill-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section section-padding">
        <div className="container section-split-grid">
          <div className="section-sticky-sidebar">
            <span className="section-tagline">
              MY PORTFOLIO
            </span>
            <h2 className="section-title">
              FEATURED <span className="text-outline">WORK</span>
            </h2>
            <p className="section-sidebar-desc">
              A curated selection of platforms built with modern frontend and backend tech stacks.
            </p>
            
            <div className="sidebar-filter-bar">
              {['all', 'fullstack', 'frontend'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid" style={{ marginTop: 0 }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const indexStr = String(idx + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedProject(project)}
                    className={`project-card card-${project.category}`}
                  >
                    <div className="project-card-number">{indexStr}</div>
                    
                    <div className="project-card-body">
                      <div className="project-card-header">
                        <span className="project-card-role">
                          {project.role}
                        </span>
                        <div className="project-card-category-wrap">
                          <span className="project-card-category-dot" />
                          <span className="project-card-category">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="project-card-title">
                        {project.title}
                      </h3>
                      <p className="project-card-description">
                        {project.description}
                      </p>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-card-tags">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="project-card-tag">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="project-card-more-tags">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="project-card-cta-btn">
                        <ArrowUpRight className="project-card-cta-icon" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="experience-section section-padding">
        <div className="container section-split-grid">
          <div className="section-sticky-sidebar">
            <span className="section-tagline orange">
              CAREER TRACK
            </span>
            <h2 className="section-title">
              WORK <span className="text-outline">HISTORY</span>
            </h2>
            <p className="section-sidebar-desc">
              Professional tenure building high-performance web backends, real-time engines, and interfaces.
            </p>
          </div>

          <div className="experience-grid" style={{ marginTop: 0 }}>
            <div className="experience-line" />

            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="experience-item"
              >
                <div className="experience-dot" />
                
                <div className="experience-meta">
                  <span className="experience-period">
                    {exp.period}
                  </span>
                  <h3 className="experience-company">
                    {exp.company}
                  </h3>
                  <h4 className="experience-role">
                    {exp.role}
                  </h4>
                </div>

                <div className="experience-card-body glass-panel">
                  <p className="experience-summary">
                    {exp.summary}
                  </p>
                  <div className="experience-details-list">
                    {exp.details.map((detail, dIdx) => (
                      <div key={dIdx} className="experience-detail-item">
                        <span className="experience-detail-bullet" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM TOOLS */}
      <section id="tools" className="tools-section section-padding">
        <div className="container section-split-grid">
          <div className="section-sticky-sidebar">
            <span className="section-tagline">
              THE TOOLKIT
            </span>
            <h2 className="section-title">
              PREMIUM <span className="text-outline">TOOLS</span>
            </h2>
            <p className="section-sidebar-desc">
              The languages, runtimes, utilities, and services I rely on to ship high-quality software.
            </p>
          </div>

          <div className="tools-grid" style={{ marginTop: 0 }}>
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="tool-card glass-panel"
              >
                <div className="tool-icon-frame">
                  <ToolIcon name={tool.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="tool-name">
                    {tool.name}
                  </h4>
                  <p className="tool-category">
                    {tool.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="faq-section section-padding">
        <div className="container section-split-grid">
          <div className="section-sticky-sidebar">
            <span className="section-tagline orange">
              QUESTIONS
            </span>
            <h2 className="section-title">
              FAQ <span className="text-outline">SECTION</span>
            </h2>
            <p className="section-sidebar-desc">
              Common queries about my work methodology, stack preferences, and availability.
            </p>
          </div>

          <div className="faq-wrapper" style={{ marginTop: 0 }}>
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-item glass-panel ${isOpen ? 'active' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="faq-question-btn"
                  >
                    <span className="faq-question">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="faq-arrow"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="faq-answer-container"
                      >
                        <div className="faq-answer-content">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIRE ME SECTION */}
      <section id="contact" className="contact-section section-padding">
        <div className="container section-split-grid">
          <div className="section-sticky-sidebar">
            <span className="section-tagline">
              LET'S WORK TOGETHER
            </span>
            <h2 className="section-title">
              HIRE <span className="text-outline">ME</span>
            </h2>
            <p className="section-sidebar-desc">
              Have an idea or a project in mind? Drop me a message and let's build something exceptional.
            </p>
          </div>

          <div className="contact-wrapper">
            <div className="contact-card glass-panel">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="contact-success-view"
                >
                  <div className="success-check-circle">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-msg">
                    Thank you for reaching out! Yeyint will review your specifications and get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-secondary"
                    style={{ fontSize: '12px', padding: '10px 20px' }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label htmlFor="form-name" className="form-label">Your Name</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email" className="form-label">Email Address</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Engagement Type Selector */}
                  <div className="form-group">
                    <label className="form-label">I'm looking to:</label>
                    <div className="engagement-selector">
                      <button
                        type="button"
                        onClick={() => setEngagementType('Full-Time')}
                        className={`engagement-btn ${engagementType === 'Full-Time' ? 'active' : ''}`}
                      >
                        <Briefcase size={16} />
                        <span>Hire Full-Time</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEngagementType('Project')}
                        className={`engagement-btn ${engagementType === 'Project' ? 'active' : ''}`}
                      >
                        <Code2 size={16} />
                        <span>Just for a Project</span>
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-msg" className="form-label">Message / Specifications</label>
                    <textarea
                      id="form-msg"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your project timeline, technical requirements, and key specifications..."
                      className="form-input form-textarea"
                    />
                  </div>

                  {submitError && (
                    <div className="form-error-msg">{submitError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary submit-btn-full"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="submitting-loader-spinner" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Specifications</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="portfolio-footer">
        <div className="footer-container container">
          <div className="footer-info">
            <div className="footer-brand">
              YEYINT THWAY
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Yeyint Thway. All rights reserved.
            </p>
          </div>

          <div className="social-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub Profile"
            >
              <GithubIcon />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-link"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* CUSTOM CURSOR */}
      <div id="custom-cursor-dot" className="custom-cursor-dot" />
      <div id="custom-cursor-ring" className="custom-cursor-ring" />
    </div>
  );
}
