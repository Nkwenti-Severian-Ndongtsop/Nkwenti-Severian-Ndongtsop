import { Children, isValidElement, useEffect, type ReactNode } from 'react';

type HelmetProps = {
  children: ReactNode;
};

const upsertHeadElement = (el: HTMLElement, keyAttrs: Array<[string, string]>) => {
  const selector = keyAttrs
    .map(([k, v]) => `[${CSS.escape(k)}="${CSS.escape(v)}"]`)
    .join('');

  const existing = selector ? document.head.querySelector(`${el.tagName.toLowerCase()}${selector}`) : null;
  if (existing) {
    existing.replaceWith(el);
    return;
  }

  document.head.appendChild(el);
};

const Helmet = ({ children }: HelmetProps) => {
  useEffect(() => {
    const nodes = Children.toArray(children);

    for (const node of nodes) {
      if (!isValidElement(node)) continue;
      if (typeof node.type !== 'string') continue;

      const tag = node.type.toLowerCase();
      const props = node.props as Record<string, unknown>;

      if (tag === 'title') {
        const titleText = Children.toArray((props.children as ReactNode) || []).join('');
        if (typeof titleText === 'string') {
          document.title = titleText;
        }
        continue;
      }

      if (tag === 'meta') {
        const meta = document.createElement('meta');
        for (const [k, v] of Object.entries(props)) {
          if (k === 'children' || v == null) continue;
          meta.setAttribute(k, String(v));
        }

        const keyAttrs: Array<[string, string]> = [];
        if (typeof props.name === 'string') keyAttrs.push(['name', props.name]);
        if (typeof props.property === 'string') keyAttrs.push(['property', props.property]);
        if (keyAttrs.length === 0) continue;

        upsertHeadElement(meta, keyAttrs);
        continue;
      }

      if (tag === 'link') {
        const link = document.createElement('link');
        for (const [k, v] of Object.entries(props)) {
          if (k === 'children' || v == null) continue;
          link.setAttribute(k, String(v));
        }

        const keyAttrs: Array<[string, string]> = [];
        if (typeof props.rel === 'string') keyAttrs.push(['rel', props.rel]);
        if (keyAttrs.length === 0) continue;

        upsertHeadElement(link, keyAttrs);
        continue;
      }

      if (tag === 'script') {
        const script = document.createElement('script');
        for (const [k, v] of Object.entries(props)) {
          if (k === 'children' || v == null) continue;
          script.setAttribute(k, String(v));
        }

        const childText = Children.toArray((props.children as ReactNode) || []).join('');
        if (typeof childText === 'string') {
          script.textContent = childText;
        }

        const keyAttrs: Array<[string, string]> = [];
        if (typeof props.type === 'string') keyAttrs.push(['type', props.type]);
        upsertHeadElement(script, keyAttrs);
        continue;
      }
    }
  }, [children]);

  return null;
};

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const MetaTags = ({
  title = 'Nkwenti Severian Ndongtsop - Associate Full-Stack Engineer & Cybersecurity (SOC/SIEM)',
  description = 'Nkwenti Severian Ndongtsop - certified Associate full-stack software engineer from Cameroon. Works at Adorsys as Associate Full-Stack Software Engineer and maintainer of keycloak-config-cli, and contributes to cybersecurity initiatives focused on SOC/SIEM with Wazuh. Also learning penetration testing (red teaming).',
  keywords = 'Nkwenti Severian Ndongtsop, full-stack developer, software engineer, React, Spring Boot, Rust, cybersecurity, SOC, SIEM, Wazuh, penetration testing, red team, Adorsys, keycloak-config-cli, Cameroon, portfolio',
  image = '/my-photo.png',
  url = 'https://nkwenti-severian-ndongtsop.vercel.app',
  type = 'website',
  noIndex = false
}: MetaTagsProps) => {
  const siteUrl = 'https://nkwenti-severian-ndongtsop.vercel.app';
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nkwenti Severian Ndongtsop" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Nkwenti Severian Ndongtsop - Professional Headshot" />
      <meta property="og:site_name" content="Nkwenti Severian Ndongtsop" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@n_severian" />
      <meta name="twitter:creator" content="@n_severian" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content="Nkwenti Severian Ndongtsop - Professional Headshot" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
      <meta name="application-name" content="Nkwenti Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Nkwenti Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Structured Data Type */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'profile' ? 'Person' : 'WebPage',
          "name": "Nkwenti Severian Ndongtsop",
          "url": fullUrl,
          "image": fullImageUrl,
          "description": description,
          "sameAs": [
            "https://github.com/Nkwenti-Severian-Ndongtsop",
            "https://www.linkedin.com/in/severian-nkwenti-ndongtsop-83b345389/",
            "https://x.com/n_severian"
          ],
          "jobTitle": "Associate Full-Stack Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "Adorsys"
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Global Infrastructure Services Adorsys"
          },
          "knowsAbout": [
            "React Development",
            "Spring Boot",
            "Rust Programming",
            "Cybersecurity",
            "SOC",
            "SIEM",
            "Wazuh",
            "Penetration Testing",
            "Identity and Access Management",
            "Keycloak"
          ],
          "offers": {
            "@type": "Offer",
            "description": "Available for freelance projects and collaborations"
          }
        })}
      </script>
    </Helmet>
  );
};

export default MetaTags;
