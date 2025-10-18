import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
{/* Brand Section */}
<div>
  <div className="flex items-center space-x-2 mb-4">
    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-green-500">
      <img
        src="/logo.png"
        alt="Amrut Homeopathy Logo"
        className="w-12 h-12 object-contain"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-heading font-bold text-lg leading-tight text-white">
        Amrut Homeopathy
      </span>
      <span className="text-xs text-white/80">A Pathway to Holistic Healing</span>
    </div>
  </div>
  <p className="text-sm text-white/80 mb-4">
    Experience safe, gentle, and effective treatment for chronic and acute conditions through Classical Homeopathy.
  </p>
</div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Gallery", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "")}`}
                    className="text-sm text-white/80 hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="tel:+919824961387" className="text-sm text-white/80 hover:text-secondary transition-colors">
                  +91 98249 61387
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <a href="mailto:amruthomeopathy@gmail.com" className="text-sm text-white/80 hover:text-secondary transition-colors">
                  amruthomeopathy@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  First Floor, Shop No. 107, Vinayak Skydeck Commercial Complex, near PDPU Cross Road, Raysan, Gandhinagar, Gujarat 382007
                </span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-white">Clinic Hours</h3>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-white/80">Mon - Fri: 10:00 AM - 7:00 PM</li>
              <li className="text-sm text-white/80">Saturday: 10:00 AM - 2:00 PM</li>
              <li className="text-sm text-white/80">Sunday: Closed</li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/919824961387"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="mailto:amruthomeopathy@gmail.com"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.212385704326!2d72.6491022!3d23.1624473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8149ea30b7a9%3A0xfcfce95f935a1e42!2sAMRUT%20HOMOEOPATHY!5e0!3m2!1sen!2sin!4v1759933816049!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "0.75rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Amrut Homeopathy Location"
          ></iframe>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amrut Homeopathy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
