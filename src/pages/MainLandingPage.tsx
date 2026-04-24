import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import PostSection from '../components/landing/PostSection';
import AboutSection from '../components/landing/AboutSection';
import CourseTypesSection from '../components/landing/CourseTypesSection';
import AboutTeacherSection from '../components/landing/AboutTeacherSection';
import LoadingPage from '../components/landing/LoadingPage';

const ImageGallerySection = lazy(() => import('../components/landing/ImageGallerySection'));
const InstitutesSection = lazy(() => import('../components/landing/InstitutesSection'));
const Footer = lazy(() => import('../components/landing/Footer'));
const WhatsAppButton = lazy(() => import('../components/landing/WhatsAppButton'));

const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="inline-block">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  </div>
);

export default function MainLandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="landing-shell">
      <AnimatePresence>
        {isLoading && <LoadingPage onLoadComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          className="min-h-screen scroll-smooth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Navbar />
          <HeroSection />
          <PostSection />
          <AboutSection />
          <CourseTypesSection />

          <Suspense fallback={<SectionFallback />}>
            <InstitutesSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ImageGallerySection />
          </Suspense>

          <AboutTeacherSection />

          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          <Suspense fallback={null}>
            <WhatsAppButton />
          </Suspense>
        </motion.div>
      )}
    </div>
  );
}
