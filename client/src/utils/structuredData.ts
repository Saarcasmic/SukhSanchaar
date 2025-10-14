/**
 * Structured Data utilities for Schema.org markup
 * Provides JSON-LD structured data for SEO optimization
 */

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  foundingDate: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
  hasCredential: {
    "@type": string;
    name: string;
    credentialCategory: string;
  };
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string;
}

export interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": string;
    name: string;
  };
  category: string;
  offers: {
    "@type": string;
    price: number;
    priceCurrency: string;
    availability: string;
    seller: {
      "@type": string;
      name: string;
    };
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    reviewCount: number;
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

// Organization Schema for Sukh Sancharak Co.
export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sukh Sancharak Co.",
  description:
    "135 years of authentic Ayurvedic medicine manufacturing since 1890. GMP certified manufacturer specializing in traditional herbal remedies.",
  url: "https://www.sukhsancharak.com",
  logo: "https://www.sukhsancharak.com/logoo.png",
  foundingDate: "1890",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Manufacturing Unit",
    addressLocality: "Mathura",
    addressRegion: "Uttar Pradesh",
    postalCode: "281001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXX-XXXXXX", // Update with actual phone number
    contactType: "customer service",
  },
  sameAs: ["https://www.sukhsancharak.com"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Good Manufacturing Practice (GMP) Certification",
    credentialCategory: "Manufacturing License",
  },
};

// Local Business Schema
export const localBusinessSchema: LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sukh Sancharak Co.",
  description:
    "Traditional Ayurvedic medicine manufacturer in Mathura, Uttar Pradesh. GMP certified facility producing authentic herbal remedies.",
  url: "https://www.sukhsancharak.com",
  telephone: "+91-XXXX-XXXXXX", // Update with actual phone number
  address: {
    "@type": "PostalAddress",
    streetAddress: "Manufacturing Unit",
    addressLocality: "Mathura",
    addressRegion: "Uttar Pradesh",
    postalCode: "281001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.4924,
    longitude: 77.6737,
  },
  openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  priceRange: "₹₹",
  paymentAccepted: ["Cash", "Credit Card", "Online Payment"],
  currenciesAccepted: "INR",
};

// Website Schema
export const webSiteSchema: WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sukh Sancharak Co.",
  url: "https://www.sukhsancharak.com",
  description:
    "Official website of Sukh Sancharak Co. - 135 years of authentic Ayurvedic medicine manufacturing.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.sukhsancharak.com/products?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Product Schema Template
export const createProductSchema = (product: {
  name: string;
  description: string;
  image: string[];
  price: number;
  category: string;
  rating?: number;
  reviewCount: number;
}): ProductSchema => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    "@type": "Brand",
    name: "Sukh Sancharak Co.",
  },
  category: product.category,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Sukh Sancharak Co.",
    },
  },
  ...(product.rating &&
    product.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
});

// About Page Schema
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Sukh Sancharak Co.",
  description:
    "Learn about our 135-year heritage of authentic Ayurvedic medicine manufacturing in Mathura, Uttar Pradesh.",
  url: "https://www.sukhsancharak.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Sukh Sancharak Co.",
    foundingDate: "1890",
    description:
      "Traditional Ayurvedic medicine manufacturer with GMP certification.",
  },
};
