# Story Generator — Design Spec

Internal tool for generating Instagram Story-format images (1080×1920, 9:16) with FiveFoods brand aesthetics. Lives at `/stories` route, not linked from public navigation.

## Architecture

### Routing

Add `react-router-dom` to the project. Two routes:
- `/` — existing single-page app (all current content moves here unchanged)
- `/stories` — Story Generator tool (internal use only, no nav link)

### Page Layout

Top-to-bottom layout (Layout B):
1. **Category tabs** — horizontal pill buttons at the top: Promociones, Lifestyle, Nutricional, Lanzamientos
2. **Template selector** — horizontal scrollable row of thumbnail cards for the selected category
3. **Preview** — centered 9:16 canvas (scaled to fit viewport, actual render at 1080×1920)
4. **Controls bar** — editable inputs for the selected template + "Descargar PNG" button

### Component Structure

```
src/
├── pages/
│   ├── Home.tsx              (move current App content here)
│   └── Stories.tsx           (Story Generator page)
├── components/
│   ├── stories/
│   │   ├── StoryPreview.tsx        (9:16 preview container, ref for export)
│   │   ├── StoryControls.tsx       (inputs bar + download button)
│   │   ├── CategoryTabs.tsx        (tab pills)
│   │   ├── TemplatePicker.tsx      (horizontal thumbnail row)
│   │   └── templates/
│   │       ├── promo/
│   │       │   ├── BoldDiscount.tsx
│   │       │   ├── GlassCard.tsx
│   │       │   └── SplitDiagonal.tsx
│   │       ├── lifestyle/
│   │       │   ├── BigAccent.tsx
│   │       │   └── EditorialLight.tsx
│   │       ├── nutrition/
│   │       │   ├── StatsGrid.tsx
│   │       │   ├── SingleStatHero.tsx
│   │       │   └── CleanList.tsx
│   │       └── launch/
│   │           ├── BoldAnnouncement.tsx
│   │           └── MinimalDrop.tsx
│   └── (existing components unchanged)
```

### State Management

Local state via `useState` in `Stories.tsx`:
- `activeCategory`: which tab is selected
- `activeTemplate`: which template is selected within the category
- `templateData`: object with editable fields for the current template

No global state needed — the tool is self-contained.

## Templates

### Category: Promociones (3 templates)

**1. Bold Discount**
- Dark gradient background (navy → dark teal)
- Discount percentage huge and centered (Josefin Sans, 900 weight)
- "OFF" in primary cyan, letter-spaced
- Product package image with drop shadow and slight rotation
- Bottom text: customizable subtitle + "fivefood.com.ar"
- Editable fields: discount %, subtitle text, product (Chocolate/Queso)

**2. Glass Card**
- Light cyan gradient background (secondary-container → primary-container)
- Glass-morphism card centered: white/blur background, rounded, subtle border
- Inside card: label "PROMO ESPECIAL", discount text, subtitle
- Product package below the card with soft shadow
- "COMPRÁ AHORA →" CTA at bottom
- Editable fields: promo label, discount text, subtitle, product

**3. Split Diagonal**
- Dark navy bottom half, cyan gradient top half with diagonal clip-path cut
- Product package in the top half, rotated slightly
- Discount number in cyan on the dark bottom section
- "DESCUENTO" label, optional code line, "SHOP NOW" pill button
- Editable fields: discount %, label, code text, product

### Category: Lifestyle (2 templates)

**4. Big Accent**
- Vibrant cyan → navy gradient background
- Three-line structure: top line (Josefin Sans light, uppercase, letter-spaced), middle line (Satisfy cursive, large — the accent word), bottom line (Josefin Sans light, uppercase)
- Small product package at the bottom
- Editable fields: top line, accent word, bottom line, product

