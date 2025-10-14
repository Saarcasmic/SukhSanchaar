import React from "react";
import HeroSection from "../components/HeroSection";
import IntroductionSection from "../components/IntroductionSection";
import ProductsSection from "../components/ProductsSection";
import SEO from "../components/SEO";
import {
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
} from "../utils/structuredData";

const HomePage: React.FC = () => {
  // Combine multiple structured data schemas
  const structuredData = [
    organizationSchema,
    localBusinessSchema,
    webSiteSchema,
  ];

  return (
    <>
      <SEO
        title="Sukh Sancharak Co. - Ayurvedic Medicine Since 1890 | Mathura"
        description="Sukh Sancharak Co. - 135 years of authentic Ayurvedic medicine since 1890. GMP certified manufacturer in Mathura, Uttar Pradesh. Traditional herbal remedies including Sudha Sindhu and Sanchaar Dant Manjan."
        keywords="ayurvedic medicine, herbal remedies Mathura, ayurvedic products, natural ayurvedic products, GMP certified ayurvedic company, traditional ayurvedic medicine India, ayurvedic company Mathura, herbal medicine Uttar Pradesh, Mathura ayurvedic manufacturer, Sudha Sindhu, Sanchaar Dant Manjan, ayurvedic manjan"
        canonicalUrl="https://www.sukhsancharak.com/"
        ogTitle="Sukh Sancharak Co. - 135 Years of Authentic Ayurvedic Medicine"
        ogDescription="Discover authentic Ayurvedic medicines from India's trusted manufacturer since 1890. GMP certified facility in Mathura producing traditional herbal remedies."
        ogImage="https://www.sukhsancharak.com/logoo.png"
        structuredData={structuredData}
      />
      <div className="animate-fade-in">
        <HeroSection />
        <ProductsSection />
        <IntroductionSection />
        {/* <ContactSection /> */}
      </div>
    </>
  );
};

export default HomePage;
