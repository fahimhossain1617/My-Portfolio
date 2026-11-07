import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://fahim-portfolio.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFF" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Md. Fahim Hossain | Full-Stack Developer | UI/UX Designer | AI Automation Learner",
    template: "%s | Md. Fahim Hossain",
  },
  description:
    "Personal portfolio of Md. Fahim Hossain — Full-Stack Developer, UI/UX Designer, and Computer Science & Engineering (CSE) student at UITS. Explore projects including Focentia, web apps, and contact details.",
  keywords: [
    "Md. Fahim Hossain",
    "Fahim Hossain",
    "Full-Stack Developer Bangladesh",
    "AI Automation Enthusiast",
    "UITS CSE",
    "Focentia",
    "Next.js Developer",
    "React Developer",
  ],
  authors: [{ name: "Md. Fahim Hossain" }],
  creator: "Md. Fahim Hossain",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    url: siteUrl,
    siteName: "Md. Fahim Hossain — Portfolio",
    title: "Md. Fahim Hossain | Full-Stack Developer & AI Automation Enthusiast",
    description:
      "Full-Stack Developer & AI Automation Enthusiast studying B.Sc. in CSE at UITS. Explore real web applications, case studies, and developer journey.",
    images: [
      {
        url: "/images/fahim-portrait.png",
        width: 1024,
        height: 1024,
        alt: "Md. Fahim Hossain — Full-Stack Developer | AI Automation Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Fahim Hossain | Full-Stack Developer & AI Automation Enthusiast",
    description:
      "Personal portfolio of Md. Fahim Hossain — Full-Stack Developer, AI Automation Enthusiast, and CSE student at UITS.",
    images: ["/images/fahim-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Valid Schema.org Person & ProfilePage JSON-LD (Strictly verified personal info only)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Md. Fahim Hossain",
      jobTitle: "Full-Stack Developer | AI Automation Enthusiast",
      email: `mailto:${PERSONAL_INFO.contact.email}`,
      url: siteUrl,
      image: `${siteUrl}/images/fahim-portrait.png`,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Information Technology and Science (UITS)",
      },
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "MERN Stack",
        "Supabase",
        "Java",
        "C",
        "AI Automation",
        "UI/UX Design",
        "SEO",
      ],
      sameAs: [
        PERSONAL_INFO.contact.linkedinUrl,
        ...(PERSONAL_INFO.contact.githubUrl ? [PERSONAL_INFO.contact.githubUrl] : []),
      ],
    },
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${hindSiliguri.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('fahim_portfolio_theme');if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
