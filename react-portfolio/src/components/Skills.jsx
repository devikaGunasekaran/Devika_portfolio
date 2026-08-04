import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPython, FaDatabase, FaCode, FaLaptopCode, FaJava } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skills = [
        {
            icon: <FaPython />,
            title: 'Python & Backend',
            description: 'Python programming with Flask and REST API development',
            color: '#3776AB',
        },
        {
            icon: <FaJava />,
            title: 'Java & Spring Boot',
            description: 'Java programming using the Spring Boot framework for robust enterprise applications',
            color: '#f89820',
        },
        {
            icon: <FaDatabase />,
            title: 'Databases & SQL',
            description: 'MySQL database design, optimization, and RESTful API architectures',
            color: '#00758F',
        },
        {
            icon: <FaCode />,
            title: 'ML/AI & Data',
            description: 'LangGraph, PySpark, Gemini AI, RAG, Machine Learning, and Data Analytics',
            color: '#FF6B6B',
        },
        {
            icon: <FaLaptopCode />,
            title: 'Full Stack Dev',
            description: 'HTML/CSS, JavaScript for responsive and interactive web interfaces',
            color: '#61DAFB',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Skills & Expertise</span>
                    </h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with to bring ideas to life
                    </p>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-card glass"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { duration: 0.3 },
                            }}
                            style={{ '--skill-color': skill.color }}
                        >
                            <motion.div
                                className="skill-icon"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                {skill.icon}
                            </motion.div>
                            <h3 className="skill-title">{skill.title}</h3>
                            <p className="skill-description">{skill.description}</p>
                            <div className="skill-glow" style={{ background: skill.color }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

