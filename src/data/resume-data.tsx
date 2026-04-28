import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Dong Payton Pei",
  initials: "DP",
  location: "Ottawa, ON",
  locationLink: "https://www.google.com/maps/place/Ottawa,+ON",
  about:
    "An innovative new graduate in Computer Science with rich co-op experience, desirous to find the job position of a Software Engineer to apply my exceptional knowledge of design, development, coding, and quality testing of software.",
  about_fr:
    "Un nouveau diplômé innovant en informatique avec une riche expérience de stage coopératif, désireux de trouver un poste de développeur logiciel pour appliquer mes connaissances exceptionnelles en conception, développement, codage et test de qualité des logiciels.",
  about_cn: "一名创新的计算机科学新毕业生，拥有丰富的合作经验，希望找到软件工程师职位，以应用我在软件设计、开发、编码和质量测试方面的出色知识。",
  summary:
    "Bachelor of Computer Science from Carleton University with extensive co-op experience in software testing and development. Skilled in TypeScript, JavaScript, Python, and various other technologies. Seeking a Software Engineer position to leverage my skills in designing, developing, and testing software solutions.",
  summary_fr:
    "Bachelier en informatique de l'Université Carleton avec une vaste expérience de stage coopératif en test et développement de logiciels. Compétent en TypeScript, JavaScript, Python et diverses autres technologies. Cherche un poste d'ingénieur logiciel pour tirer parti de mes compétences en conception, développement et test de solutions logicielles.",
  summary_cn:
    "毕业于卡尔顿大学计算机科学学士，拥有丰富的软件测试和开发合作经验。熟练掌握TypeScript、JavaScript、Python等多种技术。寻求软件工程师职位，以利用我在设计、开发和测试软件解决方案方面的技能。",
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
      school_fr: "L'Université Carleton",
      school_cn: "卡尔顿大学",
      degree: "Bachelor of Computer Science",
      degree_fr: "Baccalauréat en informatique",
      degree_cn: "计算机科学学士",
      start: "2017",
      end: "2023",
    },
    {
      school: "University of Ottawa",
      school_fr: "Université d'Ottawa",
      school_cn: "渥太华大学",
      degree: "Master of Engineering System Science",
      degree_fr: "Génie des systèmes et de l'ingénierie",
      degree_cn: "系统科学与工程",
      start: "Present",
      end: null,
    },
  ],
  work: [
    {
      company: "Nokia Canada",
      link: "https://www.nokia.com",
      badges: ["Co-op"],
      title: "Software Tester Co-op",
      title_fr: "Stagiaire en test de logiciels",
      title_cn: "软件测试实习生",
      start: "Aug 2020",
      end: "Aug 2021",
      description:
        "Enhanced JavaScript/XML code for better code coverage and robustness. Produced design documents using Confluence Pages for system architecture and data flows.",
      description_fr:
        "Amélioration du code JavaScript/XML pour une meilleure couverture de code et robustesse. Production de documents de conception utilisant Confluence Pages pour l'architecture système et les flux de données.",
      description_cn:
        "增强JavaScript/XML代码，以提高代码覆盖率和稳健性。使用Confluence Pages编写设计文档，描述系统架构和数据流。",
    },
    {
      company: "Ford Motor Canada",
      link: "https://www.ford.ca",
      badges: ["Co-op"],
      title: "Software Developer Co-op",
      title_fr: "Stagiaire en développement logiciel",
      title_cn: "软件开发实习生",
      start: "Apr 2020",
      end: "Aug 2020",
      description:
        "Participated in Agile development, developed unit test scripts using C++11 Google Test Framework, and utilized Jenkins for CI/CD.",
      description_fr:
        "Participation au développement Agile, développement de scripts de test unitaire utilisant le framework Google Test de C++11, et utilisation de Jenkins pour le CI/CD.",
      description_cn:
        "参与敏捷开发，使用C++11 Google Test Framework开发单元测试脚本，并利用Jenkins进行CI/CD。",
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
    "Tauri v2",
    "Rust",
    "SQLite",
    "Typst",
    "Mermaid",
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
      index: 0,
      title: "RentWise",
      title_fr: "RentWise",
      title_cn: "租房智选",
      status: 1,
      techStack: ["TypeScript", "React Native", "Firebase", "Android Studio", "Xcode", "NoSql"],
      description:
        "Implemented Google SignUp and SignIn for user authentication, securely storing user info in Firebase. Used Firebase for instant updates in terms of house listings, enhancing user engagement.",
      description_fr:
        "Mise en œuvre de l'inscription et de la connexion Google pour l'authentification des utilisateurs, stockant de manière sécurisée les informations des utilisateurs dans Firebase. Utilisation de Firebase pour des mises à jour instantanées des annonces de maisons, améliorant l'engagement des utilisateurs.",
      description_cn:
        "实现了Google登录和注册用户认证，将用户信息安全地存储在Firebase中。使用Firebase即时更新房源信息，增强用户参与度。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/random-char1198/Coin-Web-Crawler",
      },
    },
    {
      index: 1,
      title: "Library System",
      title_fr: "Système de Bibliothèque",
      title_cn: "图书馆系统",
      status: 0,
      techStack: ["C++11", "Object-Oriented Programming", "Shared_ptr"],
      description:
        "Developed a library management system using C++11 and object-oriented programming principles. Utilized smart pointers (shared_ptr) for efficient memory management. The system includes functionalities for managing books, shelves, and libraries.",
      description_fr:
        "Développement d'un système de gestion de bibliothèque en utilisant C++11 et les principes de programmation orientée objet. Utilisation de pointeurs intelligents (shared_ptr) pour une gestion efficace de la mémoire. Le système inclut des fonctionnalités pour la gestion des livres, des étagères et des bibliothèques.",
      description_cn:
        "使用C++11和面向对象编程原则开发了图书馆管理系统。利用智能指针（shared_ptr）进行高效的内存管理。该系统包括管理图书、书架和图书馆的功能。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/mammut001/library_system",
      },
    },
    {
      index: 2,
      title: "System Optimization - Smart Path",
      title_fr: "Optimisation des Systèmes - Smart Path",
      title_cn: "系统优化 - 算法可视化平台",
      status: 1,
      techStack: ["TypeScript", "React", "Vite", "TailwindCSS", "XYFlow", "Zustand"],
      description:
        "A sophisticated algorithm visualization platform supporting graph theory (Dijkstra, A*, BFS/DFS), optimization (Simplex, Branch & Bound), and machine learning (Perceptrons). Features real-time, step-by-step interactive execution and state visualization.",
      description_fr:
        "Une plateforme sophistiquée de visualisation d'algorithmes prenant en charge la théorie des graphes (Dijkstra, A*, BFS/DFS), l'optimisation (Simplex, Branch & Bound) et l'apprentissage automatique (Perceptrons). Propose une exécution interactive étape par étape et une visualisation d'état en temps réel.",
      description_cn:
        "一个复杂的算法可视化平台，支持图论（Dijkstra、A*、BFS/DFS）、优化方法（单纯形法、分支定界法）和机器学习（感知机）。具有实时、分步交互式执行和状态可视化功能。",
      link: {
        label: "system-optimizaion.vercel.app",
        label_fr: "system-optimizaion.vercel.app",
        label_cn: "system-optimizaion.vercel.app",
        href: "https://system-optimizaion.vercel.app/",
      },
    },
    {
      index: 3,
      title: "Focus Mint",
      title_fr: "Focus Mint",
      title_cn: "Focus Mint 专注计时器",
      status: 1,
      techStack: ["Swift", "SwiftUI", "WatchKit", "StoreKit", "WidgetKit"],
      description:
        "A premium utility app for iOS, watchOS, and macOS designed to enhance productivity through Pomodoro-style timers and session tracking. Supports multi-language localization (EN/CN/FR), In-App Purchases, and cross-device synchronization.",
      description_fr:
        "Une application utilitaire premium pour iOS, watchOS et macOS conçue pour améliorer la productivité via des minuteurs de style Pomodoro et le suivi de sessions. Prend en charge la localisation multilingue (EN/CN/FR), les achats intégrés et la synchronisation entre appareils.",
      description_cn:
        "一款适用于 iOS、watchOS 和 macOS 的高级实用应用程序，旨在通过番茄钟风格的计时器和会话跟踪提高生产力。支持多语言本地化（中/英/法）、应用内购买和跨设备同步。",
      link: {
        label: "App Store",
        label_fr: "App Store",
        label_cn: "App Store",
        href: "https://apps.apple.com/us/app/focus-mint-focus-timer-study/id6759029810",
      },
    },
    {
      index: 4,
      title: "Meet See U",
      title_fr: "Meet See U",
      title_cn: "Meet See U 社交应用",
      status: 1,
      techStack: ["Kotlin", "Android SDK", "Firebase", "LLM", "Deepgram API", "MiniMax API", "Next.js"],
      description:
        "A full-stack AI social application featuring virtual companions with persistent vector memory and custom voice cloning. Engineered complex AI pipelines integrating MiniMax-M2.1 LLM, Deepgram ASR, and localized vector storage for long-term context retention. Also developed a premium Vercel-style landing page with Next.js.",
      description_fr:
        "Une application sociale IA complète avec des compagnons virtuels dotés d'une mémoire vectorielle persistante et d'un clonage de voix personnalisé. Conception de pipelines IA complexes intégrant MiniMax-M2.1 LLM, Deepgram ASR et un stockage vectoriel local. Comprend également une page de destination premium de style Vercel avec Next.js.",
      description_cn:
        "一个全栈 AI 社交应用，具有持久向量记忆和自定义语音克隆功能的虚拟伙伴。开发了集成了 MiniMax-M2.1 大模型、Deepgram 语音识别和本地向量存储的复杂 AI 流水线。同时使用 Next.js 开发了高级 Vercel 风格的营销落地页。",
      link: {
        label: "Market Site",
        label_fr: "Site Marketing",
        label_cn: "营销官网",
        href: "https://chatpart-website.vercel.app/",
      },
    },
    {
      index: 5,
      title: "pipi-shrimp-agent",
      title_fr: "Pipi Shrimp Agent",
      title_cn: "皮皮虾助手",
      status: 1,
      techStack: ["Tauri v2", "Rust", "React", "TypeScript", "Zustand", "SQLite", "Typst", "Mermaid", "PageAgent"],
      description:
        "A high-performance desktop AI agent built with Tauri v2. Features real-time reasoning visualization (thinking process), a project-based context management system, and advanced tool calling for local scripts, web automation (PageAgent), and Telegram integration (Grammy). Includes specialized rendering for Typst documents and Mermaid diagrams.",
      description_fr:
        "Un agent IA de bureau haute performance construit avec Tauri v2. Comprend une visualisation du raisonnement en temps réel (processus de réflexion), un système de gestion de contexte basé sur des projets et un appel d'outils avancé pour les scripts locaux, l'automatisation Web (PageAgent) et l'intégration Telegram (Grammy). Comprend un rendu spécialisé pour les documents Typst et les diagrammes Mermaid.",
      description_cn:
        "基于 Tauri v2 构建的高性能桌面 AI 助手。支持实时思维链（Thinking Process）可视化、项目级上下文管理系统，以及针对本地脚本、网页自动化（PageAgent）和 Telegram（Grammy）的高级工具调用。集成了 Typst 高质量文档渲染和 Mermaid 图表支持。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/mammut001/pipi-shrimp-agent",
      },
    }
  ],
  research: [
    {
      title: "Learning to See in the Dark 2018 Enhancement with DDBM",
      title_fr: "Learning to See in the Dark 2018 Enhancement with DDBM",
      title_cn: "Learning to See in the Dark 2018 Enhancement with DDBM",
      start: "2024",
      end: "Present",
      description: "Research on enhancing low-light image processing using DDBM (Denoising Diffusion Probabilistic Models) based on the foundational 'Learning to See in the Dark' paper.",
      description_fr: "Recherche sur l'amélioration du traitement d'images en faible luminosité utilisant DDBM basé sur l'article fondateur 'Learning to See in the Dark'.",
      description_cn: "基于'Learning to See in the Dark'论文，利用DDBM（去噪扩散概率模型）增强低光图像处理的研究。",
      tags: ["Python", "PyTorch", "Computer Vision", "Deep Learning", "DDBM"],
      link: {
        label: "github.com",
        href: "https://github.com/mammut001",
      },
    }
  ],
} as const;