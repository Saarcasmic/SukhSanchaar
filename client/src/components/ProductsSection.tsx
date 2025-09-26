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
      <div id="products" className="min-h-screen relative overflow-hidden pt-20">
      {/* Background with parchment texture and botanical motifs */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/sanchaar_bg.png")',
          backgroundSize: 'contain',
          // backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
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