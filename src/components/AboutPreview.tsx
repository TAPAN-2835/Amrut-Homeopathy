import { Link } from "react-router-dom";
import { ArrowRight, Award, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  const features = [
    {
      icon: Award,
      title: "12+ Years Experience",
      description: "Proven track record in treating complex chronic conditions",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Individualized treatment plans tailored to your unique needs",
    },
    {
      icon: Shield,
      title: "Safe & Natural",
      description: "100% natural remedies with no side effects",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/avatar.webp"
                alt="Dr. Birju Patel - Homeopathic Doctor"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-opacity duration-700 opacity-0"
                onLoad={(e) => (e.currentTarget.style.opacity = 1)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-xl">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold">BHMS</p>
                <p className="text-sm">NDDY Certified</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="slide-up">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Meet Your Doctor
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Dr. Birju Patel
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Consulting Homoeopath with <strong>BHMS, NDDY</strong> qualifications and over 12 years of dedicated experience in treating endocrine disorders, skin conditions, thyroid issues, and various chronic ailments through individualized homeopathic care.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Amrut Homeopathy, we follow classical, scientific homeopathic methods focusing on the root cause of illnesses. Our mission is to provide holistic healing with compassion, care, and evidence-based practices.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
