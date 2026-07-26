"use client"

import { type Lang, useLanguageStore } from "@/store/useLanguageStore"

const languageSuffixMap: Record<Lang, "" | "_fr" | "_cn"> = {
  english: "",
  french: "_fr",
  chinese: "_cn",
}

export const UI_LABELS = {
  english: {
    about: "About",
    education: "Education",
    coursework: "Selected Coursework",
    courseworkIntro: "Completed graduate coursework at the University of Ottawa.",
    officialCourseDescription: "Official course description",
    workExperience: "Work Experience",
    projects: "Projects",
    research: "Research",
    skills: "Skills",
    githubContributions: "GitHub Contributions",
    active: "Active",
    archived: "Archived",
    present: "Present",
    downloadResume: "Download PDF",
    changeLanguage: "Change Language",
  },
  french: {
    about: "Profil",
    education: "Formation",
    coursework: "Cours sélectionnés",
    courseworkIntro: "Cours de maîtrise complétés à l'Université d'Ottawa.",
    officialCourseDescription: "Description officielle du cours",
    workExperience: "Expérience",
    projects: "Projets",
    research: "Recherche",
    skills: "Compétences",
    githubContributions: "Contributions GitHub",
    active: "Actif",
    archived: "Archivé",
    present: "Présent",
    downloadResume: "Télécharger le PDF",
    changeLanguage: "Changer de langue",
  },
  chinese: {
    about: "简介",
    education: "教育经历",
    coursework: "课程精选",
    courseworkIntro: "已完成的渥太华大学研究生课程。",
    officialCourseDescription: "官方课程简介",
    workExperience: "工作经历",
    projects: "项目",
    research: "研究",
    skills: "技能",
    githubContributions: "GitHub 贡献图",
    active: "进行中",
    archived: "已归档",
    present: "至今",
    downloadResume: "下载 PDF",
    changeLanguage: "切换语言",
  },
} as const

type LocalizableRecord = Record<string, unknown>

export const getLocalizedText = (
  entry: LocalizableRecord,
  baseKey: string,
  language: Lang,
) => {
  const suffix = languageSuffixMap[language]
  const localizedKey = `${baseKey}${suffix}`
  const localizedValue =
    (suffix ? entry[localizedKey] : undefined) ?? entry[baseKey]

  return typeof localizedValue === "string" ? localizedValue : ""
}

const getLocalizedDateValue = (value: string | null | undefined, presentLabel: string) => {
  if (!value) {
    return null
  }

  return value === "Present" ? presentLabel : value
}

export const formatDateRange = (
  start: string,
  end: string | null | undefined,
  presentLabel: string,
) => {
  const localizedStart = getLocalizedDateValue(start, presentLabel)
  const localizedEnd = getLocalizedDateValue(end, presentLabel)

  if (!localizedStart) {
    return ""
  }

  if (!localizedEnd) {
    return localizedStart
  }

  return `${localizedStart} - ${localizedEnd}`
}

export const useResumeLocale = () => {
  const language = useLanguageStore((state) => state.name)

  return {
    language,
    labels: UI_LABELS[language],
    localize: (entry: LocalizableRecord, baseKey: string) =>
      getLocalizedText(entry, baseKey, language),
  }
}
