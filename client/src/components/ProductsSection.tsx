import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { ProductModal } from './ProductModal';
import { AyurvedicProductCard } from './AyurvedicProductCard';

const ProductsSection: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };


  return (
    <>
      <div id="products" className="min-h-screen relative overflow-hidden">
      {/* Background with parchment texture and botanical motifs */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)
          `
        }}
      ></div>
      
      {/* Subtle botanical pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-2 0c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-medium text-amber-900 mb-4"
            style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
          >
            Premium Ayurvedic Collection
          </h1>
          <p className="text-lg text-amber-700/80 max-w-2xl mx-auto">
            Authentic formulations rooted in 130+ years of Ayurvedic wisdom, 
            crafted for modern wellness seekers.
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-8 mb-2">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            <p className="font-semibold">Error loading products</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <span className="ml-3 text-amber-700">Loading products...</span>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-amber-600 text-lg font-semibold mb-2">No Products Available</div>
                <p className="text-amber-700/60">Check back later for our premium Ayurvedic collection.</p>
              </div>
            ) : (
              products.map((product, index) => (
                <div key={product.id} className="relative">
                  <AyurvedicProductCard 
                    id={product.id}
                    name={product.name}
                    tagline={product.benefits[0] || 'Premium Ayurvedic Product'}
                    price={product.price}
                    mrp={product.original_price}
                    image={product.image_url}
                    onBuyNow={() => handleProductClick(product)} 
                  />
                  
                  {/* Row separator for structured feel - only show after complete rows */}
                  {(index + 1) % 3 === 0 && index !== products.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-screen">
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Tablet row separators */}
                  {(index + 1) % 2 === 0 && index !== products.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-screen">
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer section */}
        <div className="text-center mt-16 pt-8 border-t border-amber-200/50">
          <p className="text-amber-700/60 italic">
            "Wellness rooted in tradition, crafted for today"
          </p>
        </div>
      </div>
    </div>
      
      {/* Product Modal - Rendered via Portal */}
      <ProductModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        product={selectedProduct}
        
      />
    </>
  );
};

export default ProductsSection;