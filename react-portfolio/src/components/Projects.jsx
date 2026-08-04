import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            title: 'Sentiment Analysis of Voice-Based Scholarship Verification',
            description:
                '🏆 HACKATHON WINNING PROJECT (₹30,000 Prize) - AI-driven system to automate voice verification workflow for scholarship applications.',
            features: [
                'Voice to text conversion and sentiment analysis',
                'Automated decision-making based on sentiment',
                'Reduced manual verification checks by 90%',
            ],
            tech: ['React', 'Flask', 'MySQL', 'Gemini AI', 'LangGraph', 'Groq'],
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: 'Karpom Karpipom - Tutor Platform',
            description:
                'Platform for managing tutors and students with role-based access. Free tuition service for 12th grade students.',
            features: [
                'Role-based login for tutors and students',
                'Student progress tracking',
                'Schedule management system',
            ],
            tech: ['Flask', 'MySQL', 'JavaScript', 'HTML/CSS'],
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            title: 'Sales Application - Inventory Management',
            description:
                'Full-stack application for managing products, suppliers, and sales with comprehensive CRUD operations and analytics.',
            features: [
                'Product and supplier management',
                'Sales tracking and reporting',
                'Dynamic forms and dashboards',
            ],
            tech: ['Flask', 'MySQL', 'JavaScript', 'REST API', 'HTML/CSS'],
            gradient: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 90%, #2BFF88 100%)',
        },
        {
            title: 'Predictive & Preventive Maintenance',
            description:
                'Industrial IoT solution using Machine Learning to predict equipment failures and prevent downtime in manufacturing.',
            features: [
                'Failure prediction model for industrial equipment',
                'Real-time monitoring and alerts',
                'Data visualization dashboards',
            ],
            tech: ['Python', 'Machine Learning', 'Data Analytics', 'Firebase'],
            gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFA07A 100%)',
        },
        {
            title: 'Sentiment Analysis with PySpark',
            description:
                'Scalable sentiment classification system using Big Data analytics with PySpark pipeline for processing large datasets.',
            features: [
                'Scalable PySpark data processing',
                'Multiple ML classification models',
                'Real-time sentiment analysis',
            ],
            tech: ['PySpark', 'Flask', 'MySQL', 'Machine Learning', 'Big Data Analytics'],
            gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="projects" className="projects section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A showcase of my recent work and technical achievements
                    </p>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card glass"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="project-header"
                                style={{ background: project.gradient }}
                            >
                                <motion.div
                                    className="project-icon"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    💻
                                </motion.div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-features">
                                    <h4>Key Features:</h4>
                                    <ul>
                                        {project.features.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.3 + idx * 0.1 }}
                                            >
                                                <span className="feature-bullet">▸</span> {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="project-tech">
                                    {project.tech.map((tech, idx) => (
                                        <motion.span
                                            key={idx}
                                            className="tech-tag"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="resume-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="resume-card glass">
                        <h3>Want to know more?</h3>
                        <p>Download my resume to explore my complete experience and skills</p>
                        <motion.a
                            href="/Devika_resume.pdf"
                            download
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(192, 132, 252, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download Resume
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;

