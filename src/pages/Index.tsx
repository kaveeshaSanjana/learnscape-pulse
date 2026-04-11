import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PostSection from "@/components/PostSection";
import AboutSection from "@/components/AboutSection";
import ClassesSection from "@/components/ClassesSection";
import ResultsSection from "@/components/ResultsSection";
import VideoGallerySection from "@/components/VideoGallerySection";
import ImageGallerySection from "@/components/ImageGallerySection";
import ReviewSection from "@/components/ReviewSection";
import SriLankaSection from "@/components/SriLankaSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <PostSection />
      <AboutSection />
      <ClassesSection />
      <ResultsSection />
      <VideoGallerySection />
      <ImageGallerySection />
      <ReviewSection />
      <SriLankaSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
