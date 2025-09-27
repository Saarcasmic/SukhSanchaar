import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      const elementPosition = productsElement.offsetTop;
      const offsetPosition = elementPosition - 5; // 100px offset from the top

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
      const offsetPosition = elementPosition - 5; // 100px offset from the top

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Historical 1940s shop background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero-background.png")',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Vintage sepia overlay for historical feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-800/10 to-orange-900/20"></div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      <div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl animate-fade-in mt-32 sm:mt-16"
        style={{
          top: "2.5rem",
          position: "relative",
        }}
      >
        {/* Main headline */}
        <h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl"
          style={{ fontFamily: "Crimson Text, Times New Roman, serif" }}
        >
          A Legacy from
          <br />
          <span className="text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-200 bg-clip-text">
            1890s India
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-lora text-xl sm:text-2xl lg:text-3xl text-amber-100 mb-9 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
          Traditional Ayurvedic Remedies from the Golden Era
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          <div className="mx-4 w-3 h-3 bg-amber-300 rounded-full animate-glow shadow-lg"></div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={scrollToProducts}
            className="group bg-ayur-red text-white px-12 py-5 rounded-full font-noto font-semibold text-xl hover:from-amber-700 hover:to-orange-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 flex items-center gap-3 border border-amber-400/30 backdrop-blur-sm"
          >
            Explore Products
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          <button
            onClick={scrollToAbout}
            className="group border-2 border-amber-300 text-amber-200 px-12 py-5 rounded-full font-noto font-semibold text-xl hover:bg-gradient-to-r hover:from-amber-300 hover:to-yellow-200 hover:text-amber-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 bg-black/20 backdrop-blur-sm"
          >
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
