import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      // Use background image WITHOUT text (just products + leaves)
      backgroundImage: "/poster1.svg", // Clean background without text
      // Define text content separately for responsive overlay
      title: "SUDHA SINDHU",
      subtitle: "Bestseller",
      buttonText: "SHOP NOW",
      buttonLink: "#products",
      // Control image positioning
      imagePosition: "right center",
      // Optional: for slides with full image (like slide 2)
      useFullImage: false
    },
    {
      id: 2,
      backgroundImage: "https://ypdtaswsurcjhfvnqdvo.supabase.co/storage/v1/object/sign/SukhSanchaar%20Content/Posters/generate.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83OTU1MzI4Ny0zOTJmLTQzMTctOGU3YS1mMTY2YjAzZDA5NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdWtoU2FuY2hhYXIgQ29udGVudC9Qb3N0ZXJzL2dlbmVyYXRlLnBuZyIsImlhdCI6MTc1OTU2MjkyMiwiZXhwIjoyMDc0OTIyOTIyfQ.W5rOtwGJ0Eb7p-8IYyf6omyedoJGRWnAgR7EHVnuYN4",
      title: "A Legacy from 1890s India",
      subtitle: "Traditional Ayurvedic Remedies from the Golden Era",
      buttonText: "Explore Products",
      buttonLink: "#products",
      imagePosition: "center center",
      useFullImage: true // This slide uses full image with text baked in
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative w-full overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px]" style={{ marginTop: "50px" }}>
      <div className="relative w-full h-full">
        {/* Slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.backgroundImage}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: slide.imagePosition || "center center"
                  }}
                  loading="lazy"
                />
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-yellow-800/5 to-orange-900/10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

              {/* Text Content Overlay - Only show if not using full image */}
              {!slide.useFullImage && (
                <div className="relative z-10 h-full flex items-center">
                  <div className="w-full px-6 sm:px-12 lg:px-20">
                    <div className="max-w-2xl">
                      {/* Main Title */}
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-2 leading-tight tracking-tight">
                        {slide.title}
                      </h1>
                      
                      {/* Subtitle */}
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-gray-700 mb-6">
                        {slide.subtitle}
                      </p>

                      {/* Button */}
                      <a
                        href={slide.buttonLink}
                        className="inline-block px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {slide.buttonText}
                      </a>

                      {/* Badges Row */}
                      <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-center leading-tight">
                            GMP<br/>CERTIFIED<br/>PRACTICE
                          </span>
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-amber-700 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-white text-center leading-tight">
                            135+<br/>YEARS<br/>LEGACY
                          </span>
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-white text-center leading-tight">
                            AYURVEDIC<br/>100% Natural
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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