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
    en: "Full-Stack Developer | UI/UX Designer | AI Automation Learner",
    bn: "ফুল-স্ট্যাক ডেভেলপার | ইউআই/ইউএক্স ডিজাইনার | এআই অটোমেশন শিক্ষার্থী",
  },
  typingPhrases: {
    en: [
      "Full-Stack Developer",
      "UI/UX Designer",
      "Web & Mobile App Builder",
      "Learning AI Automation",
      "Learning SEO",
    ],
    bn: [
      "ফুল-স্ট্যাক ডেভেলপার",
      "ইউআই/ইউএক্স ডিজাইনার",
      "ওয়েব ও মোবাইল অ্যাপ নির্মাতা",
      "এআই অটোমেশন শিখছি",
      "এসইও শিখছি",
    ],
  },
  education: {
    degree: {
      en: "B.Sc. in Computer Science & Engineering",
      bn: "বি.এসসি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
    },
    institution: {
      en: "UITS, Third Semester",
      bn: "ইউআইটিএস, তৃতীয় সেমিস্টার",
    },
    semester: {
      en: "Third Semester",
      bn: "তৃতীয় সেমিস্টার",
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
      bn: "Focentia",
    },
    category: "Web Apps",
    summary: {
      en: "An intelligent, high-performance daily planner, habit builder, notes editor, focus timer, and AI-driven productivity workspace built with Next.js 16 App Router, PostgreSQL (Supabase), and Google Gemini AI.",
      bn: "দৈনন্দিন টাস্ক প্ল্যানিং, ফোকাস টাইমার, হ্যাবিট বিল্ডার, নোটস এডিটর এবং এআই-চালিত প্রোডাক্টিভিটি সমন্বিত একটি আধুনিক ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন (Next.js 16, Supabase ও Gemini AI)।",
    },
    verifiedTechTags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Gemini AI",
      "Tailwind CSS",
    ],
    thumbnailSrc: "/images/projects/focentia.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Live Application • Production Ready",
      bn: "লাইভ অ্যাপ্লিকেশন • সম্পূর্ণ প্রস্তুত",
    },
    liveUrl: "https://focentia.vercel.app/",
    githubUrl: "https://github.com/fahimhossain1617/Focentia.git",
    caseStudy: {
      overview: {
        en: "Focentia is an intelligent, high-performance daily planner, habit builder, notes editor, focus timer, and AI-driven productivity workspace built to eliminate context-switching by combining daily planning, pomodoro focus, rich markdown notes, and AI assistance into one cohesive interface.",
        bn: "Focentia হলো একটি আধুনিক, উচ্চ-ক্ষমতাসম্পন্ন প্রোডাক্টিভিটি ও এআই ওয়ার্কস্পেস, যা শিক্ষার্থী এবং পেশাজীবীদের জন্য টাস্ক প্ল্যানিং, ফোকাস টাইমার, নোটস এবং হ্যাবিট ট্র্যাকিং একটি প্ল্যাটফর্মে সমন্বিত করেছে।",
      },
      purposeAndAudience: {
        en: "Built for students, developers, and self-directed professionals who require a distraction-free digital workspace. Focentia solves fragmented productivity workflows by organizing tasks, study sessions, personal reflections, and AI insights in one place.",
        bn: "শিক্ষার্থী, ডেভেলপার ও প্রফেশনালদের জন্য তৈরি, যারা আলাদা আলাদা টাইমার, নোট এবং টাস্ক অ্যাপ ব্যবহারের ঝামেলা থেকে মুক্তি চান এবং একটি শান্ত, সুশৃঙ্খল পরিবেশে কাজ করতে আগ্রহী।",
      },
      problem: {
        en: "Managing daily tasks, study logs, focus timers, and personal notes across multiple disconnected tools creates context switching and makes consistent habit tracking harder. Additionally, background timers in standard browsers suffer from CPU throttling.",
        bn: "একাধিক বিচ্ছিন্ন অ্যাপে দৈনন্দিন টাস্ক, পড়াশোনার লগ, ফোকাস টাইমার এবং নোটস পরিচালনা করতে গেলে মনোযোগ নষ্ট হয়। তাছাড়া সাধারণ ব্রাউজার টাইমার ব্যাকগ্রাউন্ডে থাকলে প্রায়ই বন্ধ বা ধীর হয়ে যায়।",
      },
      solution: {
        en: "Implemented a unified full-stack workspace using Next.js 16 App Router, TypeScript, and Supabase PostgreSQL with dedicated Web Workers for drift-free background focus sessions, optimistic UI updates, and Google Gemini AI productivity assistance.",
        bn: "Next.js 16 অ্যাপ রাউটার এবং ব্যাকগ্রাউন্ডে নির্ভুল টাইমিংয়ের জন্য Web Worker ব্যবহার করা হয়েছে। সেই সাথে Supabase PostgreSQL এবং Gemini AI যুক্ত করে একটি স্বয়ংসম্পূর্ণ প্রোডাক্টিভিটি সিস্টেম তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "Daily task planning with priority management, recurring templates, and completion logs",
          "Dedicated Pomodoro & focus timer with drift-free Web Worker background accuracy",
          "Structured notes workspace, mind maps, and personal learning diary entries",
          "Google Gemini AI-assisted workspace interaction and intelligent task guidance",
          "Secure Supabase authentication, PostgreSQL pooler, and automated guest data migration",
          "Supervisor management portal (/supervisor) with role-based access control and ticket replies",
        ],
        bn: [
          "অগ্রাধিকারভিত্তিক দৈনিক টাস্ক প্ল্যানিং, রিকারিং টেমপ্লেট ও স্ট্যাটাস ট্র্যাকিং",
          "Web Worker চালিত নির্ভুল পমোডোরো ও কাস্টম ফোকাস সেশন টাইমার",
          "সুসংগঠিত নোটবুক, মাইন্ড ম্যাপ এবং লার্নিং ডায়েরি লগ সংরক্ষণ",
          "গুগল জেমিনি (Gemini AI) চালিত স্মার্ট অ্যাসিস্ট্যান্ট এবং কার্যসহায়তা",
          "Supabase অথেনটিকেশন, PostgreSQL পুলার এবং গেস্ট ডেটা ক্লাউডে অটো-মাইগ্রেশন",
          "সুপারভাইজার ম্যানেজমেন্ট পোর্টাল (/supervisor), রোল-ভিত্তিক অ্যাক্সেস এবং সাপোর্ট টিকিট সিস্টেম",
        ],
      },
      verifiedTechStack: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Supabase",
        "Gemini AI",
        "Web Workers",
        "Tailwind CSS",
      ],
      challenges: {
        en: "Ensuring background timers remained precise even when browser tabs were throttled by the OS, and handling seamless migration of unauthenticated guest tasks into authenticated Supabase database upon user signup.",
        bn: "ব্রাউজারে ব্যাকগ্রাউন্ড ট্যাবে অপারেটিং সিস্টেমের পাওয়ার থ্রটলিং সত্ত্বেও টাইমার সঠিক রাখা এবং লগইন ছাড়া গেস্ট মোডে তৈরি করা টাস্কগুলো সাইন-আপ করার পর স্বয়ংক্রিয়ভাবে ক্লাউড ডেটাবেসে মাইগ্রেট করা।",
      },
      challengeSolutions: {
        en: "Engineered dedicated Web Workers off the main thread to prevent timer drift, built robust transactional migration endpoints, and implemented Supabase Row Level Security (RLS) for data integrity.",
        bn: "মেইন থ্রেডের বাইরে Web Worker দিয়ে টাইমার আর্কিটেকচার তৈরি করে টাইমার ড্রিফট দূর করা হয়েছে এবং লেনদেনভিত্তিক নিরাপদ মাইগ্রেশন এন্ডপয়েন্ট ও Supabase RLS পলিসি বাস্তবায়ন করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Deepened production expertise in Next.js 16 App Router architectures, PostgreSQL relational schema modeling, Web Worker concurrency, and building resilient AI agent pipelines.",
        bn: "Next.js 16 অ্যাপ রাউটার, Supabase ও PostgreSQL ডেটাবেস অপ্টিমাইজেশন, মাল্টি-থ্রেডেড ব্রাউজার টাইমিং এবং এআই ওয়ার্কফ্লো ইন্টিগ্রেশনে গভীর বাস্তব অভিজ্ঞতা লাভ করেছি।",
      },
      screenshots: [
        {
          id: "focentia-screen-1",
          caption: {
            en: "Focentia Daily Tasks, Focus Sessions & Learning Dashboard",
            bn: "Focentia ডেইলি টাস্ক, ফোকাস সেশন ও লার্নিং ড্যাশবোর্ড",
          },
          src: "/images/projects/focentia.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: {
      en: "E-commerce",
      bn: "E-commerce",
    },
    category: "E-commerce",
    summary: {
      en: "A modern, high-performance luxury tech & electronics e-commerce storefront featuring dynamic category filtering, instant price ranges, persistent cart drawer, and frictionless checkout.",
      bn: "লাক্সারি টেক ও লাইফস্টাইল গ্যাজেটের জন্য নির্মিত একটি আধুনিক ও দ্রুতগতির ই-কমার্স প্ল্যাটফর্ম, যাতে রয়েছে ইনস্ট্যান্ট ক্যাটালগ ফিল্টারিং, স্লাইড-আউট কার্ট এবং সহজ চেকআউট সুবিধা।",
    },
    verifiedTechTags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Prisma",
      "PostgreSQL",
      "Canvas Confetti",
    ],
    thumbnailSrc: "/images/projects/ecommerce.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Full-Stack Project • Completed",
      bn: "ফুল-স্ট্যাক প্রজেক্ট • সম্পন্ন",
    },
    liveUrl: "https://e-commerce-gamma-neon-84.vercel.app",
    githubUrl: "https://github.com/fahimhossain1617/E-commerce.git",
    caseStudy: {
      overview: {
        en: "NovaCart is a modern responsive full-stack e-commerce web application engineered with Next.js 16, React 19, TypeScript, and Prisma ORM. Built specifically for consumer lifestyle and audio electronics with sub-second page transitions.",
        bn: "NovaCart হলো একটি আধুনিক ফুল-স্ট্যাক ই-কমার্স ওয়েব অ্যাপ্লিকেশন যা Next.js 16, React 19, TypeScript এবং Prisma ORM দিয়ে তৈরি। এটি বিশেষ করে প্রিমিয়াম টেক গ্যাজেট এবং লাইফস্টাইল পণ্য বিক্রির জন্য অপ্টিমাইজ করা হয়েছে।",
      },
      purposeAndAudience: {
        en: "Designed for direct-to-consumer tech retail, providing shoppers with an ultra-responsive desktop and mobile shopping journey with instant product search, real-time cart calculations, and zero friction.",
        bn: "প্রিমিয়াম ইলেকট্রনিক্স ক্রেতাদের জন্য তৈরি, যাতে তারা মোবাইল ও ডেস্কটপে যেকোনো ডিভাইস দিয়ে সহজে পছন্দের গ্যাজেট ব্রাউজ, ফিল্টার ও অর্ডার করতে পারেন।",
      },
      problem: {
        en: "Many online shopping sites suffer from slow page loads, bloated third-party trackers, unresponsive filtering, and confusing multi-step checkout processes that frustrate users and cause cart abandonment.",
        bn: "অধিকাংশ ই-কমার্স সাইটে ধীরগতির লোডিং, জটিল চেকআউট প্রক্রিয়া এবং ভারী স্ক্রিপ্টের কারণে ক্রেতারা কেনাকাটা সম্পন্ন না করেই ওয়েবসাইট ত্যাগ করে।",
      },
      solution: {
        en: "Developed a lightweight, highly optimized web storefront using Next.js 16 and Tailwind CSS v4 with instant client-side filtering, interactive product sliders, persistent cart state, and celebratory order feedback.",
        bn: "Next.js 16 ও Tailwind CSS v4 দিয়ে একটি দ্রুতগতির ইন্টারফেস তৈরি করা হয়েছে, যাতে রয়েছে তাৎক্ষণিক ফিল্টারিং, কার্ট পারসিসটেন্স, প্রডাক্ট স্লাইডার এবং নিরবচ্ছিন্ন চেকআউট সুবিধা।",
      },
      keyFeatures: {
        en: [
          "Dynamic product catalog with multi-facet category, price range, and search filtering",
          "Persistent slide-out shopping cart drawer with instant subtotal and coupon calculations",
          "High-definition product showcases with image carousels, specs, and stock availability",
          "Mobile-first responsive layout tested across multiple viewports and orientations",
          "Bilingual language toggle (English and Bengali) for localized shopping accessibility",
          "Interactive celebratory animations on checkout and order submission using Canvas Confetti",
        ],
        bn: [
          "ক্যাটাগরি, মূল্য এবং সার্চ কিওয়ার্ড অনুযায়ী তাৎক্ষণিক ও নিখুঁত প্রোডাক্ট ফিল্টারিং",
          "রিয়েল-টাইম হিসাব ও কুপন সাপোর্টসহ স্লাইড-আউট পারসিস্টেন্ট শপিং কার্ট",
          "হাই-রেজোলিউশন প্রোডাক্ট ক্যারোসেল, স্পেসিফিকেশন এবং স্টক স্ট্যাটাস ভিউ",
          "মোবাইল ও ডেস্কটপ সব ডিভাইসের জন্য সম্পূর্ণ রেসপনসিভ ও ফ্লুইড ইন্টারফেস",
          "বাংলা এবং ইংরেজি উভয় ভাষায় পণ্য দেখার দ্বিভাষিক (Bilingual) ব্যবস্থা",
          "অর্ডার নিশ্চিতকরণে আনন্দদায়ক কনফেটি অ্যানিমেশন ও স্মুথ চেকআউট ফ্লো",
        ],
      },
      verifiedTechStack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Prisma ORM",
        "PostgreSQL",
        "Lucide React",
      ],
      challenges: {
        en: "Maintaining instant UI responsiveness and state synchronization between the cart drawer and product grid across page navigations without incurring unnecessary re-renders.",
        bn: "পেজ ন্যাভিগেশনের মাঝে কার্ট ড্রয়ার এবং প্রোডাক্ট গ্রিডের স্টেট সম্পূর্ণ সিঙ্ক রাখা এবং অপ্রয়োজনীয় রি-রেন্ডার ছাড়াই দ্রুত পারফরম্যান্স নিশ্চিত করা।",
      },
      challengeSolutions: {
        en: "Structured clean React state primitives and optimized local persistence hooks, combined with Tailwind CSS v4's lightweight modern styling engine.",
        bn: "পরিচ্ছন্ন স্টেট ম্যানেজমেন্ট, কাস্টম স্টোরেজ হুকস এবং Tailwind CSS v4 ব্যবহারের মাধ্যমে ইন্টারফেসকে অত্যন্ত হালকা ও দ্রুতগতির রাখা হয়েছে।",
      },
      lessonsLearned: {
        en: "Gained in-depth knowledge of modern e-commerce user journeys, Prisma database integration, responsive catalog architectures, and performance optimization.",
        bn: "ই-কমার্স ইউজার জার্নি ডিজাইন, Prisma ডেটাবেস ইন্টিগ্রেশন এবং কোর ওয়েব ভাইটালস (Core Web Vitals) অপ্টিমাইজেশনের বাস্তব কৌশল অর্জন করেছি।",
      },
      screenshots: [
        {
          id: "ecommerce-screen-1",
          caption: {
            en: "NovaCart Storefront Hero & Audio Electronics Showcase",
            bn: "NovaCart স্টোরফ্রন্ট হিরো ও অডিও ইলেকট্রনিক্স ডিসপ্লে",
          },
          src: "/images/projects/ecommerce.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "logic-lab",
    slug: "logic-lab",
    title: {
      en: "Logic Lab",
      bn: "Logic Lab",
    },
    category: "Web Apps",
    summary: {
      en: "An interactive visual data structures, algorithms, and code logic learning studio combining real-time execution, 3D analogy animations, line-by-line bilingual step explanations, and Gemini AI analysis.",
      bn: "ডাটা স্ট্রাকচার, অ্যালগরিদম ও প্রোগ্রামিং লজিক শেখার একটি ইন্টারঅ্যাক্টিভ ভিজ্যুয়াল স্টুডিও—রিয়েল-টাইম কোড এক্সিকিউশন, ৩ডি অ্যানালজি অ্যানিমেশন, দ্বিভাষিক ব্যাখ্যা এবং জেমিনি এআই অ্যানালাইসিসসহ।",
    },
    verifiedTechTags: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Monaco Editor",
      "Gemini AI",
      "Firebase",
      "Firestore",
    ],
    thumbnailSrc: "/images/projects/logiclab.png",
    isDetailsPending: false,
    statusLabel: {
      en: "Interactive Studio • Deployed",
      bn: "ইন্টারঅ্যাক্টিভ স্টুডিও • সফলভাবে চালিত",
    },
    liveUrl: "https://logiclab-ochre.vercel.app/",
    githubUrl: "https://github.com/fahimhossain1617/Logic_Lab.git",
    caseStudy: {
      overview: {
        en: "Logic Lab (লজিক ল্যাব) is an interactive, visual data structures, algorithms, and programming logic learning studio. It combines real-time 3D analogy animations, line-by-line bilingual (বাংলা / English) step explanations, deterministic code tracing, and AI-powered visual analysis powered by Google Gemini.",
        bn: "Logic Lab (লজিক ল্যাব) হলো প্রোগ্রামিং লজিক, ডাটা স্ট্রাকচার ও অ্যালগরিদম সহজে বোঝার একটি আধুনিক ভিজ্যুয়াল লার্নিং প্ল্যাটফর্ম। এটি ৩ডি অ্যানিমেশন, লাইন-বাই-লাইন বাংলা ও ইংরেজি ব্যাখ্যা এবং গুগল জেমিনি এআই দিয়ে কোড অ্যানালাইসিস করে।",
      },
      purposeAndAudience: {
        en: "Created for computer science students, coding beginners, and developers learning algorithms who find abstract memory pointers, recursion stacks, and loop iterations difficult to grasp from static code alone.",
        bn: "সিএসই শিক্ষার্থী ও নতুন প্রোগ্রামারদের জন্য নির্মিত, যাতে পয়েন্টার সোয়াপ, রিকারশন কল স্ট্যাক এবং লুপের ভেতরের মেমোরি পরিবর্তন তারা সরাসরি চোখে দেখে বুঝতে পারেন।",
      },
      problem: {
        en: "Traditional online judges test whether code passes or fails, but do not visually explain how data flows inside memory or why a bug occurred at line 14. Students often get stuck trying to mentally visualize pointers and stacks.",
        bn: "প্রচলিত অনলাইন জাজ শুধুমাত্র কোড সঠিক নাকি ভুল তা বলে, কিন্তু মেমোরির ভেতরে ভেরিয়েবল কীভাবে পরিবর্তিত হচ্ছে বা কেন বাগ হচ্ছে তা ভিজ্যুয়ালি বুঝিয়ে দেয় না। ফলে শিক্ষার্থীরা অ্যালগরিদম বুঝতে সমস্যায় পড়ে।",
      },
      solution: {
        en: "Built a comprehensive code visualizer with Monaco Editor, custom analogy engines (swap buckets, sort blocks, pointer arrows, recursion towers), a deterministic execution tracer, and Gemini AI for deep logic synthesis.",
        bn: "Monaco কোড এডিটর, কাস্টম ৩ডি অ্যানালজি ইঞ্জিন (সোয়াপ বাকেট, সর্ট ব্লক, পয়েন্টার অ্যারো, রিকারশন টাওয়ার), ডিটারমিনিস্টিক ট্রেসার এবং জেমিনি এআই ব্যবহার করে একটি পূর্ণাঙ্গ ইন্টারঅ্যাক্টিভ স্টুডিও তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "Line-by-line code visualizer stepping through loops, variable assignments, and conditions",
          "Rich bilingual step explanations (Bengali & English) detailing what happened and why",
          "Specialized analogy engines: Swap Buckets, Sort Blocks, Pointer Arrows, and Recursion Tower",
          "Curated 13 DSA problem library featuring both correct logic and bug-hunting test cases",
          "Deterministic sandbox execution paired with Google Gemini AI hybrid tracer",
          "Firebase Auth and Cloud Firestore sync for saving progress, code snippets, and public shares",
        ],
        bn: [
          "লাইন-বাই-লাইন কোড ভিজ্যুয়ালাইজার—লুপ, ভেরিয়েবল অ্যাসাইনমেন্ট ও কন্ডিশন স্টেপিং",
          "বাংলা এবং ইংরেজি উভয় ভাষায় প্রতি লাইনের বিস্তারিত ব্যাখ্যা—কী ঘটেছে এবং কেন ঘটেছে",
          "বিশেষায়িত ৩ডি অ্যানালজি ইঞ্জিন: সোয়াপ বাকেট, বাবল সর্ট ব্লক, টু-পয়েন্টার এবং রিকারশন টাওয়ার",
          "১৩টি বাছাইকৃত ডিএসএ প্রবলেম লাইব্রেরি (সঠিক সমাধান ও বাগযুক্ত কোডসহ)",
          "নিরাপদ ডিটারমিনিস্টিক স্যান্ডবক্স এবং গুগল জেমিনি এআই হাইব্রিড লজিক অ্যানালাইজার",
          "Firebase Auth ও Cloud Firestore সিঙ্ক—কোড স্নsnippet ও প্রোগ্রেস ক্লাউডে সেভ করার সুবিধা",
        ],
      },
      verifiedTechStack: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS v4",
        "Monaco Editor",
        "Framer Motion",
        "Firebase Auth",
        "Cloud Firestore",
        "Gemini API",
        "Node.js/Express",
      ],
      challenges: {
        en: "Building a secure, sandbox environment to trace user-written code step-by-step while extracting variable state changes without freezing the browser during infinite loops.",
        bn: "ব্যবহারকারীর কোডকে নিরাপদে স্যান্ডবক্সে লাইন-বাই-লাইন ট্রেস করা এবং ইনফিনিট লুপ বা মেমোরি ওভারফ্লোতে ব্রাউজার যাতে হ্যাং না করে তা প্রতিরোধ করা।",
      },
      challengeSolutions: {
        en: "Implemented AST instrumentation with execution step limits and deterministic timeouts, synchronizing state with Framer Motion animations.",
        bn: "স্টেপ লিমিট এবং টাইমআউটসহ ডিটারমিনিস্টিক এক্সিকিউশন ইঞ্জিন তৈরি করে নিরাপদ ট্রেসিং নিশ্চিত করা হয়েছে এবং ফ্রেমার মোশন দিয়ে স্মুথ ভিজ্যুয়ালাইজেশন প্রদান করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Mastered code AST parsing, state virtualization, bilingual educational UI design, and cloud synchronization with Google Cloud Firestore.",
        bn: "অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) অ্যানালাইসিস, স্টেট ভার্চুয়ালাইজেশন এবং দ্বিভাষিক এডুকেশনাল প্ল্যাটফর্ম তৈরিতে গভীর প্রযুক্তিগত জ্ঞান লাভ করেছি।",
      },
      screenshots: [
        {
          id: "logic-lab-screen-1",
          caption: {
            en: "Logic Lab Interactive Code Editor & Algorithmic Visualizer",
            bn: "Logic Lab ইন্টারঅ্যাক্টিভ কোড এডিটর ও অ্যালগরিদম ভিজ্যুয়ালাইজার",
          },
          src: "/images/projects/logiclab.png",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "radiation-coaching",
    slug: "radiation-coaching",
    title: {
      en: "Radiation Coaching",
      bn: "Radiation Coaching",
    },
    category: "Business Websites",
    summary: {
      en: "A comprehensive coaching center management web application and academic portal built for Radiation Coaching Zone to manage student enrollment, attendance, routine calendar, and digital exams.",
      bn: "রেডিয়েশন কোচিং সেন্টারের একাডেমিক ব্যাচ, শিক্ষার্থী ভর্তি, ক্লাস রুটিন, উপস্থিতি এবং অনলাইন পরীক্ষার তথ্য ব্যবস্থাপনার জন্য নির্মিত একটি পূর্ণাঙ্গ ক্লায়েন্ট ওয়েব প্ল্যাটফর্ম।",
    },
    verifiedTechTags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Figma Design System",
      "Render",
    ],
    thumbnailSrc: "/images/projects/radiation-coaching.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Academic Platform • Live Client Project",
      bn: "একাডেমিক প্ল্যাটফর্ম • লাইভ ক্লায়েন্ট প্রজেক্ট",
    },
    liveUrl: "https://radiation-coaching-3.onrender.com/",
    githubUrl:
      "https://github.com/fahimhossain1617/Radiation_Coaching_Centre.git",
    caseStudy: {
      overview: {
        en: "Radiation Coaching — Coaching Center Management Web App is a production web application built for Radiation Coaching Zone, a coaching institution in Bangladesh. It digitizes student management, teacher attendance, routine notices, and exams.",
        bn: "Radiation Coaching হলো একটি বাস্তব ক্লায়েন্ট প্রজেক্ট, যা রেডিয়েশন কোচিং সেন্টারের সামগ্রিক অ্যাকাডেমিক কার্যক্রম (শিক্ষার্থী তালিকা, রুটিন, শিক্ষক উপস্থিতি ও অনলাইন পরীক্ষা) ডিজিটালাইজ করার জন্য তৈরি করা হয়েছে।",
      },
      purposeAndAudience: {
        en: "Built for students, teachers, parents, and administrative staff who required a reliable Bengali-language digital platform to replace paper-based attendance, exam notices, and manual schedule updates.",
        bn: "কোচিং সেন্টারের শিক্ষক, শিক্ষার্থী এবং অভিভাবকদের জন্য তৈরি, যাতে ম্যানুয়াল খাতার হিসাব ও মেসেঞ্জারের নোটিশের বদলে একটি সুসংগঠিত প্ল্যাটফর্মে সব তথ্য পাওয়া যায়।",
      },
      problem: {
        en: "The coaching center struggled with lost paper records, communication gaps over exam dates, and cumbersome manual tracking for multi-batch teacher attendance and student routines.",
        bn: "কাগজে উপস্থিতি ও পরীক্ষার ফলাফল সংরক্ষণের কারণে তথ্য হারিয়ে যাওয়ার ঝুঁকি থাকত এবং বিভিন্ন ব্যাচের রুটিন পরিবর্তনের খবর সময়মতো সবার কাছে পৌঁছাত না।",
      },
      solution: {
        en: "Designed and developed a 12+ page responsive web platform with Next.js 15 App Router, React 19, and Tailwind CSS based on an accessible Bengali design system.",
        bn: "Next.js 15 অ্যাপ রাউটার ও Tailwind CSS দিয়ে ১২টিরও বেশি পেজের একটি পূর্ণাঙ্গ রেসপনসিভ ওয়েবসাইট তৈরি করা হয়েছে, যাতে শিক্ষক ও শিক্ষার্থীদের জন্য আলাদা ড্যাশবোর্ড রয়েছে।",
      },
      keyFeatures: {
        en: [
          "Complete 12+ page institutional web interface including landing page, dashboards, and role views",
          "Teacher attendance management interface engineered from scratch",
          "Interactive online examination user interface with question modules",
          "Weekly batch class routine calendar with subject and timing breakdowns",
          "Student admission inquiry portal with transparent course guidelines",
          "Tailored Bengali UI/UX designed specifically for non-technical educators and students",
        ],
        bn: [
          "ল্যান্ডিং পেজ, বিভিন্ন ইউজার ড্যাশবোর্ডসহ ১২টিরও বেশি পেজের স্বয়ংসম্পূর্ণ প্ল্যাটফর্ম",
          "শিক্ষকদের জন্য সম্পূর্ণ কাস্টম এটেনডেন্স (উপস্থিতি) ম্যানেজমেন্ট সিস্টেম",
          "অনলাইনে পরীক্ষা গ্রহণ ও প্রশ্ন প্রদর্শনের আধুনিক এক্সামিনেশন ইন্টারফেস",
          "দিন ও সময় অনুযায়ী সাজানো ইন্টারঅ্যাক্টিভ সাপ্তাহিক ব্যাচ ক্লাস রুটিন",
          "সহজ অনলাইন ভর্তি ও কোর্স সম্পর্কিত তথ্যের সমন্বিত পোর্টাল",
          "অপ্রাতিষ্ঠানিক ও সাধারণ ব্যবহারকারীদের জন্য সহজবোধ্য বাংলা ইউআই/ইউএক্স (Bengali UI/UX)",
        ],
      },
      verifiedTechStack: [
        "Next.js 15 (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Figma Design System",
        "Render",
      ],
      challenges: {
        en: "Structuring complex multi-role dashboards and translating a static Figma design into a production-ready, fully responsive web application in Bengali under real client requirements.",
        bn: "বাস্তব ক্লায়েন্টের চাহিদা অনুযায়ী ফিগমা ডিজাইন সিস্টেমকে সম্পূর্ণ রেসপনসিভ কোডে রূপান্তর করা এবং বিভিন্ন রোলের ব্যবহারকারীদের জন্য সহজ ড্যাশবোর্ড সাজানো।",
      },
      challengeSolutions: {
        en: "Researched modern component structuring patterns, optimized state flow for multi-step forms, and iteratively refined touch targets and typography for maximum accessibility.",
        bn: "মডার্ন কম্পোনেন্ট আর্কিটেকচার, পরিচ্ছন্ন স্টেট ফ্লো এবং মোবাইল ফ্রেন্ডলি টাইপোগ্রাফি ব্যবহারের মাধ্যমে ক্লায়েন্টের জন্য একটি নিখুঁত প্ল্যাটফর্ম বাস্তবায়ন করা হয়েছে।",
      },
      lessonsLearned: {
        en: "First real client software delivery experience; solidified professional client communication, Figma-to-code translation, and Next.js 15 production workflows.",
        bn: "প্রথম বাস্তব ক্লায়েন্ট প্রজেক্ট ডেলিভারির মাধ্যমে সরাসরি ক্লায়েন্টের প্রয়োজনীয়তা বোঝা, ফিগমা থেকে নিখুঁত কোড রূপান্তর এবং বাস্তব সফটওয়্যার আর্কিটেকচারের অমূল্য অভিজ্ঞতা হয়েছে।",
      },
      screenshots: [
        {
          id: "radiation-screen-1",
          caption: {
            en: "Radiation Coaching Center Classroom & Institutional Portal",
            bn: "Radiation Coaching সেন্টার ক্লাসরুম ও প্রাতিষ্ঠানিক পোর্টাল",
          },
          src: "/images/projects/radiation-coaching.jpg",
          isPlaceholder: false,
        },
      ],
    },
  },
  {
    id: "internet-service",
    slug: "internet-service",
    title: {
      en: "Internet Service",
      bn: "Internet Service",
    },
    category: "Business Websites",
    summary: {
      en: "A high-speed fiber broadband subscriber platform and institutional web presence for Sheikh Online Service, featuring package comparison, coverage area verification, and instant connection inquiries.",
      bn: "শেখ অনলাইন সার্ভিসের জন্য নির্মিত একটি আধুনিক ফাইবার ব্রডব্যান্ড ওয়েবসাইট ও সাবস্ক্রাইবার পোর্টাল—ইন্টারনেট প্যাকেজ তুলনা, কভারেজ যাচাই এবং অনলাইন সংযোগ আবেদনের সুবিধাসহ।",
    },
    verifiedTechTags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Canvas Animation",
      "Responsive Grid",
      "UI/UX Design",
    ],
    thumbnailSrc: "/images/projects/internetservice.jpg",
    isDetailsPending: false,
    statusLabel: {
      en: "Client Web Platform • Deployed",
      bn: "ক্লায়েন্ট প্ল্যাটফর্ম • সফলভাবে সম্পন্ন",
    },
    liveUrl: "https://internetservice.vercel.app/",
    githubUrl: "https://github.com/fahimhossain1617/Internet_Service.git",
    caseStudy: {
      overview: {
        en: "Sheikh Online Service (Internet Service) is an institutional web platform and customer subscriber portal built for a fiber internet service provider to present broadband packages, network coverage, and connection requests.",
        bn: "Sheikh Online Service (ইন্টারনেট সার্ভিস) হলো একটি আধুনিক ফাইবার ব্রডব্যান্ড আইএসপি প্রতিষ্ঠানের ওয়েবসাইট, যার মাধ্যমে গ্রাহকরা সহজেই বিভিন্ন গতির ইন্টারনেট প্যাকেজ দেখতে ও সংযোগের আবেদন করতে পারেন।",
      },
      purposeAndAudience: {
        en: "Designed for residential and commercial fiber broadband customers seeking transparent pricing tiers, network coverage verification, and swift online customer onboarding.",
        bn: "বাসাবাড়ি ও বাণিজ্যিক প্রতিষ্ঠানের গ্রাহকদের জন্য তৈরি, যাতে তারা যেকোনো সময় স্বচ্ছ মূল্যে ইন্টারনেট প্যাকেজ তুলনা করে সহজে সংযোগ নিতে পারেন।",
      },
      problem: {
        en: "Traditional ISP providers rely on physical flyers or scattered phone inquiries, making it difficult for prospective subscribers to compare bandwidth speeds or check if fiber is available in their area.",
        bn: "প্রচলিত আইএসপি প্রতিষ্ঠানগুলোতে প্যাকেজের বিস্তারিত তথ্য ও কভারেজ এরিয়া সহজে জানার সুযোগ থাকে না, ফলে গ্রাহকদের বারবার ফোন দিয়ে খোঁজ নিতে হয়।",
      },
      solution: {
        en: "Engineered an immersive, modern single-page web portal with custom hero animation sequences, interactive package cards, coverage checker, and seamless connection request workflows.",
        bn: "চোখজুড়ানো ব্যাকগ্রাউন্ড অ্যানিমেশন, প্যাকেজ সিলেকশন কার্ড, কভারেজ যাচাই এবং অনলাইন আবেদন ফর্মসহ একটি আধুনিক ও নির্ভরযোগ্য ব্রডব্যান্ড প্ল্যাটফর্ম তৈরি করা হয়েছে।",
      },
      keyFeatures: {
        en: [
          "High-impact dark sci-fi visual identity with server rack and fiber optics canvas sequence",
          "Interactive broadband tier cards with bandwidth, buffer-free streaming badges, and pricing",
          "Geographic network coverage lookup and immediate installation request pipeline",
          "Customer self-care service directory and quick account management links",
          "Bilingual language toggle (English and Bengali) for inclusive subscriber access",
          "Ultra-lightweight static architecture with zero third-party framework overhead",
        ],
        bn: [
          "সার্ভার র‍্যাক ও ফাইবার অপটিক্সের দৃষ্টিনন্দন ডার্ক থিম ইন্টারফেস",
          "ব্যান্ডউইথ গতি, স্ট্রিমিং ব্যাজ এবং স্বচ্ছ মূল্যসহ ইন্টারঅ্যাক্টিভ প্যাকেজ কার্ড",
          "এলাকাভিত্তিক নেটওয়ার্ক কভারেজ যাচাই এবং দ্রুত নতুন ইন্টারনেট সংযোগের আবেদন",
          "গ্রাহক সেলফ-কেয়ার ডিরেক্টরি এবং কুইক অ্যাকাউন্ট সার্ভিস লিংক",
          "বাংলা এবং ইংরেজি উভয় ভাষায় পোর্টাল ব্যবহারের চমৎকার সুবিধা",
          "কোনো অতিরিক্ত ভারী ফ্রেমওয়ার্ক ছাড়া সম্পূর্ণ লাইটওয়েট ও দ্রুতগতির পারফরম্যান্স",
        ],
      },
      verifiedTechStack: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "Canvas Animation",
        "Responsive Grid",
        "UI/UX Design",
      ],
      challenges: {
        en: "Rendering high-fidelity smooth fiber optics canvas animation frames without causing memory leaks or stutter on mobile browser viewports.",
        bn: "মোবাইল ও সাধারণ ডিভাইসে ফাইবার অপটিক্স ক্যানভাস অ্যানিমেশন যাতে কোনো ল্যাগ বা মেমোরি সমস্যা ছাড়াই মসৃণভাবে চলে তা নিশ্চিত করা।",
      },
      challengeSolutions: {
        en: "Optimized frame rendering loops with requestAnimationFrame and pre-calculated aspect ratios to maintain 60 FPS performance.",
        bn: "requestAnimationFrame এবং অপ্টিমাইজড রেন্ডারিং লুপ ব্যবহারের মাধ্যমে ৬০ এফপিএস (60 FPS) মসৃণ পারফরম্যান্স নিশ্চিত করা হয়েছে।",
      },
      lessonsLearned: {
        en: "Deepened practical mastery of core web technologies (HTML/CSS/JS), conversion-centered telecommunications UI design, and responsive asset budgeting.",
        bn: "কোর ওয়েব প্রযুক্তি (HTML/CSS/JS)-র শক্তিশালী ব্যবহার, টেলিকম ইউজার এক্সপেরিয়েন্স এবং পারফরম্যান্স অপ্টিমাইজেশনে কার্যকর অভিজ্ঞতা লাভ করেছি।",
      },
      screenshots: [
        {
          id: "internet-service-screen-1",
          caption: {
            en: "Sheikh Online Service High-Speed Fiber Internet Portal",
            bn: "Sheikh Online Service হাই-স্পিড ফাইবার ইন্টারনেট পোর্টাল",
          },
          src: "/images/projects/internetservice.jpg",
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
      en: "CSE Student at UITS",
      bn: "ইউআইটিএস-এ সিএসই শিক্ষার্থী",
    },
    organizationOrContext: {
      en: "UITS, Third Semester",
      bn: "ইউআইটিএস, তৃতীয় সেমিস্টার",
    },
    description: {
      en: "I'm studying CSE at UITS and building a strong base in C, Java, and problem solving. I enjoy connecting what I learn in class with real apps.",
      bn: "আমি ইউআইটিএস-এ সিএসই অধ্যয়ন করছি এবং সি, জাভা ও প্রবলেম সলভিংয়ে শক্ত ভিত্তি তৈরি করছি। ক্লাসের শিক্ষাকে বাস্তব অ্যাপের সাথে যুক্ত করতে আমার খুব ভালো লাগে।",
    },
    highlights: {
      en: [
        "Now in my third semester at UITS",
        "Practicing C and Java every week",
        "Using class lessons in my own projects",
      ],
      bn: [
        "বর্তমানে ইউআইটিএস-এ তৃতীয় সেমিস্টার চলছে",
        "প্রতি সপ্তাহে সি এবং জাভা চর্চা করছি",
        "ক্লাসের শিক্ষাকে নিজের প্রজেক্টে ব্যবহার করছি",
      ],
    },
    isCurrent: true,
  },
  {
    id: "stage-web-dev",
    stageLabel: {
      en: "Core Skill Acquisition • ~6 Months",
      bn: "কোর স্কিল শিক্ষা • প্রায় ৬ মাস",
    },
    title: {
      en: "Learning Web Development",
      bn: "ওয়েব ডেভেলপমেন্ট শেখা",
    },
    organizationOrContext: {
      en: "From Frontend to Full-Stack",
      bn: "ফ্রন্টএন্ড থেকে ফুল-স্ট্যাক",
    },
    description: {
      en: "In about six months, I went from HTML, CSS, and JavaScript to building apps with React, Next.js, TypeScript, and the MERN stack.",
      bn: "প্রায় ছয় মাসে আমি HTML, CSS এবং JavaScript থেকে শুরু করে React, Next.js, TypeScript এবং MERN স্ট্যাক দিয়ে অ্যাপ বানানো শিখেছি।",
    },
    highlights: {
      en: [
        "Responsive layouts, UI/UX, and SEO basics",
        "Reusable components with React, Next.js, and TypeScript",
        "Full-stack apps with MERN and Supabase",
      ],
      bn: [
        "রেসপনসিভ লেআউট, ইউআই/ইউএক্স এবং বেসিক এসইও",
        "React, Next.js এবং TypeScript দিয়ে রিইউজেবল কম্পোনেন্ট",
        "MERN এবং Supabase দিয়ে ফুল-স্ট্যাক অ্যাপস",
      ],
    },
  },
  {
    id: "stage-real-projects",
    stageLabel: {
      en: "Applied Engineering • Current",
      bn: "বাস্তব অ্যাপ্লিকেশন নির্মাণ • চলমান",
    },
    title: {
      en: "Building Apps & Client Projects",
      bn: "অ্যাপ ও ক্লায়েন্ট প্রজেক্ট তৈরি",
    },
    organizationOrContext: {
      en: "My Own Products and Client Work",
      bn: "নিজের প্রোডাক্ট ও ক্লায়েন্টের কাজ",
    },
    description: {
      en: "I built Focentia, a productivity web app, and worked on client websites for e-commerce, internet service, and academic coaching.",
      bn: "আমি Focentia নামের একটি প্রোডাক্টিভিটি ওয়েব অ্যাপ বানিয়েছি এবং ই-কমার্স, ইন্টারনেট সার্ভিস ও একাডেমিক কোচিংয়ের ক্লায়েন্ট ওয়েবসাইটে কাজ করেছি।",
    },
    highlights: {
      en: [
        "Built Focentia, my productivity web app",
        "Made websites for e-commerce, ISP, and education",
        "Focus on clean code, easy design, and real speed",
      ],
      bn: [
        "আমার প্রোডাক্টিভিটি ওয়েব অ্যাপ Focentia তৈরি করেছি",
        "ই-কমার্স, আইএসপি ও এডুকেশনের জন্য ওয়েবসাইট বানিয়েছি",
        "ক্লিন কোড, সহজ ডিজাইন এবং ভালো স্পিডে গুরুত্ব দিই",
      ],
    },
    isCurrent: true,
  },
  {
    id: "stage-future-vision",
    stageLabel: {
      en: "Long-Term Direction • Roadmap",
      bn: "ভবিষ্যৎ লক্ষ্য • রোডম্যাপ",
    },
    title: {
      en: "AI Automation, AI/ML & My Own Agency",
      bn: "এআই অটোমেশন, এআই/এমএল ও নিজস্ব এজেন্সি",
    },
    organizationOrContext: {
      en: "Learning Today, Building Tomorrow",
      bn: "আজ শিখছি, আগামী গড়ছি",
    },
    description: {
      en: "I'm learning AI automation and SEO now. My plan is to grow into AI/ML engineering and one day start my own software and AI agency.",
      bn: "আমি এখন এআই অটোমেশন এবং এসইও শিখছি। আমার পরিকল্পনা হলো এআই/এমএল ইঞ্জিনিয়ারিংয়ে নিজেকে দক্ষ করে তোলা এবং একদিন নিজের সফটওয়্যার ও এআই এজেন্সি শুরু করা।",
    },
    highlights: {
      en: [
        "Learning AI automation and SEO",
        "Moving step by step toward AI/ML",
        "Dream: my own software and AI agency",
      ],
      bn: [
        "এআই অটোমেশন এবং এসইও শিখছি",
        "ধাপে ধাপে এআই/এমএল-এর দিকে এগিয়ে যাচ্ছি",
        "স্বপ্ন: নিজের সফটওয়্যার ও এআই এজেন্সি",
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
      en: "I'm a CSE student at UITS who loves turning ideas into real, working apps. I build web and mobile apps, design clean and simple screens, and use AI to move faster. Right now I'm also learning AI automation and SEO.",
      bn: "আমি ইউআইটিএস-এর একজন সিএসই শিক্ষার্থী, যে আইডিয়াকে বাস্তব ও কার্যকরী অ্যাপে রূপ দিতে ভালোবাসে। আমি ওয়েব ও মোবাইল অ্যাপ বানাই, সহজ ও পরিচ্ছন্ন স্ক্রিন ডিজাইন করি এবং দ্রুত কাজ করতে এআই ব্যবহার করি। বর্তমানে আমি এআই অটোমেশন ও এসইও শিখছি।",
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
      en: "CSE @ UITS (3rd Semester)",
      bn: "সিএসই @ ইউআইটিএস (৩য় সেমিস্টার)",
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
      en: "I'm Md. Fahim Hossain, a full-stack developer, UI/UX designer, and CSE student at the University of Information Technology and Sciences (UITS).",
      bn: "আমি মোঃ ফাহিম হোসেন — একজন ফুল-স্ট্যাক ডেভেলপার, ইউআই/ইউএক্স ডিজাইনার এবং ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্সেস (UITS)-এর সিএসই শিক্ষার্থী।",
    },
    body1: {
      en: "I like building apps that feel simple to use and are ready for real people. I work with JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS, and Supabase, and I care about both how an app looks and how it works.",
      bn: "আমি এমন অ্যাপ তৈরি করতে পছন্দ করি যা সহজে ব্যবহার করা যায় এবং সাধারণ মানুষের উপযোগী। আমি JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS এবং Supabase নিয়ে কাজ করি এবং একটি অ্যাপ দেখতে কেমন এবং কীভাবে কাজ করে—দুটো বিষয়কেই সমান গুরুত্ব দিই।",
    },
    body2: {
      en: "I also use AI tools to build faster, and I'm learning AI automation to save time on everyday tasks. Along the way, I'm learning SEO so the things I build can be found by more people.",
      bn: "আমি দ্রুত কাজ করার জন্য এআই টুলস ব্যবহার করি এবং দৈনন্দিন কাজের সময় বাঁচাতে এআই অটোমেশন শিখছি। এর সাথে সাথে আমি এসইও শিখছি যেন আমার তৈরি কাজগুলো আরও বেশি মানুষের কাছে পৌঁছাতে পারে।",
    },
    cards: [
      {
        label: { en: "ACADEMIC PROFILE", bn: "একাডেমিক প্রোফাইল" },
        value: {
          en: "B.Sc. in Computer Science & Engineering",
          bn: "বি.এসসি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
        },
        sub: {
          en: "UITS, Third Semester",
          bn: "ইউআইটিএস, তৃতীয় সেমিস্টার",
        },
      },
      {
        label: { en: "CORE TECH STACK", bn: "কোর টেকনোলজি" },
        value: {
          en: "React, Next.js, TypeScript, MERN & Supabase",
          bn: "React, Next.js, TypeScript, MERN & Supabase",
        },
        sub: {
          en: "Fast, clean apps for web and mobile",
          bn: "ওয়েব ও মোবাইলের জন্য দ্রুত ও পরিচ্ছন্ন অ্যাপ",
        },
      },
      {
        label: { en: "DESIGN & AI AUTOMATION", bn: "ডিজাইন ও এআই অটোমেশন" },
        value: {
          en: "UI/UX Design & Smart Workflows",
          bn: "ইউআই/ইউএক্স ডিজাইন ও স্মার্ট ওয়ার্কফ্লো",
        },
        sub: {
          en: "Making apps easy to use, and work easier to do",
          bn: "অ্যাপ ব্যবহার সহজ করা এবং কাজকে আরও সহজ করা",
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
    githubRepo: { en: "GitHub", bn: "গিটহাব" },
    viewReadme: { en: "View GitHub README", bn: "গিটহাব README দেখুন" },
    viewAllCta: { en: "View All", bn: "ভিউ অল" },
    exploreAllCta: { en: "Explore All Projects", bn: "এক্সপ্লোর অল প্রজেক্টস" },
    exploreAllSubtitle: {
      en: "Explore all 5 full-stack applications, interactive tools, and client platforms",
      bn: "আমার তৈরি সকল ৫টি প্রজেক্ট এবং বিস্তারিত কেস স্টাডি দেখুন",
    },
    backToHome: { en: "Back to Portfolio", bn: "মূল পোর্টফোলিওতে ফিরে যান" },
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
      en: "How I started, what I've built, and where I want to go.",
      bn: "কীভাবে শুরু করেছি, কী কী বানিয়েছি এবং আমার ভবিষ্যৎ লক্ষ্য।",
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
          en: "Please enter your message or project description.",
          bn: "অনুগ্রহ করে আপনার বার্তা বা প্রজেক্টের বিবরণ লিখুন।",
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
      en: "Full-Stack Developer | UI/UX Designer | AI Automation Learner",
      bn: "ফুল-স্ট্যাক ডেভেলপার | ইউআই/ইউএক্স ডিজাইনার | এআই অটোমেশন শিক্ষার্থী",
    },
    collaborationInvite: {
      en: "Have an idea, a project, or a team that needs a full-stack developer and designer? I'd love to hear about it. Send me a message and let's talk.",
      bn: "আপনার কি কোনো আইডিয়া, প্রজেক্ট বা টিমে একজন ফুল-স্ট্যাক ডেভেলপার ও ডিজাইনার প্রয়োজন? আমি আপনার সাথে আলোচনা করতে আগ্রহী। মেসেজ পাঠান, চলুন কথা বলি।",
    },
    hireAction: {
      en: "Let's Build Together",
      bn: "একত্রে কাজ শুরু করুন",
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
