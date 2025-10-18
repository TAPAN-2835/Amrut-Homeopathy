import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AnimatedSection>
          <AboutPreview />
        </AnimatedSection>
        <AnimatedSection>
          <ServicesGrid />
        </AnimatedSection>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
          <FAQ />
        </AnimatedSection>
        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
