# Md. Fahim Hossain — Personal Portfolio

A production-ready personal portfolio website built for **Md. Fahim Hossain** (Full-Stack Developer | AI Automation Enthusiast, CSE Student at UITS).

---

## 1. Key Features & Architecture

- **Design System**: Editorial, luxury-inspired dark/light theme (`#0B0B0B` Black, `#8B0D1A` Crimson Red, `#F5F2ED` Off-White) with zero fabricated statistics or agency fluff.
- **Identity Preservation & Pencil Sketch Reveal**: Uses the exact approved portrait (`public/images/fahim-portrait.png`) with an SVG graphite filter + progressive stroke reveal animation and an interactive replay control.
- **Bilingual Support**: Complete English (`en`, default) and Bangla (`bn`) language toggle with persisted preferences and `Hind Siliguri` + `Inter` typography.
- **Projects & Expandable Case Studies**: Category filtering (`All`, `Web Apps`, `E-commerce`, `Business Websites`) and detailed 13-field expandable case studies for:
  1. **Focentia** (Productivity Web App)
  2. **E-commerce Website**
  3. **Internet Service Provider Website**
  4. **Radiation Coaching Website**
- **Secure Contact Pipeline & WhatsApp Handoff**:
  - 4 required fields (`Name`, `Email Address`, `Phone Number`, `Work / Project Description`).
  - Server-side validation, sanitization, honeypot spam protection, and IP rate limiting in `src/app/api/contact/route.ts`.
  - Transactional email delivery to `fahimhossain1617@gmail.com` via **Resend**.
  - Never fakes delivery success when `RESEND_API_KEY` is unconfigured.
  - Portrait-based delivery confirmation animation + explicit **"Also Send via WhatsApp"** prefilled click-to-chat handoff (`+8801947281437`).

---

## 2. Local Setup & Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

---

## 3. Environment Variables (`.env.local` & Vercel)

| Variable | Required | Description |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Yes (for live email delivery) | Server-side API key from [Resend](https://resend.com/api-keys). Never exposed to the browser. |
| `RESEND_FROM_EMAIL` | Optional | Verified sender address in Resend (defaults to `onboarding@resend.dev` for testing). |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical production domain (e.g., `https://your-domain.vercel.app`). |

---

## 4. Updating Placeholders Before Launch

All personal links, GitHub profile URL, project live URLs, repository links, screenshots, and case study details are centralized in a single file:

- [`src/data/portfolio.ts`](src/data/portfolio.ts)

To replace any placeholder:
1. Set `PERSONAL_INFO.contact.githubUrl` to your GitHub profile URL.
2. In `PROJECTS`, update `liveUrl`, `githubUrl`, `thumbnailSrc`, and `caseStudy` fields for Focentia, E-commerce Website, Internet Service Provider Website, and Radiation Coaching Website.

---

## 5. Deploying to Vercel

1. Push this repository to GitHub/GitLab or run `npx vercel` from the project root.
2. In the **Vercel Dashboard → Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
3. Trigger a production deployment (`npm run build` is executed automatically by Vercel).
