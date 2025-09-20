import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CheckoutModal from './CheckoutModal';

const CartSidebar: React.FC = () => {
  const { state, toggleCart, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-50 shadow-2xl z-50 transform transition-transform animate-slide-up">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream-200">
            <h2 className="font-playfair text-2xl font-bold text-antique-brown flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Your Cart
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-cream-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-antique-brown" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-cream-200 mx-auto mb-4" />
                <p className="font-lora text-antique-brown/70 text-lg">Your cart is empty</p>
                <p className="font-noto text-antique-brown/50 text-sm mt-2">Add some Ayurvedic goodness!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-cream-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-lora font-semibold text-antique-brown">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-noto font-bold text-ayur-red">₹{item.price}</span>
                        <span className="font-noto text-sm text-gray-500 line-through">₹{item.mrp}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-cream-200 hover:bg-cream-300 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3 text-antique-brown" />
                          </button>
                          <span className="font-noto font-semibold text-antique-brown px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-cream-200 hover:bg-cream-300 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3 text-antique-brown" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-ayur-red hover:text-ayur-red/80 font-noto text-sm transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-cream-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="font-lora text-lg font-semibold text-antique-brown">Total:</span>
                <span className="font-noto text-2xl font-bold text-ayur-red">₹{state.total}</span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
};

export default CartSidebar;