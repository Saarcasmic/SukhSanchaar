import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import CartSidebar from "./CartSidebar";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleContactClick = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // If we're on the home page, scroll to footer
    if (location.pathname === "/") {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on a different page, navigate to home and then scroll
      navigate("/");
      // Use setTimeout to ensure the page loads before scrolling
      setTimeout(() => {
        const footer = document.getElementById("footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleHomeClick = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // Navigate to home page and scroll to top
    navigate("/");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleAboutClick = () => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // Navigate to about page and scroll to top
    navigate("/about");
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // Don't show navbar on admin page
  if (location.pathname === "/admin") return null;

  return (
    <>
      {/* Promotional Banner */}
      {/* <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-center py-2 text-sm">
        <Link to="/" className="hover:text-amber-200 transition-colors">
          Buy Any 2 Products at ₹699 | Code: BUY2
        </Link>
      </div> */}

      {/* Main Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-aged-paper/95 via-vintage-beige/95 to-cream-100/95 backdrop-blur-sm shadow-lg border-b border-gray-200"
        style={{ height: "65px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <button
              onClick={handleHomeClick}
              className="flex flex-col items-center hover:opacity-80 transition-opacity"
            >
              <img src="/logoo.png" alt="Sanchaaar" className="h-8 w-auto" />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-600 font-medium">Since 1890</p>
              </div>
            </button>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 mr-auto ml-8">
              <button
                onClick={handleHomeClick}
                className={`font-medium transition-colors text-gray-700 hover:text-ayur-red ${
                  location.pathname === "/" ? "text-ayur-red" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={handleAboutClick}
                className={`font-medium transition-colors text-gray-700 hover:text-ayur-red ${
                  location.pathname === "/about" ? "text-ayur-red" : ""
                }`}
              >
                About Us
              </button>
              <Link
                to="/products"
                className={`font-medium transition-colors text-gray-700 hover:text-ayur-red ${
                  location.pathname === "/products" ? "text-ayur-red" : ""
                }`}
              >
                All Products
              </Link>
              <button
                onClick={handleContactClick}
                className="font-medium transition-colors text-gray-700 hover:text-ayur-red"
              >
                Contact Us
              </button>
            </div>

            {/* Search Bar - Desktop
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-red focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div> */}

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              {/* <button className="md:hidden p-2 text-gray-600 hover:text-ayur-red transition-colors">
                <Search className="w-5 h-5" />
              </button> */}

              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-ayur-red transition-colors"
                aria-label="View cart"
              >
                <span className="inline-flex items-center justify-center rounded-full border border-current w-9 h-9">
                  <ShoppingCart className="w-5 h-5" stroke="currentColor" />
                </span>
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ayur-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-ayur-red transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={handleHomeClick}
                  className="block font-medium text-gray-700 hover:text-ayur-red transition-colors w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={handleAboutClick}
                  className="block font-medium text-gray-700 hover:text-ayur-red transition-colors w-full text-left"
                >
                  About Us
                </button>
                <Link
                  to="/products"
                  className="block font-medium text-gray-700 hover:text-ayur-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <button
                  onClick={handleContactClick}
                  className="block font-medium text-gray-700 hover:text-ayur-red transition-colors w-full text-left"
                >
                  Contact Us
                </button>

                {/* Mobile Search */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-red focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar />

      {/* Floating Pay & Checkout Button */}
      {state.items.length > 0 && !state.isOpen && (
        <button
          onClick={toggleCart}
          className="fixed bottom-0 z-50 bg-ayur-red text-white px-0 py-4 items-center justify-center font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3 w-full"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Pay & Checkout</span>
          <div className="bg-white text-ayur-red text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {state.items.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </button>
      )}
    </>
  );
};

export default Navbar;
