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
      index:0,
      title: "rent-wise-app",
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
      index:1,
      title: "Coin-Web-Crawler",
      title_fr: "Coin Web Crawler",
      title_cn: "币种网页爬虫",
      status: 1,
      techStack: ["JavaScript", "jQuery", "NodeJS", "Express", "Web Crawling", "PageRank", "Recommendation Algorithm"],
      description:
        "Developed a Node.js-based web crawler for CoinMarketCap.com, using crawling technology for cryptocurrency trading data extraction; scraped 500 pages per day and stored data in MongoDB for future inquiry.",
      description_fr:
        "Développement d'un web crawler basé sur Node.js pour CoinMarketCap.com, utilisant la technologie de crawling pour l'extraction des données de trading de crypto-monnaies ; récupération de 500 pages par jour et stockage des données dans MongoDB pour des consultations futures.",
      description_cn:
        "开发了一个基于Node.js的CoinMarketCap.com网站爬虫，使用爬虫技术提取加密货币交易数据；每天抓取500页，并将数据存储在MongoDB中以备将来查询。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/random-char1198/Coin-Web-Crawler",
      },
    },
    {
      index:2,
      title: "workout-generator",
      title_fr: "Générateur de plan d'entraînement",
      title_cn: "锻炼计划生成器",
      status: 1,
      techStack: ["TypeScript", "Vercel", "Next.js", "Flask", "Redis", "Zustand"],
      description:
        "Utilized Vercel’s online hosting service with Python and Flask for backend services. Adopted Docker running-environment setup for project deployment, utilizing GitHub for project collaboration.",
      description_fr:
        "Utilisation du service d'hébergement en ligne de Vercel avec Python et Flask pour les services backend. Adoption de la configuration de l'environnement d'exécution Docker pour le déploiement du projet, en utilisant GitHub pour la collaboration sur le projet.",
      description_cn:
        "利用Vercel的在线托管服务和Python与Flask进行后端服务。采用Docker运行环境设置进行项目部署，利用GitHub进行项目协作。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/ivespeggy/workout-generator",
      },
    },
    {
      index:3,
      title: "library_system",
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
      index:4,
      title: "Cash-Drawer",
      title_fr: "Cash Drawer",
      title_cn: "现金抽屉",
      status: 1,
      techStack: ["Flutter", "Dart"],
      description:
        "Developed a mobile application using Flutter and Dart for managing personal finances. The application allows users to track their expenses, create budgets, and visualize their financial data.",
      description_fr:
        "Développement d'une application mobile utilisant Flutter et Dart pour la gestion des finances personnelles. L'application permet aux utilisateurs de suivre leurs dépenses, de créer des budgets et de visualiser leurs données financières.",
      description_cn:
        "使用Flutter和Dart开发了一个管理个人财务的移动应用程序。该应用程序允许用户跟踪他们的支出，创建预算，并可视化他们的财务数据。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/mammut001/Cash-Drawer",
      },
    },
    {
      index: 5, // Adjust the index accordingly if it's the next project
      title: "hotel",
      title_fr: "Système de Gestion d'Hôtel",
      title_cn: "酒店管理系统",
      status: 1,
      techStack: ["Next.js", "Fastify", "SQLite3", "Redis", "TypeScript"],
      description:
        "Developed a full-stack hotel management system with a Next.js front-end and a Fastify back-end. Utilized SQLite3 for permanent data storage, managing hotel reservations, guest information, and room availability. Implemented Redis for temporary data storage, ensuring fast access to session data and caching frequent queries to enhance performance.",
      description_fr:
        "Développement d'un système de gestion d'hôtel full-stack avec un front-end Next.js et un back-end Fastify. Utilisation de SQLite3 pour le stockage permanent des données, gestion des réservations d'hôtel, des informations sur les clients et de la disponibilité des chambres. Mise en œuvre de Redis pour le stockage temporaire des données, assurant un accès rapide aux données de session et la mise en cache des requêtes fréquentes pour améliorer les performances.",
      description_cn:
        "开发了一个全栈酒店管理系统，前端使用Next.js，后端使用Fastify。利用SQLite3进行永久数据存储，管理酒店预订、客户信息和房间可用性。实现了Redis用于临时数据存储，确保快速访问会话数据，并缓存频繁查询以提高性能。",
      link: {
        label: "github.com",
        label_fr: "github.com",
        label_cn: "github.com",
        href: "https://github.com/mammut001/hotel",
      },
    }
  ],
} as const;