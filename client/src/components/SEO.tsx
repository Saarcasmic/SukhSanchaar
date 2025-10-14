import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Sukh Sancharak Co. - Ayurvedic Medicine Since 1890 | Mathura",
  description = "Sukh Sancharak Co. - 135 years of authentic Ayurvedic medicine since 1890. GMP certified manufacturer in Mathura, Uttar Pradesh. Traditional herbal remedies including Sudha Sindhu and Sanchaar Dant Manjan.",
  keywords = "ayurvedic medicine, herbal remedies Mathura, ayurvedic products, natural ayurvedic products, GMP certified ayurvedic company, traditional ayurvedic medicine India, ayurvedic company Mathura, herbal medicine Uttar Pradesh, Mathura ayurvedic manufacturer, Sudha Sindhu, Sanchaar Dant Manjan, ayurvedic manjan",
  canonicalUrl = "https://www.sukhsancharak.com",
  ogTitle,
  ogDescription,
  ogImage = "https://www.sukhsancharak.com/logoo.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  noIndex = false,
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Sukh Sancharak Co." />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Sukh Sancharak Co." />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#8B4513" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
