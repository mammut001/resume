const fs = require("node:fs");
const path = require("node:path");

const resume = require("../src/data/resume-content.json");

const SUPPORTED_LANGUAGES = ["english", "french", "chinese"];

const localeConfig = {
  english: {
    suffix: "",
    typstFile: "resume.typ",
    pdfFile: "payton-pei-resume.pdf",
    labels: {
      summary: "Summary",
      education: "Education",
      workExperience: "Work Experience",
      projects: "Projects",
      research: "Research",
      skills: "Skills",
      present: "Present",
      skillGroups: {
        languages: "Languages",
        frameworks: "Frameworks & Data",
        delivery: "Testing & Delivery",
        tools: "Tools & Platforms",
        additional: "Additional",
      },
    },
  },
  french: {
    suffix: "_fr",
    typstFile: "resume.fr.typ",
    pdfFile: "payton-pei-resume-fr.pdf",
    labels: {
      summary: "Résumé",
      education: "Formation",
      workExperience: "Expérience",
      projects: "Projets",
      research: "Recherche",
      skills: "Compétences",
      present: "Présent",
      skillGroups: {
        languages: "Langages",
        frameworks: "Frameworks & données",
        delivery: "Tests & livraison",
        tools: "Outils & plateformes",
        additional: "Complémentaire",
      },
    },
  },
  chinese: {
    suffix: "_cn",
    typstFile: "resume.zh.typ",
    pdfFile: "payton-pei-resume-zh.pdf",
    labels: {
      summary: "概述",
      education: "教育经历",
      workExperience: "工作经历",
      projects: "项目",
      research: "研究",
      skills: "技能",
      present: "至今",
      skillGroups: {
        languages: "语言",
        frameworks: "框架与数据",
        delivery: "测试与交付",
        tools: "工具与平台",
        additional: "补充",
      },
    },
  },
};

const typstDir = path.join(__dirname, "..", "typst");

const stripProtocol = (value = "") => value.replace(/^https?:\/\//, "").replace(/\/$/, "");

const escapeTypstString = (value = "") =>
  String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const escapeTypstInline = (value = "") =>
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/#/g, "\\#")
    .replace(/\$/g, "\\$")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]");

const typstString = (value = "") => `"${escapeTypstString(value)}"`;

const normalizeWhitespace = (value = "") => value.replace(/\s+/g, " ").trim();

const splitSentences = (value = "") =>
  normalizeWhitespace(value)
    .split(/(?<=[.!?。！？])\s*/)
    .map((sentence) => escapeTypstInline(sentence.trim()))
    .filter(Boolean);

const renderBulletList = (items) => items.map((item) => `- ${item}`).join("\n");

const parseRequestedLanguages = () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    return SUPPORTED_LANGUAGES;
  }

  const requested = args
    .flatMap((arg) => (arg.startsWith("--lang=") ? arg.slice(7).split(",") : [arg]))
    .map((arg) => arg.trim().toLowerCase())
    .filter(Boolean);

  if (requested.includes("all")) {
    return SUPPORTED_LANGUAGES;
  }

  const uniqueLanguages = [...new Set(requested)];

  uniqueLanguages.forEach((language) => {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      throw new Error(
        `Unsupported language: ${language}. Expected one of ${SUPPORTED_LANGUAGES.join(", ")}.`,
      );
    }
  });

  return uniqueLanguages;
};

const getLocalizedText = (entry, baseKey, language) => {
  const suffix = localeConfig[language].suffix;
  const localizedKey = `${baseKey}${suffix}`;
  const localizedValue = (suffix ? entry[localizedKey] : undefined) ?? entry[baseKey];

  return typeof localizedValue === "string" ? localizedValue : "";
};

const getLocalizedDateValue = (value, language) => {
  if (!value) {
    return null;
  }

  return value === "Present" ? localeConfig[language].labels.present : value;
};

const renderDates = (language, start, end) => {
  const localizedStart = getLocalizedDateValue(start, language);
  const localizedEnd = getLocalizedDateValue(end, language);

  if (localizedStart && localizedEnd) {
    return `dates-helper(start-date: ${typstString(localizedStart)}, end-date: ${typstString(localizedEnd)})`;
  }

  if (localizedStart) {
    return typstString(localizedStart);
  }

  return typstString("");
};

const findSocial = (name) =>
  resume.contact.social.find((item) => item.name === name)?.url ?? "";

const github = stripProtocol(findSocial("GitHub"));
const linkedin = stripProtocol(findSocial("LinkedIn"));
const personalSite = stripProtocol(resume.personalWebsiteUrl);
const showPersonalSite = personalSite && personalSite !== github;

const renderEducation = (language) =>
  resume.education
    .slice()
    .reverse()
    .map(
      (entry) => `#edu(\n  institution: ${typstString(getLocalizedText(entry, "school", language))},\n  location: ${typstString(
        resume.location,
      )},\n  dates: ${renderDates(language, entry.start, entry.end)},\n  degree: ${typstString(
        getLocalizedText(entry, "degree", language),
      )},\n)`,
    )
    .join("\n\n");

