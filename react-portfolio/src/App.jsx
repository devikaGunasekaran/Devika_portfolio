import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './App.css';

// Lazy load below-the-fold sections for faster initial paint
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Lightweight fallback while lazy chunks load
const SectionLoader = () => (
  <div className="section-loader">
    <div className="section-loader-bar" />
  </div>
);

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
