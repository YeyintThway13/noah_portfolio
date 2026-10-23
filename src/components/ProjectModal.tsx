import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Tag, Briefcase } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="project-modal-overlay">
      {/* Dark Overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 5, 5, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000
        }}
      />

      {/* Modal Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="project-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="project-modal-close"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="project-modal-section">
          <span className="project-modal-category">
            {project.category}
          </span>
          <h2 className="project-modal-title">
            {project.title}
          </h2>
          <div className="project-modal-role">
            <Briefcase className="w-4 h-4" />
            <span>{project.role}</span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="project-modal-section">
          <h3 className="project-modal-section-title">About Project</h3>
          <p className="project-modal-description">
            {project.fullDescription}
          </p>
        </div>

        {/* Technology tags */}
        <div className="project-modal-section">
          <h3 className="project-modal-section-title">
            <Tag className="w-4 h-4" /> Tech Stack Used
          </h3>
          <div className="project-modal-tags">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="project-modal-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <div className="project-modal-section" style={{ marginBottom: 0 }}>
          <h3 className="project-modal-section-title">
            <Award className="w-4 h-4" /> Key Contributions & Achievements
          </h3>
          <ul className="project-modal-achievements">
            {project.achievements.map((achievement, idx) => (
              <li key={idx} className="project-modal-achievement-item">
                <span className="project-modal-achievement-bullet" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
  