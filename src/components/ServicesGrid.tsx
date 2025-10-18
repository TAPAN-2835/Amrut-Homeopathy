import { Link } from "react-router-dom";
import { Activity, Leaf, Wind, Users, Brain, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesGrid = () => {
  const services = [
    {
      icon: Activity,
      title: "Thyroid & Hormonal Disorders",
      description: "Gentle and effective treatment for hormonal imbalances and thyroid conditions.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Leaf,
      title: "Skin & Hair Care",
      description: "Natural remedies for acne, eczema, psoriasis, hair fall, and other skin conditions.",
      color: "bg-secondary/20 text-primary",
    },
    {
      icon: Wind,
      title: "Respiratory & Allergy Relief",
      description: "Safe treatment for asthma, sinusitis, allergies, and respiratory issues.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Users,
      title: "Child & Women's Health",
      description: "Specialized care for children and women's health including PCOD and menstrual issues.",
      color: "bg-secondary/20 text-primary",
    },
    {
      icon: Brain,
      title: "Stress & Lifestyle Management",
      description: "Holistic approach to managing stress, anxiety, and lifestyle-related disorders.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      title: "Chronic Disease Care",
      description: "Long-term management of diabetes, arthritis, migraines, and other chronic conditions.",
      color: "bg-secondary/20 text-primary",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Comprehensive Homeopathic Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer personalized treatment for a wide range of health conditions using safe, natural homeopathic remedies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover-lift border-0 shadow-lg bg-card overflow-hidden group flex flex-col"
            >
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${service.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link 
                  to={`/contact?concern=${encodeURIComponent(service.title)}`}
                  className="w-full"
                >
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
