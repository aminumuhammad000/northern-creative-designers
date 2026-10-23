# Northern Creative Designers Design System (`BRAND_SYSTEM.md`)

This document serves as the implementation-level single source of truth for the **Northern Creative Designers Summit 2.0 digital platform**. It translates the official brand guideline (`northern-creative-designers-brand.md`), color palette assets (`northern-creative-designers-palette/`), typography assets (`cabinet-grotesk/`), and official logo suites (`northern-creative-designers-logos/`) into verifiable code tokens and design rules.

---

## 1. Brand Asset Inventory & Source Files

| Asset Category | File Path / Directory | Source File Metadata | Purpose & Role |
| :--- | :--- | :--- | :--- |
| **Brand Guide** | `northern-creative-designers-brand.md` | Markdown documentation (6.3 KB) | Authoritative core specification |
| **Color Tokens** | `northern-creative-designers-palette/palette.css`<br>`northern-creative-designers-palette/palette.json` | CSS Root tokens & JSON schema | Exact official hex and RGB color definitions |
| **Typography** | `cabinet-grotesk/` (8 OTF files)<br>`public/fonts/` | OpenType font files (Thin to Black) | Primary display and heading typeface |
| **Logos** | `northern-creative-designers-logos/Frame 7.png` | 1080 × 1080 RGBA PNG | **Symbol**: The official mark on its own |
| **Logos** | `northern-creative-designers-logos/NGD-logoArtboard-1-copy-2.png` | 1080 × 437 RGBA PNG | **Wordmark (White Text)**: For dark backgrounds (Pine/Navy) |
| **Logos** | `northern-creative-designers-logos/NGD-logoArtboard-1-copy-3.png` | 1056 × 410 RGBA PNG | **Wordmark (Pine Text)**: For light backgrounds (White/Sand) |
| **Social / App Icon** | `northern-creative-designers-social/northern-creative-designers-profile-picture.png` | 1080 × 1080 RGBA PNG | **App Icon & Social Avatar**: Official mark centered on Pine |
| **Social Banner** | `northern-creative-designers-social/northern-creative-designers-banner.png` | 1500 × 500 RGBA PNG | Official brand graphic composition |

---

## 2. Official Color System

### 2.1 Brand Palette & Distribution

The official brand guideline prescribes a strict proportional balance across user interfaces:

```
┌──────────────────────────────────────┬────────────────────┬──────────┬──────┬──┐
│             Spring (50%)             │     Pine (27%)     │Tanger(13)│Whi(7)│N3│
└──────────────────────────────────────┴────────────────────┴──────────┴──────┴──┘
```

| Name | Hex Code | RGB | HSL (approx) | Proportional Target | Web System Token | Semantic Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Spring** | `#03D06B` | `3, 208, 107` | `150°, 97%, 41%` | **50%** | `--color-spring` | Primary brand accent, primary CTA buttons, active indicators |
| **Pine** | `#013811` | `1, 56, 17` | `137°, 96%, 11%` | **27%** | `--color-pine` | Section headers, dark surface containers, footer background |
| **Tangerine** | `#FF8500` | `255, 133, 0` | `31°, 100%, 50%` | **13%** | `--color-tangerine` | Live badges, edition markers ("Summit 2.0"), category pills |
| **White** | `#FFFFFF` | `255, 255, 255`| `0°, 0%, 100%` | **7%** | `--color-white` | Card backgrounds, elevated surface layers, high-contrast light text |
| **Navy** | `#140949` | `20, 9, 73` | `250°, 78%, 16%` | **3%** | `--color-navy` | Primary body typography on light backgrounds, deep contrasts |

### 2.2 Functional and Neutral Extensions
To ensure accessibility, border definitions, and subtle background contrast without polluting official colors, the following neutral tokens are explicitly isolated:

- `--color-neutral-sand`: `#FBFBF9` (Subtle off-white background for visual rhythm).
- `--color-neutral-border`: `#E8EAE8` (Soft border color preserving 1px structural definition).
- `--color-spring-hover`: `#02B25B` (Darkened hover transition for primary buttons).
- `--color-pine-light`: `#02571A` (Hover transition for dark Pine buttons).

### 2.3 Verified WCAG 2.2 Contrast Pairs
The color system strictly adheres to the contrast criteria evaluated in `northern-creative-designers-brand.md`:

| Foreground | Background | Contrast Ratio | WCAG 2.2 Rating | Primary Use Cases |
| :--- | :--- | :--- | :--- | :--- |
| Navy (`#140949`) | White (`#FFFFFF`) | **18.0:1** | **AAA** | Default body text on white cards and surfaces |
| White (`#FFFFFF`) | Navy (`#140949`) | **18.0:1** | **AAA** | Light body text on navy containers |
| White (`#FFFFFF`) | Pine (`#013811`) | **13.3:1** | **AAA** | Headings, buttons, and text inside footer and dark banners |
| Pine (`#013811`) | White (`#FFFFFF`) | **13.3:1** | **AAA** | Section headings (`h2`, `h3`) and prominent badges |
| Navy (`#140949`) | Spring (`#03D06B`)| **8.8:1** | **AAA** | **Primary Button text** (`bg-spring text-navy`) |
| Spring (`#03D06B`)| Navy (`#140949`) | **8.8:1** | **AAA** | Accents, badges, and status lights on dark cards |
| Navy (`#140949`) | Tangerine (`#FF8500`)| **7.4:1** | **AAA** | Live sprint and hackathon tags |
| Pine (`#013811`) | Spring (`#03D06B`)| **6.5:1** | **AA** | Secondary button borders and badges |

---

## 3. Typography Configuration

