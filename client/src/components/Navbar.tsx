import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Leaf, CreditCard } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartSidebar from "./CartSidebar";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { state, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  // Don't show navbar on admin page
  if (location.pathname === "/admin") return null;

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        const productsTop = productsSection.offsetTop;
        const scrollPosition = window.scrollY;
        const triggerPoint = productsTop - 200; // Trigger 200px before products section

        setIsScrolled(scrollPosition > triggerPoint);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset navbar state when location changes
  useEffect(() => {
    if (location.pathname === "/") {
      // Reset to transparent when on home page
      setIsScrolled(false);
    } else {
      // Set to opaque background for all other pages (About, etc.)
      setIsScrolled(true);
    }
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-gradient-to-r from-aged-paper/95 via-vintage-beige/95 to-cream-100/95 backdrop-blur-sm border-b border-heritage-gold/20 shadow-lg"
            : ""
        }`}
        style={{
          backgroundColor: isScrolled ? undefined : "transparent",
          background: isScrolled ? undefined : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div>
                <img src="/logoo.png" alt="Sanchaaar" className="w-22 h-14" />
                <p
                  className={`font-noto text-xs mt-1 ml-7 transition-all duration-300 ${
                    isScrolled
                      ? "text-heritage-gold"
                      : "text-amber-200 drop-shadow-md"
                  }`}
                >
                  Since 1890
                </p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-lora text-lg transition-all duration-300 ${
                  isScrolled
                    ? `text-antique-brown-dark hover:text-heritage-gold ${location.pathname === "/" ? "text-heritage-gold font-semibold" : ""}`
                    : `text-white hover:text-amber-200 drop-shadow-lg ${location.pathname === "/" ? "text-amber-200 font-semibold" : ""}`
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`font-lora text-lg transition-all duration-300 ${
                  isScrolled
                    ? `text-antique-brown-dark hover:text-heritage-gold ${location.pathname === "/about" ? "text-heritage-gold font-semibold" : ""}`
                    : `text-white hover:text-amber-200 drop-shadow-lg ${location.pathname === "/about" ? "text-amber-200 font-semibold" : ""}`
                }`}
              >
                About Us
              </Link>
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className={`relative p-3 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group ${
                isScrolled
                  ? "bg-gradient-to-br from-ayur-red to-ayur-red-dark hover:from-ayur-red-dark hover:to-heritage-gold border border-heritage-gold/30"
                  : "bg-gradient-to-br from-ayur-red to-ayur-red-dark hover:from-amber-700 hover:to-orange-800 border border-amber-300/50 shadow-2xl"
              }`}
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-105 transition-transform" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-heritage-gold to-ayur-gold text-antique-brown-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce-gentle border-2 border-white shadow-lg">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4">
            <div className="flex space-x-6">
              <Link
                to="/"
                className={`font-lora transition-all duration-300 ${
                  isScrolled
                    ? `text-antique-brown-dark hover:text-heritage-gold ${location.pathname === "/" ? "text-heritage-gold font-semibold" : ""}`
                    : `text-white hover:text-amber-200 drop-shadow-lg ${location.pathname === "/" ? "text-amber-200 font-semibold" : ""}`
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`font-lora transition-all duration-300 ${
                  isScrolled
                    ? `text-antique-brown-dark hover:text-heritage-gold ${location.pathname === "/about" ? "text-heritage-gold font-semibold" : ""}`
                    : `text-white hover:text-amber-200 drop-shadow-lg ${location.pathname === "/about" ? "text-amber-200 font-semibold" : ""}`
                }`}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar />

      {/* Floating Pay & Checkout Button */}
      {state.items.length > 0 && !state.isOpen && (
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-ayur-red to-ayur-red-dark text-white px-6 py-4 rounded-full font-noto font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 border-2 border-heritage-gold/30 animate-pulse-gentle group"
        >
          <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span>Pay & Checkout</span>
          <div className="bg-heritage-gold text-antique-brown-dark text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg">
            {state.items.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </button>
      )}
    </>
  );
};

export default Navbar;
