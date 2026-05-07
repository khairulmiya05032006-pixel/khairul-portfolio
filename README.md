# Khairul Miya — Full Stack Developer Portfolio

A production-ready, highly optimized, and secure portfolio website built with Next.js (App Router), React, and Tailwind CSS.

## 🚀 Key Features

- **Modern UI/UX**: Clean, responsive, and accessible design with smooth Framer Motion animations.
- **Dark/Light Mode**: First-class system preference detection with manual override capabilities.
- **Performance Optimized**: Perfect Lighthouse scores. Utilizes Next.js `<Image>` optimization (AVIF/WebP), efficient font loading, and strict payload size control.
- **Secure Contact Form**: 
  - Server-side email delivery via Next.js Route Handlers.
  - No exposed API keys on the frontend.
  - Zod validation for robust type safety and schema enforcement.
  - Server-side sanitization against XSS/HTML injection.
  - Rate-limited and honeypot-protected to prevent spam bots.
- **SEO Ready**: Fully configured Open Graph metadata, Twitter Cards, semantic HTML, `robots.txt`, `sitemap.xml`, and JSON-LD structured data.
- **Accessible**: ARIA landmarks, `aria-live` regions for form feedback, proper contrast ratios, and keyboard navigability.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Email Delivery**: [EmailJS](https://www.emailjs.com/) (via Server-Side REST API)

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js 18.17 or later installed.

### Environment Setup

1. Create a `.env.local` file in the root directory.
2. Add your EmailJS credentials (required for the contact form to work):

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

*Note: Ensure "Allow EmailJS API for non-browser applications" is enabled in your EmailJS account security settings to use the Private Key.*

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
```

## 🌐 Deployment (Vercel)

This project is fully optimized for zero-config deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `EMAILJS_*` environment variables in the Vercel project settings.
4. Deploy!

## 📜 License

This project is for personal portfolio use.
