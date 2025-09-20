import React from 'react';
import { Leaf, Award, Users, Heart } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50 animate-fade-in">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-cream-50 to-cream-100 bg-parchment overflow-hidden">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-ayur-red to-ayur-red/90 rounded-full flex items-center justify-center shadow-xl">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-antique-brown mb-6">
            Our <span className="text-ayur-red">Heritage Story</span>
          </h1>
          
          <p className="font-lora text-xl sm:text-2xl text-antique-brown/80 max-w-3xl mx-auto leading-relaxed">
            Since 1890 – Four generations of Ayurvedic excellence, 
            bringing you authentic herbal remedies crafted with traditional wisdom.
          </p>

          {/* Golden ornamental line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-20 h-px bg-ayur-gold"></div>
            <div className="mx-4 w-4 h-4 bg-ayur-gold rounded-full"></div>
            <div className="w-20 h-px bg-ayur-gold"></div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-botanical-green mb-6">
                135 Years of Tradition
              </h2>
              <div className="w-16 h-1 bg-ayur-gold mb-8"></div>
              <div className="space-y-6 font-lora text-lg text-antique-brown/80 leading-relaxed">
                <p>
                  Founded in 1890, Sanchaaar began as a small apothecary in the heart of India, 
                  where our founder, a renowned Ayurvedic physician, dedicated his life to 
                  preserving ancient healing traditions.
                </p>
                <p>
                  Through four generations, we have maintained our commitment to authenticity, 
                  using only the purest herbs and time-tested formulations passed down through 
                  our family lineage.
                </p>
                <p>
                  Today, we continue this legacy with the same passion and dedication, 
                  bringing you remedies that have healed countless lives across more than a century.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-cream-100 p-8 rounded-2xl shadow-lg border border-cream-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-ayur-red rounded-full mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-antique-brown mb-4">
                    Heritage Timeline
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0"></div>
                      <div>
                        <span className="font-noto font-bold text-ayur-red">1890</span>
                        <p className="font-lora text-sm text-antique-brown/70">Founded by Vaidya Ramesh Sharma</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0"></div>
                      <div>
                        <span className="font-noto font-bold text-ayur-red">1925</span>
                        <p className="font-lora text-sm text-antique-brown/70">Second generation expansion</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0"></div>
                      <div>
                        <span className="font-noto font-bold text-ayur-red">1975</span>
                        <p className="font-lora text-sm text-antique-brown/70">Modern manufacturing facility</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-ayur-gold rounded-full flex-shrink-0"></div>
                      <div>
                        <span className="font-noto font-bold text-ayur-red">2024</span>
                        <p className="font-lora text-sm text-antique-brown/70">Digital transformation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-cream-50 bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-botanical-green mb-6">
              Our Vision & Values
            </h2>
            <div className="w-24 h-1 bg-ayur-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Authenticity */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ayur-red to-ayur-red/80 rounded-full mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-antique-brown mb-4">Authenticity</h3>
              <p className="font-lora text-antique-brown/70 leading-relaxed">
                Every formulation follows traditional recipes, ensuring the purity and 
                potency that has made Ayurveda trusted for millennia.
              </p>
            </div>

            {/* Quality */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-botanical-green to-botanical-green/80 rounded-full mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-antique-brown mb-4">Quality</h3>
              <p className="font-lora text-antique-brown/70 leading-relaxed">
                We source only the finest herbs and maintain rigorous quality standards 
                throughout our manufacturing process.
              </p>
            </div>

            {/* Trust */}
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ayur-gold to-ayur-gold/80 rounded-full mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-antique-brown mb-4">Trust</h3>
              <p className="font-lora text-antique-brown/70 leading-relaxed">
                Built over 135 years, our reputation is founded on the countless lives 
                we've helped heal naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 bg-antique-brown text-cream-50 relative overflow-hidden">
        {/* Background botanical elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-10 left-10 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full text-current">
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M50 25v50M25 50h50" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute top-10 right-10 w-28 h-28">
            <svg viewBox="0 0 80 80" className="w-full h-full text-current">
              <path d="M40 10c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-8">
            Message from Our <span className="text-ayur-gold">Heritage Keeper</span>
          </h2>
          
          <div className="bg-ayur-red/10 p-8 rounded-2xl border border-ayur-red/20 mb-8">
            <blockquote className="font-lora text-xl leading-relaxed italic mb-6">
              "As the fourth-generation custodian of this sacred knowledge, I am honored to 
              continue our family's mission of bringing authentic Ayurvedic healing to the world. 
              Every product we create carries within it the wisdom of our ancestors and the 
              promise of natural wellness for future generations."
            </blockquote>
            <div className="text-center">
              <p className="font-noto font-semibold text-ayur-gold text-lg">Dr. Rajesh Sharma</p>
              <p className="font-noto text-cream-200">Fourth Generation Heritage Keeper</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-20 h-px bg-ayur-gold"></div>
            <div className="mx-4 w-4 h-4 bg-ayur-gold rounded-full"></div>
            <div className="w-20 h-px bg-ayur-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;