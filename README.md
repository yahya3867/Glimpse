# Glimpse

A production-ready marketing site for Glimpse - 12-second videos that show what your product actually does.

## About Glimpse

Glimpse turns a startup's core feature into a sharp 12-second video founders can drop on their landing page, socials, or demo day deck. Founders describe their product in one line; Glimpse's AI maps it to a visual metaphor, generates a prompt, and outputs a cinematic micro-spot that makes the value instantly clear.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd glimpse
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
glimpse/
├── app/                    # Next.js app directory
│   ├── docs/              # Documentation page
│   ├── examples/          # Examples page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cta-banner.tsx    # CTA section
│   ├── examples-strip.tsx # Examples carousel
│   ├── glow-background.tsx # Background glow effects
│   ├── hero.tsx          # Hero section
│   ├── how-it-works.tsx  # How it works section
│   ├── pricing-teaser.tsx # Pricing section
│   ├── scroll-reveal.tsx # Scroll animation wrapper
│   ├── site-footer.tsx   # Footer component
│   ├── site-header.tsx   # Header/nav component
│   └── use-cases.tsx     # Use cases section
├── lib/                   # Utilities
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Features

- 🎨 **Dark theme** with subtle glow effects
- 🎬 **Cinematic design** inspired by modern AI product studios
- 📱 **Fully responsive** mobile-first design
- ⚡ **Performance optimized** with GPU-friendly animations
- ♿ **Accessible** with semantic HTML and proper ARIA labels
- 🔍 **SEO ready** with proper metadata

## Pages

- **Home** (`/`) - Main landing page with all sections
- **Docs** (`/docs`) - API documentation stub
- **Examples** (`/examples`) - Grid of example videos

## Customization

### Colors

Edit the color scheme in `app/globals.css` by modifying the CSS variables:

```css
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Content

- Update brand copy in component files
- Modify examples in `components/examples-strip.tsx` and `app/examples/page.tsx`
- Adjust pricing tiers in `components/pricing-teaser.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

```bash
npm run build
npm start
```

The production build will be in the `.next` folder.

## License

All rights reserved.
