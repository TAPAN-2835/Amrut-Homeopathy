import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    date: "",
    timeSlot: "",
    concern: "",
    message: "",
    patientType: "new",
  });

  // Prefill concern from URL parameter
  useEffect(() => {
    const concernParam = searchParams.get("concern");
    if (concernParam) {
      // Map service titles to concern values
      const concernMap: Record<string, string> = {
        "Thyroid & Hormonal Disorders": "thyroid",
        "Skin & Hair Care": "skin",
        "Respiratory & Allergy Relief": "respiratory",
        "Child & Women's Health": "women",
        "Stress & Lifestyle Management": "stress",
        "Chronic Disease Care": "chronic",
      };
      const mappedConcern = concernMap[concernParam] || "other";
      setFormData((prev) => ({ ...prev, concern: mappedConcern }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName || !formData.mobile || !formData.date || !formData.timeSlot || !formData.concern) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Mobile number validation (10 digits)
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Date validation (no past dates)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast({
        title: "Invalid Date",
        description: "Please select a future date.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appointment Booked Successfully! ✓",
        description: "You'll receive confirmation shortly. We look forward to seeing you!",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        date: "",
        timeSlot: "",
        concern: "",
        message: "",
        patientType: "new",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Schedule a consultation and take the first step towards natural healing
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-lg sticky top-24">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Address</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        First Floor, Shop No. 107, Vinayak Skydeck Commercial Complex, near PDPU Cross Road, Raysan, Gandhinagar, Gujarat 382007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href="tel:+919824961387" className="text-sm text-primary hover:underline">
                        +91 98249 61387
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href="mailto:amruthomeopathy@gmail.com" className="text-sm text-primary hover:underline break-all">
                        amruthomeopathy@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Clinic Hours</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Mon - Fri: 10:00 AM - 7:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
                <h2 className="font-heading font-bold text-3xl text-foreground mb-8">
                  Schedule an Appointment
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* Mobile & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, ""))}
                        maxLength={10}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date">Appointment Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeSlot">Preferred Time *</Label>
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(value) => handleChange("timeSlot", value)}
                        required
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                          <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Concern */}
                  <div>
                    <Label htmlFor="concern">Primary Concern *</Label>
                    <Select
                      value={formData.concern}
                      onValueChange={(value) => handleChange("concern", value)}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your main concern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thyroid">Thyroid & Hormonal Disorders</SelectItem>
                        <SelectItem value="skin">Skin & Hair Issues</SelectItem>
                        <SelectItem value="respiratory">Respiratory Conditions</SelectItem>
                        <SelectItem value="chronic">Chronic Diseases</SelectItem>
                        <SelectItem value="women">Women's Health</SelectItem>
                        <SelectItem value="child">Child Care</SelectItem>
                        <SelectItem value="stress">Stress & Mental Health</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Patient Type */}
                  <div>
                    <Label>Patient Type *</Label>
                    <RadioGroup
                      value={formData.patientType}
                      onValueChange={(value) => handleChange("patientType", value)}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new" className="cursor-pointer font-normal">
                          New Patient
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="existing" id="existing" />
                        <Label htmlFor="existing" className="cursor-pointer font-normal">
                          Existing Patient
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Additional Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your symptoms or concerns..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
