# Atomity — Cloud Convergence Dashboard

Built with **Next.js 16** · **React 19** · **Tailwind CSS v4** · **GSAP** · **TanStack Query**

[Live Demo](https://atomity-cloud-converge.vercel.app/)

---

## 🎯 Feature Choice: Multi-Cloud Convergence

I chose **Option B** (the 0:45–0:55 segment) because it represents the main goal of modern apps: **turning messy data into a simple view**.

### The Problem

Imagine you have bank accounts at four different banks. To know your actual net worth, you'd need to open four separate apps, manually add things up, and hope you didn't miss anything. It's exhausting.

Companies face this exact problem with cloud infrastructure. Their workloads are split across **AWS**, **Azure**, **Google Cloud**, and **On-Premise** servers — each with its own billing dashboard, its own format, its own login. The data is everywhere. The clarity is nowhere.

### What This Feature Does

This UI acts as a **"Master View"** that visually pulls scattered cloud cost data into a single, unified dashboard. As the user scrolls, cloud provider badges are magnetically drawn into a central processor, which then outputs a clean bar chart and a total spend figure.

Every animation serves the story: chaos becomes order.

### Why I Picked It

This feature naturally exercises multiple frontend skills at once:

- **Data fetching** — real pricing from an external API, cached and transformed
- **Scroll-driven animation** — a four-phase GSAP timeline with precise easing
- **Component composition** — badges, charts, and dashboards as reusable, isolated units
- **Theming** — dark/light mode powered entirely by CSS variable swaps
- **Responsive design** — works from 375px phones to 1280px+ desktops

---

## 🎭 Animation: The "Magnetic Funnel"

### Why GSAP Over Framer Motion

I needed to coordinate four overlapping animation phases in a single timeline, pin the viewport during the sequence, and tween non-standard targets like closure variables (for the count-up) and DOM `data-*` attributes.

Framer Motion handles simple transitions well, but GSAP's **Timeline API** and **ScrollTrigger plugin** give the fine-grained control this feature demands. I isolated all imperative GSAP logic inside `ConvergenceSection.tsx` and used `gsap.context()` for clean React lifecycle management.

### The Four Phases

The entire animation is one GSAP timeline. A single scroll downward triggers the full sequence:

| Phase | Timing | What Happens | Ease | Why |
|:------|:-------|:-------------|:-----|:----|
| **Chaos → Pull** | 0 – 0.5 | Cloud badges fly from scattered positions toward the dashboard center | `power3.inOut` | Smooth ramp-up and ramp-down — feels like a gravitational pull |
| **Absorption** | 0.4 – 0.6 | Badges shrink to zero and fade out (overlaps with Phase 1) | `power2.in` | Accelerates into nothing — they get "swallowed" |
| **Chart Rise** | 0.5 – 0.8 | Bar chart grows from 0% to each provider's calculated height | `power4.out` | Heavy deceleration — the bars feel weighted as they lock into place |
| **Count-Up** | 0.6 – 0.9 | The total spend number counts from $0 to the final value | `power2.out` | Slows down at the end so the final number is readable |

### What Makes It Feel Right

- **Staggered timing** — badges don't move together. They converge with `stagger: { each: 0.05, from: "random" }`, giving the motion an organic, non-robotic feel.
- **Overlapping phases** — Phase 2 starts *before* Phase 1 finishes. There's no awkward pause between convergence and disappearance.
- **No bounce or overshoot** — all eases are power-based. The motion feels precise and professional, not playful.
- **Reduced motion support** — users with `prefers-reduced-motion` enabled skip all animation and see the final state instantly.

---

## 🎨 Design Tokens & Styling

### Token Architecture

I followed a **"single source of truth"** approach. Every color, spacing value, and radius is defined as a CSS custom property inside `globals.css` using Tailwind v4's `@theme` directive:

```css
@theme {
  --color-bg-primary: #0a0a0b;
  --color-accent-aws: #ff9900;
  --radius-card: 12px;
  --spacing-container: clamp(1rem, 5vw, 3rem);
}
```

These variables are also mirrored in `tokens/colors.ts` as JS references (`tokens.colors.bgPrimary → "var(--color-bg-primary)"`), so components that need color values outside of Tailwind classes (like GSAP inline styles) can still stay in sync with the system.

### Dark/Light Theming

Dark mode is the default. Light mode works by overriding every CSS variable under a `[data-theme="light"]` selector:

```css
[data-theme="light"] {
  --color-bg-primary: #f8f9fb;
  --color-text-primary: #111827;
  --color-border-primary: rgba(0, 0, 0, 0.1);
  /* ...every token gets a light-appropriate value */
}
```

A `ThemeProvider` (React Context) manages the toggle, persists the user's choice to `localStorage`, and sets the `data-theme` attribute on `<html>`. Because every component uses Tailwind classes that reference these variables (`bg-bg-primary`, `text-text-secondary`), the entire UI adapts without any component-level theme logic. The switch is effectively pure CSS — no re-renders needed for color changes.

### Typography

The project uses the **Geist** font family (loaded via `next/font/google`), registered as `--font-geist-sans` and consumed through `--font-sans` in the theme. It has a clean, technical feel that fits the precision of cloud cost data.

### Modern CSS Features Used

| Feature | Where | Purpose |
|:--------|:------|:--------|
| `clamp()` | Hero heading | Fluid typography that scales smoothly from mobile to desktop |
| CSS custom properties | Entire project | Theme-aware design tokens that swap instantly on toggle |
| `mask-image` | MainDashboard | Content fades into the card's top edge for a polished "receiver" look |
| Tailwind v4 `@theme` | globals.css | Native CSS variable registration — no `tailwind.config.js` needed |

---

## 📡 Data Fetching & Caching

### The Flow

1. **`useCloudData()`** fetches 12 products from the [DummyJSON API](https://dummyjson.com/products?limit=12)
2. The 12 products are split into **4 groups of 3** — one group per cloud provider
3. Each group's `price` fields are summed and multiplied by `124.5` to generate realistic cloud spend figures
4. The grand total is calculated from all four groups combined

### Why DummyJSON Over JSONPlaceholder

DummyJSON returns products with actual `price` fields, which makes the cost calculations meaningful. JSONPlaceholder only has posts with `id` and `title` — I'd have to fabricate prices from IDs, which feels artificial.

### Caching Strategy

```ts
useQuery<Post[]>({
  queryKey: ["cloud-data"],
  queryFn: async () => { ... },
  staleTime: 5 * 60 * 1000,  // Data stays fresh for 5 minutes
});
```

TanStack Query handles the heavy lifting:

- **No redundant fetches** — if you scroll away and come back, the cached data is still there
- **Shared cache** — any component calling `useCloudData()` reads from the same cache entry
- **Background updates** — stale data is silently refreshed without blocking the UI

The `QueryClient` is configured in a `QueryProvider` that wraps the entire app at the layout level.

---

## 🛠 Libraries Used

| Library | Why I Chose It |
|:--------|:---------------|
| **Next.js 16** | App Router, server components, `next/font` for optimized font loading |
| **React 19** | Latest stable — improved hydration and concurrent rendering |
| **Tailwind CSS v4** | `@theme` directive for native CSS variable tokens without a config file |
| **GSAP + ScrollTrigger** | Production-grade timeline orchestration with scroll-pinning support |
| **TanStack React Query** | Declarative data fetching with built-in caching and background sync |
| **Axios** | HTTP client with base URL config and interceptor support |
| **react-icons** | Brand-accurate SVG icons for AWS, Azure, Google Cloud, and On-Premise |

All UI components are **built from scratch** — no pre-made component libraries like Shadcn or MUI.

---

## 📁 Project Structure

```
app/
├── page.tsx                          # Main page — Hero + ConvergenceSection + Footer
├── layout.tsx                        # Root layout — fonts, metadata, providers
├── globals.css                       # Design tokens (@theme) + dark/light overrides
│
├── components/
│   ├── ui/
│   │   ├── Header.tsx                # Fixed nav with hamburger menu + theme toggle
│   │   ├── Footer.tsx                # Semantic footer with social links
│   │   ├── CloudBadge.tsx            # Reusable badge for each cloud provider
│   │   ├── MainDashboard.tsx         # Central "Unified Spend" card with bar chart
│   │   ├── ConvergenceSection.tsx    # Scroll animation orchestrator (GSAP timeline)
│   │   └── ThemeToggle.tsx           # Animated dark/light mode button
│   └── providers/
│       ├── QueryProvider.tsx         # TanStack Query client wrapper
│       └── ThemeProvider.tsx         # Dark/light theme context + localStorage
│
├── hooks/
│   ├── useCloudData.ts              # Fetches product data from DummyJSON
│   └── useApiData.ts                # Generic API data hook
│
├── lib/
│   └── api.ts                       # Axios instance config (base URL, interceptors)
│
├── tokens/
│   ├── colors.ts                    # Color token JS references
│   ├── spacing.ts                   # Spacing scale
│   ├── radius.ts                    # Border radius values
│   └── index.ts                     # Barrel export
│
└── constants/
    └── icons.tsx                    # Cloud provider icons (react-icons)
```

---

## ⚖️ Tradeoffs & Decisions

| Decision | What I Gained | What I Gave Up |
|:---------|:-------------|:---------------|
| **GSAP over Framer Motion** | Full timeline control, ScrollTrigger pinning, and the ability to tween non-React targets | GSAP is imperative — I had to isolate it carefully with `gsap.context()` for cleanup |
| **DummyJSON over JSONPlaceholder** | Real `price` fields on products — no fabricated data | Slightly less common API, but the response shape is well-documented |
| **CSS variables for theming** | Theme toggle is instant (pure CSS, zero re-renders) | GSAP inline styles have to explicitly use `var()` references instead of Tailwind classes |
| **`toggleActions` over `scrub`** | One scroll triggers the full cinematic sequence | Users lose the "drag to control" feel of scrub-based animation |
| **Single GSAP timeline** | All four phases stay perfectly synchronized | The entire animation re-initializes if the underlying data changes (rare with 5-minute caching) |
| **Client-only animation component** | GSAP gets full DOM access | The convergence section isn't server-rendered, but the hero and layout still are |
| **Self-built UI** | Full control, no dependency bloat, every component is tailored | Took longer than dropping in Shadcn cards, but the result fits the design system exactly |

---

## 🚀 What I'd Improve With More Time

- **Interactive drill-down** — clicking a chart bar could expand a breakdown panel showing individual resources within that provider
- **Skeleton morphing** — instead of swapping skeletons for real bars, animate the skeleton shapes *into* the final chart bars for a seamless transition
- **Particle effects** — add a subtle data-stream or particle burst when badges are "absorbed" into the dashboard receiver
- **Physics-based badge layout** — use viewport-aware positioning instead of fixed percentages, so badges scatter naturally on any screen ratio
- **Full accessibility audit** — run axe-core for WCAG 2.2 AA compliance; add `aria-live` announcements at each animation phase
- **E2E testing** — Playwright tests for the scroll animation, theme toggle persistence, and responsive breakpoints
- **Performance profiling** — measure paint performance on low-end devices; apply `will-change` and GPU layer promotion where needed
- **Mobile animation variant** — on very small screens, use a vertical "waterfall" pattern instead of radial convergence

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) and scroll down to see the Cloud Convergence in action.
