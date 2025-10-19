import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Heart, Shield, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Testimonials from "@/components/Testimonials";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Personalized Care",
      description:
        "Every patient receives individualized treatment plans based on their unique constitution and symptoms.",
    },
    {
      icon: Shield,
      title: "Natural & Safe Remedies",
      description:
        "We use 100% natural homeopathic medicines with no side effects, suitable for all ages.",
    },
    {
      icon: Target,
      title: "Long-Term Relief",
      description:
        "Focus on treating the root cause rather than just symptoms for lasting health benefits.",
    },
    {
      icon: Award,
      title: "Experienced Practitioner",
      description:
        "Over 12 years of dedicated practice in classical homeopathy with proven results.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              About Amrut Homeopathy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your trusted partner in holistic healing through classical homeopathy
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Amrut Homeopathy, we follow classical, scientific homeopathic methods focusing on the root cause of illnesses. Our mission is to provide holistic healing with compassion, care, and evidence-based practices.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe in treating the person as a whole—body, mind, and spirit—not just the disease. Through careful case analysis and individualized treatment, we help our patients achieve optimal health and well-being naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Bio Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Doctor Image */}
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
              </div>
            </div>

            {/* Doctor Info */}
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Dr. Birju Patel
              </h2>
              <p className="text-lg font-semibold text-primary mb-4">
                BHMS, NDDY | Consulting Homoeopath
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Birju Patel is a highly qualified homeopathic physician with over 12 years of clinical experience in treating a wide range of acute and chronic conditions.
                </p>
                <p>
                  Holding degrees in Bachelor of Homeopathic Medicine and Surgery (BHMS) and a diploma in Nutrition and Dietetics for Yoga (NDDY), Dr. Patel brings a comprehensive, holistic approach to healthcare.
                </p>
                <p>
                  His areas of expertise include endocrine disorders, skin conditions, thyroid management, respiratory ailments, women's health, and pediatric care. Dr. Patel is known for his patient-centric approach, taking time to understand each patient's unique health journey.
                </p>
                <p>
                  Through classical homeopathic principles and individualized treatment protocols, Dr. Patel has helped thousands of patients achieve lasting health improvements without the side effects of conventional medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Why Choose Amrut Homeopathy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine classical homeopathy with modern understanding to deliver exceptional patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover-lift">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-4">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <Footer />
    </div>
  );
};

export default About;
