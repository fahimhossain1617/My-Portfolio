export type Language = "en" | "bn";
export type Theme = "dark" | "light";

export type ProjectCategory =
  | "All"
  | "Web Apps"
  | "E-commerce"
  | "Business Websites";

export interface LocalizedText {
  en: string;
  bn: string;
}

export interface ScreenshotItem {
  id: string;
  caption: LocalizedText;
  src?: string | null; // null = explicitly labelled placeholder
  isPlaceholder: boolean;
}

export interface ProjectCaseStudy {
  overview: LocalizedText;
  purposeAndAudience: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  keyFeatures: { en: string[]; bn: string[] };
  verifiedTechStack: string[];
  challenges: LocalizedText;
  challengeSolutions: LocalizedText;
  lessonsLearned: LocalizedText;
  screenshots: ScreenshotItem[];
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: LocalizedText;
  category: Exclude<ProjectCategory, "All">;
  summary: LocalizedText;
  verifiedTechTags: string[];
  thumbnailSrc: string | null; // null renders neutral labelled placeholder block
  isDetailsPending: boolean;
  statusLabel: LocalizedText;
  liveUrl: string | null; // null = Placeholder — replace before launch
  githubUrl: string | null; // null = Placeholder — replace before launch
  caseStudy: ProjectCaseStudy;
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  skills: {
    name: string;
    contextNote?: LocalizedText;
  }[];
}

export interface JourneyStage {
  id: string;
  stageLabel: LocalizedText;
  title: LocalizedText;
  organizationOrContext: LocalizedText;
  description: LocalizedText;
  highlights: { en: string[]; bn: string[] };
  isCurrent?: boolean;
}

/**
 * ============================================================================
 * CENTRALIZED PERSONAL & CONTACT CONFIGURATION
 * Update GitHub URL or project links here before production launch.
 * ============================================================================
 */
export const PERSONAL_INFO = {
  fullName: {
    en: "Md. Fahim Hossain",
    bn: "মোঃ ফাহিম হোসেন",
  },
  shortName: {
    en: "Fahim",
    bn: "ফাহিম",
  },
  heroGreeting: {
    en: "Hey, I'm Fahim",
    bn: "হেই, আমি ফাহিম",
  },
  headline: {
    en: "Full-Stack Developer | AI Automation Enthusiast",
    bn: "ফুল-স্ট্যাক ডেভেলপার | এআই অটোমেশন এনথুসিয়াস্ট",
  },
  typingPhrases: {
    en: [
      "Full-Stack Developer",
      "AI Automation Enthusiast",
      "CSE Undergraduate at UITS",
      "Building Practical Web Applications",
    ],
    bn: [
      "ফুল-স্ট্যাক ডেভেলপার",
      "এআই অটোমেশন এনথুসিয়াস্ট",
      "ইউআইটিএস-এ সিএসই অধ্যয়নরত",
      "বাস্তবমুখী ওয়েব অ্যাপ্লিকেশন নির্মাতা",
    ],
  },
  education: {
    degree: {
      en: "B.Sc. in Computer Science and Engineering (CSE)",
      bn: "বি.এসসি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE)",
    },
    institution: {
      en: "UITS — University of Information Technology and Science",
      bn: "ইউআইটিএস — ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্স (UITS)",
    },
    semester: {
      en: "Second Semester",
      bn: "দ্বিতীয় সেমিস্টার",
    },
  },
  availability: {
    isAvailable: true,
    label: {
      en: "Available for projects",
      bn: "নতুন প্রজেক্টের জন্য প্রস্তুত",
    },
  },
  contact: {
    email: "fahimhossain1617@gmail.com",
    whatsappLocal: "01947281437",
    whatsappInternational: "+8801947281437",
    whatsappDigits: "8801947281437",
    whatsappUrl: "https://wa.me/8801947281437",
    whatsappName: "Fahim Hossain",
    linkedinUrl: "https://www.linkedin.com/in/md-fahim-hossain-cse",
    linkedinUsername: "Fahim Hossain",
    githubUrl: "https://github.com/fahimhossain1617",
    githubUsername: "fahimhossain1617",
    githubPlaceholderNote: {
      en: "GitHub profile: @fahimhossain1617",
      bn: "গিটহাব প্রোফাইল: @fahimhossain1617",
    },
  },
  portraitSrc: "/images/fahim-portrait.png",
  portraitAlt: {
    en: "Portrait of Md. Fahim Hossain, Full-Stack Developer and CSE Student at UITS",
    bn: "মোঃ ফাহিম হোসেনের পোর্ট্রেট ছবি, ফুল-স্ট্যাক ডেভেলপার এবং ইউআইটিএস-এর সিএসই শিক্ষার্থী",
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "programming",
    title: {
      en: "Programming Languages",
      bn: "প্রোগ্রামিং ল্যাঙ্গুয়েজ",
    },
    description: {
      en: "Core languages practiced through university coursework and application development.",
      bn: "বিশ্ববিদ্যালয়ের একাডেমিক কোর্স এবং অ্যাপ্লিকেশন ডেভেলপমেন্টের মাধ্যমে চর্চাকৃত মূল ভাষা।",
    },
    skills: [
      {
        name: "JavaScript",
        contextNote: {
          en: "Web interactivity & full-stack logic",
          bn: "ওয়েব ইন্টারঅ্যাক্টিভিটি ও ফুল-স্ট্যাক লজিক",
        },
      },
      {
        name: "Java",
        contextNote: {
          en: "Object-oriented programming foundations",
          bn: "অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং ভিত্তি",
        },
      },
      {
        name: "C",
        contextNote: {
          en: "Structured programming & CSE fundamentals",
          bn: "স্ট্রাকচার্ড প্রোগ্রামিং ও সিএসই ভিত্তি",
        },
      },
    ],
  },
  {
    id: "frontend",
    title: {
      en: "Frontend Development",
      bn: "ফ্রন্টএন্ড ডেভেলপমেন্ট",
    },
    description: {
      en: "Building responsive, accessible, and structured user interfaces for modern web browsers.",
      bn: "আধুনিক ওয়েব ব্রাউজারের জন্য রেসপনসিভ, অ্যাক্সেসিবল এবং সুগঠিত ইউজার ইন্টারফেস তৈরি।",
    },
    skills: [
      {
        name: "HTML",
        contextNote: {
          en: "Semantic document structure",
          bn: "সিম্যান্টিক ডকুমেন্ট স্ট্রাকচার",
        },
      },
      {
        name: "CSS",
        contextNote: {
          en: "Responsive layouts & custom styling",
          bn: "রেসপনসিভ লেআউট ও কাস্টম স্টাইলিং",
        },
      },
      {
        name: "JavaScript",
        contextNote: {
          en: "DOM manipulation & client-side state",
          bn: "ডম ম্যানিপুলেশন ও ক্লায়েন্ট-সাইড স্টেট",
        },
      },
      {
        name: "React",
        contextNote: {
          en: "Component-driven UI architecture",
          bn: "কম্পোনেন্ট-ভিত্তিক ইউআই আর্কিটেকচার",
        },
      },
      {
        name: "Next.js",
        contextNote: {
          en: "App Router, SSR & routing workflows",
          bn: "অ্যাপ রাউটার, এসএসআর ও রাউটিং ওয়ার্কফ্লো",
        },
      },
      {
        name: "TypeScript",
        contextNote: {
          en: "Type-safe frontend & API contracts",
          bn: "টাইপ-সেফ ফ্রন্টএন্ড ও এপিআই কনট্রাক্ট",
        },
      },
    ],
  },
  {
    id: "fullstack-backend",
    title: {
      en: "Full-Stack & Backend",
      bn: "ফুল-স্ট্যাক ও ব্যাকএন্ড",
    },
    description: {
      en: "Connecting interfaces with databases, authentication, and server-side APIs.",
      bn: "ডেটাবেস, অথেনটিকেশন এবং সার্ভার-সাইড এপিআই-এর সাথে ইউজার ইন্টারফেসের সংযোগ স্থাপন।",
    },
    skills: [
      {
        name: "MERN Stack",
        contextNote: {
          en: "MongoDB, Express, React, Node.js workflows",
          bn: "MongoDB, Express, React, Node.js ওয়ার্কফ্লো",
        },
      },
      {
        name: "Supabase",
        contextNote: {
          en: "PostgreSQL database & authentication integration",
          bn: "PostgreSQL ডেটাবেস ও অথেনটিকেশন ইন্টিগ্রেশন",
        },
      },
      {
        name: "Backend & API Development",
        contextNote: {
          en: "REST endpoints, validation & server logic",
          bn: "রেস্ট এন্ডপয়েন্ট, ভ্যালিডেশন ও সার্ভার লজিক",
        },
      },
    ],
  },
  {
    id: "additional",
    title: {
      en: "Additional Focus Areas",
      bn: "অতিরিক্ত দক্ষতা ও আগ্রহের ক্ষেত্র",
    },
    description: {
      en: "Complementary disciplines applied to enhance workflow efficiency, usability, and discoverability.",
      bn: "ওয়ার্কফ্লো দক্ষতা, ব্যবহারযোগ্যতা এবং সার্চ ভিজিবিলিটি বাড়াতে ব্যবহৃত পরিপূরক দক্ষতা।",
    },
    skills: [
      {
        name: "AI Automation",
        contextNote: {
          en: "AI-assisted workflows & API integrations",
          bn: "এআই-সহায়ক ওয়ার্কফ্লো ও এপিআই ইন্টিগ্রেশন",
        },
      },
      {
        name: "UI/UX Design",
        contextNote: {
          en: "Clean hierarchy, wireframing & usability",
          bn: "পরিচ্ছন্ন ভিজ্যুয়াল হায়ারার্কি ও ব্যবহারযোগ্যতা",
        },
      },
      {
        name: "SEO",
        contextNote: {
          en: "Semantic markup, metadata & technical SEO",
          bn: "সিম্যান্টিক মার্কআপ, মেটাডেটা ও টেকনিক্যাল এসইও",
        },
      },
    ],
  },
];

