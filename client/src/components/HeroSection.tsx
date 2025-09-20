import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const productsElement = document.getElementById('products');
    if (productsElement) {
      const elementPosition = productsElement.offsetTop;
      const offsetPosition = elementPosition - 5; // 100px offset from the top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToAbout = () => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      const elementPosition = aboutElement.offsetTop;
      const offsetPosition = elementPosition - 5; // 100px offset from the top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-aged-paper via-vintage-beige to-cream-200 bg-parchment">
      {/* Background botanical illustrations in corners */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-8">
        <svg viewBox="0 0 200 200" className="w-full h-full text-botanical-green">
          <g fill="currentColor" opacity="0.12">
            <path d="M50 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z"/>
            <path d="M20 50c0-8 7-15 15-15 13 0 35 15 35 15s-22 15-35 15c-8 0-15-7-15-15zm20 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z"/>
            <circle cx="150" cy="150" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M125 150h50M150 125v50" stroke="currentColor" strokeWidth="1"/>
            <circle cx="30" cy="170" r="3" fill="#D4AF37" opacity="0.4"/>
            <circle cx="170" cy="30" r="4" fill="#C9A66B" opacity="0.3"/>
          </g>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-80 h-80 opacity-8 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full text-botanical-green">
          <g fill="currentColor" opacity="0.12">
            <path d="M50 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z"/>
            <path d="M20 50c0-8 7-15 15-15 13 0 35 15 35 15s-22 15-35 15c-8 0-15-7-15-15zm20 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z"/>
            <circle cx="150" cy="150" r="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3"/>
          </g>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-8">
        <svg viewBox="0 0 150 150" className="w-full h-full text-botanical-green">
          <g opacity="0.15">
            <circle cx="75" cy="75" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M75 40v70M40 75h70" stroke="currentColor" strokeWidth="1"/>
            <circle cx="75" cy="75" r="15" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
            <path d="M60 60l30 30M90 60l-30 30" stroke="#C9A66B" strokeWidth="0.5" opacity="0.3"/>
          </g>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-8 rotate-90">
        <svg viewBox="0 0 150 150" className="w-full h-full text-botanical-green">
          <g opacity="0.15">
            <circle cx="75" cy="75" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M75 40v70M40 75h70" stroke="currentColor" strokeWidth="1"/>
            <circle cx="75" cy="75" r="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
          </g>
        </svg>
      </div>

      {/* Floating ornamental elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 animate-float">
        <svg viewBox="0 0 32 32" className="w-full h-full text-heritage-gold opacity-20">
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="16" cy="16" r="4" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="absolute top-3/4 right-1/4 w-6 h-6 animate-float" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 24 24" className="w-full h-full text-ayur-gold opacity-25">
          <path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill="currentColor"/>
        </svg>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl animate-fade-in">
        {/* Logo prominently placed */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-ayur-red via-ayur-red-dark to-ayur-red-light rounded-full flex items-center justify-center shadow-2xl animate-bounce-gentle border-4 border-heritage-gold/30">
              <Leaf className="w-14 h-14 text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-heritage-gold to-ayur-gold rounded-full animate-ping opacity-20"></div>
            <div className="absolute -inset-2 w-36 h-36 border border-heritage-gold/20 rounded-full animate-glow"></div>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-playfair text-5xl sm:text-7xl lg:text-8xl font-bold text-antique-brown-dark mb-8 leading-tight drop-shadow-lg">
          135 Years of
          <br />
          <span className="text-transparent bg-gradient-to-r from-ayur-red via-ayur-red-dark to-heritage-gold bg-clip-text">Ayurvedic Heritage</span>
        </h1>

        {/* Subheading */}
        <p className="font-lora text-xl sm:text-2xl lg:text-3xl text-antique-brown-dark/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
          Since 1890 – Pure, Potent, Proven Remedies
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-heritage-gold to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-heritage-gold rounded-full animate-glow"></div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-heritage-gold to-transparent"></div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToProducts}
            className="group bg-gradient-to-r from-ayur-red to-ayur-red-dark text-white px-12 py-5 rounded-full font-noto font-semibold text-xl hover:from-ayur-red-dark hover:to-ayur-red transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 flex items-center gap-3 border border-heritage-gold/20"
          >
            Shop Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button
            onClick={scrollToAbout}
            className="group border-2 border-heritage-gold text-heritage-gold px-12 py-5 rounded-full font-noto font-semibold text-xl hover:bg-gradient-to-r hover:from-heritage-gold hover:to-ayur-gold hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 bg-vintage-beige/20 backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;