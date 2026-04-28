import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import resumeContent from "./resume-content.json";

const getSocialIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return GitHubIcon;
    case "LinkedIn":
      return LinkedInIcon;
    default:
      throw new Error(`Unsupported social icon: ${name}`);
  }
};

export const RESUME_CONTENT = resumeContent;

export const RESUME_DATA = {
  ...resumeContent,
  contact: {
    ...resumeContent.contact,
    social: resumeContent.contact.social.map((social) => ({
      ...social,
      icon: getSocialIcon(social.name),
    })),
  },
} as const;