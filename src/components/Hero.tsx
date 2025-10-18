import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/g4.jpg"
          alt="Amrut Homeopathy Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <div className="slide-up">
            <h1 className="mt-6 md:mt-10 text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-background mb-6 leading-tight">
              A Pathway to <span className="text-secondary">Holistic Healing</span>
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8 leading-relaxed">
              Experience safe, gentle, and effective treatment for chronic and acute conditions through Classical Homeopathy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 group"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-background/10 border-2 border-background text-background hover:bg-background hover:text-foreground text-lg px-8 py-6 backdrop-blur-sm"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 md:mb-20">
            <div className="bg-background/10 backdrop-blur-md rounded-lg p-6 border border-background/20">
              <h3 className="text-3xl font-heading font-bold text-secondary mb-2">
                12+
              </h3>
              <p className="text-background/90">Years of Experience</p>
            </div>
            <div className="bg-background/10 backdrop-blur-md rounded-lg p-6 border border-background/20">
              <h3 className="text-3xl font-heading font-bold text-secondary mb-2">
                5000+
              </h3>
              <p className="text-background/90">Happy Patients</p>
            </div>
            <div className="bg-background/10 backdrop-blur-md rounded-lg p-6 border border-background/20">
              <h3 className="text-3xl font-heading font-bold text-secondary mb-2">
                100%
              </h3>
              <p className="text-background/90">Natural Remedies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