**5. Editorial Light**
- White/off-white background (#f8fdff)
- Headline in navy (Josefin Sans bold), accent word in cyan (Satisfy, used sparingly)
- Thin cyan divider line
- Subtitle text in gray below divider
- Product package with subtle shadow at bottom
- Editable fields: headline, accent word, subtitle, product

### Category: Nutricional (3 templates)

**6. Stats Grid**
- Dark background (dark teal → navy gradient)
- 2×2 grid of stat cards with cyan borders and subtle cyan background
- Each card: big number in cyan (Josefin Sans 900) + label below in muted white
- Product package small at bottom with tagline
- Editable fields: 4× stat value + label pairs, tagline, product

**7. Single Stat Hero**
- Cyan → blue gradient background
- One massive number centered (60px+ equivalent, Josefin Sans 900, white)
- Label below the number (uppercase, letter-spaced)
- Supporting text: description + certifications
- Small product package at bottom
- Editable fields: stat value, stat label, description text, product

**8. Clean List**
- White background
- Title question ("¿Qué tiene adentro?") in navy bold
- Stacked rows: each row has a cyan stat number left-aligned + description text
- Light cyan background on each row, rounded
- Editable fields: title, 4× stat value + description pairs, product

### Category: Lanzamientos (2 templates)

**9. Bold Announcement**
- Vibrant cyan → navy gradient background
- Glass pill badge at top: "★ NUEVO ★"
- Large product package centered with strong drop shadow, slight rotation
- "YA DISPONIBLE" in white, bold, huge
- Product name below in muted white
- White pill CTA button: "COMPRÁ AHORA"
- Editable fields: badge text, headline, product name, CTA text, product

**10. Minimal Drop**
- White background
- Product package centered with prominent soft shadow
- "NEW DROP" label in cyan, uppercase, letter-spaced
- Product name large in navy (Josefin Sans 800)
- Thin cyan divider
- Subtitle in gray
- Editable fields: label, product name, subtitle, product

## Typography Rules

- **Josefin Sans** is the primary font for all text: headlines, labels, stats, CTAs
  - Weight 900/800 for hero numbers and headlines
  - Weight 700 for subheadings and CTAs
  - Weight 300-400 for body text and labels
  - Uppercase + letter-spacing for small labels
- **Satisfy** (cursive) used sparingly as accent only:
  - One word or short phrase per template maximum
  - Only in Lifestyle templates (Big Accent accent word, Editorial Light accent word)
  - Never for stats, labels, CTAs, or body text

## Color Usage

All colors from existing CSS custom properties:
- `--color-primary` (#00b4d8): accent numbers, highlights, labels, dividers
- `--color-primary-dim` (#0096b4): hover states on download button
- `--color-primary-container` (#90e0ef): light badge backgrounds
- `--color-secondary` (#0077b6): gradient endpoints, secondary accents
- `--color-tertiary` (#03045e): dark gradient base, navy text on light backgrounds
- `--color-background` (#f8fdff): light template backgrounds
- `--color-on-background` (#001d25): primary text on light backgrounds
- `--color-on-surface-variant` (#40484c): secondary/muted text
- `--color-inverse-surface` (#003540): dark section backgrounds
- White and white-alpha variants for text on dark backgrounds

## Image Export

### Library
`html-to-image` (npm package, ~15KB) — converts DOM nodes to PNG/JPEG.

### Export Flow
1. The `StoryPreview` component renders the template inside a div with `ref`
2. The preview div has a fixed internal size of 1080×1920px, CSS-scaled down to fit the viewport
3. On "Descargar PNG" click:
   - Temporarily remove CSS scale transform
   - Call `toPng(ref.current, { width: 1080, height: 1920, pixelRatio: 1 })`
   - Trigger download as `fivefoods-story-{template}-{timestamp}.png`
   - Restore scale transform
4. Product images (`producto-chocolate.png`, `producto-queso.png`) are embedded as `<img>` tags using Vite imports, so they render correctly in the export

### Product Image Handling
Each template receives a `product` prop ("chocolate" | "queso") and renders the corresponding product image import. The image is positioned per template design with CSS transforms (rotation, scale) and drop shadows.

## Editable Controls

The controls bar at the bottom of the page renders input fields dynamically based on the selected template. Each template defines its own schema:

```typescript
interface TemplateField {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  default: string | number;
  options?: { value: string; label: string }[]; // for select type
}
```

- `text` fields → `<input type="text">` 
- `number` fields → `<input type="number">`
- `select` fields → `<select>` (used for product choice: Chocolate/Queso)

Controls bar scrolls horizontally on mobile if needed. All inputs update `templateData` state, which flows into the template component as props for real-time preview.

## Dependencies

- `react-router-dom` — client-side routing (new dependency)
- `html-to-image` — DOM-to-PNG export (new dependency)

No other new dependencies required. Existing stack (React, Tailwind, Vite) handles everything else.

## Out of Scope

- No authentication or access control (internal tool, accessed by URL only)
- No template saving or history
- No drag-and-drop or visual editor
- No video/animated story export
- No direct Instagram API integration
