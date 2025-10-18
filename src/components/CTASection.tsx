import { Link } from "react-router-dom";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
            Book your appointment today and experience the gentle, effective power of homeopathy. Online and in-clinic consultations available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6 group"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Appointment Now
              </Button>
            </Link>
            <a href="tel:+919824961387">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call +91 98249 61387
              </Button>
            </a>
          </div>

          <p className="mt-8 text-primary-foreground/80 text-sm">
            Available Mon-Fri: 10:00 AM - 7:00 PM | Sat: 10:00 AM - 2:00 PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
