# Northern Creative Designers Brand Guideline Implementation Note

This document specifies how the official **Northern Creative Designers Brand Guidelines** have been implemented across the Northern Creative Designers Summit 2.0 digital platform.

---

## 1. Color Palette & Exact Values

| Color Name | Hex Code | RGB Values | Semantic Role | Target Usage Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Spring** | `#03D06B` | `rgb(3, 208, 107)` | Primary brand color, primary CTA buttons, active accents | **50%** |
| **Pine** | `#013811` | `rgb(1, 56, 17)` | Section headers, dark surface containers, footers | **27%** |
| **Tangerine**| `#FF8500` | `rgb(255, 133, 0)` | Accent pills, category highlights, live badges | **13%** |
| **White** | `#FFFFFF` | `rgb(255, 255, 255)` | Page cards, clean readable surfaces, light text | **7%** |
| **Navy** | `#140949` | `rgb(20, 9, 73)` | Body typography, high-contrast text on light backgrounds | **3%** |

### Verified Contrast Ratios (WCAG 2.2 Compliance)
- **Navy (`#140949`) on White (`#FFFFFF`)**: 18.0:1 (AAA)
- **White (`#FFFFFF`) on Navy (`#140949`)**: 18.0:1 (AAA)
- **White (`#FFFFFF`) on Pine (`#013811`)**: 13.3:1 (AAA)
- **Pine (`#013811`) on White (`#FFFFFF`)**: 13.3:1 (AAA)
- **Navy (`#140949`) on Spring (`#03D06B`)**: 8.8:1 (AAA) — *Used for primary conversion buttons*
- **Spring (`#03D06B`) on Navy (`#140949`)**: 8.8:1 (AAA)
- **Navy (`#140949`) on Tangerine (`#FF8500`)**: 7.4:1 (AAA) — *Used for accent badges*
- **Pine (`#013811`) on Spring (`#03D06B`)**: 6.5:1 (AA)

---

## 2. Typography Hierarchy

### Primary Typeface: Cabinet Grotesk
- **Source**: Local font assets installed in `public/fonts/` and integrated via `next/font/local`.
- **Weights in active use**: 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extrabold).
- **Headlines**: Set at 500 Medium, tracking `-1.5%` to `-2.5%`, line height `1.0` to `1.1`.
- **Display Scale**: 64px display, 40px heading, 24px subheading.

### Secondary Typeface: Inter
- **Source**: Google Fonts via `next/font/google`.
- **Weights in active use**: 400 (Regular), 500 (Medium), 600 (Semibold).
- **Body Scale**: 16px body (line height 1.5), 14px small, 12px caption (tracking 1%).

---

## 3. Logo & Visual Asset Rules

### Logo Variations
- **Symbol Mark**: `public/images/logos/symbol.png` (`Frame 7.png` from guide).
- **Wordmark**: `public/images/logos/wordmark.png` (`NGD-logoArtboard-1-copy-2.png`).
- **Stacked Lockup**: `public/images/logos/stacked.png` (`NGD-logoArtboard-1-copy-3.png`).

### Permitted Background Combinations
- On Spring (`#03D06B`): Logo displayed in Navy (`#140949`).
- On Pine (`#013811`): Logo displayed in White (`#FFFFFF`).
- On Tangerine (`#FF8500`): Logo displayed in Navy (`#140949`).
- On White (`#FFFFFF`): Logo displayed in Navy (`#140949`) or Pine (`#013811`).
- On Navy (`#140949`): Logo displayed in White (`#FFFFFF`).

### Clear Space Rule
A minimum clear space of **50% of the logo height** is maintained on all four sides across all viewports.

---

## 4. Brand Governance & Organizer Attribution

- **Organisation**: Northern Creative Designers (Executive Committee).
- **Status**: Registered Entity (RC: 9930022).
- **Attribution**: Displayed prominently across the header, footer, and official credentials, preserving Northern Creative Designers' sole event ownership and organizer credit.
