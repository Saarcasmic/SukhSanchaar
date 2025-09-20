import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartSidebar from './CartSidebar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { state, toggleCart } = useCart();
  
  // Don't show navbar on admin page
  if (location.pathname === '/admin') return null;

  return (
    <>
      <nav className="bg-gradient-to-r from-aged-paper/95 via-vintage-beige/95 to-cream-100/95 backdrop-blur-sm border-b border-heritage-gold/20 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-ayur-red via-ayur-red-dark to-heritage-gold/80 rounded-full group-hover:scale-105 transition-transform shadow-lg border border-heritage-gold/30">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-playfair text-3xl font-bold text-transparent bg-gradient-to-r from-antique-brown-dark to-botanical-green-dark bg-clip-text">
                  Sanchaaar
                </span>
                <p className="font-noto text-xs text-heritage-gold -mt-1">Since 1890</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-lora text-lg text-antique-brown-dark hover:text-heritage-gold transition-colors ${
                  location.pathname === '/' ? 'text-heritage-gold font-semibold' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-lora text-lg text-antique-brown-dark hover:text-heritage-gold transition-colors ${
                  location.pathname === '/about' ? 'text-heritage-gold font-semibold' : ''
                }`}
              >
                About Us
              </Link>
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-3 bg-gradient-to-br from-ayur-red to-ayur-red-dark text-white rounded-full hover:from-ayur-red-dark hover:to-heritage-gold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group border border-heritage-gold/30"
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
                className={`font-lora text-antique-brown-dark hover:text-heritage-gold transition-colors ${
                  location.pathname === '/' ? 'text-heritage-gold font-semibold' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-lora text-antique-brown-dark hover:text-heritage-gold transition-colors ${
                  location.pathname === '/about' ? 'text-heritage-gold font-semibold' : ''
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