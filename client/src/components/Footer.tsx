import React from 'react';
import { Phone, Mail, MessageCircle, Facebook, Instagram, Leaf } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  
  // Don't show footer on admin page
  if (location.pathname === '/admin') return null;

  return (
    <footer className="bg-black text-cream-50 py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-ayur-red rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-playfair text-2xl font-bold">Vedic Herbs</span>
            </div>
            <p className="font-lora text-cream-100 mb-4 leading-relaxed">
              Traditional Ayurvedic remedies crafted with pure herbs and ancient wisdom since 1890. 
              Your journey to natural wellness begins here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ayur-gold flex-shrink-0" />
                <div>
                  <p className="font-noto text-sm text-cream-200">Call us</p>
                  <a href="tel:+919876543210" className="font-lora hover:text-ayur-gold transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ayur-gold flex-shrink-0" />
                <div>
                  <p className="font-noto text-sm text-cream-200">Email us</p>
                  <a 
                    href="mailto:info@vedicherbs.com" 
                    className="font-lora hover:text-ayur-gold transition-colors"
                  >
                    info@vedicherbs.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-ayur-gold flex-shrink-0" />
                <div>
                  <p className="font-noto text-sm text-cream-200">WhatsApp</p>
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-lora hover:text-ayur-gold transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">Heritage & Quality</h3>
            <div className="space-y-3 font-lora">
              <p className="text-cream-100 leading-relaxed">
                <span className="text-ayur-gold font-semibold">Since 1890</span> - Four generations 
                of Ayurvedic expertise, bringing you authentic herbal remedies crafted with 
                traditional methods.
              </p>
              <div className="bg-ayur-red/10 p-4 rounded-lg border border-ayur-red/20">
                <p className="text-sm text-cream-200 italic">
                  "Pure herbs, ancient wisdom, modern wellness - your trusted companion 
                  on the path to natural health."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-200/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-noto text-cream-200 text-sm">
              © 2024 Vedic Herbs. All rights reserved. Crafted with love and ancient wisdom.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 font-noto text-sm">
              <a href="#" className="text-cream-200 hover:text-ayur-gold transition-colors">Privacy Policy</a>
              <a href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/terms" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-ayur-gold transition-colors">Terms of Service</a>
              <a href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/shipping" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-ayur-gold transition-colors">Shipping Policy</a>
              <a href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/refund" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-ayur-gold transition-colors">Refund Policy</a>
              <a href="/admin" className="text-cream-200 hover:text-ayur-gold transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;