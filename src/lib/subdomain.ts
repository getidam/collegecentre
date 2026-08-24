/**
 * CollegeCentre Multi-Tenant Subdomain Utility
 * Resolves active campus/institution slug from hostname, query parameters, or route paths.
 */

export function getSubdomain(): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Check explicit URL query parameter overrides (e.g. ?campus=medical or ?subdomain=engineering)
  const params = new URLSearchParams(window.location.search);
  const queryOverride = params.get('campus') || params.get('subdomain');
  if (queryOverride && queryOverride.trim() !== '') {
    return queryOverride.trim().toLowerCase();
  }

  // 2. Check path-based slug routing (e.g. /campus/medical, /portal/engineering, /c/medical)
  const path = window.location.pathname.toLowerCase();
  const campusMatch = path.match(/^\/(?:campus|portal|c)\/([a-z0-9-]+)/);
  if (campusMatch && campusMatch[1]) {
    return campusMatch[1];
  }

  // 3. Extract from hostname (e.g. medical.collegecentre.in or engineering.localhost)
  const hostname = window.location.hostname.toLowerCase();

  // Ignore IP addresses
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    return null;
  }

  // Handle local development: e.g. "medical.localhost"
  if (hostname.endsWith('.localhost')) {
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[0] !== 'localhost') {
      return parts[0];
    }
    return null;
  }

  // Handle production domain: "collegecentre.in"
  const rootDomain = 'collegecentre.in';
  if (hostname.endsWith(`.${rootDomain}`)) {
    const sub = hostname.slice(0, -(rootDomain.length + 1));
    if (sub && sub !== 'www' && sub !== 'app') {
      return sub;
    }
    return null;
  }

  // Handle Vercel preview domains or arbitrary domains: "subdomain.project.vercel.app"
  const parts = hostname.split('.');
  if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'collegecentre') {
    return parts[0];
  }

  return null;
}

export function formatSubdomainUrl(slug: string): { subdomainUrl: string; fallbackUrl: string } {
  const origin = window.location.origin;
  const isCustomDomain = window.location.hostname.includes('collegecentre.in');
  
  if (isCustomDomain) {
    return {
      subdomainUrl: `https://${slug}.collegecentre.in`,
      fallbackUrl: `https://collegecentre.in/?campus=${slug}`
    };
  }

  return {
    subdomainUrl: `http://${slug}.localhost:5173`,
    fallbackUrl: `${origin}/?campus=${slug}`
  };
}