const renderWork = (language) =>
  resume.work
    .slice()
    .reverse()
    .map((entry) => {
      const bullets = splitSentences(getLocalizedText(entry, "description", language));

      return `#work(\n  title: ${typstString(getLocalizedText(entry, "title", language))},\n  location: ${typstString(
        resume.location,
      )},\n  company: ${typstString(entry.company)},\n  dates: ${renderDates(language, entry.start, entry.end)},\n)\n${renderBulletList(bullets)}`;
    })
    .join("\n\n");

const renderProjects = (language) =>
  resume.projects
    .filter((entry) => entry.status === 1)
    .slice()
    .reverse()
    .map((entry) => {
      const localizedDescription = getLocalizedText(entry, "description", language);
      const description = splitSentences(localizedDescription)[0] ?? escapeTypstInline(localizedDescription);
      const urlLine = entry.link?.href ? `\n  url: ${typstString(stripProtocol(entry.link.href))},` : "";

      return `#project(\n  name: ${typstString(getLocalizedText(entry, "title", language))},${urlLine}\n)\n- ${description}`;
    })
    .join("\n\n");

const renderResearch = (language) =>
  resume.research
    .slice()
    .reverse()
    .map((entry) => {
      const bullets = splitSentences(getLocalizedText(entry, "description", language));

      return `#extracurriculars(\n  activity: ${typstString(getLocalizedText(entry, "title", language))},\n  dates: ${renderDates(
        language,
        entry.start,
        entry.end,
      )},\n)\n${renderBulletList(bullets)}`;
    })
    .join("\n\n");

const skillGroups = [
  {
    labelKey: "languages",
    values: ["TypeScript", "JavaScript", "Python", "Java", "C++", "Swift", "Rust", "HTML", "CSS", "Bash"],
  },
  {
    labelKey: "frameworks",
    values: ["NextJS", "TailwindCSS", "Flask", "Tauri v2", "SQLite", "MongoDB", "JQuery"],
  },
  {
    labelKey: "delivery",
    values: ["PyTest", "GTest", "SeleniumGrid", "Jenkins", "Docker", "Vagrant"],
  },
  {
    labelKey: "tools",
    values: ["GitHub", "Jira", "Confluence", "Linux", "AWS", "OpenStack", "IntelliJ", "PostMan", "Windows10", "Visual Studio", "Typst", "Mermaid", "Object-Oriented Programming"],
  },
];

const renderSkills = (language) => {
  const { skillGroups: skillLabels } = localeConfig[language].labels;
  const groupedValues = new Set();
  const lines = skillGroups
    .map(({ labelKey, values }) => {
      const presentValues = values.filter((value) => resume.skills.includes(value));

      presentValues.forEach((value) => groupedValues.add(value));

      if (presentValues.length === 0) {
        return null;
      }

      return `- *${skillLabels[labelKey]}*: ${escapeTypstInline(presentValues.join(", "))}`;
    })
    .filter(Boolean);

  const remaining = resume.skills.filter((value) => !groupedValues.has(value));

  if (remaining.length > 0) {
    lines.push(`- *${skillLabels.additional}*: ${escapeTypstInline(remaining.join(", "))}`);
  }

  return lines.join("\n");
};

const renderResume = (language) => {
  const { labels, typstFile, pdfFile } = localeConfig[language];
  const outputPath = path.join(typstDir, typstFile);
  const lines = [
    "// Generated from src/data/resume-content.json by scripts/generate-resume-typst.cjs.",
    `// Language: ${language}`,
    `// PDF output: public/${pdfFile}`,
    "// Do not edit this file by hand.",
    '#import "@preview/basic-resume:0.2.9": *',
    "",
    `#let name = ${typstString(resume.name)}`,
    `#let location = ${typstString(resume.location)}`,
    `#let email = ${typstString(resume.contact.email)}`,
    `#let github = ${typstString(github)}`,
    `#let linkedin = ${typstString(linkedin)}`,
    "",
    "#show: resume.with(",
    "  author: name,",
    "  location: location,",
    "  email: email,",
    "  github: github,",
    "  linkedin: linkedin,",
    ...(showPersonalSite ? [`  personal-site: ${typstString(personalSite)},`] : []),
    '  accent-color: "#000000",',
    '  font: "New Computer Modern",',
    '  paper: "us-letter",',
    "  author-position: left,",
    "  personal-info-position: left,",
    ")",
    "",
    `== ${labels.summary}`,
    "",
    escapeTypstInline(getLocalizedText(resume, "summary", language)),
    "",
    `== ${labels.education}`,
    "",
    renderEducation(language),
    "",
    `== ${labels.workExperience}`,
    "",
    renderWork(language),
    "",
    `== ${labels.projects}`,
    "",
    renderProjects(language),
    "",
    `== ${labels.research}`,
    "",
    renderResearch(language),
    "",
    `== ${labels.skills}`,
    renderSkills(language),
    "",
  ];

  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

  return outputPath;
};

fs.mkdirSync(typstDir, { recursive: true });

const generatedFiles = parseRequestedLanguages().map((language) => renderResume(language));

generatedFiles.forEach((filePath) => {
  console.log(`Generated ${path.relative(process.cwd(), filePath)}`);
});