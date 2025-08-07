import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import VideoShowcase from "@/components/sections/VideoShowcase";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="LMS Instruction – Modern LMS Website"
        description="Modern home, features with burst button, 3D video carousel, about, and footer. Full-page sections with smooth scroll animations."
      />
      <main>
        <Hero />
        <Features />
        <VideoShowcase />
        <About />
        <Footer />
      </main>
    </>
  );
};

export default Index;
