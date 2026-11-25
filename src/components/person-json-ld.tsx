import { RESUME_DATA } from "@/data/resume-data";

// Person structured data for the résumé and posts pages. Kept out of the root
// layout so app product pages (e.g. /photoagent) don't carry résumé details.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: RESUME_DATA.name,
  url: RESUME_DATA.personalWebsiteUrl,
  image: RESUME_DATA.avatarUrl,
  email: `mailto:${RESUME_DATA.contact.email}`,
  jobTitle: "Software Engineer",
  description: RESUME_DATA.summary,
  alumniOf: RESUME_DATA.education.map((education) => ({
    "@type": "CollegeOrUniversity",
    name: education.school,
  })),
  knowsAbout: RESUME_DATA.skills,
  sameAs: RESUME_DATA.contact.social.map((social) => social.url),
};

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
