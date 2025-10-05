import React from "react";
import ProductsSection from "../components/ProductsSection";

const ProductsPage: React.FC = () => {
  return (
    <div className="animate-fade-in pt-16">
      <ProductsSection showFilters={true} />
    </div>
  );
};

export default ProductsPage;
