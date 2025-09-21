import React from 'react';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import ProductsSection from '../components/ProductsSection';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <ProductsSection />
      <IntroductionSection />
      {/* <ContactSection /> */}
    </div>
  );
};

export default HomePage;