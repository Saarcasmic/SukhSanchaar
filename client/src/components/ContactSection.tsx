import React from 'react';
import { Phone, Mail, MessageCircle, Facebook, Instagram, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-botanical-green-dark via-botanical-green to-antique-brown-dark text-cream-50 relative overflow-hidden bg-botanical">
      {/* Subtle botanical background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-current">
            <g opacity="0.2">
              <path d="M50 10c-10 0-18 8-18 18 0 16 18 42 18 42s18-26 18-42c0-10-8-18-18-18z" fill="currentColor"/>
              <circle cx="50" cy="28" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="28" r="4" fill="#D4AF37" opacity="0.4"/>
            </g>
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-36 h-36">
          <svg viewBox="0 0 80 80" className="w-full h-full text-current">
            <g opacity="0.2">
              <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M40 10v60M10 40h60" stroke="currentColor" strokeWidth="1"/>
              <circle cx="40" cy="40" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4"/>
              <circle cx="40" cy="40" r="5" fill="#C9A66B" opacity="0.3"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-1/4 right-1/4 w-6 h-6 animate-float opacity-30">
        <svg viewBox="0 0 24 24" className="w-full h-full text-heritage-gold">
          <path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill="currentColor"/>
        </svg>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
            Connect With Us
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-heritage-gold to-ayur-gold mx-auto shadow-lg"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Email */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-ayur-red/20 to-heritage-gold/20 rounded-full mb-4 group-hover:from-ayur-red/30 group-hover:to-heritage-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">Email</h3>
            <a 
              href="mailto:info@sanchaaar.com" 
              className="font-lora hover:text-heritage-gold transition-colors"
            >
              info@sanchaaar.com
            </a>
          </div>

          {/* Phone */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-ayur-red/20 to-heritage-gold/20 rounded-full mb-4 group-hover:from-ayur-red/30 group-hover:to-heritage-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">Phone</h3>
            <a 
              href="tel:+919876543210" 
              className="font-lora hover:text-heritage-gold transition-colors"
            >
              +91 98765 43210
            </a>
          </div>

          {/* WhatsApp */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-green-600/20 to-green-500/20 rounded-full mb-4 group-hover:from-green-600/30 group-hover:to-green-500/30 transition-all duration-300 border border-green-400/20 shadow-lg">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">WhatsApp</h3>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-lora hover:text-heritage-gold transition-colors"
            >
              Chat with us
            </a>
          </div>

          {/* Location */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-heritage-gold/20 to-ayur-gold/20 rounded-full mb-4 group-hover:from-heritage-gold/30 group-hover:to-ayur-gold/30 transition-all duration-300 border border-heritage-gold/20 shadow-lg">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold mb-2">Heritage Store</h3>
            <p className="font-lora">Mumbai, India</p>
          </div>
        </div>

        {/* Social Media & Brand Info */}
        <div className="border-t border-heritage-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-lora text-lg mb-2">
                <strong>Sanchaaar</strong> - 135 Years of Ayurvedic Heritage
              </p>
              <p className="font-noto text-sm text-cream-200">
                Since 1890 • Pure, Potent, Proven Remedies
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-500/20 text-cream-50 rounded-full hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 group border border-blue-400/20 shadow-lg"
              >
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600/20 to-pink-500/20 text-cream-50 rounded-full hover:from-pink-600/30 hover:to-pink-500/30 transition-all duration-300 group border border-pink-400/20 shadow-lg"
              >
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;