import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const contacts = [
        {
            icon: <FaEnvelope />,
            label: 'Email',
            value: 'devikakg0206@gmail.com',
            href: 'mailto:devikakg0206@gmail.com',
            color: '#EA4335',
        },
        {
            icon: <FaLinkedin />,
            label: 'LinkedIn',
            value: 'Connect on LinkedIn',
            href: 'https://www.linkedin.com/in/devika-k-g-a9a9ba297',
            color: '#0A66C2',
        },
        {
            icon: <FaGithub />,
            label: 'GitHub',
            value: 'View my repositories',
            href: 'https://github.com/devikaGunasekaran',
            color: '#c084fc',
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Determine API URL based on environment
            const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

            const response = await fetch(`${API_URL}/api/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Failed to send message');
            }

            // Success
            setSuccessMessage(data.message || 'Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
            setSubmitted(true);

            // Reset form and success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
                setSuccessMessage('');
            }, 5000);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact section" ref={ref}>
            <div className="contact-bg-animation" aria-hidden="true">
                <span className="contact-orb orb-1" />
                <span className="contact-orb orb-2" />
                <span className="contact-orb orb-3" />
            </div>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Get In Touch</span>
                    </h2>
                    <p className="section-subtitle">
                        Let's connect and discuss how we can work together
                    </p>
                </motion.div>

                {/* Contact Card Links */}
                <motion.div
                    className="contact-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={index}
                            href={contact.href}
                            target={contact.href.startsWith('http') ? '_blank' : undefined}
                            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="contact-card glass"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{ '--contact-color': contact.color }}
                        >
                            <motion.div
                                className="contact-icon"
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                {contact.icon}
                            </motion.div>
                            <h3 className="contact-label">{contact.label}</h3>
                            <p className="contact-value">{contact.value}</p>
                            <div className="contact-glow" style={{ background: contact.color }} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="contact-form-container"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="form-card glass">
                        <h3 className="form-title">Send me a Message</h3>

                        {submitted && (
                            <motion.div
                                className="alert alert-success"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <FaCheckCircle className="alert-icon" />
                                <p>{successMessage}</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                className="alert alert-error"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your phone number"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message here..."
                                    rows="5"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-submit"
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? (
                                    <span className="btn-loading">Sending...</span>
                                ) : (
                                    <>
                                        <FaPaperPlane className="btn-icon" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-footer"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p>&copy; 2025 Devika K G. Built with React & Framer Motion</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
