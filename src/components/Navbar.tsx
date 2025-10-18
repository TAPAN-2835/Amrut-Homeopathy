import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-card/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* ✅ Logo replaced with logo.svg */}
          <Link to="/" className="flex items-center space-x-2">
          <img
  src="/logo.png"
  alt="Amrut Homeopathy Logo"
  className="w-12 h-12 object-cover rounded-full border-2 border-primary transition-transform duration-300 hover:scale-110"
/>

            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-lg leading-tight transition-colors duration-300 ${
                  isHomePage
                    ? isScrolled
                      ? "text-foreground"
                      : "text-background"
                    : "text-foreground"
                }`}
              >
                Amrut Homeopathy
              </span>
              <span
                className={`text-xs transition-colors duration-300 ${
                  isHomePage
                    ? isScrolled
                      ? "text-muted-foreground"
                      : "text-background/80"
                    : "text-muted-foreground"
                }`}
              >
                Holistic Healing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? "text-primary"
                    : isHomePage
                    ? isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-background hover:text-secondary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+919824961387"
              className={`flex items-center transition-colors duration-300 ${
                isHomePage
                  ? isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-background hover:text-secondary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">+91 98249 61387</span>
            </a>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isHomePage
                ? isScrolled
                  ? "text-foreground"
                  : "text-background"
                : "text-foreground"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium px-4 py-2 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+919824961387"
                className="flex items-center px-4 py-2 text-foreground hover:bg-muted rounded-md"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 98249 61387</span>
              </a>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
