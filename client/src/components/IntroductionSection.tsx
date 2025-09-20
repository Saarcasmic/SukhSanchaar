import React from 'react';
import { Link } from 'react-router-dom';

const IntroductionSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-vintage-beige/20 to-aged-paper relative overflow-hidden bg-botanical">
      {/* Ornamental divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent shadow-lg"></div>

      {/* Subtle botanical background */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 left-20 w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
            <g opacity="0.12">
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M25 50h50M50 25v50" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
              <circle cx="50" cy="50" r="3" fill="#C9A66B" opacity="0.3"/>
            </g>
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 w-48 h-48">
          <svg viewBox="0 0 120 120" className="w-full h-full text-botanical-green">
            <g opacity="0.12">
              <path d="M60 20c-12 0-22 10-22 22 0 20 22 50 22 50s22-30 22-50c0-12-10-22-22-22z" fill="currentColor"/>
              <circle cx="60" cy="42" r="8" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
              <circle cx="60" cy="42" r="3" fill="#C9A66B" opacity="0.5"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating ornamental elements */}
      <div className="absolute top-1/3 right-1/3 w-4 h-4 animate-float opacity-25">
        <svg viewBox="0 0 16 16" className="w-full h-full text-heritage-gold">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Golden ornamental line */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-heritage-gold to-ayur-gold"></div>
          <div className="mx-4 w-4 h-4 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-glow shadow-lg"></div>
          <div className="w-20 h-px bg-gradient-to-r from-ayur-gold via-heritage-gold to-transparent"></div>
        </div>

        {/* Introduction text */}
        <p className="font-lora text-2xl sm:text-3xl text-antique-brown-dark leading-relaxed mb-12 animate-fade-in drop-shadow-sm">
          <strong>Sanchaaar</strong> has been dedicated to authentic Ayurvedic formulations for over a century, 
          carrying forward a legacy of wellness and trust.
        </p>

        {/* Read More button */}
        <Link
          to="/about"
          className="inline-block border-2 border-heritage-gold text-heritage-gold px-10 py-4 rounded-full font-noto font-semibold text-lg hover:bg-gradient-to-r hover:from-heritage-gold hover:to-ayur-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 bg-vintage-beige/20 backdrop-blur-sm"
        >
          Read More
        </Link>

        {/* Bottom ornamental line */}
        <div className="flex items-center justify-center mt-12">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-heritage-gold to-ayur-gold"></div>
          <div className="mx-4 w-4 h-4 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-glow shadow-lg"></div>
          <div className="w-20 h-px bg-gradient-to-r from-ayur-gold via-heritage-gold to-transparent"></div>
        </div>
      </div>

      {/* Bottom ornamental divider */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-heritage-gold to-transparent shadow-lg"></div>
    </section>
  );
};

export default IntroductionSection;