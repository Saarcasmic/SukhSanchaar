import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  backgroundImage: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imagePosition?: string;
  useFullImage?: boolean;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      // Full design image with text and products baked in
      backgroundImage:
        "https://ypdtaswsurcjhfvnqdvo.supabase.co/storage/v1/object/public/SukhSanchaar%20Content/Product%20Images/Sudha%20Sindhu%20(1440%20x%20468%20px)%20(100%20x%2046%20px)%20(423%20x%20187%20px)%20(2400%20x%201000%20px)%20(2).png",
      imagePosition: "center center",
      useFullImage: true, // Full image, no text overlay
      buttonLink: "/products",
    },
    {
      id: 2,
      backgroundImage:
        "https://ypdtaswsurcjhfvnqdvo.supabase.co/storage/v1/object/public/SukhSanchaar%20Content/Product%20Images/about%20us%20banner.png",
      imagePosition: "center center",
      useFullImage: true, // Full image, no text overlay
      buttonLink: "/about",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ marginTop: "65px", aspectRatio: "2.4/1" }}
    >
      <div className="relative w-full h-full">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="w-full h-full flex-shrink-0 relative"
              >
                <a
                  href={slide.buttonLink}
                  tabIndex={0}
                  aria-label={
                    slide.buttonLink === "/products"
                      ? "Go to Products Page"
                      : "Go to About Page"
                  }
                  className="block absolute inset-0 z-10"
                >
                  <img
                    src={slide.backgroundImage}
                    alt={`Sukh Sancharak Co. Ayurvedic Medicine Banner ${index + 1} - Traditional Herbal Remedies`}
                    className="w-full h-full object-contain"
                    style={{ objectPosition: slide.imagePosition || "center center" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </a>
              </div>
            ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300  z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300  z-20"
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
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
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
