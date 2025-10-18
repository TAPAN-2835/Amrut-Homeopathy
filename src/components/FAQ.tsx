import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does homeopathy treatment take?",
      answer: "The duration of treatment depends on the individual case, the nature of the condition, and how long you've had it. Acute conditions may see results within days to weeks, while chronic conditions typically take a few months. Most patients notice improvements within the first few weeks of treatment.",
    },
    {
      question: "Are there any side effects of homeopathic medicines?",
      answer: "Homeopathic medicines are completely safe and natural, with no side effects when prescribed by a qualified practitioner. The remedies are made from natural substances in highly diluted forms, making them gentle yet effective for people of all ages.",
    },
    {
      question: "Can homeopathy treat chronic diseases?",
      answer: "Yes, homeopathy is particularly effective for chronic diseases like thyroid disorders, skin conditions, respiratory issues, arthritis, migraines, and more. It works by addressing the root cause of the problem rather than just suppressing symptoms, providing long-term relief.",
    },
    {
      question: "Is homeopathy safe for children and pregnant women?",
      answer: "Absolutely! Homeopathy is one of the safest treatment options for children and pregnant women. The natural remedies have no harmful side effects and can effectively treat various conditions from childhood ailments to pregnancy-related issues.",
    },
    {
      question: "Can I continue my regular medications with homeopathy?",
      answer: "Yes, homeopathic treatment can be taken alongside conventional medicines. However, it's important to inform Dr. Patel about all medications you're currently taking. As your condition improves, conventional medications may be gradually reduced under proper medical supervision.",
    },
    {
      question: "What should I expect during my first consultation?",
      answer: "During your first visit, Dr. Patel will conduct a detailed consultation to understand your medical history, current symptoms, lifestyle, and overall health. This comprehensive assessment helps in creating a personalized treatment plan tailored to your specific needs.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about homeopathy and our treatments.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-0 rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <span className="text-left font-heading font-semibold text-lg text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
