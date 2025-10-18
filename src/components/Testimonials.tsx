import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Joshi",
      location: "Gandhinagar",
      rating: 5,
      text: "Dr. Patel's homeopathy treatment helped my thyroid condition significantly. I've been feeling much better and my reports have improved. Highly recommend!",
      condition: "Thyroid Disorder",
    },
    {
      name: "Priya Mehta",
      location: "Ahmedabad",
      rating: 5,
      text: "Gentle, scientific, and effective healing experience. My skin condition improved tremendously within a few months of treatment.",
      condition: "Skin Condition",
    },
    {
      name: "Ankit Shah",
      location: "Raysan",
      rating: 5,
      text: "After trying various treatments, homeopathy finally gave me relief from my chronic migraines. Dr. Patel is very patient and thorough.",
      condition: "Chronic Migraines",
    },
    {
      name: "Neha Patel",
      location: "Gandhinagar",
      rating: 5,
      text: "My daughter's allergies are so much better now. Dr. Patel took time to understand the root cause and gave personalized treatment.",
      condition: "Allergies",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Automatic slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 2000); // change 3000 to 2000 for 2 seconds
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from patients who have found healing through homeopathy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="border-0 shadow-2xl bg-card overflow-hidden">
              <CardContent className="p-8 md:p-12">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-foreground text-center mb-8 leading-relaxed italic">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <p className="font-heading font-bold text-lg text-foreground">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].condition}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
