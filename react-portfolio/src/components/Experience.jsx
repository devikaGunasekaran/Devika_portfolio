import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaLaptopHouse } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      title: 'Current Intern',
      company: 'Hexaware Technologies',
      duration: 'Ongoing',
      icon: <FaLaptopHouse />,
      techStack: 'FastAPI, Backend Development',
      points: [
        'Working on backend API development using FastAPI.',
        'Designing scalable REST APIs and improving system performance.',
        'Gaining hands-on experience in enterprise-level application architecture.',
      ],
    },
    {
      title: 'Automation Intern',
      company: 'Flecs Autotech',
      duration: 'Dec 2025 - Jan 2026',
      icon: <FaBriefcase />,
      stipend: 'INR 3,000',
      points: [
        'Contributed to Python-based machine data cleaning and visualization.',
        'Assisted in small-parts order tracking software with summary and inlet-outlet analytics.',
        'Improved automation workflows for operational efficiency.',
      ],
    },
  ];

  return (
    <section id="experience" className="experience section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Internship journey and industry exposure
          </p>
        </motion.div>

        <div className="experience-list">
          {experiences.map((item, index) => (
            <motion.article
              key={item.company}
              className="experience-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="experience-head">
                <div className="experience-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="experience-meta">
                    {item.company} | {item.duration}
                  </p>
                  {item.techStack && (
                    <p className="experience-extra">
                      <strong>Tech Stack:</strong> {item.techStack}
                    </p>
                  )}
                  {item.stipend && (
                    <p className="experience-extra">
                      <strong>Stipend:</strong> {item.stipend}
                    </p>
                  )}
                </div>
              </div>

              <ul className="experience-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
