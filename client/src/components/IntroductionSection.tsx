import React from "react";
import { useNavigate } from "react-router-dom";

const IntroductionSection: React.FC = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/about");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <section
      className="py-10 sm:py-20 text-antique-brown-dark relative overflow-hidden"
      style={{
        // backgroundImage: "url('/sanchaar_bg.png')",
        backgroundSize: "cover",
        backgroundColor: "#efe1d3",
        // opacity: 0.5,
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background botanical elements */}

      <div className="relative max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-2xl sm:text-4xl font-bold mb-5 sm:mb-8 text-antique-brown-dark">
          Message from Our <span className="text-ayur-gold">CEO</span>
        </h2>

        <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-heritage-gold/30 shadow-sm mb-6 sm:mb-8">
          <blockquote className="font-lora text-base sm:text-xl leading-snug sm:leading-relaxed italic mb-4 sm:mb-6 text-antique-brown">
            "In a world of fleeting trends, we remain true to the principles
            that have stood the test of time. Our commitment is to you—those who
            believe in natural healing At Sukh Sancharak, Ayurveda is not just
            medicine; it is a legacy of trust built over 135 years. Every
            product reflects our relentless pursuit of purity, quality, and
            authentic healing rooted in India’s timeless traditions. Thank you
            for choosing Sukh Sancharak. We invite you to join us on this
            journey of authentic healing and holistic well-being."
          </blockquote>
          <div className="text-center">
            <p className="font-noto font-semibold text-ayur-gold text-base sm:text-lg">
              Kushal Pal Sharma
            </p>
            {/* <p className="font-noto text-cream-200">Fourth Generation Heritage Keeper</p> */}
          </div>
        </div>
        <button
          onClick={handleReadMore}
          className="inline-block mb-2 border-2 border-heritage-gold/40 text-white px-6 py-2 sm:px-10 sm:py-4 rounded-full font-noto font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-r from-ayur-red to-ayur-red-dark hover:from-ayur-red-dark hover:to-heritage-gold"
        >
          Read More
        </button>

        <div className="flex items-center justify-center mt-3 sm:mt-6">
          <div className="w-10 sm:w-20 h-px bg-ayur-gold"></div>
          <div className="mx-2 sm:mx-4 w-3 sm:w-4 h-3 sm:h-4 bg-ayur-gold rounded-full"></div>
          <div className="w-10 sm:w-20 h-px bg-ayur-gold"></div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
