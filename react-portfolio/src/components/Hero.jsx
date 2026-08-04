import { motion } from 'framer-motion';
import { LuSparkles } from 'react-icons/lu';
import './Hero.css';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="home" className="hero">
            <div className="hero-bg-animation" aria-hidden="true">
                <span className="hero-orb hero-orb-1" />
                <span className="hero-orb hero-orb-2" />
                <span className="hero-orb hero-orb-3" />
            </div>
            {/* Animated Background Elements */}
            <div className="hero-bg">
                <motion.div
                    className="bg-circle circle-1"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="bg-circle circle-2"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
            </div>

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="hero-top-grid">
                    <motion.div className="hero-left" variants={itemVariants}>
                        <div className="hero-greeting">
                            <span className="intro-icon"><LuSparkles /></span> Hello, I'm
                        </div>

                        <h1 className="hero-name">Devika K G</h1>

                        <div className="hero-roles">
                            <motion.span
                                className="hero-role-badge"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(192, 132, 252, 0.2)' }}
                            >
                                AI/ML Developer
                            </motion.span>
                            <span className="role-divider"></span>
                            <motion.span
                                className="hero-role-badge"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(192, 132, 252, 0.2)' }}
                            >
                                Full Stack Developer
                            </motion.span>
                        </div>

                        <p className="hero-summary">
                            Building intelligent, scalable systems that turn complex ideas
                            into high-impact digital realities.
                        </p>
                        <div className="hero-cta">
                            <motion.a
                                href="#projects"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn btn-outline"
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-right"
                        variants={itemVariants}
                    >
                        <div className="visual-experience">
                            <div className="experience-blob"></div>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </section>
    );
};

export default Hero;



