import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import './Achievements.css';

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements = [
    {
      icon: <FaTrophy />,
      title: '1st Prize in Hackathon',
      details: 'Conducted by Maatram Foundation',
      note: 'Cash prize of Rs.30,000',
    },
    {
      icon: <FaAward />,
      title: 'Star of Maatram',
      details: 'Recognition award',
      note: 'For outstanding contribution and performance',
    },
    {
      icon: <FaMedal />,
      title: '2nd Prize in Web Designing Competition',
      details: 'Jeppiar Institute of Technology',
      note: 'Inter-college technical competition',
    },
    {
      icon: <FaTrophy />,
      title: '1st Prize in Velammal Hackathon',
      details: 'Velammal Engineering College',
      note: 'Hackathon winner',
    },
  ];

  return (
    <section id="achievements" className="achievements section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Competitive wins and recognitions
          </p>
        </motion.div>

        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <motion.article
              key={item.title}
              className="achievement-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              <div className="achievement-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="achievement-detail">{item.details}</p>
              <p className="achievement-note">{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
