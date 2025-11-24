Futura Identities/
├── app/
│   ├── (pages)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── products-capabilities/
│   │   │   └── page.tsx
│   │   └── what-we-do/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx                    # Home page
│   ├── globals.css
│   ├── favicon.ico
│   └── not-found.tsx              # 404 page (optional)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── InnovatorsSection.tsx
│   │   ├── ComprehensiveSolutions.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── ProductsCapabilities.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── TrustedClients.tsx
│   ├── about/
│   │   └── # About page specific components
│   ├── services/
│   │   └── # Services page specific components
│   ├── products/
│   │   └── # Products page specific components
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── Badge.tsx
│   └── shared/
│       ├── NewsletterSubscribe.tsx
│       ├── IndustryCard.tsx
│       └── ProductCard.tsx
│
├── lib/
│   ├── utils.ts                   # Utility functions (cn, etc.)
│   ├── constants.ts               # Constants and config
│   └── api.ts                     # API calls (if needed)
│
├── types/
│   ├── index.ts                   # Main types export
│   ├── product.types.ts
│   ├── service.types.ts
│   └── testimonial.types.ts
│
├── data/
│   ├── industries.ts              # Industries data
│   ├── products.ts                # Products & capabilities data
│   ├── testimonials.ts            # Customer testimonials
│   ├── clients.ts                 # Trusted clients logos
│   └── services.ts                # Services data
│
├── hooks/
│   ├── useScrollAnimation.ts      # Custom hooks
│   └── useMediaQuery.ts
│
├── styles/
│   └── animations.css             # Custom animations
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── industries/
│   │   ├── products/
│   │   ├── testimonials/
│   │   ├── clients/
│   │   └── about/
│   ├── icons/
│   │   └── # SVG icons
│   └── logos/
│       ├── logo.svg
│       └── logo-white.svg
│
├── node_modules/
├── .gitignore
├── .env.local                     # Environment variables
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json