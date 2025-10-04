import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Dummy images for carousel - you can replace these with your actual images
  const slides = [
    {
      id: 1,
      image: "/poster4.svg", // Ayurvedic herbs      title: "Wellness Rooted in Tradition",
      subtitle: "Experience the power of ancient wisdom for modern health",
      buttonText: "Shop Now",
      buttonLink: "#products"
    },
    {
      id: 2,
      image: "https://ypdtaswsurcjhfvnqdvo.supabase.co/storage/v1/object/sign/SukhSanchaar%20Content/Posters/generate.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83OTU1MzI4Ny0zOTJmLTQzMTctOGU3YS1mMTY2YjAzZDA5NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdWtoU2FuY2hhYXIgQ29udGVudC9Qb3N0ZXJzL2dlbmVyYXRlLnBuZyIsImlhdCI6MTc1OTU2MjkyMiwiZXhwIjoyMDc0OTIyOTIyfQ.W5rOtwGJ0Eb7p-8IYyf6omyedoJGRWnAgR7EHVnuYN4", // Updated image URL
      title: "A Legacy from 1890s India",
      subtitle: "Traditional Ayurvedic Remedies from the Golden Era",
      buttonText: "Explore Products",
      buttonLink: "#products"
    },
    
    // {
    //   id: 5,
    //   image: "/generate3.png", // Ayurvedic herbs      title: "Wellness Rooted in Tradition",
    //   subtitle: "Experience the power of ancient wisdom for modern health",
    //   buttonText: "Shop Now",
    //   buttonLink: "#products"
    // },
    
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToProducts = () => {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      const elementPosition = productsElement.offsetTop;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToAbout = () => {
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      const elementPosition = aboutElement.offsetTop;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden  h-64 sm:h-80 md:h-[466px]" style={{ marginTop: "50px" }}>
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full "
                  style={{ height: "100%", width: "100%" }}
                />
              </div>

              {/* Dark overlay for text readability */}
              {/* <div className="absolute inset-0 bg-black/40"></div> */}

              {/* Vintage sepia overlay for historical feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-800/10 to-orange-900/20"></div>

              {/* Subtle vignette effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl animate-fade-in">
                  

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-amber-300 scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