### 3.1 Typeface Assignment
- **Primary Typeface**: **Cabinet Grotesk**
  - **Weights loaded**: 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extrabold).
  - **Source files**: Local `.otf` files mapped in `public/fonts/` loaded via `next/font/local`.
  - **Headlines guideline rule**: Headlines set at 500 Medium, line-height 0.92–1.1, letter-spacing -1.5% to -2.5%.
- **Secondary Typeface**: **Inter**
  - **Weights loaded**: 400 (Regular), 500 (Medium), 600 (Semibold).
  - **Source**: Google Fonts via `next/font/google`.
  - **Guideline rule**: Text at 400 Regular, line-height 1.4–1.5, letter-spacing 0%.

### 3.2 Formal Type Hierarchy Scale

| Role | Class | Desktop Size | Mobile Size | Line Height | Letter Spacing | Font Family | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `.type-display` | 64px (`4rem`) | 40px (`2.5rem`) | `1.0` | `-0.025em` (-2.5%) | Cabinet Grotesk | 500 (Medium) |
| **Heading** | `.type-heading` | 40px (`2.5rem`) | 30px (`1.875rem`)| `1.1` | `-0.015em` (-1.5%) | Cabinet Grotesk | 500 (Medium) |
| **Subheading**| `.type-subheading`| 24px (`1.5rem`)| 20px (`1.25rem`)| `1.25` | `0` (Normal) | Cabinet Grotesk | 500 (Medium) |
| **Body** | `.type-body` | 16px (`1rem`) | 15px (`0.9375rem`)| `1.4` | `0` (Normal) | Inter | 400 (Regular) |
| **Caption** | `.type-caption` | 12px (`0.75rem`)| 11px (`0.6875rem`)| `1.4` | `+0.01em` (+1%) | Inter | 400 (Regular) |

---

## 4. Logo Usage & Clear Space Rules

### 4.1 Variations and Background Compatibility Matrix

| Logo Variant | Target Background | File Used | Rendering Specification |
| :--- | :--- | :--- | :--- |
| **Symbol Mark** | White, Spring, Sand, Dark surfaces | `public/images/logos/symbol-mark.png` | Square icon format (e.g. 40×40px or 48×48px) |
| **Wordmark (Light)**| White (`#FFFFFF`), Sand (`#FBFBF9`), Spring (`#03D06B`) | `public/images/logos/wordmark-pine.png` | Dark Pine typography (`#013811`) |
| **Wordmark (Dark)** | Pine (`#013811`), Navy (`#140949`), Dark Media | `public/images/logos/wordmark-white.png` | Pure White typography (`#FFFFFF`) |
| **App Icon / Favicon**| Browser Tabs, App Docks, PWA Manifest | `public/images/logos/app-icon.png` | Centered symbol on Pine canvas |

### 4.2 Proportions and Clear Space Rules
1. **Clear Space**: A minimum boundary of **50% of the logo's height** is maintained on all four sides across all viewports.
2. **Proportions**: Logos are rendered with fixed aspect ratios (`h-7 w-auto` or explicit Next.js `<Image />` dimensions) to prevent stretching, distortion, or artificial scaling.
3. **Logo Integrity**: Logos are never recolored outside the approved White or Pine specifications.

---

## 5. Technology Partner Representation

- **Partner Name**: **Amee Technology Ltd**
- **Agreed Role**: Official Technology Partner.
- **Website URL**: `https://ameetechnology.com.ng`.
- **Approved Logo**: `public/images/partners/amee-tech-logo.png` (Light surface) and `amee-tech-logo-white.png` (Dark surface).
- **Attribution Rule**: Amee Technology Ltd is recognized as the technology partner and website engineering sponsor. It is displayed in the agreed top bar, dedicated partner section, and footer acknowledgment. Northern Creative Designers retains sole summit ownership and executive committee attribution.

---

## 6. Component System Conventions

### 6.1 Buttons
- **Primary Button**: `bg-spring text-navy hover:bg-[#02b25b]` (8.8:1 AAA contrast). Used for primary summit actions: *Register to Attend*, *Apply for Booth*.
- **Secondary Button**: `bg-pine text-white hover:bg-pine-light` (13.3:1 AAA contrast). Used for major navigational triggers: *Explore the Programme*, *Full Manifesto*.
- **Outline Button**: `border-2 border-pine text-pine hover:bg-pine/5`. Used for alternative secondary paths.

### 6.2 Containers & Layout
- **Max Content Width**: `max-w-7xl` (`1280px`) with responsive padding `px-4 sm:px-6 lg:px-8`.
- **Corner Radii**:
  - Cards: `rounded-2xl` (`16px`).
  - Small elements & Badges: `rounded-lg` (`8px`) or `rounded-full` (`9999px`).
- **Focus Rings**: Accessible 2px Spring ring (`outline: 2px solid #03d06b; outline-offset: 2px`) for keyboard accessibility complying with WCAG 2.2 AA.

---

## 7. Ambiguities Resolved & Governance Notes

1. **Section Headers Color**: The brand guide explicitly states *"Section headers in the guide use Pine."* All `<h2>` and `<h3>` section titles use `--color-pine` on light backgrounds and `--color-white` on dark backgrounds.
2. **Missing Speaker Roster**: Adhering to strict publishing governance, speaker announcements are presented as an official announcement state with a call for session proposals, rather than fabricating unconfirmed profiles.
3. **Confirmed Event Data**: 
   - Date: **19th December, 2026**.
   - Venue: **Kano, Nigeria**.
   - Registration Number: **RC 9930022**.
   - Corporate Sponsorship Account: **Northern Creative Designers, KUDA MFB, 3004513846**.
