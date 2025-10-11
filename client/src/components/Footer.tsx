import React from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Leaf,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();

  // Don't show footer on admin page
  if (location.pathname === "/admin") return null;

  return (
    <footer id="footer" className="bg-black text-cream-50 py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="font-playfair text-2xl font-bold">
                Sukh Sancharak Co.
              </span>
            </div>
            <p className="font-lora text-cream-100 leading-relaxed max-w-md">
              738, Tajpura, Mathura, Uttar Pradesh 281001, India
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-playfair text-xl font-bold">Contact Us</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-ayur-gold flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-noto text-sm text-cream-200">Call us</p>
                  <a
                    href="tel:+918218304730"
                    className="font-lora hover:text-ayur-gold transition-colors block"
                  >
                    +91 8218304730
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-ayur-gold flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-noto text-sm text-cream-200">Email us</p>
                  <a
                    href="mailto:sukhsancharak1890@gmail.com"
                    className="font-lora hover:text-ayur-gold transition-colors block break-all"
                  >
                    sukhsancharak1890@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageCircle className="w-5 h-5 text-ayur-gold flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-noto text-sm text-cream-200">WhatsApp</p>
                  <a
                    href="https://wa.me/918218304730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-lora hover:text-ayur-gold transition-colors block"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className="space-y-6">
            <h3 className="font-playfair text-xl font-bold">Socials</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.facebook.com/share/1ALDJPH9nA/"
                  className="p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1ALDJPH9nA/"
                  className="font-lora hover:text-ayur-gold transition-colors"
                >
                  @sukh_sancharak_company
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/sukh_sancharak_company?igsh=MThvcmxsM24wbmJ6eA=="
                  className="p-2 bg-ayur-red/20 hover:bg-ayur-red/30 rounded-full transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/sukh_sancharak_company?igsh=MThvcmxsM24wbmJ6eA=="
                  className="font-lora hover:text-ayur-gold transition-colors"
                >
                  @sukh_sancharak_company
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-200/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-noto text-cream-200 text-sm">
              © 2024 Sukh Sancharak Co. All rights reserved. Crafted with love
              and ancient wisdom.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 font-noto text-sm">
              <a
                href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-ayur-gold transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/shipping"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-ayur-gold transition-colors"
              >
                Shipping Policy
              </a>
              <a
                href="https://merchant.razorpay.com/policy/RIKuq9uRIGD4Nz/refund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 hover:text-ayur-gold transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
