import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const imageRefs = useRef([]);

  // Images from public folder
  const images = ["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg", "/g5.jpg", "/g6.jpg"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const src = entry.target.getAttribute("data-src");
            if (src) {
              setLoadedImages((prev) => ({ ...prev, [src]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our Clinic Gallery
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Take a look at our clinic interiors designed for comfort and care.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover-lift"
                onClick={() => setSelectedImage(src)}
              >
                {!loadedImages[src] && (
                  <div className="w-full h-80 bg-gray-200 animate-pulse rounded-xl" />
                )}
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  data-src={src}
                  src={loadedImages[src] ? src : ""}
                  alt={`Clinic Interior ${index + 1}`}
                  className={`w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110 ${
                    loadedImages[src] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
