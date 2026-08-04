import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="preloader-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="loader-circle"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.p
                className="loader-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          className="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation />
          <main>
            <Hero />
            <Skills />
            <Experience />
            <Achievements />
            <Projects />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;

