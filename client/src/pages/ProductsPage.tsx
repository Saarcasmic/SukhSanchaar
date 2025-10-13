import React from "react";
import ProductsSection from "../components/ProductsSection";
import SEO from "../components/SEO";
import { organizationSchema } from "../utils/structuredData";

const ProductsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Ayurvedic Products - Sudha Sindhu, Sanchaar Dant Manjan | Mathura"
        description="Explore our range of authentic Ayurvedic products including Sudha Sindhu and Sanchaar Dant Manjan. Traditional herbal remedies manufactured with 135 years of expertise in Mathura, Uttar Pradesh."
        keywords="ayurvedic products, Sudha Sindhu, Sanchaar Dant Manjan, ayurvedic manjan, herbal medicine products, traditional ayurvedic remedies, natural ayurvedic products, Mathura ayurvedic products, GMP certified products"
        canonicalUrl="https://www.sukhsancharak.com/products"
        ogTitle="Ayurvedic Products - Traditional Herbal Remedies | Sukh Sancharak"
        ogDescription="Discover authentic Ayurvedic products including Sudha Sindhu and Sanchaar Dant Manjan. 135 years of traditional manufacturing expertise."
        ogImage="https://www.sukhsancharak.com/product1.jpeg"
        structuredData={organizationSchema}
      />
      <div className="animate-fade-in pt-16">
        <ProductsSection showFilters={true} />
      </div>
    </>
  );
};

export default ProductsPage;
