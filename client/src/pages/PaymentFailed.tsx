import React, { useEffect } from 'react';
import { XCircle, Home, MessageCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 15 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 bg-parchment flex items-center justify-center px-4">
      {/* Background botanical illustrations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full text-botanical-green">
          <path d="M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="currentColor"/>
          <path d="M20 50c0-5 4-9 9-9 8 0 21 9 21 9s-13 9-21 9c-5 0-9-4-9-9zm12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full text-botanical-green">
          <path d="M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5">
        <svg viewBox="0 0 150 150" className="w-full h-full text-botanical-green">
          <circle cx="75" cy="75" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M75 45v60M45 75h60" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-5 rotate-90">
        <svg viewBox="0 0 150 150" className="w-full h-full text-botanical-green">
          <circle cx="75" cy="75" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M75 45v60M45 75h60" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-red-100 animate-fade-in">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl animate-bounce-gentle">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="font-playfair text-3xl font-bold text-antique-brown mb-4">
          Payment Failed ❌
        </h1>

        <p className="font-lora text-lg text-antique-brown/80 mb-6 leading-relaxed">
          We're sorry, but your payment could not be processed at this time.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 mb-6">
          <h3 className="font-lora font-semibold text-red-800 mb-3">What Happened?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-noto text-sm text-red-700">
                Payment was not completed successfully
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-noto text-sm text-red-700">
                No charges have been made to your account
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="font-noto text-sm text-red-700">
                Your cart items are still available for checkout
              </p>
            </div>
          </div>
        </div>

        {/* Possible Reasons */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6">
          <h4 className="font-noto font-semibold text-amber-800 mb-2">Common Reasons:</h4>
          <ul className="font-noto text-sm text-amber-700 text-left space-y-1">
            <li>• Insufficient funds in your account</li>
            <li>• Incorrect card details entered</li>
            <li>• Network connectivity issues</li>
            <li>• Bank declined the transaction</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-ayur-red text-ayur-red py-3 rounded-full font-noto font-semibold hover:bg-ayur-red hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border-2 border-green-500 text-green-600 py-3 rounded-full font-noto font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Get Help on WhatsApp
          </a>
        </div>

        {/* Auto redirect notice */}
        <p className="font-noto text-xs text-antique-brown/50 mt-6">
          You'll be automatically redirected to the home page in 15 seconds
        </p>

        {/* Heritage Badge */}
        <div className="mt-6 pt-6 border-t border-red-100">
          <p className="font-noto text-xs text-antique-brown/60">
            ✨ Don't worry - we're here to help you complete your order
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
