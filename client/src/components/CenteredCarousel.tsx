import React, { useState, useEffect, useCallback } from "react";

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  year?: string;
}

interface CenteredCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const CenteredCarousel: React.FC<CenteredCarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 4000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ensure transition duration matches animation duration (ms)
  const TRANSITION_DURATION = 600;

  // Auto-play functionality: advances slide every autoPlayInterval milliseconds CONTINUOUSLY
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    }, autoPlayInterval);

    return () => clearInterval(timer);
    // Only depend on autoPlay, autoPlayInterval, images.length to ensure consistent interval (not on currentIndex)
  }, [autoPlay, autoPlayInterval, images.length]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [isTransitioning, images.length]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [isTransitioning, images.length]);

  if (images.length === 0) return null;

  // Helper function to get image at specific offset
  const getImageAtIndex = (offset: number) => {
    const index = (currentIndex + offset + images.length) % images.length;
    return images[index];
  };

  const previousImage = getImageAtIndex(-1);
  const currentImage = getImageAtIndex(0);
  const nextImage = getImageAtIndex(1);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden py-4 md:py-6 lg:py-8">
        {/* Images Grid */}
        <div
          className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10"
          style={{
            minHeight: 0,
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          {/* Previous Image */}
          <div
            className="relative flex-shrink-0 transition-all duration-700 ease-in-out cursor-pointer"
            style={{
              width: "22%",
              maxWidth: "450px",
              minWidth: "100px",
            }}
            onClick={handlePrevious}
          >
            <div className="space-y-1 md:space-y-2">
              <div
                className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg opacity-60 hover:opacity-80 transition-opacity duration-300"
                style={{ paddingBottom: "122%" }}
              >
                <img
                  src={previousImage.src}
                  alt={previousImage.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption below image */}
              {(previousImage.caption || previousImage.year) && (
                <div className="text-center px-1 md:px-2 opacity-60">
                  {previousImage.caption && (
                    <h3 className="font-playfair text-xs md:text-sm lg:text-base font-bold text-antique-brown line-clamp-2">
                      {previousImage.caption}
                    </h3>
                  )}
                  {previousImage.year && (
                    <p className="font-lora text-xs md:text-sm text-ayur-gold">
                      {previousImage.year}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Current Image - Featured */}
          <div
            className="relative flex-shrink-0 transition-all duration-700 ease-in-out z-10"
            style={{
              width: "38%",
              maxWidth: "750px",
              minWidth: "180px",
            }}
          >
            <div className="space-y-2 md:space-y-3">
              <div
                className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
                style={{ paddingBottom: "122%" }}
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />

                {/* Decorative border glow */}
                <div className="absolute inset-0 ring-2 md:ring-3 lg:ring-4 ring-ayur-gold/50 rounded-xl md:rounded-2xl pointer-events-none"></div>
              </div>

              {/* Caption below image */}
              {(currentImage.caption || currentImage.year) && (
                <div className="text-center px-2 md:px-4">
                  {currentImage.caption && (
                    <h3 className="font-playfair text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-antique-brown mb-1 md:mb-2">
                      {currentImage.caption}
                    </h3>
                  )}
                  {currentImage.year && (
                    <p className="font-lora text-sm md:text-base lg:text-lg xl:text-xl text-ayur-gold font-medium">
                      {currentImage.year}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Next Image */}
          <div
            className="relative flex-shrink-0 transition-all duration-700 ease-in-out cursor-pointer"
            style={{
              width: "22%",
              maxWidth: "450px",
              minWidth: "100px",
            }}
            onClick={handleNext}
          >
            <div className="space-y-1 md:space-y-2">
              <div
                className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg opacity-60 hover:opacity-80 transition-opacity duration-300"
                style={{ paddingBottom: "122%" }}
              >
                <img
                  src={nextImage.src}
                  alt={nextImage.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption below image */}
              {(nextImage.caption || nextImage.year) && (
                <div className="text-center px-1 md:px-2 opacity-60">
                  {nextImage.caption && (
                    <h3 className="font-playfair text-xs md:text-sm lg:text-base font-bold text-antique-brown line-clamp-2">
                      {nextImage.caption}
                    </h3>
                  )}
                  {nextImage.year && (
                    <p className="font-lora text-xs md:text-sm text-ayur-gold">
                      {nextImage.year}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6 lg:mt-7">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(
                    () => setIsTransitioning(false),
                    TRANSITION_DURATION,
                  );
                }
              }}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? "w-8 md:w-10 lg:w-12 h-2 md:h-2.5 bg-ayur-gold"
                  : "w-2 md:w-2.5 h-2 md:h-2.5 bg-antique-brown/30 hover:bg-antique-brown/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-20 md:w-32 h-20 md:h-32 bg-botanical-green/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-ayur-gold/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default CenteredCarousel;