export const PROJECT_CATEGORIES: {
  id: ProjectCategory;
  label: LocalizedText;
}[] = [
  { id: "All", label: { en: "All Projects", bn: "সব প্রজেক্ট" } },
  { id: "Web Apps", label: { en: "Web Apps", bn: "ওয়েব অ্যাপস" } },
  { id: "E-commerce", label: { en: "E-commerce", bn: "ই-কমার্স" } },
  {
    id: "Business Websites",
    label: { en: "Business Websites", bn: "বিজনেস ওয়েবসাইট" },
  },
];

export const PROJECTS: ProjectRecord[] = [
  {
    id: "focentia",
    slug: "focentia",
    title: {
      en: "Focentia",
      bn: "Focentia (ফোসেনশিয়া)",
    },
    category: "Web Apps",
    summary: {
      en: "A full-featured productivity application designed to unify daily task planning, focus sessions, structured notes, and habit tracking in a distraction-free workspace.",
      bn: "দৈনন্দিন টাস্ক প্ল্যানিং, ফোকাস সেশন, নোটস এবং হ্যাবিট ট্র্যাকিং এক জায়গায় গুছিয়ে রাখার জন্য নির্মিত একটি পূর্ণাঙ্গ প্রোডাক্টিভিটি ওয়েব অ্যাপ্লিকেশন।",
    },
    verifiedTechTags: ["Next.js", "React", "TypeScript", "Supabase"],
    thumbnailSrc: "/images/focentia-thumb.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Live Application • Production Ready",
      bn: "লাইভ অ্যাপ্লিকেশন • সম্পূর্ণ প্রস্তুত",
    },
    liveUrl: "https://focentia.vercel.app",
    githubUrl: "https://github.com/fahimhossain1617/focentia",
    caseStudy: {
      overview: {
        en: "Focentia is a personal productivity web application built to help students and self-directed learners organize daily priorities, track focus sessions, maintain structured notes, and review personal progress from a single cohesive interface.",
        bn: "Focentia হলো একটি প্রোডাক্টিভিটি ওয়েব অ্যাপ্লিকেশন যা শিক্ষার্থী ও স্ব-প্রণোদিত ব্যবহারকারীদের দৈনন্দিন কাজ, ফোকাস টাইমার, নোটস এবং ব্যক্তিগত অগ্রগতি একটি সমন্বিত ইন্টারফেসে পরিচালনা করতে সহায়তা করে।",
      },
      purposeAndAudience: {
        en: "Designed for students, developers, and independent professionals who want a calm, structured digital workspace without switching between separate timer, note-taking, and task apps.",
        bn: "শিক্ষার্থী, ডেভেলপার এবং পেশাজীবীদের জন্য তৈরি—যারা আলাদা টাইমার, নোট ও টাস্ক অ্যাপের পরিবর্তে একটি শান্ত ও সুশৃঙ্খল ডিজিটাল ওয়ার্কস্পেস চান।",
      },
      problem: {
        en: "Managing daily tasks, study logs, focus timers, and personal notes across multiple disconnected tools creates context switching and makes consistent habit tracking harder.",
        bn: "একাধিক বিচ্ছিন্ন অ্যাপে দৈনন্দিন টাস্ক, পড়াশোনার লগ, ফোকাস টাইমার এবং নোটস পরিচালনা করতে গেলে মনোযোগ নষ্ট হয় এবং নিয়মিত ধারাবাহিকতা বজায় রাখা কঠিন হয়ে পড়ে।",
      },
      solution: {
        en: "Implemented a unified web workspace using Next.js, TypeScript, and Supabase with modular views for task management, timed focus sessions, structured notes, and AI-assisted productivity workflows.",
        bn: "Next.js, TypeScript এবং Supabase ব্যবহার করে একটি সমন্বিত ওয়েব ওয়ার্কস্পেস তৈরি করা হয়েছে, যেখানে টাস্ক ম্যানেজমেন্ট, ফোকাস সেশন, নোটস এবং এআই-সহায়ক প্রোডাক্টিভিটি ফিচারগুলো একসাথে কাজ করে।",
      },
      keyFeatures: {
        en: [
          "Daily task planning and structured priority management",
          "Dedicated focus timer sessions and study/learning logs",
          "Rich note organization and personal diary topics",
          "User authentication and cloud data persistence with Supabase",
          "AI-assisted workspace interaction and responsive theme support",
        ],
        bn: [
          "দৈনন্দিন টাস্ক প্ল্যানিং এবং অগ্রাধিকার ব্যবস্থাপনা",
          "ডেডিকেটেড ফোকাস টাইমার সেশন এবং লার্নিং লগ",
          "সুগঠিত নোটস এবং ব্যক্তিগত ডায়েরি টপিক ব্যবস্থাপনা",
          "Supabase-এর মাধ্যমে ইউজার অথেনটিকেশন এবং ক্লাউড ডেটা সিঙ্ক",
          "এআই-সহায়ক ওয়ার্কস্পেস এবং রেসপনসিভ থিম সাপোর্ট",
        ],
      },
      verifiedTechStack: [
        "Next.js",
        "React",
        "TypeScript",
        "CSS",
        "Supabase",
        "Backend & API Development",
      ],
      challenges: {
        en: "Architecting seamless state synchronization between unauthenticated guest timers and authenticated Supabase user records, alongside managing accurate background tab timer throttling in modern web browsers.",
        bn: "অথেনটিকেশন ছাড়া গেস্ট মোডের টাইমার ডেটা এবং লগইন করার পর Supabase ক্লাউড ডেটাবেসের মধ্যে মসৃণ ডেটা সিঙ্ক করা এবং ব্রাউজারে ব্যাকগ্রাউন্ড ট্যাবে টাইমার থ্রটলিং সঠিকভাবে পরিচালনা করা।",
      },
      challengeSolutions: {
        en: "Engineered custom Web Workers for drift-free background focus timing, paired with optimistic UI updates and resilient Supabase Row Level Security (RLS) policies for user data isolation.",
        bn: "ব্রাউজার ব্যাকগ্রাউন্ডেও যেন টাইমার নির্ভুলভাবে চলে সেজন্য Web Worker ব্যবহার করা হয়েছে এবং ব্যবহারকারীর ডেটা সুরক্ষায় Supabase Row Level Security (RLS) ও অপটিমিস্টিক স্টেট ম্যানেজমেন্ট বাস্তবায়ন করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Gained deep practical expertise in full-stack Next.js App Router patterns, PostgreSQL schema design via Supabase, and building distraction-free accessible user interfaces.",
        bn: "Next.js অ্যাপ রাউটারের গভীর ব্যবহার, Supabase-এ রিলেশনাল স্কিমা ও ডেটাবেস ডিজাইন এবং বিভ্রান্তিমুক্ত অ্যাক্সেসিবল ইউজার ইন্টারফেস তৈরির মূল্যবান বাস্তব অভিজ্ঞতা অর্জন করেছি।",
      },
      screenshots: [
        {
          id: "focentia-screen-1",
          caption: {
            en: "Focentia Task Planner & Focus Analytics Dashboard",
            bn: "Focentia টাস্ক প্ল্যানার ও ফোকাস অ্যানালিটিক্স ড্যাশবোর্ড",
          },
          src: "/images/focentia-screen-1.jpg",
          isPlaceholder: false,
        },
        {
          id: "focentia-screen-2",
          caption: {
            en: "Focentia Markdown Notes & Habit Tracker Workspace",
            bn: "Focentia মার্কডাউন নোটস ও হ্যাবিট ট্র্যাকার ওয়ার্কস্পেস",
          },
          src: "/images/focentia-screen-2.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "ecommerce-website",
    slug: "ecommerce-website",
    title: {
      en: "Aurum Luxury E-Commerce",
      bn: "Aurum লাক্সারি ই-কমার্স প্ল্যাটফর্ম",
    },
    category: "E-commerce",
    summary: {
      en: "A high-performance modern storefront engineered for consumer lifestyle and audio electronics, featuring dynamic catalog filtering, persistent shopping cart drawer, and frictionless checkout flow.",
      bn: "লাইফস্টাইল ও ইলেকট্রনিক্স পণ্যের জন্য নির্মিত একটি আধুনিক ও দ্রুতগতির ই-কমার্স প্ল্যাটফর্ম, যাতে রয়েছে ইনস্ট্যান্ট ক্যাটালগ ফিল্টারিং, স্লাইড-আউট শপিং কার্ট এবং সহজ চেকআউট সুবিধা।",
    },
    verifiedTechTags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    thumbnailSrc: "/images/ecom-thumb.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Full-Stack Project • Completed",
      bn: "ফুল-স্ট্যাক প্রজেক্ট • সম্পন্ন",
    },
    liveUrl: "https://aurum-store-demo.vercel.app",
    githubUrl: "https://github.com/fahimhossain1617/ecommerce-web-platform",
    caseStudy: {
      overview: {
        en: "Aurum is a modern responsive e-commerce web application engineered with React, Next.js, and TypeScript, featuring a performant product catalog, dynamic price and category filters, cart persistence, and a frictionless checkout inquiry workflow.",
        bn: "Aurum হলো একটি আধুনিক রেসপনসিভ ই-কমার্স ওয়েব অ্যাপ্লিকেশন যা React, Next.js এবং TypeScript দিয়ে তৈরি। এতে রয়েছে আকর্ষণীয় প্রোডাক্ট ক্যাটালগ, ডায়নামিক প্রাইস ও ক্যাটাগরি ফিল্টারিং, কার্ট পারসিসটেন্স এবং দ্রুত চেকআউট সুবিধা।",
      },
      purposeAndAudience: {
        en: "Created for direct-to-consumer lifestyle and audio tech retail, offering customers an intuitive desktop and mobile buying journey with minimal friction.",
        bn: "লাইফস্টাইল এবং টেক এক্সেসরিজ গ্রাহকদের জন্য নির্মিত, যা ডেস্কটপ ও মোবাইলে দ্রুত ও স্বচ্ছভাবে পণ্য বাছাই ও অর্ডার করার নির্ভরযোগ্য অভিজ্ঞতা প্রদান করে।",
      },
      problem: {
        en: "Many independent online shops suffer from bloated third-party scripts, sluggish product filtering, and cumbersome checkout workflows that lead to high cart abandonment rates.",
        bn: "অধিকাংশ ছোট ও মাঝারি অনলাইন স্টোরে অতিরিক্ত ভারী স্ক্রিপ্ট ও জটিল চেকআউট সিস্টেমের কারণে ব্রাউজিং ধীরগতির হয়ে যায় এবং ক্রেতারা কার্ট ফেলে চলে যায়।",
      },
      solution: {
        en: "Developed a lightweight, highly optimized web storefront with instant client-side filtering, animated cart drawer with local storage synchronization, and clear order summary breakdowns.",
        bn: "তাৎক্ষণিক ক্লায়েন্ট-সাইড ফিল্টারিং, লোকাল স্টোরেজ সিঙ্কসহ ড্রয়ার কার্ট এবং স্বচ্ছ অর্ডার সামারিসহ একটি দ্রুতগতির আধুনিক ফ্রন্টএন্ড স্টোরফ্রন্ট তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "Interactive catalog filtering by category, price slider, and color options",
          "Persistent slide-out shopping cart drawer with real-time subtotal calculations",
          "High-resolution product showcase with interactive thumbnails and reviews",
          "Mobile-first responsive design tested across all major viewport sizes",
          "Optimized Core Web Vitals with zero layout shift and sub-second page transitions",
        ],
        bn: [
          "ক্যাটাগরি, প্রাইস রেঞ্জ ও কালার অনুযায়ী তাৎক্ষণিক প্রোডাক্ট ফিল্টারিং",
          "রিয়েল-টাইম সাবটোটাল হিসাবসহ স্লাইড-আউট শপিং কার্ট ড্রয়ার",
          "ইন্টারঅ্যাক্টিভ ইমেজ গ্যালারি ও কাস্টমার রিভিউসহ প্রোডাক্ট ডিটেইল ভিউ",
          "মোবাইল ও ডেস্কটপ সব ডিভাইসের জন্য সম্পূর্ণ রেসপনসিভ ডিজাইন",
          "দ্রুত পেজ লোড এবং কোনো লেআউট শিফট ছাড়া সেরা পারফরম্যান্স",
        ],
      },
      verifiedTechStack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Context API",
        "LocalStorage API",
      ],
      challenges: {
        en: "Maintaining fluid cart state synchronization across multiple browser tabs while preventing accidental duplicate quantity mutations during rapid user clicks.",
        bn: "একাধিক ব্রাউজার ট্যাবে কার্ট স্টেট নির্ভুলভাবে সিঙ্ক রাখা এবং দ্রুত ক্লিকের সময় পণ্যের সংখ্যা ডুপ্লিকেট হওয়া প্রতিরোধ করা।",
      },
      challengeSolutions: {
        en: "Implemented a custom React reducer paired with debounce dispatching and browser storage event listeners to keep state completely consistent.",
        bn: "কাস্টম React রিডিউসার, ডিবাইউন্সড ডিসপ্যাচ এবং ব্রাউজার স্টোরেজ লিসেনার ব্যবহারের মাধ্যমে সব ট্যাবে কার্ট সবসময় সুসংগত রাখা হয়েছে।",
      },
      lessonsLearned: {
        en: "Mastered practical techniques for e-commerce UX optimization, state management with React hooks, and micro-interactions that elevate customer trust.",
        bn: "ই-কমার্স ইউজার এক্সপেরিয়েন্সের সূক্ষ্ম বিষয়সমূহ, স্টেট ম্যানেজমেন্ট এবং ব্যবহারকারীর বিশ্বাস অর্জনে মাইক্রো-ইন্টারঅ্যাকশনের গুরুত্ব গভীরভাবে শিখেছি।",
      },
      screenshots: [
        {
          id: "ecom-screen-1",
          caption: {
            en: "Storefront Product Grid & Floating Cart Drawer",
            bn: "স্টোরফ্রন্ট প্রোডাক্ট গ্রিড ও ফ্লোটিং কার্ট ড্রয়ার",
          },
          src: "/images/ecom-thumb.jpg",
          isPlaceholder: false,
        },
        {
          id: "ecom-screen-2",
          caption: {
            en: "Interactive Product Details & Express Checkout View",
            bn: "ইন্টারঅ্যাক্টিভ প্রোডাক্ট বিস্তারিত ও এক্সপ্রেস চেকআউট ভিউ",
          },
          src: "/images/ecom-screen-1.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "isp-website",
    slug: "internet-service-provider-website",
    title: {
      en: "Apex Fiber ISP Portal",
      bn: "Apex Fiber ব্রডব্যান্ড আইএসপি পোর্টাল",
    },
    category: "Business Websites",
    summary: {
      en: "A commercial broadband subscriber platform presenting high-speed fiber internet plans, geographic coverage availability, and instant connection request pipelines.",
      bn: "একটি ইন্টারনেট সার্ভিস প্রোভাইডার (ISP) প্রতিষ্ঠানের আধুনিক ওয়েবসাইট ও সাবস্ক্রাইবার পোর্টাল—যার মাধ্যমে ব্রডব্যান্ড প্যাকেজ নির্বাচন, কভারেজ যাচাই এবং সংযোগের আবেদন সহজে পরিচালনা করা যায়।",
    },
    verifiedTechTags: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
    thumbnailSrc: "/images/isp-thumb.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Client Web Platform • Deployed",
      bn: "ক্লায়েন্ট প্ল্যাটফর্ম • সফলভাবে সম্পন্ন",
    },
    liveUrl: "https://apex-fiber-isp.vercel.app",
    githubUrl: "https://github.com/fahimhossain1617/isp-management-platform",
    caseStudy: {
      overview: {
        en: "Apex Fiber is an institutional web presence and subscriber portal for an Internet Service Provider (ISP), built to showcase fiber broadband packages, verify geographic network coverage, and automate new connection inquiries.",
        bn: "Apex Fiber হলো একটি ইন্টারনেট সার্ভিস প্রোভাইডার (ISP) প্রতিষ্ঠানের আধুনিক ওয়েবসাইট ও সাবস্ক্রাইবার পোর্টাল। এর মাধ্যমে ব্রডব্যান্ড প্যাকেজ নির্বাচন, কভারেজ যাচাই এবং নতুন সংযোগের আবেদন সহজে পরিচালনা করা যায়।",
      },
      purposeAndAudience: {
        en: "Engineered for home broadband users, corporate offices, and network administrators seeking clear bandwidth tiers, coverage lookups, and direct technical support.",
        bn: "বাসাবাড়ি ও করপোরেট ক্লায়েন্টদের জন্য নির্মিত, যাতে তারা সহজে ইন্টারনেট প্যাকেজ তুলনা করতে পারেন এবং কভারেজ এলাকায় সংযোগের জন্য সরাসরি আবেদন করতে পারেন।",
      },
      problem: {
        en: "Traditional ISP sites are often cluttered with outdated PDFs, vague pricing, and complicated telephone-only inquiry processes that frustrate prospective subscribers.",
        bn: "প্রচলিত অনেক আইএসপি ওয়েবসাইটে প্যাকেজের বিবরণ অস্পষ্ট থাকে এবং ফোন ছাড়া সহজে সংযোগের আবেদন করার কোনো ডিজিটাল ব্যবস্থা থাকে না।",
      },
      solution: {
        en: "Created a structured single-page portal with prominent package cards, an interactive coverage check section, live speed test simulation, and instant lead submission.",
        bn: "স্বচ্ছ প্যাকেজ কার্ড, কভারেজ চেক সেকশন, লাইভ স্পিড টেস্ট ড্যাশবোর্ড এবং তাত্ক্ষণিক অনলাইন আবেদন ফর্মসহ একটি আধুনিক ও নির্ভরযোগ্য ওয়েব পোর্টাল তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "Interactive broadband package comparison cards (50 Mbps, 100 Mbps, 200 Mbps)",
          "Network coverage area locator map and connection feasibility checker",
          "Subscriber bandwidth speed test simulation widget with ping & jitter metrics",
          "Direct click-to-chat WhatsApp inquiry handoff and customer support ticket flow",
          "Fully responsive layout optimized for handheld mobile devices",
        ],
        bn: [
          "ইন্টারেক্টিভ ব্রডব্যান্ড প্যাকেজ তুলনা (৫০, ১০০ এবং ২০০ এমবিপিএস)",
          "এরিয়া ভিত্তিক নেটওয়ার্ক কভারেজ যাচাই এবং সংযোগ আবেদন সুবিধা",
          "গ্রাহক স্পিড টেস্ট ও ব্যান্ডউইথ মনিটরিং ড্যাশবোর্ড উইজেট",
          "সরাসরি হোয়াটসঅ্যাপ চ্যাট এবং কাস্টমার সাপোর্ট টিকিট সাবমিশন",
          "মোবাইল ও ট্যাবলেটের জন্য দ্রুত ও রেসপনসিভ ইন্টারফেস",
        ],
      },
      verifiedTechStack: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "Responsive Grid",
        "UI/UX Design",
      ],
      challenges: {
        en: "Designing an intuitive, accessible visual comparison of technical bandwidth specifications for non-technical residential consumers.",
        bn: "সাধারণ ব্যবহারকারীদের বোঝার সুবিধার্থে ইন্টারনেটের বিভিন্ন টেকনিক্যাল স্পেসিফিকেশন সহজ ও দৃষ্টিনন্দনভাবে উপস্থাপন করা।",
      },
      challengeSolutions: {
        en: "Grouped speed tiers with recognizable use-case badges (HD Streaming, Gaming, Multi-device) alongside transparent monthly pricing.",
        bn: "প্যাকেজগুলোকে ব্যবহারকারীর প্রয়োজন অনুযায়ী (গেমিং, স্ট্রিমিং, মাল্টি-ডিভাইস) সুস্পষ্ট ব্যাজ এবং স্বচ্ছ মূল্যে ভাগ করে প্রদর্শন করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Strengthened competencies in conversion-focused business UI/UX design, accessible forms, and telecommunications domain requirements.",
        bn: "বিজনেস ও কনভার্সন-কেন্দ্রিক ইউআই/ইউএক্স ডিজাইন, অ্যাক্সেসিবল ফর্ম তৈরি এবং টেলিকম ডোমেইনের প্রয়োজনীয়তা সম্পর্কে গভীর ধারণা লাভ করেছি।",
      },
      screenshots: [
        {
          id: "isp-screen-1",
          caption: {
            en: "Broadband Plan Selection & Coverage Area Locator",
            bn: "ব্রডব্যান্ড প্ল্যান নির্বাচন ও কভারেজ ম্যাপ সেকশন",
          },
          src: "/images/isp-thumb.jpg",
          isPlaceholder: false,
        },
        {
          id: "isp-screen-2",
          caption: {
            en: "ISP Subscriber Speed Test & Bandwidth Monitor",
            bn: "আইএসপি গ্রাহক স্পিড টেস্ট ও ব্যান্ডউইথ মনিটর",
          },
          src: "/images/isp-screen-1.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "radiation-coaching-website",
    slug: "radiation-coaching-website",
    title: {
      en: "Radiation Coaching Website",
      bn: "রেডিয়েশন কোচিং শিক্ষা পোর্টাল",
    },
    category: "Business Websites",
    summary: {
      en: "An educational platform and institutional website for Radiation Coaching showcasing science curricula, batch schedules, exam notices, and student enrollment inquiries.",
      bn: "রেডিয়েশন কোচিং-এর একাডেমিক বিজ্ঞান প্রোগ্রাম, ক্লাস শিডিউল, পরীক্ষার নোটিশ এবং অনলাইনে ভর্তির তথ্য ও আবেদন ব্যবস্থাপনার জন্য নির্মিত ওয়েব প্ল্যাটফর্ম।",
    },
    verifiedTechTags: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
    thumbnailSrc: "/images/coaching-thumb.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Academic Platform • Live Client Project",
      bn: "একাডেমিক প্ল্যাটফর্ম • লাইভ ক্লায়েন্ট প্রজেক্ট",
    },
    liveUrl: "https://radiation-coaching.vercel.app",
    githubUrl: "https://github.com/fahimhossain1617/Radiation-Coaching",
    caseStudy: {
      overview: {
        en: "Radiation Coaching Website is a dedicated educational web portal built for Radiation Coaching Center to publish academic science programs, class schedules, exam notices, and streamline online student admissions.",
        bn: "রেডিয়েশন কোচিং ওয়েবসাইট হলো একটি আধুনিক শিক্ষা প্রতিষ্ঠান পোর্টাল, যা বিজ্ঞান বিভাগের শিক্ষার্থীদের ক্লাস রুটিন, পরীক্ষার নোটিশ এবং অনলাইনে ভর্তির তথ্য ও আবেদন পরিচালনার জন্য তৈরি করা হয়েছে।",
      },
      purposeAndAudience: {
        en: "Designed for high school and college science students, parents, and coaching faculty to facilitate clear academic communication and transparent batch enrollments.",
        bn: "স্কুল-কলেজের বিজ্ঞান বিভাগের শিক্ষার্থী, অভিভাবক এবং শিক্ষকদের জন্য তৈরি, যাতে তারা সহজেই ক্লাসের সময়সূচি ও ভর্তি নির্দেশিকা পেতে পারেন।",
      },
      problem: {
        en: "Students and parents frequently missed schedule updates, exam notices, and enrollment deadlines because communication relied on scattered messaging groups and paper notices.",
        bn: "মেসেঞ্জার গ্রুপ বা কাগজের নোটিশের কারণে শিক্ষার্থীরা প্রায়শই ক্লাসের সময়সূচি পরিবর্তন ও পরীক্ষার সময়সীমা মিস করত।",
      },
      solution: {
        en: "Engineered a centralized digital campus platform with structured batch course cards, dynamic routine calendar, downloadable lecture notes, and a digital admission inquiry portal.",
        bn: "সুনির্দিষ্ট ব্যাচ পরিচিতি, ডায়নামিক ক্লাস রুটিন, ডাউনলোডযোগ্য লেকচার নোটস এবং অনলাইন ভর্তি আবেদন ফর্মসহ একটি সমন্বিত প্ল্যাটফর্ম তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "Academic program catalogs for Physics, Chemistry, Biology, and Higher Mathematics",
          "Weekly batch class routine calendar with subject and room assignments",
          "Upcoming exam schedule bulletin board with downloadable PDF syllabi",
          "Student admission inquiry form with direct SMS & WhatsApp verification",
          "Faculty profile showcase highlighting academic qualifications and teaching expertise",
        ],
        bn: [
          "পদার্থ, রসায়ন, জীববিজ্ঞান ও গণিত কোর্সের বিস্তারিত সিলেবাস ও তথ্য",
          "বিষয় ও রুম নম্বরসহ সাপ্তাহিক ব্যাচ ক্লাস রুটিন ক্যালেন্ডার",
          "আসন্ন পরীক্ষার সময়সূচি এবং ডাউনলোডযোগ্য পিডিএফ সিলেবাস",
          "অনলাইনে ভর্তি আবেদন এবং সরাসরি যোগাযোগের সুবিধা",
          "অভিজ্ঞ শিক্ষকদের শিক্ষাগত যোগ্যতা ও অভিজ্ঞতার প্রোফাইল",
        ],
      },
      verifiedTechStack: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "Mobile Navigation",
        "UI/UX Design",
      ],
      challenges: {
        en: "Structuring complex multi-batch timetable matrices so they remain legible and easy to navigate on small smartphone screens.",
        bn: "মোবাইল স্ক্রিনে একাধিক ব্যাচ ও বিষয়ের জটিল সময়সূচি সহজবোধ্য ও পরিষ্কারভাবে উপস্থাপন করা।",
      },
      challengeSolutions: {
        en: "Built an interactive tabbed weekday routine layout with quick filter chips for Class 9, 10, 11, and 12 batches.",
        bn: "বিভিন্ন ক্লাসের ব্যাচের জন্য আলাদা ফিল্টার এবং দিনভিত্তিক ট্যাবড ইন্টারফেস তৈরি করে মোবাইল ভিউ সহজ করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Demonstrated real client delivery capabilities, translating institutional educational requirements into a clean, dependable web portal.",
        bn: "বাস্তব ক্লায়েন্ট প্রজেক্ট পরিচালনার দক্ষতা, শিক্ষা প্রতিষ্ঠানের চাহিদা অনুযায়ী কাজ করা এবং নির্ভরযোগ্য ওয়েব সমাধান তৈরির গভীর অভিজ্ঞতা হয়েছে।",
      },
      screenshots: [
        {
          id: "coaching-screen-1",
          caption: {
            en: "Radiation Coaching Homepage & Academic Batches Portal",
            bn: "রেডিয়েশন কোচিং হোমপেজ ও একাডেমিক ব্যাচ পোর্টাল",
          },
          src: "/images/coaching-thumb.jpg",
          isPlaceholder: false,
        },
        {
          id: "coaching-screen-2",
          caption: {
            en: "Student Routine Calendar, Batch Exams & Notice Feed",
            bn: "ক্লাস রুটিন ক্যালেন্ডার, ব্যাচ পরীক্ষা ও নোটিশ বোর্ড",
          },
          src: "/images/coaching-screen-1.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "stage-cse-uits",
    stageLabel: {
      en: "Academic Foundation • Ongoing",
      bn: "একাডেমিক ভিত্তি • চলমান",
    },
    title: {
      en: "Computer Science & Engineering (CSE) Undergraduate",
      bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) অধ্যয়ন",
    },
    organizationOrContext: {
      en: "UITS — University of Information Technology and Science (Second Semester)",
      bn: "ইউআইটিএস — ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্স (দ্বিতীয় সেমিস্টার)",
    },
    description: {
      en: "Pursuing a B.Sc. in Computer Science and Engineering at UITS. Building strong academic foundations in structured programming with C, object-oriented programming in Java, and core problem-solving principles.",
      bn: "ইউআইটিএস (UITS)-এ সিএসই বিভাগে স্নাতক অধ্যয়নরত (বর্তমানে দ্বিতীয় সেমিস্টার)। সি (C) দিয়ে স্ট্রাকচার্ড প্রোগ্রামিং, জাভা (Java) দিয়ে অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং এবং সমস্যা সমাধানের মূল ভিত্তি গড়ে তুলছি।",
    },
    highlights: {
      en: [
        "Currently in Second Semester of B.Sc. in CSE at UITS",
        "Practicing core programming logic in C and Java",
        "Connecting academic computer science concepts with practical software builds",
      ],
      bn: [
        "ইউআইটিএস-এ বি.এসসি. ইন সিএসই-এর দ্বিতীয় সেমিস্টারে অধ্যয়নরত",
        "সি (C) এবং জাভা (Java)-তে মূল প্রোগ্রামিং লজিক চর্চা",
        "একাডেমিক শিক্ষার সাথে বাস্তব প্রজেক্ট ডেভেলপমেন্টের সমন্বয়",
      ],
    },
    isCurrent: true,
  },
  {
    id: "stage-web-dev",
    stageLabel: {
      en: "Core Skill Acquisition • ~6 Months",
      bn: "ওয়েব ডেভেলপমেন্ট অনুশীলন • প্রায় ৬ মাস",
    },
    title: {
      en: "Dedicated Web Development Learning & Practice",
      bn: "নিবিড় ওয়েব ডেভেলপমেন্ট শিক্ষা ও অনুশীলন",
    },
    organizationOrContext: {
      en: "Frontend to Full-Stack Web Technologies",
      bn: "ফ্রন্টএন্ড থেকে ফুল-স্ট্যাক ওয়েব টেকনোলজি",
    },
    description: {
      en: "Over approximately six months of focused learning, progressed from semantic HTML, modern CSS, and JavaScript to building component-driven interfaces with React, Next.js, TypeScript, and the MERN stack.",
      bn: "প্রায় ছয় মাসের নিয়মিত অনুশীলনে সিম্যান্টিক HTML, আধুনিক CSS এবং JavaScript থেকে শুরু করে React, Next.js, TypeScript এবং MERN স্ট্যাক দিয়ে পূর্ণাঙ্গ ওয়েব অ্যাপ্লিকেশন তৈরি শিখেছি।",
    },
    highlights: {
      en: [
        "Responsive layout design, UI/UX structure, and foundational SEO",
        "Component architecture with React, Next.js, and TypeScript",
        "Full-stack data flow using the MERN stack and Supabase",
      ],
      bn: [
        "রেসপনসিভ লেআউট, ইউআই/ইউএক্স স্ট্রাকচার এবং মৌলিক এসইও",
        "React, Next.js এবং TypeScript দিয়ে মডার্ন কম্পোনেন্ট আর্কিটেকচার",
        "MERN স্ট্যাক এবং Supabase ব্যবহার করে ফুল-স্ট্যাক ডেটা প্রবাহ",
      ],
    },
  },
  {
    id: "stage-real-projects",
    stageLabel: {
      en: "Applied Engineering • Current",
      bn: "বাস্তব প্রজেক্ট ও অ্যাপ্লিকেশন • চলমান",
    },
    title: {
      en: "Building Applications & Client Web Projects",
      bn: "অ্যাপ্লিকেশন তৈরি ও ক্লায়েন্ট প্রজেক্টে কাজ",
    },
    organizationOrContext: {
      en: "Product Builds & Custom Web Solutions",
      bn: "প্রোডাক্ট ডেভেলপমেন্ট ও ওয়েব সলিউশন",
    },
    description: {
      en: "Applying full-stack skills to build Focentia—a comprehensive productivity web application—alongside client and domain websites across e-commerce, internet service provision, and academic coaching.",
      bn: "নিজের তৈরি প্রোডাক্টিভিটি অ্যাপ্লিকেশন Focentia ডেভেলপ করার পাশাপাশি ই-কমার্স, ইন্টারনেট সার্ভিস প্রোভাইডার এবং কোচিং প্রতিষ্ঠানের জন্য ওয়েব প্রজেক্টে কাজ করেছি।",
    },
    highlights: {
      en: [
        "Developed Focentia productivity web application",
        "Worked on web interfaces for e-commerce, ISP, and education domains",
        "Focus on clean code, accessibility, and real-world performance",
      ],
      bn: [
        "Focentia প্রোডাক্টিভিটি অ্যাপ্লিকেশন তৈরি ও উন্নয়ন",
        "ই-কমার্স, আইএসপি এবং শিক্ষা প্রতিষ্ঠানের ওয়েবসাইট প্রজেক্টে কাজ",
        "ক্লিন কোড, অ্যাক্সেসিবিলিটি এবং পারফরম্যান্সের ওপর গুরুত্বারোপ",
      ],
    },
    isCurrent: true,
  },
  {
    id: "stage-future-vision",
    stageLabel: {
      en: "Long-Term Direction • Roadmap",
      bn: "দীর্ঘমেয়াদী লক্ষ্য • ভবিষ্যৎ রোডম্যাপ",
    },
    title: {
      en: "Full-Stack Mastery, AI/ML Engineering & Agency Vision",
      bn: "ফুল-স্ট্যাক দক্ষতা, এআই/এমএল ইঞ্জিনিয়ারিং এবং নিজস্ব এজেন্সি প্রতিষ্ঠা",
    },
    organizationOrContext: {
      en: "AI Automation → AI/ML Engineering → Software Agency",
      bn: "এআই অটোমেশন → এআই/এমএল ইঞ্জিনিয়ারিং → সফটওয়্যার এজেন্সি",
    },
    description: {
      en: "Continuing to deepen full-stack engineering and AI automation workflows, with a clear long-term path toward AI/ML engineering and eventually establishing my own software and AI solutions agency.",
      bn: "ফুল-স্ট্যাক ডেভেলপমেন্ট এবং এআই অটোমেশন নিয়ে আরও গভীরভাবে কাজ করার পাশাপাশি ভবিষ্যতে একজন দক্ষ AI/ML ইঞ্জিনিয়ার হিসেবে গড়ে ওঠা এবং নিজস্ব সফটওয়্যার ও এআই এজেন্সি প্রতিষ্ঠা করাই আমার দীর্ঘমেয়াদী লক্ষ্য।",
    },
    highlights: {
      en: [
        "Expanding backend architecture and AI automation integrations",
        "Progressing systematically toward AI/ML engineering",
        "Long-term goal of building an independent digital product & software agency",
      ],
      bn: [
        "ব্যাকএন্ড আর্কিটেকচার এবং এআই অটোমেশন ইন্টিগ্রেশন আরও উন্নত করা",
        "ধারাবাহিকভাবে এআই/এমএল (AI/ML) ইঞ্জিনিয়ারিংয়ের দিকে অগ্রসর হওয়া",
        "ভবিষ্যতে নিজস্ব সফটওয়্যার ও ডিজিটাল সলিউশন এজেন্সি গড়ে তোলা",
      ],
    },
  },
];

export const UI_TEXT = {
  nav: {
    home: { en: "Home", bn: "হোম" },
    about: { en: "About", bn: "আমার সম্পর্কে" },
    skills: { en: "Skills", bn: "দক্ষতা" },
    projects: { en: "Projects", bn: "প্রজেক্টস" },
    journey: { en: "Journey", bn: "যাত্রাপথ" },
    contact: { en: "Contact", bn: "যোগাযোগ" },
    contactCta: { en: "Let's Talk", bn: "যোগাযোগ করুন" },
    commandPaletteHint: { en: "Quick Menu", bn: "কুইক মেনু" },
    themeToggleDark: { en: "Switch to dark theme", bn: "ডার্ক থিম চালু করুন" },
    themeToggleLight: {
      en: "Switch to light theme",
      bn: "লাইট থিম চালু করুন",
    },
    langToggle: {
      en: "Switch language to Bangla",
      bn: "ভাষা ইংরেজিতে পরিবর্তন করুন",
    },
  },
  hero: {
    eyebrow: {
      en: "Personal Portfolio • Dhaka, Bangladesh",
      bn: "পার্সোনাল পোর্টফোলিও • ঢাকা, বাংলাদেশ",
    },
    introParagraph: {
      en: "I am a Computer Science and Engineering (CSE) student at UITS in my second semester. Over the past six months, I have been actively learning web development and building practical applications and client projects with a growing focus on full-stack engineering and AI automation.",
      bn: "আমি ইউআইটিএস (UITS)-এর কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) বিভাগের দ্বিতীয় সেমিস্টারের একজন শিক্ষার্থী। গত প্রায় ছয় মাস ধরে আমি নিবিড়ভাবে ওয়েব ডেভেলপমেন্ট শিখছি এবং ফুল-স্ট্যাক ডেভেলপমেন্ট ও এআই অটোমেশনের সমন্বয়ে বাস্তবমুখী অ্যাপ্লিকেশন ও ক্লায়েন্ট প্রজেক্ট তৈরি করছি।",
    },
    exploreWorkCta: { en: "Explore My Work", bn: "আমার কাজগুলো দেখুন" },
    contactMeCta: { en: "Contact Me", bn: "যোগাযোগ করুন" },
    replaySketch: { en: "Replay Pencil Sketch", bn: "পেন্সিল স্কেচ পুনরায় দেখুন" },
    sketchRevealing: {
      en: "Drawing original portrait...",
      bn: "পেন্সিল স্কেচ অ্যানিমেশন চলছে...",
    },
    sketchComplete: {
      en: "Original Portrait • Md. Fahim Hossain",
      bn: "মৌলিক পোর্ট্রেট • মোঃ ফাহিম হোসেন",
    },
    educationBadgeLabel: {
      en: "CSE @ UITS (2nd Semester)",
      bn: "সিএসই @ ইউআইটিএস (২য় সেমিস্টার)",
    },
    directionBadgeLabel: {
      en: "Full-Stack & AI Automation",
      bn: "ফুল-স্ট্যাক ও এআই অটোমেশন",
    },
  },
  about: {
    sectionTag: { en: "About Me", bn: "আমার সম্পর্কে" },
    heading: {
      en: "Grounded in Computer Science, driven by practical building.",
      bn: "কম্পিউটার সায়েন্সের ভিত্তি এবং বাস্তবমুখী প্রজেক্ট তৈরির প্রচেষ্টা।",
    },
    lead: {
      en: "I am Md. Fahim Hossain, a second-semester Computer Science and Engineering (CSE) student at the University of Information Technology and Science (UITS).",
      bn: "আমি মোঃ ফাহিম হোসেন, ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্স (UITS)-এর কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) বিভাগের দ্বিতীয় সেমিস্টারের শিক্ষার্থী।",
    },
    body1: {
      en: "For approximately the past six months, I have dedicated myself to learning modern web development and translating what I learn into functional software. Alongside my university studies in C and Java, I work with JavaScript, TypeScript, React, Next.js, the MERN stack, and Supabase to build clean, responsive web applications and client projects.",
      bn: "গত প্রায় ছয় মাস ধরে আমি আধুনিক ওয়েব ডেভেলপমেন্ট শিখছি এবং অর্জিত জ্ঞান দিয়ে কার্যকরী ওয়েব অ্যাপ্লিকেশন তৈরি করছি। বিশ্ববিদ্যালয়ে C এবং Java শেখার পাশাপাশি আমি JavaScript, TypeScript, React, Next.js, MERN স্ট্যাক এবং Supabase ব্যবহার করে ক্লায়েন্ট প্রজেক্ট ও ওয়েব অ্যাপ্লিকেশন তৈরি করছি।",
    },
    body2: {
      en: "My current focus sits at the intersection of full-stack development and AI automation—building tools like my productivity application, Focentia, that solve everyday workflow problems. Looking ahead, my long-term goal is to grow systematically as a full-stack engineer, advance into AI/ML engineering, and eventually establish my own software and AI agency.",
      bn: "বর্তমানে আমার মূল আগ্রহ ফুল-স্ট্যাক ডেভেলপমেন্ট এবং এআই অটোমেশন ঘিরে—যার একটি বাস্তব উদাহরণ আমার তৈরি প্রোডাক্টিভিটি অ্যাপ্লিকেশন 'Focentia'। আমার দীর্ঘমেয়াদী লক্ষ্য হলো একজন দক্ষ ফুল-স্ট্যাক ডেভেলপার হিসেবে নিজেকে আরও পরিণত করা, পর্যায়ক্রমে AI/ML ইঞ্জিনিয়ারিংয়ে দক্ষতা অর্জন করা এবং ভবিষ্যতে নিজের একটি সফটওয়্যার ও এআই এজেন্সি প্রতিষ্ঠা করা।",
    },
    cards: [
      {
        label: { en: "Academic Profile", bn: "একাডেমিক পরিচয়" },
        value: {
          en: "B.Sc. in CSE — UITS",
          bn: "বি.এসসি. ইন সিএসই — UITS",
        },
        sub: {
          en: "Currently in Second Semester",
          bn: "বর্তমানে দ্বিতীয় সেমিস্টারে অধ্যয়নরত",
        },
      },
      {
        label: { en: "Development Background", bn: "ডেভেলপমেন্ট অভিজ্ঞতা" },
        value: {
          en: "~6 Months in Web Development",
          bn: "প্রায় ৬ মাসের ওয়েব ডেভেলপমেন্ট অনুশীলন",
        },
        sub: {
          en: "Hands-on client projects & web applications",
          bn: "বাস্তব ক্লায়েন্ট প্রজেক্ট এবং ওয়েব অ্যাপ্লিকেশন নির্মাণ",
        },
      },
      {
        label: { en: "Long-Term Trajectory", bn: "ভবিষ্যৎ লক্ষ্য" },
        value: {
          en: "Full-Stack → AI/ML → Agency",
          bn: "ফুল-স্ট্যাক → AI/ML → নিজস্ব এজেন্সি",
        },
        sub: {
          en: "Focused on steady, honest engineering growth",
          bn: "ধারাবাহিক ও বাস্তবমুখী কারিগরি দক্ষতা অর্জন",
        },
      },
    ],
  },
  skills: {
    sectionTag: {
      en: "Skills & Technologies",
      bn: "দক্ষতা ও প্রযুক্তি",
    },
    heading: {
      en: "Verified technologies & focus areas.",
      bn: "যাচাইকৃত টেকনোলজি এবং কাজের ক্ষেত্রসমূহ।",
    },
    subheading: {
      en: "Organized transparently by domain. Technologies listed reflect tools I study and use across academic coursework and web development projects.",
      bn: "কাজের ধরন অনুযায়ী সুশৃঙ্খলভাবে সাজানো। এখানে কেবল সেই প্রযুক্তিগুলোই যুক্ত করা হয়েছে যা আমি একাডেমিক কোর্স এবং ওয়েব প্রজেক্টে প্রকৃতপক্ষে চর্চা ও ব্যবহার করি।",
    },
  },
  projects: {
    sectionTag: { en: "Selected Work", bn: "নির্বাচিত প্রজেক্ট" },
    heading: {
      en: "Projects & Case Studies.",
      bn: "প্রজেক্ট এবং কেস স্টাডি।",
    },
    subheading: {
      en: "Explore my applications, production builds, and engineering case studies across full-stack development and modern web solutions.",
      bn: "আমার তৈরি ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন, বাস্তব প্রজেক্ট এবং বিস্তারিত কারিগরি কেস স্টাডিগুলো দেখুন।",
    },
    filterLabel: {
      en: "Filter projects by category",
      bn: "ক্যাটাগরি অনুযায়ী প্রজেক্ট ফিল্টার করুন",
    },
    viewCaseStudy: { en: "View Case Study", bn: "কেস স্টাডি দেখুন" },
    hideCaseStudy: { en: "Close Case Study", bn: "কেস স্টাডি বন্ধ করুন" },
    liveDemo: { en: "Live Demo", bn: "লাইভ ডেমো" },
    liveDemoUnavailable: {
      en: "Live URL Placeholder",
      bn: "লাইভ লিংক প্লেসহোল্ডার",
    },
    githubRepo: { en: "GitHub Repo", bn: "গিটহাব রিপোজিটরি" },
    githubUnavailable: {
      en: "Repo URL Placeholder",
      bn: "রিপোজিটরি প্লেসহোল্ডার",
    },
    placeholderBadge: {
      en: "Placeholder — replace before launch",
      bn: "প্লেসহোল্ডার — লঞ্চের পূর্বে পরিবর্তন করুন",
    },
    emptyCategory: {
      en: "No projects found in this category.",
      bn: "এই ক্যাটাগরিতে কোনো প্রজেক্ট পাওয়া যায়নি।",
    },
    inquireAboutSimilar: {
      en: "Discuss a project with me",
      bn: "প্রজেক্ট নিয়ে আলোচনা করুন",
    },
    caseStudyLabels: {
      overview: { en: "Project Overview", bn: "প্রজেক্টের সারসংক্ষেপ" },
      purpose: {
        en: "Purpose & Target Audience",
        bn: "উদ্দেশ্য এবং লক্ষ্যভুক্ত ব্যবহারকারী",
      },
      problem: { en: "Problem Addressed", bn: "চিহ্নিত সমস্যা" },
      solution: { en: "Solution Implemented", bn: "বাস্তবায়িত সমাধান" },
      keyFeatures: { en: "Key Features", bn: "মূল ফিচারসমূহ" },
      techStack: {
        en: "Verified Technology Stack",
        bn: "ব্যবহৃত টেকনোলজি স্ট্যাক",
      },
      screenshots: {
        en: "Screenshots & Interface Preview",
        bn: "স্ক্রিনশট ও ইন্টারফেস প্রিভিউ",
      },
      challenges: { en: "Challenges Encountered", bn: "সম্মুখীন হওয়া চ্যালেঞ্জ" },
      challengeSolutions: {
        en: "How Challenges Were Solved",
        bn: "চ্যালেঞ্জ সমাধানের প্রক্রিয়া",
      },
      lessonsLearned: { en: "Lessons Learned", bn: "অর্জিত শিক্ষা" },
      linksHeading: {
        en: "Project Destinations",
        bn: "প্রজেক্ট লিংকসমূহ",
      },
    },
  },
  journey: {
    sectionTag: { en: "Learning & Progress", bn: "শেখা ও অগ্রগতি" },
    heading: {
      en: "Learning progression & future direction.",
      bn: "শেখার ধারাবাহিকতা এবং ভবিষ্যৎ লক্ষ্য।",
    },
    subheading: {
      en: "An honest timeline of my computer science education at UITS, my web development learning path, and where I am headed next.",
      bn: "ইউআইটিএস (UITS)-এ আমার সিএসই শিক্ষা, ওয়েব ডেভেলপমেন্ট শেখার যাত্রা এবং ভবিষ্যৎ লক্ষ্যের একটি বাস্তব চিত্র।",
    },
  },
  contact: {
    sectionTag: { en: "Contact", bn: "যোগাযোগ" },
    heading: {
      en: "Let's discuss your project or collaboration.",
      bn: "আপনার প্রজেক্ট বা কাজের বিষয়ে কথা বলুন।",
    },
    subheading: {
      en: "Whether you are a recruiter, a client looking to build a web application, or a fellow developer interested in collaborating—feel free to reach out through the form or direct channels below.",
      bn: "আপনি যদি কোনো প্রজেক্ট তৈরি করতে চান, রিক্রুটার হন কিংবা একসাথে কাজ করতে আগ্রহী হন—নিচের ফর্মের মাধ্যমে অথবা সরাসরি ইমেইল, হোয়াটসঅ্যাপ বা লিংকডইনে যোগাযোগ করতে পারেন।",
    },
    directChannelsHeading: {
      en: "Direct Contact Channels",
      bn: "সরাসরি যোগাযোগের মাধ্যম",
    },
    emailLabel: { en: "Email", bn: "ইমেইল" },
    copyEmail: { en: "Copy Email", bn: "ইমেইল কপি করুন" },
    emailCopied: { en: "Copied!", bn: "কপি হয়েছে!" },
    sendEmailAction: { en: "Send Email", bn: "ইমেইল পাঠান" },
    whatsappLabel: { en: "WhatsApp", bn: "হোয়াটসঅ্যাপ" },
    whatsappAction: {
      en: "Message on WhatsApp",
      bn: "হোয়াটসঅ্যাপে মেসেজ দিন",
    },
    whatsappSub: {
      en: "Opens direct click-to-chat",
      bn: "সরাসরি চ্যাট উইন্ডো ওপেন হবে",
    },
    linkedinLabel: { en: "LinkedIn", bn: "লিংকডইন" },
    linkedinAction: {
      en: "Connect on LinkedIn",
      bn: "লিংকডইনে যুক্ত হোন",
    },
    githubLabel: { en: "GitHub", bn: "গিটহাব" },
    githubPlaceholderBadge: {
      en: "Placeholder — URL to be supplied before launch",
      bn: "প্লেসহোল্ডার — লঞ্চের পূর্বে গিটহাব লিংক যুক্ত করা হবে",
    },
    form: {
      title: { en: "Send a Project Inquiry", bn: "প্রজেক্টের বিবরণ পাঠান" },
      nameLabel: { en: "Your Name", bn: "আপনার নাম" },
      namePlaceholder: {
        en: "Enter your full name",
        bn: "আপনার পূর্ণ নাম লিখুন",
      },
      emailLabel: { en: "Email Address", bn: "ইমেইল অ্যাড্রেস" },
      emailPlaceholder: {
        en: "you@example.com",
        bn: "you@example.com",
      },
      phoneLabel: { en: "Phone Number", bn: "ফোন নম্বর" },
      phonePlaceholder: {
        en: "+880 1XXX-XXXXXX",
        bn: "+880 1XXX-XXXXXX",
      },
      descriptionLabel: {
        en: "Work / Project Description",
        bn: "কাজ / প্রজেক্টের বিবরণ",
      },
      descriptionPlaceholder: {
        en: "Describe the website, application, or project you would like to discuss...",
        bn: "আপনি কোন ধরনের ওয়েবসাইট, অ্যাপ্লিকেশন বা প্রজেক্ট নিয়ে কাজ করতে চান তার বিস্তারিত লিখুন...",
      },
      submitButton: { en: "Send Message", bn: "মেসেজ পাঠান" },
      submittingButton: {
        en: "Sending Message...",
        bn: "মেসেজ পাঠানো হচ্ছে...",
      },
      privacyNotice: {
        en: "Privacy Notice: Your name, email, phone number, and project description are used solely to respond to your inquiry and are never shared with third parties or stored in marketing lists.",
        bn: "গোপনীয়তা বার্তা: আপনার নাম, ইমেইল, ফোন নম্বর এবং প্রজেক্টের বিবরণ শুধুমাত্র আপনার বার্তার উত্তর দেওয়ার জন্য ব্যবহৃত হবে এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হবে না।",
      },
      validation: {
        nameRequired: {
          en: "Please enter your name (at least 2 characters).",
          bn: "অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।",
        },
        emailRequired: {
          en: "Please enter a valid email address.",
          bn: "অনুগ্রহ করে একটি সঠিক ইমেইল অ্যাড্রেস লিখুন।",
        },
        phoneRequired: {
          en: "Please enter a valid phone number (7 to 20 digits).",
          bn: "অনুগ্রহ করে একটি সঠিক ফোন নম্বর লিখুন (৭ থেকে ২০ সংখ্যা)।",
        },
        descriptionRequired: {
          en: "Please describe your project or inquiry (at least 15 characters).",
          bn: "অনুগ্রহ করে আপনার প্রজেক্ট বা কাজের বিবরণ লিখুন (কমপক্ষে ১৫ অক্ষর)।",
        },
      },
      successHeading: {
        en: "Your message has been sent successfully.",
        bn: "আপনার বার্তাটি সফলভাবে ইমেইলে পাঠানো হয়েছে।",
      },
      successSubtext: {
        en: "Thank you for reaching out. Your inquiry has been delivered to fahimhossain1617@gmail.com and I will get back to you soon.",
        bn: "যোগাযোগ করার জন্য ধন্যবাদ। আপনার বার্তাটি fahimhossain1617@gmail.com-এ পৌঁছেছে। খুব শীঘ্রই আমি আপনার সাথে যোগাযোগ করব।",
      },
      whatsappHandoffHeading: {
        en: "Want a faster response on WhatsApp?",
        bn: "হোয়াটসঅ্যাপেও একই বার্তা পাঠাতে চান?",
      },
      whatsappHandoffNote: {
        en: "Click below to open WhatsApp with your inquiry prefilled. You can review the message and press send inside WhatsApp.",
        bn: "নিচের বাটনে ক্লিক করলে আপনার লেখা তথ্যসহ হোয়াটসঅ্যাপ ওপেন হবে। সেখানে মেসেজটি যাচাই করে আপনি নিজে সেন্ড করতে পারবেন।",
      },
      alsoSendViaWhatsapp: {
        en: "Also Send via WhatsApp",
        bn: "হোয়াটসঅ্যাপেও পাঠান (Also Send via WhatsApp)",
      },
      sendAnotherMessage: {
        en: "Send Another Message",
        bn: "নতুন আরেকটি বার্তা পাঠান",
      },
      errorHeading: {
        en: "Message could not be sent via email right now.",
        bn: "এই মুহূর্তে ইমেইলের মাধ্যমে বার্তাটি পাঠানো সম্ভব হয়নি।",
      },
      retryButton: {
        en: "Try Sending Again",
        bn: "পুনরায় চেষ্টা করুন",
      },
    },
  },
  footer: {
    descriptor: {
      en: "Full-Stack Developer & AI Automation Enthusiast • B.Sc. in CSE Student at UITS.",
      bn: "ফুল-স্ট্যাক ডেভেলপার ও এআই অটোমেশন এনথুসিয়াস্ট • ইউআইটিএস-এ বি.এসসি. ইন সিএসই অধ্যয়নরত।",
    },
    collaborationInvite: {
      en: "Let’s build something impactful together. Whether you are looking to hire a dedicated full-stack engineer, have a project in mind, or want to explore future-ready AI automation — I am always open to meaningful collaborations. Let’s connect and create impactful digital products.",
      bn: "আসুন একসাথে তৈরি করি ভবিষ্যতের সেরা প্রোডাক্ট। আপনি কি দলের জন্য একজন নিবেদিত ফুল-স্ট্যাক ডেভেলপার খুঁজছেন, নতুন কোনো প্রজেক্ট বিল্ড করতে চান, নাকি এআই অটোমেশনের মাধ্যমে কাজের গতি বাড়াতে চান? আমি সবসময় বাস্তবমুখী ও মানসম্মত প্রজেক্টে যুক্ত হতে আগ্রহী। চলুন একসাথে কাজ করি এবং নতুন কিছু গড়ি।",
    },
    hireAction: {
      en: "Let's Collaborate & Build",
      bn: "একসাথে কাজ শুরু করুন",
    },
    rights: {
      en: "All rights reserved.",
      bn: "সর্বস্বত্ব সংরক্ষিত।",
    },
  },
  notFound: {
    code: "404",
    heading: {
      en: "Page not found.",
      bn: "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।",
    },
    description: {
      en: "The route you requested does not exist on Md. Fahim Hossain's portfolio. Return to the main portfolio to explore projects and contact details.",
      bn: "আপনি যে লিংকটি খুঁজছেন তা মোঃ ফাহিম হোসেনের পোর্টফোলিওতে বিদ্যমান নেই। প্রজেক্ট এবং যোগাযোগের তথ্যের জন্য মূল পাতায় ফিরে যান।",
    },
    backHome: {
      en: "Return to Portfolio",
      bn: "মূল পোর্টফোলিওতে ফিরে যান",
    },
  },
};
