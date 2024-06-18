import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Dong Payton Pei",
  initials: "DP",
  location: "Ottawa, ON",
  locationLink: "https://www.google.com/maps/place/Ottawa,+ON",
  about:
    "An innovative new graduate in Computer Science with rich co-op experience, desirous to find the job position of a Software Engineer to apply my exceptional knowledge of design, development, coding, and quality testing of software.",
  summary:
    "Bachelor of Computer Science from Carleton University with extensive co-op experience in software testing and development. Skilled in TypeScript, JavaScript, Python, and various other technologies. Seeking a Software Engineer position to leverage my skills in designing, developing, and testing software solutions.",
  avatarUrl: "https://avatars.githubusercontent.com/u/141458085?v=4", // Placeholder avatar URL
  personalWebsiteUrl: "https://github.com/mammut001", // Placeholder personal website URL
  contact: {
    email: "paytonpei01@gmail.com",
    tel: "",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/mammut001",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pd110/",
        icon: LinkedInIcon,
      },
    ],
  },
  education: [
    {
      school: "Carleton University",
      degree: "Bachelor of Computer Science",
      start: "2017",
      end: "2023",
    },
  ],
  work: [
    {
      company: "Nokia Canada",
      link: "https://www.nokia.com",
      badges: ["Co-op"],
      title: "Software Tester Co-op",
      start: "Aug 2020",
      end: "Aug 2021",
      description:
        "Enhanced JavaScript/XML code for better code coverage and robustness. Produced design documents using Confluence Pages for system architecture and data flows.",
    },
    {
      company: "Ford Motor Canada",
      link: "https://www.ford.ca",
      badges: ["Co-op"],
      title: "Software Developer Co-op",
      start: "Apr 2020",
      end: "Aug 2020",
      description:
        "Participated in Agile development, developed unit test scripts using C++11 Google Test Framework, and utilized Jenkins for CI/CD.",
    },
  ],
  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Swift",
    "HTML",
    "CSS",
    "TailwindCSS",
    "JQuery",
    "Flask",
    "NextJS",
    "React Native",
    "MongoDB",
    "Object-Oriented Programming",
    "PyTest",
    "GTest",
    "SeleniumGrid",
    "Jenkins",
    "Docker",
    "Vagrant",
    "GitHub",
    "Jira",
    "Confluence",
    "Linux",
    "Bash",
    "IntelliJ",
    "PostMan",
    "OpenStack",
    "AWS",
    "Windows10",
    "Visual Studio",
  ],
  projects: [
    {
      title: "RentWise",
      status:1,
      techStack: ["TypeScript", "React Native", "Firebase", "Android Studio", "Xcode", "NoSql"],
      description:
        "Implemented Google SignUp and SignIn for user authentication, securely storing user info in Firebase. Used Firebase for instant updates in terms of house listings, enhancing user engagement.",
      link: {
        label: "github.com",
        href: "https://github.com/random-char1198/Coin-Web-Crawler", // Placeholder link
      },
    },
    {
      title: "Coin Web Crawler",
      status:1,
      techStack: ["JavaScript", "jQuery", "NodeJS", "Express", "Web Crawling", "PageRank", "Recommendation Algorithm"],
      description:
        "Developed a Node.js-based web crawler for CoinMarketCap.com, using crawling technology for cryptocurrency trading data extraction; scraped 500 pages per day and stored data in MongoDB for future inquiry.",
      link: {
        label: "github.com",
        href: "https://github.com/random-char1198/Coin-Web-Crawler",
      },
    },
    {
      title: "Workout Plan Generator",
      status:0,
      techStack: ["TypeScript", "Vercel", "Next.js", "Flask", "Redis", "Zustand"],
      description:
        "Utilized Vercel’s online hosting service with Python and Flask for backend services. Adopted Docker running-environment setup for project deployment, utilizing GitHub for project collaboration.",
      link: {
        label: "github.com",
        href: "https://github.com/ivespeggy/workout-generator",
      },
    },
  ],
} as const;
