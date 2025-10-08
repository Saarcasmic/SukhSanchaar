import React, { useState, useMemo } from "react";
import { useProducts } from "../contexts/ProductContext";
import { ProductModal } from "./ProductModal";
import { AyurvedicProductCard } from "./AyurvedicProductCard";
import { Search, X } from "lucide-react";

interface ProductsSectionProps {
  showFilters?: boolean;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  showFilters = false,
}) => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category)),
    ).filter(Boolean);
    return ["all", ...uniqueCategories];
  }, [products]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    // If filters are not shown (home page), return all products
    if (!showFilters) {
      return products;
    }

    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.benefits.some((benefit) =>
            benefit.toLowerCase().includes(query),
          ) ||
          product.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query),
          ),
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, showFilters]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <>
      <div id="products" className="relative overflow-hidden">
        {/* Background with parchment texture and botanical motifs */}
        <div
          className="absolute inset-0 w-full"
          style={{
            backgroundImage: 'url("/Sanchaar.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Mobile: Show only "Bestsellers" */}
            <h1
              className="text-3xl sm:hidden font-medium text-amber-900 mb-4"
              style={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
              }}
            >
              Bestsellers
            </h1>

            {/* Desktop: Show full title and subtitle */}
            <div className="hidden sm:block">
              <h1
                className="text-4xl md:text-5xl font-medium text-amber-900 mb-4"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                }}
              >
                Premium Ayurvedic Collection
              </h1>
              {/* <p className="text-lg text-amber-700/80 max-w-2xl mx-auto">
                Authentic formulations rooted in 130+ years of Ayurvedic wisdom,
                crafted for modern wellness seekers.
              </p> */}
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center mt-8 mb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-32"></div>
            </div>
          </div>

          {/* Search and Filter Section - Only show when showFilters is true */}
          {showFilters && (
            <div className="mb-8">
              {/* Search Bar and Category Chips Container */}
              <div className="max-w-7xl mx-auto mb-6">
                {/* Desktop Layout: Search bar and chips side by side */}
                <div className="hidden lg:flex items-center gap-6">
                  {/* Search Bar - Flexible width */}
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 pl-12 pr-4 text-sm border-2 border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Chips - Desktop - Flexible width */}
                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          selectedCategory === category
                            ? "bg-amber-600 text-white shadow-md"
                            : "bg-white/80 text-amber-700 border border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                        }`}
                      >
                        {category === "all" ? "All Products" : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Layout: Search bar on top, chips below */}
                <div className="lg:hidden">
                  {/* Search Bar */}
                  <div className="max-w-md mx-auto mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 pl-12 pr-4 text-sm border-2 border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Chips - Mobile */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-amber-600 text-white shadow-md"
                            : "bg-white/80 text-amber-700 border border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                        }`}
                      >
                        {category === "all" ? "All Products" : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery || selectedCategory !== "all") && (
                <div className="text-center">
                  <button
                    onClick={clearFilters}
                    className="text-amber-600 hover:text-amber-800 text-sm font-medium underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Results Count */}
              <div className="text-center text-sm text-amber-700/80 mt-2">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </div>
            </div>
          )}

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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-amber-600 text-lg font-semibold mb-2">
                    {products.length === 0
                      ? "No Products Available"
                      : "No Products Found"}
                  </div>
                  <p className="text-amber-700/60">
                    {products.length === 0
                      ? "Check back later for our premium Ayurvedic collection."
                      : "Try adjusting your search or filter criteria."}
                  </p>
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <div key={product.id} className="relative">
                    <AyurvedicProductCard
                      id={product.id}
                      name={product.name}
                      tagline={
                        product.description || "Premium Ayurvedic Product"
                      }
                      price={product.price}
                      mrp={product.original_price}
                      image={product.image_url}
                      pack_details={product.pack_details}
                      onBuyNow={() => handleProductClick(product)}
                    />

                    {/* Row separator for structured feel - only show after complete rows */}
                    {(index + 1) % 4 === 0 &&
                      index !== filteredProducts.length - 1 && (
                        <div className="hidden lg:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-screen">
                          <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
                        </div>
                      )}

                    {/* Mobile row separators */}
                    {(index + 1) % 2 === 0 &&
                      index !== filteredProducts.length - 1 && (
                        <div className="block lg:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-screen">
                          <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
                        </div>
                      )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer section */}
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
