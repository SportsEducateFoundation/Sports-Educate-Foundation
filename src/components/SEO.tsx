import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  schema?: object;
  canonical?: string;
}

const SEO = ({ title, description, keywords, schema, canonical }: SEOProps) => {
  const location = useLocation();
  const siteName = "SportSpark Sports Foundation";
  const baseUrl = "https://www.sportsparkfoundation.com";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const currentUrl = canonical || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || "SportSpark Sports Foundation partners with schools across India to provide certified physical education trainers and specialized sports equipment kits.");
    }

    // Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || "physical education trainers for schools, school sports equipment kits, on-site sports coaching India, school sports collaboration");
    }

    // Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Schema.org JSON-LD
    const existingSchema = document.getElementById("page-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "page-schema";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, keywords, currentUrl, schema]);

  return null;
};

export default SEO;
