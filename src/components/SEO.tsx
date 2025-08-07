import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, any>;
};

export function SEO({
  title = "LMS Instruction – Modern Learning Platform",
  description = "A modern LMS instruction website with interactive features, video showcases, and smooth animations.",
  canonical = window.location.href,
  jsonLd,
}: SEOProps) {
  const fullTitle = `${title}`;

  const structured = jsonLd ?? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LMS Instruction",
    url: canonical,
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonical}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(structured)}</script>
    </Helmet>
  );
}
