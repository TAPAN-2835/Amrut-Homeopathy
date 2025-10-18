import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Activity, Leaf, Wind, Users, Brain, Heart, Baby, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Activity,
      title: "Thyroid & Hormonal Disorders",
      description:
        "Gentle and effective homeopathic treatment for thyroid imbalances, PCOD, hormonal irregularities, and endocrine disorders. Our approach addresses the root cause for long-term hormonal balance.",
      treatments: ["Hypothyroidism", "Hyperthyroidism", "PCOD/PCOS", "Hormonal Imbalances"],
    },
    {
      icon: Leaf,
      title: "Skin & Hair Care",
      description:
        "Natural remedies for various skin conditions and hair problems. We treat the underlying causes to provide lasting relief without side effects.",
      treatments: ["Acne & Pimples", "Eczema & Psoriasis", "Hair Fall", "Dandruff & Scalp Issues"],
    },
    {
      icon: Wind,
      title: "Respiratory & Allergy Relief",
      description:
        "Safe and effective treatment for respiratory conditions and allergies. Homeopathy helps strengthen immunity and reduce allergic responses naturally.",
      treatments: ["Asthma", "Sinusitis", "Allergic Rhinitis", "Chronic Cough"],
    },
    {
      icon: Heart,
      title: "Chronic Disease Management",
      description:
        "Comprehensive care for chronic conditions focusing on improving quality of life and reducing dependency on conventional medications.",
      treatments: ["Diabetes Management", "Arthritis", "Migraines", "Hypertension"],
    },
    {
      icon: Users,
      title: "Women's Health",
      description:
        "Specialized homeopathic care for women's health issues at all life stages, from menstrual problems to menopause.",
      treatments: ["Menstrual Irregularities", "PCOD/PCOS", "Menopausal Symptoms", "Pregnancy Care"],
    },
    {
      icon: Baby,
      title: "Pediatric Care",
      description:
        "Safe, gentle homeopathic treatment for children. Our remedies have no side effects and work effectively for various childhood ailments.",
      treatments: ["Growth & Development", "Recurring Infections", "Behavioral Issues", "Allergies"],
    },
    {
      icon: Brain,
      title: "Stress & Mental Health",
      description:
        "Holistic approach to managing stress, anxiety, and mental health issues through individualized homeopathic treatment.",
      treatments: ["Anxiety & Stress", "Depression", "Sleep Disorders", "Mental Fatigue"],
    },
    {
      icon: Stethoscope,
      title: "General Health & Wellness",
      description:
        "Complete homeopathic care for acute and chronic conditions, focusing on overall health improvement and disease prevention.",
      treatments: ["Digestive Disorders", "Joint Pain", "General Weakness", "Immunity Building"],
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
              Our Treatments & Expertise
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive homeopathic care for a wide range of health conditions using safe, natural remedies
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover-lift flex flex-col">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-4">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="font-semibold text-sm text-foreground mb-2">We Treat:</p>
                    <ul className="space-y-1">
                      {service.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Appointment Button */}
                  <Link
                    to={`/contact?concern=${encodeURIComponent(service.title)}`}
                    className="mt-auto"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:-translate-y-0.5 transition-transform duration-300">
                      Book Appointment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-card rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Ready to Experience Natural Healing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book your consultation today and start your journey towards holistic health with personalized homeopathic treatment.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              >
                Book Appointment Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
