import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url: string;
  images?: string[];
  ingredients: string[];
  benefits: string[];
  usage_instructions: string;
  weight: string;
  expiry_date?: string;
  stock_quantity: number;
  is_active: boolean;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

export const ProductModal = ({
  isModalOpen,
  setIsModalOpen,
  product,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  product?: Product | null;
}): JSX.Element | null => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(1); // Reset quantity when modal closes
    setCurrentImageIndex(0); // Reset image index when modal closes
    setIsAutoPlay(true); // Reset autoplay when modal closes
  };

  // Create images array with conditional first image
  const getImagesArray = () => {
    if (!product) return [];
    
    const firstImage = product.name === "Sudha Sindhu" ? "/prod1.png" : "/product1.jpeg";
    const additionalImages = product.images || [];
    
    return [firstImage, ...additionalImages];
  };

  const images = getImagesArray();

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
    setIsAutoPlay(false); // Pause autoplay when user manually navigates
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
    setIsAutoPlay(false); // Pause autoplay when user manually navigates
  };

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!isModalOpen || images.length <= 1 || !isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isModalOpen, images.length, isAutoPlay]);


  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (product) {
      // Convert ProductModal Product interface to CartContext Product interface
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.original_price || product.price,
        image: product.image_url,
        description: product.description,
      };

      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(cartProduct);
      }

      // Close modal after adding to cart
      handleCloseModal();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Reset quantity when modal opens with a new product
  React.useEffect(() => {
    if (isModalOpen && product) {
      setQuantity(1);
    }
  }, [isModalOpen, product]);

  // Prevent body scroll when modal is open and handle keyboard events
  React.useEffect(() => {
    if (isModalOpen) {
      // Store original overflow and position to restore later
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;

      // Prevent background scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";

      // Handle Escape key press
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);

      // Focus the modal container
      const modalElement = document.querySelector(
        '[data-modal="product-modal"]',
      ) as HTMLElement;
      if (modalElement) {
        modalElement.focus();
      }

      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isModalOpen]);

  // Don't render anything if modal is closed
  if (!isModalOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[9999] "
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-gray-50 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden relative"
        style={{
          position: "relative",
          transform: "none",
        }}
        data-modal="product-modal"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
          style={{ position: "absolute" }}
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* Image Carousel Section */}
          <div className="w-full lg:w-1/2 bg-[#fff] flex mt-4 justify-center p-4 lg:p-8 min-h-64 lg:h-auto">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main Image Display */}
              <div 
                className="relative w-full h-auto"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <div className="absolute w-1/2 h-4 bottom-0 left-1/2 transform -translate-x-1/2 bg-[#818af9] rounded-full blur-[50px]" />

                {images.length > 0 && (
                  <div className="w-full aspect-square rounded-lg overflow-hidden max-h-78 lg:max-h-none">
                    <img
                      className="w-full h-full object-cover transition-opacity duration-300"
                      alt={`Product Image ${currentImageIndex + 1}`}
                      src={images[currentImageIndex]}
                    />
                  </div>
                )}

                {/* Navigation Arrows - Only show if more than 1 image */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                
              </div>

            </div>
          </div>

          {/* Product Details Section - Scrollable */}
          <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 mb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              {/* Sale Badge - only show if there's an original price */}
              {product?.original_price &&
                product.original_price > product.price && (
                  <div className="inline-flex items-start gap-2.5 px-2 py-1 bg-red-500 rounded mb-4">
                    <div className="[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0.72px] leading-[normal]">
                      SALE
                    </div>
                  </div>
                )}

              <h1
                id="modal-title"
                className="[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-xl lg:text-2xl xl:text-[28px] tracking-[0] leading-[normal] mb-4"
              >
                {product?.name || "Product Name"}
              </h1>

              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="[font-family:'Manrope-Medium',Helvetica] font-medium text-ayur-red text-xs text-center tracking-[1.98px] leading-[15px]">
                    {product?.category?.toUpperCase() || "AYURVEDIC"}
                  </div>

                  {/* <img
                    className="w-px h-2 object-cover"
                    alt="Line"
                    src="src/Icons/Line21.svg"
                  />

                  <div className="flex items-center gap-1">
                    <NineRatingStar className="!relative !w-[15px] !h-[15px]" />
                    <IconComponentNode className="!relative !w-[15px] !h-[15px]" />
                    <NineRatingStar1 className="!relative !w-[15px] !h-[15px]" />
                    <NineRatingStar2 className="!relative !w-[15px] !h-[15px]" />
                  </div>

                  <div className="bg-[linear-gradient(92deg,rgba(23,28,36,1)_0%,rgba(40,50,63,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Manrope-Medium',Helvetica] font-medium text-transparent text-xs text-center tracking-[0.24px] leading-[15px]">
                    {product?.rating
                      ? `${product.rating} (${product.review_count || 0} reviews)`
                      : "4.9 (2130 reviews)"}
                  </div> */}
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:gap-6 pb-24">
                <div className="flex flex-col gap-3">
                  <div className="[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]">
                    Description:
                  </div>

                  <p className="[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]">
                    {product?.description ||
                      "Premium Ayurvedic product crafted with traditional wisdom and modern quality standards."}
                  </p>
                </div>

                {/* Product Images */}
                

                <div className="flex flex-col gap-4">
                  <div className="[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]">
                    Weight:
                  </div>

                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    <div className="px-3 py-2 bg-ayur-red rounded-[10px] border-2 border-solid border-[#f1e5e538]">
                      <div className="[font-family:'Manrope-Bold',Helvetica] font-bold text-[#ffffff] text-sm lg:text-xs tracking-[0] leading-[normal]">
                        {product?.weight || "100ml"}
                      </div>
                    </div>
                  </div>
                </div>

                


                {/* Usage Instructions */}
                {product?.usage_instructions && (
                  <div className="flex flex-col gap-3 mb-8 lg:mb-0">
                    <div className="[font-family:'Manrope-SemiBold',Helvetica] font-semibold text-black text-sm lg:text-xs tracking-[0.24px] leading-[15px]">
                      Usage Instructions:
                    </div>

                    <div className="[font-family:'Manrope-Light',Helvetica] font-light text-black text-sm lg:text-xs tracking-[0.24px] leading-[21.4px]">
                      {product.usage_instructions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cart Section - Fixed at bottom */}
        {/* Cart Section - Floating Overlay */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
             w-[95%] max-w-5xl bg-white rounded-xl shadow-lg border border-gray-200 
             py-3 px-4 lg:py-2 lg:px-4"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
            {/* Product Info Section */}
            <div className="flex items-center gap-4 flex-1 w-full lg:w-auto">
              <img
                className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg flex-shrink-0"
                alt="Product"
                src={images.length > 0 ? images[currentImageIndex] : (product?.image_url || "src/Icons/Rectangle3764.png")}
              />

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <p className="font-semibold text-black text-sm lg:text-base truncate">
                  {product?.name || "Product Name"}
                </p>
                <div className="font-medium text-ayur-red text-xs tracking-wide">
                  {product?.category?.toUpperCase() || "AYURVEDIC"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-black">
                    ₹{product?.price || "0"}
                  </span>
                  {product?.original_price &&
                    product.original_price > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.original_price}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart Section */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-gray-800">
                  Qty:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleQuantityDecrease}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center bg-white rounded-md border border-gray-300">
                    <span className="font-normal text-gray-800">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={handleQuantityIncrease}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-ayur-red rounded-md hover:bg-ayur-red/80 transition-colors whitespace-nowrap flex-1 lg:flex-none"
              >
                <span className="font-bold text-white text-sm">
                  ADD TO CART
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render modal at document.body level
  return createPortal(modalContent, document.body);
};
