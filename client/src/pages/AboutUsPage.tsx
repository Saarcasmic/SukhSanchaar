import React, { useState } from "react";
import { Award, Users, Heart, ChevronDown } from "lucide-react";
import CompanyCarousel from "../components/CompanyCarousel";
import CenteredCarousel from "../components/CenteredCarousel";
import OrnamentalDivider from "../components/OrnamentalDivider";
import SEO from "../components/SEO";
import { organizationSchema, aboutPageSchema } from "../utils/structuredData";

const AboutUsPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Combine structured data schemas for About page
  const structuredData = [organizationSchema, aboutPageSchema];

  // Company images for carousel
  const companyImages = [
    {
      src: "/company_1.jpg",
      alt: "Sukh Sancharak Co. Manufacturing Facility",
      caption: "Our GMP-certified manufacturing facility in Mathura",
    },
    {
      src: "/company_6.jpeg",
      alt: "Sukh Sancharak Co. Manufacturing Facility",
      caption: "Our GMP-certified manufacturing facility in Mathura",
    },
    {
      src: "/company_7.jpeg",
      alt: "Sukh Sancharak Co. Manufacturing Facility",
      caption: "Our GMP-certified manufacturing facility in Mathura",
    },
    {
      src: "/company_8.jpeg",
      alt: "Sukh Sancharak Co. Manufacturing Facility",
      caption: "Our GMP-certified manufacturing facility in Mathura",
    },
  ];

  // Historical company images for the carousel
  const historicalImages = [
    {
      id: 1,
      src: "company_2.jpeg",
      alt: "Exhibition at Sukh Sancharak",
      caption: "Exhibition event, Sukh Sancharak Company",
      year: "1942",
    },
    {
      id: 2,
      src: "company_3.jpeg",
      alt: "Inaugration of the current manufacturing facility",
      caption: "Current Showroom Inaugration",
      year: "1929",
    },
    {
      id: 3,
      src: "company_4.jpeg",
      alt: "Retail Showroom Outlet",
      caption: "Retail Showroom Outlet",
      year: "1945",
    },
    {
      id: 4,
      src: "company_5.jpeg",
      alt: "Product Testing Lab",
      caption: "Product Testing Lab",
      year: "1920",
    },
  ];

  // Full text content
  const fullText = [
    {
      content:
        "Sukh Sancharak Co. stands as the oldest manufacturing unit in Mathura and one of Northern India's most respected Ayurvedic production houses, with a continuous legacy dating back to 1890. Founded by Pandit Kshetra Pal Sharma, our company has safeguarded and nurtured the essence of Ayurveda for more than 130 years, remaining committed to pure, plant-based healing and authentic traditional knowledge.",
    },
    {
      content:
        "Our GMP-certified manufacturing facility produces Ayurvedic medicines exclusively from natural botanical sources, honoring timeless processes documented in foundational classics such as Charak Sahita, Rastantra Saar, and Bheshajya Ratnavali. We combine tradition with rigorous quality control, ensuring each product carries the potency and purity that has distinguished our offerings for generations.",
    },
    {
      content:
        "With deep roots in Northern India's Hindi-speaking heartland and a comprehensive distribution network, Sukh Sancharak Co. now aspires to share India's ancient heritage with a broader audience. Our goal is to spread the true essence of Ayurveda throughout India, making authentic, natural healing accessible to all.",
    },
    {
      content:
        "Rooted in over a century of tradition and heartfelt dedication, our vision is to rekindle the timeless bond between nature and well-being for every home. We believe Ayurveda is not merely a science but a way of life—one that nourishes the body, calms the mind, and uplifts the spirit.",
    },
    {
      content:
        "Every product we craft carries the love, care, and wisdom passed down through generations, inspiring people to reconnect with their natural balance in today's fast-paced world. At Sukh Sancharak, we don't just make medicines; we nurture a heritage of healing and trust, striving to bring genuine wellness to every life we touch.",
    },
  ];

  const displayedText = isExpanded ? fullText : fullText.slice(0, 2);

  return (
    <>
      <SEO
        title="About Us - 135 Years of Ayurvedic Excellence | Sukh Sancharak"
        description="Discover our 135-year heritage of authentic Ayurvedic medicine manufacturing. Learn about Sukh Sancharak Co.'s GMP certified facility in Mathura, quality commitments, and traditional manufacturing processes since 1890."
        keywords="about Sukh Sancharak, ayurvedic company history, traditional medicine manufacturer, GMP certified ayurvedic company, Mathura manufacturing facility, 135 years heritage, ayurvedic medicine quality, traditional ayurvedic knowledge"
        canonicalUrl="https://www.sukhsancharak.com/about"
        ogTitle="About Sukh Sancharak Co. - 135 Years of Ayurvedic Excellence"
        ogDescription="Learn about our heritage of authentic Ayurvedic medicine manufacturing since 1890. GMP certified facility in Mathura with traditional knowledge."
        ogImage="https://www.sukhsancharak.com/company_1.jpg"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-cream-50 animate-fade-in">
        {/* Hero Banner */}
        <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Background image with opacity, isolated from content */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            aria-hidden="true"
            style={{
              backgroundImage: 'url("/Sanchaar.png")',
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: 0.4,
            }}
          />
          {/* <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-5 rotate-180 z-10">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-botanical-green"
          >
            <path
              d="M50 10c-5 0-9 4-9 9 0 8 9 21 9 21s9-13 9-21c0-5-4-9-9-9zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
              fill="currentColor"
            />
          </svg>
        </div> */}

          <div className="relative max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center z-10">
            {/* Logo */}
            <div className="flex justify-center mb-6 md:mb-8 mt-4 md:mt-6">
              <img
                src="/logoo.png"
                alt="Sukh Sancharak Co."
                className="h-28 md:h-36 lg:h-40 w-auto"
              />
            </div>

            <p className="font-lora text-lg md:text-xl lg:text-2xl text-antique-brown/80 max-w-4xl mx-auto leading-relaxed px-2">
              Since 1890 – Our Legacy Blends timeless generations of Ayurvedic
              excellence, bringing you authentic herbal remedies crafted with
              traditional wisdom.
            </p>

            {/* Golden ornamental line */}
            <div className="flex items-center justify-center mt-6 md:mt-8">
              <div className="w-16 md:w-20 h-px bg-ayur-gold"></div>
              <div className="mx-3 md:mx-4 w-3 h-3 md:w-4 md:h-4 bg-ayur-gold rounded-full"></div>
              <div className="w-16 md:w-20 h-px bg-ayur-gold"></div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white relative">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-botanical-green mb-4 md:mb-6">
                Our Story
              </h2>
              <div className="w-12 md:w-16 h-1 bg-ayur-gold mx-auto"></div>
            </div>

            {/* Two-Compartment Layout - Responsive Grid */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
              {/* Left Side - Text Content */}
              <div className="w-full lg:col-span-5 space-y-4 md:space-y-6">
                <div
                  className={`space-y-4 md:space-y-6 font-lora text-base md:text-lg text-justify text-antique-brown/80 leading-relaxed ${
                    isExpanded
                      ? "max-h-[500px] md:max-h-96 overflow-y-auto pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-ayur-gold/30 scrollbar-track-transparent hover:scrollbar-thumb-ayur-gold/50"
                      : ""
                  }`}
                >
                  {displayedText.map((paragraph, index) => (
                    <p key={index} className="text-sm md:text-base lg:text-lg">
                      {paragraph.content}
                    </p>
                  ))}
                </div>

                {/* Read More/Read Less Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center space-x-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-ayur-gold to-ayur-gold/80 hover:from-ayur-gold/90 hover:to-ayur-gold text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="font-lora font-medium text-sm md:text-base">
                      {isExpanded ? "Read Less" : "Read More"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Center - Ornamental Divider (Horizontal on mobile, Vertical on desktop) */}
              <div className="w-full lg:w-auto lg:col-span-2 flex justify-center py-6 lg:py-0">
                {/* Horizontal Divider for Mobile */}
                <div className="block lg:hidden w-full">
                  <OrnamentalDivider variant="horizontal" size="md" />
                </div>
                {/* Vertical Divider for Desktop */}
                <div className="hidden lg:block">
                  <OrnamentalDivider variant="vertical" size="lg" />
                </div>
              </div>

              {/* Right Side - Image Carousel */}
              <div className="w-full lg:col-span-5">
                <CompanyCarousel
                  images={companyImages}
                  autoPlay={true}
                  autoPlayInterval={4000}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-cream-50 bg-parchment">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
            <div className="text-center mb-10 md:mb-14 lg:mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-botanical-green mb-4 md:mb-6">
                Our Vision & Values
              </h2>
              <div className="w-20 md:w-24 h-1 bg-ayur-gold mx-auto"></div>
            </div>

            <div className="mb-10 md:mb-12 max-w-6xl xl:max-w-7xl mx-auto text-center">
              <p className="font-lora text-sm md:text-base lg:text-lg text-antique-brown/80 leading-relaxed text-justify px-2">
                At Sukh Sancharak, our vision is to honor and advance the
                ancient wisdom of Ayurveda by delivering authentic, natural
                healing solutions that nurture health and well-being across
                India and beyond. Since 1890, we have sustained our legacy
                through unwavering commitment to quality over quantity, thriving
                through rigorous competition by never compromising on the purity
                and efficacy of our products. We hold steadfast to Ayurvedic
                principles, crafting medicines that are 100% natural and free
                from synthetic chemicals, alcohols, and other additives. This
                dedication ensures our products are not only highly effective
                but also safe, with no side effects, allowing our customers to
                truly experience the profound benefits of Ayurveda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Authenticity */}
              <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-ayur-red to-ayur-red/80 rounded-full mb-4 md:mb-6">
                  <Heart className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-antique-brown mb-3 md:mb-4">
                  Authenticity
                </h3>
                <p className="font-lora text-sm md:text-base text-antique-brown/70 leading-relaxed text-justify">
                  We strictly follow classical Ayurvedic practices, honoring
                  ancient texts and traditional manufacturing methods to
                  preserve the original healing potency of our medicines.
                </p>
              </div>

              {/* Quality */}
              <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-botanical-green to-botanical-green/80 rounded-full mb-4 md:mb-6">
                  <Award className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-antique-brown mb-3 md:mb-4">
                  Quality
                </h3>
                <p className="font-lora text-sm md:text-base text-antique-brown/70 leading-relaxed text-justify">
                  Our GMP-certified processes include stringent quality
                  controls, ensuring that every product meets the highest
                  standards of safety and efficacy.
                </p>
              </div>

              {/* Trust */}
              <div className="text-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-cream-200 hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-ayur-gold to-ayur-gold/80 rounded-full mb-4 md:mb-6">
                  <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-antique-brown mb-3 md:mb-4">
                  Trust
                </h3>
                <p className="font-lora text-sm md:text-base text-antique-brown/70 leading-relaxed text-justify">
                  Established in 1890, our enduring presence in Ayurvedic
                  healthcare reflects more than a century of trust. We take
                  pride in serving millions with products that embody
                  authenticity, safety, and efficacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white relative">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-20">
            <div className="items-center">
              <div>
                <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-botanical-green mb-4 md:mb-6">
                  Quality and Safety Commitments:
                </h2>
                <div className="w-12 md:w-16 h-1 bg-ayur-gold mb-6 md:mb-8"></div>
                <div className="space-y-4 md:space-y-6 font-lora text-sm md:text-base lg:text-lg text-antique-brown/80 leading-relaxed text-justify">
                  <p>
                    For over 135 years, Sukh Sancharak has stood firm in its
                    dedication to uncompromising quality and safety. Our
                    manufacturing unit, nestled in the historic city of Mathura,
                    is a testament to this commitment—equipped with dedicated
                    syrup, powder, oil, capsule, ointment & tablet sections.
                    Each segment operates under stringent protocols to maintain
                    the highest standards throughout every stage of production.
                    Holding GMP certification along with Ayurvedic licenses
                    under Form 25D and Form 26 E-1, we operate fully within
                    regulatory frameworks, demonstrating our commitment to
                    compliance and best practices in Ayurvedic medicine
                    production. Our dedicated quality control and quality
                    assurance departments meticulously monitor raw materials,
                    in-process formulations, and finished products to uphold
                    consistent safety and efficacy. Over 135 years of enduring
                    presence in a highly competitive market speaks to the trust
                    our consumers place in us. Our products are the result of
                    systematic quality protocols combined with deep-rooted
                    experience—delivering authentic Ayurvedic medicines that
                    meet stringent standards without compromise
                  </p>
                </div>
                <div className="flex flex-row sm:flex-row gap-6 md:gap-8 mt-6 md:mt-8 justify-center items-center">
                  <img
                    src="/gmp_logo.png"
                    alt="GMP Certified"
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
                  />
                  <img
                    src="/135_logo.png"
                    alt="135 Years Heritage"
                    className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History Carousel */}
        <section className="pb-12 pt-6 md:py-16 lg:pb-28 bg-cream-50 relative overflow-hidden">
          <div className="relative w-full">
            {/* Section Header */}
            <div className="text-center mb-2 md:mb-3 px-4 sm:px-6 lg:px-8">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-botanical-green mb-4 md:mb-6">
                Through the Decades
              </h2>
              <div className="w-12 md:w-16 h-1 bg-ayur-gold mx-auto mb-4"></div>
              <p className="font-lora text-sm md:text-base lg:text-lg text-antique-brown/70 max-w-3xl mx-auto">
                A glimpse into our heritage spanning over 135 years of Ayurvedic
                excellence
              </p>
            </div>

            {/* Carousel Container - Full Width */}
            <CenteredCarousel
              images={historicalImages}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;
