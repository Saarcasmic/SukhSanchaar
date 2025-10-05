import React, { useState, useEffect } from "react";

interface CompanyImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  year?: string;
}

interface CompanyHistoryCarouselProps {
  images: CompanyImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const CompanyHistoryCarousel: React.FC<CompanyHistoryCarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg bg-white border border-cream-200">
        {/* Images */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="w-full flex-shrink-0 relative">
              <div className="aspect-[4/3] sm:aspect-[3/2] relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* Overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                    <h3 className="font-playfair text-base md:text-lg font-bold mb-1">
                      {image.caption}
                    </h3>
                    {image.year && (
                      <p className="font-lora text-xs md:text-sm text-ayur-gold/90">
                        {image.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyHistoryCarousel;
