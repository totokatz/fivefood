# Story Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an internal Instagram Story generator tool at `/stories` that lets FiveFoods create branded 1080×1920 story images with editable text, product selection, and PNG download.

**Architecture:** React page at `/stories` route using react-router-dom. Template components render inside a 1080×1920 div that is CSS-scaled for preview, then exported at full resolution via html-to-image. Each template defines its own editable field schema; a shared controls bar renders inputs dynamically.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, react-router-dom, html-to-image, Vite 8

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/main.tsx` | Add BrowserRouter wrapper |
| Modify | `src/App.tsx` | Convert to router with Routes |
| Create | `src/pages/Home.tsx` | Move existing homepage content here |
| Create | `src/pages/Stories.tsx` | Story Generator page — state, layout |
| Create | `src/components/stories/CategoryTabs.tsx` | Horizontal pill tabs for 4 categories |
| Create | `src/components/stories/TemplatePicker.tsx` | Horizontal scrollable template thumbnails |
| Create | `src/components/stories/StoryPreview.tsx` | 9:16 scaled preview container with ref |
| Create | `src/components/stories/StoryControls.tsx` | Dynamic inputs bar + download button |
| Create | `src/components/stories/templates/types.ts` | Shared types: TemplateField, TemplateConfig |
| Create | `src/components/stories/templates/promo/BoldDiscount.tsx` | Template |
| Create | `src/components/stories/templates/promo/GlassCard.tsx` | Template |
| Create | `src/components/stories/templates/promo/SplitDiagonal.tsx` | Template |
| Create | `src/components/stories/templates/lifestyle/BigAccent.tsx` | Template |
| Create | `src/components/stories/templates/lifestyle/EditorialLight.tsx` | Template |
| Create | `src/components/stories/templates/nutrition/StatsGrid.tsx` | Template |
| Create | `src/components/stories/templates/nutrition/SingleStatHero.tsx` | Template |
| Create | `src/components/stories/templates/nutrition/CleanList.tsx` | Template |
| Create | `src/components/stories/templates/launch/BoldAnnouncement.tsx` | Template |
| Create | `src/components/stories/templates/launch/MinimalDrop.tsx` | Template |
| Create | `src/components/stories/templates/registry.ts` | Central registry mapping categories → templates |

---

### Task 1: Install dependencies and set up routing

**Files:**
- Modify: `package.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Install react-router-dom and html-to-image**

Run:
```bash
npm install react-router-dom html-to-image
```

- [ ] **Step 2: Create Home.tsx — move existing App content**

Create `src/pages/Home.tsx`:

```tsx
import { useState, useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import ProductSpotlight from '../components/ProductSpotlight'
import BrandStory from '../components/BrandStory'
import Lifestyle from '../components/Lifestyle'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isLoading])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductSpotlight />
        <BrandStory />
        <Lifestyle />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
```

- [ ] **Step 3: Update main.tsx — add BrowserRouter**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 4: Update App.tsx — set up routes**

Replace `src/App.tsx` with:

```tsx
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 5: Verify the app still works**

Run:
```bash
npm run dev
```

Open `http://localhost:5173` — the homepage should render exactly as before.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: add react-router-dom, extract Home page from App"
```

---

### Task 2: Shared types and template registry

**Files:**
- Create: `src/components/stories/templates/types.ts`
- Create: `src/components/stories/templates/registry.ts`

- [ ] **Step 1: Create shared types**

Create `src/components/stories/templates/types.ts`:

```typescript
export type Product = 'chocolate' | 'queso'

export interface TemplateField {
  key: string
  label: string
  type: 'text' | 'number' | 'select'
  default: string | number
  options?: { value: string; label: string }[]
}

export interface TemplateConfig {
  id: string
  name: string
  category: Category
  fields: TemplateField[]
  component: React.ComponentType<TemplateProps>
}

export type Category = 'promociones' | 'lifestyle' | 'nutricional' | 'lanzamientos'

export interface TemplateProps {
  data: Record<string, string | number>
}

export const PRODUCT_FIELD: TemplateField = {
  key: 'product',
  label: 'Producto',
  type: 'select',
  default: 'chocolate',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'queso', label: 'Queso' },
  ],
}

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'promociones', label: 'Promociones' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'nutricional', label: 'Nutricional' },
  { key: 'lanzamientos', label: 'Lanzamientos' },
]
```

- [ ] **Step 2: Create empty registry (will be filled as templates are built)**

Create `src/components/stories/templates/registry.ts`:

```typescript
import type { TemplateConfig } from './types'

export const templates: TemplateConfig[] = []
```

- [ ] **Step 3: Commit**

```bash
git add src/components/stories/templates/types.ts src/components/stories/templates/registry.ts
git commit -m "feat: add shared types and template registry for story generator"
```

---

### Task 3: Stories page layout — CategoryTabs, TemplatePicker, StoryPreview, StoryControls

**Files:**
- Create: `src/components/stories/CategoryTabs.tsx`
- Create: `src/components/stories/TemplatePicker.tsx`
- Create: `src/components/stories/StoryPreview.tsx`
- Create: `src/components/stories/StoryControls.tsx`
- Create: `src/pages/Stories.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create CategoryTabs**

Create `src/components/stories/CategoryTabs.tsx`:

```tsx
import { CATEGORIES, type Category } from './templates/types'

interface Props {
  active: Category
  onChange: (cat: Category) => void
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`whitespace-nowrap rounded-full px-5 py-2 font-headline text-sm font-semibold transition-all ${
            active === cat.key
              ? 'bg-primary text-on-primary shadow-lg shadow-primary/25'
              : 'bg-inverse-surface/80 text-inverse-on-surface hover:bg-inverse-surface'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create TemplatePicker**

Create `src/components/stories/TemplatePicker.tsx`:

```tsx
import type { TemplateConfig } from './templates/types'

interface Props {
  templates: TemplateConfig[]
  activeId: string
  onChange: (id: string) => void
}

export default function TemplatePicker({ templates, activeId, onChange }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-shrink-0 rounded-xl px-4 py-2 font-headline text-xs font-semibold transition-all ${
            activeId === t.id
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-variant text-on-surface-variant hover:bg-primary-container'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create StoryPreview**

Create `src/components/stories/StoryPreview.tsx`:

```tsx
import { forwardRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const StoryPreview = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
      <div className="relative" style={{ width: '360px', height: '640px' }}>
        <div
          ref={ref}
          className="absolute origin-top-left"
          style={{
            width: '1080px',
            height: '1920px',
            transform: 'scale(0.3333)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})

StoryPreview.displayName = 'StoryPreview'

export default StoryPreview
```

- [ ] **Step 4: Create StoryControls**

Create `src/components/stories/StoryControls.tsx`:

```tsx
import type { TemplateField } from './templates/types'

interface Props {
  fields: TemplateField[]
  data: Record<string, string | number>
  onChange: (key: string, value: string | number) => void
  onDownload: () => void
  downloading: boolean
}

export default function StoryControls({ fields, data, onChange, onDownload, downloading }: Props) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto border-t border-surface-variant bg-inverse-surface/95 px-4 py-3 no-scrollbar">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-shrink-0 flex-col gap-1">
          <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={data[field.key] ?? field.default}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={data[field.key] ?? field.default}
              onChange={(e) =>
                onChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
              }
              className="w-36 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          )}
        </div>
      ))}

      <button
        onClick={onDownload}
        disabled={downloading}
        className="ml-auto flex-shrink-0 rounded-xl bg-primary px-6 py-2.5 font-headline text-sm font-bold text-on-primary shadow-lg shadow-primary/25 transition-all hover:bg-primary-dim disabled:opacity-50"
      >
        <span className="material-symbols-outlined mr-1 align-middle text-base">download</span>
        {downloading ? 'Exportando...' : 'Descargar PNG'}
      </button>
    </div>
  )
}
```

- [ ] **Step 5: Create Stories page**

Create `src/pages/Stories.tsx`:

```tsx
import { useState, useRef, useCallback, useMemo } from 'react'
import { toPng } from 'html-to-image'
import CategoryTabs from '../components/stories/CategoryTabs'
import TemplatePicker from '../components/stories/TemplatePicker'
import StoryPreview from '../components/stories/StoryPreview'
import StoryControls from '../components/stories/StoryControls'
import { templates } from '../components/stories/templates/registry'
import type { Category } from '../components/stories/templates/types'

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<Category>('promociones')
  const [activeTemplateId, setActiveTemplateId] = useState<string>('')
  const [templateData, setTemplateData] = useState<Record<string, string | number>>({})
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const categoryTemplates = useMemo(
    () => templates.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  const activeTemplate = useMemo(
    () => templates.find((t) => t.id === activeTemplateId),
    [activeTemplateId]
  )

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat)
    const first = templates.find((t) => t.category === cat)
    if (first) {
      setActiveTemplateId(first.id)
      const defaults: Record<string, string | number> = {}
      first.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  }, [])

  const handleTemplateChange = useCallback((id: string) => {
    setActiveTemplateId(id)
    const tmpl = templates.find((t) => t.id === id)
    if (tmpl) {
      const defaults: Record<string, string | number> = {}
      tmpl.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  }, [])

  const handleFieldChange = useCallback((key: string, value: string | number) => {
    setTemplateData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleDownload = useCallback(async () => {
    if (!previewRef.current || !activeTemplate) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 1,
      })
      const link = document.createElement('a')
      link.download = `fivefoods-story-${activeTemplate.id}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [activeTemplate])

  // Initialize first template on mount
  useState(() => {
    const first = templates.find((t) => t.category === 'promociones')
    if (first) {
      setActiveTemplateId(first.id)
      const defaults: Record<string, string | number> = {}
      first.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  })

  const TemplateComponent = activeTemplate?.component

  return (
    <div className="flex h-screen flex-col bg-on-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-inverse-on-surface/10 px-4 py-3">
        <h1 className="font-headline text-lg font-bold text-inverse-on-surface">
          Story Generator
        </h1>
        <a href="/" className="font-label text-xs text-primary hover:underline">
          ← Volver al sitio
        </a>
      </div>

      {/* Category tabs */}
      <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

      {/* Template picker */}
      <TemplatePicker
        templates={categoryTemplates}
        activeId={activeTemplateId}
        onChange={handleTemplateChange}
      />

      {/* Preview */}
      <StoryPreview ref={previewRef}>
        {TemplateComponent ? (
          <TemplateComponent data={templateData} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-inverse-surface">
            <p className="font-headline text-2xl text-inverse-on-surface/40">
              Elegí un template
            </p>
          </div>
        )}
      </StoryPreview>

      {/* Controls */}
      {activeTemplate && (
        <StoryControls
          fields={activeTemplate.fields}
          data={templateData}
          onChange={handleFieldChange}
          onDownload={handleDownload}
          downloading={downloading}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 6: Add Stories route to App.tsx**

In `src/App.tsx`, add the Stories route:

```tsx
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Stories from './pages/Stories'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 7: Add no-scrollbar utility to index.css**

Add to the end of `src/index.css`:

```css
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

- [ ] **Step 8: Verify the page loads**

Run:
```bash
npm run dev
```

Open `http://localhost:5173/stories` — should see the dark layout with tabs, empty preview placeholder, and "Volver al sitio" link. `http://localhost:5173` should still work as before.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Stories page layout with tabs, preview, and controls"
```

---

### Task 4: Promo templates — BoldDiscount, GlassCard, SplitDiagonal

**Files:**
- Create: `src/components/stories/templates/promo/BoldDiscount.tsx`
- Create: `src/components/stories/templates/promo/GlassCard.tsx`
- Create: `src/components/stories/templates/promo/SplitDiagonal.tsx`
- Modify: `src/components/stories/templates/registry.ts`

- [ ] **Step 1: Create BoldDiscount template**

Create `src/components/stories/templates/promo/BoldDiscount.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldDiscountPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '10'
  const subtitle = data.subtitle || 'EN TODA LA WEB'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(160deg, #03045e 0%, #0077b6 50%, #00b4d8 100%)' }}
    >
      {/* Logo */}
      <p className="text-[28px] font-light tracking-[12px] text-white/50 uppercase">
        FIVE FOODS
      </p>

      {/* Discount */}
      <div className="text-center">
        <p className="text-[220px] font-black leading-none text-white" style={{ textShadow: '0 12px 60px rgba(0,0,0,0.3)' }}>
          {discount}%
        </p>
        <p className="text-[72px] font-bold tracking-[16px] text-primary-container">
          OFF
        </p>
      </div>

      {/* Product */}
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="h-[420px] w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
        style={{ transform: 'rotate(-5deg)' }}
      />

      {/* Subtitle */}
      <div className="text-center">
        <p className="text-[42px] font-bold tracking-[6px] text-white">
          {subtitle}
        </p>
        <p className="mt-2 text-[28px] text-white/40">fivefood.com.ar</p>
      </div>
    </div>
  )
}

export const BoldDiscountConfig: TemplateConfig = {
  id: 'promo-bold-discount',
  name: 'Bold Discount',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'EN TODA LA WEB' },
    PRODUCT_FIELD,
  ],
  component: BoldDiscountPreview,
}
```

- [ ] **Step 2: Create GlassCard template**

Create `src/components/stories/templates/promo/GlassCard.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GlassCardPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const label = data.label || 'PROMO ESPECIAL'
  const discount = data.discount || '10% OFF'
  const subtitle = data.subtitle || 'En toda la web'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(180deg, #caf0f8 0%, #90e0ef 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>

      {/* Glass card */}
      <div
        className="w-[800px] rounded-[48px] border border-white/70 px-[60px] py-[72px] text-center"
        style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)' }}
      >
        <p className="text-[32px] font-semibold tracking-[8px] text-secondary">
          {label}
        </p>
        <p className="mt-4 text-[120px] font-black leading-none text-tertiary">
          {discount}
        </p>
        <p className="mt-4 text-[36px] text-secondary">{subtitle}</p>
      </div>

      {/* Product */}
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="h-[380px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      />

      <div className="text-center">
        <p className="text-[36px] font-bold text-tertiary">COMPRÁ AHORA →</p>
        <p className="mt-1 text-[28px] text-secondary">fivefood.com.ar</p>
      </div>
    </div>
  )
}

export const GlassCardConfig: TemplateConfig = {
  id: 'promo-glass-card',
  name: 'Glass Card',
  category: 'promociones',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'PROMO ESPECIAL' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '10% OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En toda la web' },
    PRODUCT_FIELD,
  ],
  component: GlassCardPreview,
}
```

- [ ] **Step 3: Create SplitDiagonal template**

Create `src/components/stories/templates/promo/SplitDiagonal.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SplitDiagonalPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '10'
  const label = data.label || 'DESCUENTO'
  const code = data.code || 'Usá el código: SNACK10'

  return (
    <div className="relative flex h-full w-full flex-col font-headline" style={{ background: '#03045e' }}>
      {/* Top half with diagonal cut */}
      <div
        className="flex w-full flex-col items-center justify-center"
        style={{
          height: '55%',
          background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        }}
      >
        <p className="text-[28px] font-light tracking-[12px] text-white/50 uppercase">
          FIVE FOODS
        </p>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="mt-8 h-[460px] w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
          style={{ transform: 'rotate(3deg)' }}
        />
      </div>

      {/* Bottom half */}
      <div className="flex flex-1 flex-col items-center justify-center px-[80px] text-center">
        <p className="text-[160px] font-black leading-none text-primary">
          {discount}%
        </p>
        <p className="mt-2 text-[56px] font-bold tracking-[16px] text-primary-container">
          {label}
        </p>
        <p className="mt-6 text-[30px] text-white/40">{code}</p>
        <div className="mt-8 rounded-full bg-primary px-[64px] py-[20px]">
          <p className="text-[32px] font-bold text-white">SHOP NOW</p>
        </div>
      </div>
    </div>
  )
}

export const SplitDiagonalConfig: TemplateConfig = {
  id: 'promo-split-diagonal',
  name: 'Split Diagonal',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'DESCUENTO' },
    { key: 'code', label: 'Código', type: 'text', default: 'Usá el código: SNACK10' },
    PRODUCT_FIELD,
  ],
  component: SplitDiagonalPreview,
}
```

- [ ] **Step 4: Register promo templates**

Replace `src/components/stories/templates/registry.ts` with:

```typescript
import type { TemplateConfig } from './types'
import { BoldDiscountConfig } from './promo/BoldDiscount'
import { GlassCardConfig } from './promo/GlassCard'
import { SplitDiagonalConfig } from './promo/SplitDiagonal'

export const templates: TemplateConfig[] = [
  BoldDiscountConfig,
  GlassCardConfig,
  SplitDiagonalConfig,
]
```

- [ ] **Step 5: Verify in browser**

Run `npm run dev`, go to `http://localhost:5173/stories`. Click through the 3 promo templates, edit fields, verify the preview updates in real time. Try the download button.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add 3 promo templates — BoldDiscount, GlassCard, SplitDiagonal"
```

---

### Task 5: Lifestyle templates — BigAccent, EditorialLight

**Files:**
- Create: `src/components/stories/templates/lifestyle/BigAccent.tsx`
- Create: `src/components/stories/templates/lifestyle/EditorialLight.tsx`
- Modify: `src/components/stories/templates/registry.ts`

- [ ] **Step 1: Create BigAccent template**

Create `src/components/stories/templates/lifestyle/BigAccent.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BigAccentPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const topLine = data.topLine || 'Tu dosis de'
  const accent = data.accent || 'energía real'
  const bottomLine = data.bottomLine || 'sin vueltas'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 60%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>

      {/* Quote */}
      <div className="text-center">
        <p className="text-[48px] font-light tracking-[10px] text-white uppercase">
          {topLine}
        </p>
        <p
          className="font-accent text-[140px] leading-none text-white"
          style={{ textShadow: '0 12px 48px rgba(0,0,0,0.3)' }}
        >
          {accent}
        </p>
        <p className="mt-2 text-[48px] font-light tracking-[10px] text-white uppercase">
          {bottomLine}
        </p>
      </div>

      {/* Product + handle */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[340px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          style={{ transform: 'rotate(3deg)' }}
        />
        <p className="text-[28px] text-white/40">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const BigAccentConfig: TemplateConfig = {
  id: 'lifestyle-big-accent',
  name: 'Big Accent',
  category: 'lifestyle',
  fields: [
    { key: 'topLine', label: 'Línea superior', type: 'text', default: 'Tu dosis de' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'energía real' },
    { key: 'bottomLine', label: 'Línea inferior', type: 'text', default: 'sin vueltas' },
    PRODUCT_FIELD,
  ],
  component: BigAccentPreview,
}
```

- [ ] **Step 2: Create EditorialLight template**

Create `src/components/stories/templates/lifestyle/EditorialLight.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function EditorialLightPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const headline = data.headline || 'Snackeá'
  const accent = data.accent || 'sin culpa'
  const subtitle = data.subtitle || '100% vegano · sin TACC · proteína real'

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-background px-[80px] py-[120px] font-headline">
      <p className="text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>

      {/* Text */}
      <div className="text-center">
        <p className="text-[72px] font-bold text-tertiary">{headline}</p>
        <p className="font-accent text-[120px] leading-none text-primary">{accent}</p>
        <div className="mx-auto mt-8 h-[6px] w-[100px] rounded-full bg-primary" />
        <p className="mt-8 text-[32px] leading-relaxed text-on-surface-variant">
          {subtitle}
        </p>
      </div>

      {/* Product */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[380px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)]"
        />
        <p className="text-[28px] text-secondary">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const EditorialLightConfig: TemplateConfig = {
  id: 'lifestyle-editorial-light',
  name: 'Editorial Light',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'Snackeá' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'sin culpa' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: '100% vegano · sin TACC · proteína real' },
    PRODUCT_FIELD,
  ],
  component: EditorialLightPreview,
}
```

- [ ] **Step 3: Add to registry**

In `src/components/stories/templates/registry.ts`, add imports and entries:

```typescript
import type { TemplateConfig } from './types'
import { BoldDiscountConfig } from './promo/BoldDiscount'
import { GlassCardConfig } from './promo/GlassCard'
import { SplitDiagonalConfig } from './promo/SplitDiagonal'
import { BigAccentConfig } from './lifestyle/BigAccent'
import { EditorialLightConfig } from './lifestyle/EditorialLight'

export const templates: TemplateConfig[] = [
  BoldDiscountConfig,
  GlassCardConfig,
  SplitDiagonalConfig,
  BigAccentConfig,
  EditorialLightConfig,
]
```

- [ ] **Step 4: Verify — switch to Lifestyle tab, see both templates, edit fields**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add lifestyle templates — BigAccent, EditorialLight"
```

---

### Task 6: Nutrition templates — StatsGrid, SingleStatHero, CleanList

**Files:**
- Create: `src/components/stories/templates/nutrition/StatsGrid.tsx`
- Create: `src/components/stories/templates/nutrition/SingleStatHero.tsx`
- Create: `src/components/stories/templates/nutrition/CleanList.tsx`
- Modify: `src/components/stories/templates/registry.ts`

- [ ] **Step 1: Create StatsGrid template**

Create `src/components/stories/templates/nutrition/StatsGrid.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function StatsGridPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const stat1Val = data.stat1Val || '8g'
  const stat1Label = data.stat1Label || 'Proteína'
  const stat2Val = data.stat2Val || '6.6g'
  const stat2Label = data.stat2Label || 'Fibra'
  const stat3Val = data.stat3Val || '0g'
  const stat3Label = data.stat3Label || 'Trans Fat'
  const stat4Val = data.stat4Val || '✓'
  const stat4Label = data.stat4Label || 'Sin TACC'
  const tagline = data.tagline || 'Energía real, sin vueltas'

  const stats = [
    { val: stat1Val, label: stat1Label },
    { val: stat2Val, label: stat2Label },
    { val: stat3Val, label: stat3Label },
    { val: stat4Val, label: stat4Label },
  ]

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(180deg, #003540 0%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-primary/50 uppercase">
        FIVE FOODS
      </p>

      {/* Grid */}
      <div className="grid w-full grid-cols-2 gap-[32px]">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-[32px] border border-primary/20 px-[40px] py-[48px] text-center"
            style={{ background: 'rgba(0,180,216,0.08)' }}
          >
            <p className="text-[96px] font-black leading-none text-primary">{s.val}</p>
            <p className="mt-3 text-[28px] font-semibold tracking-[6px] text-white/40 uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Product + tagline */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[300px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)]"
        />
        <p className="text-[28px] text-white/35">{tagline}</p>
      </div>
    </div>
  )
}

export const StatsGridConfig: TemplateConfig = {
  id: 'nutri-stats-grid',
  name: 'Stats Grid',
  category: 'nutricional',
  fields: [
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '6.6g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Fibra' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '0g' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Trans Fat' },
    { key: 'stat4Val', label: 'Stat 4 valor', type: 'text', default: '✓' },
    { key: 'stat4Label', label: 'Stat 4 label', type: 'text', default: 'Sin TACC' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Energía real, sin vueltas' },
    PRODUCT_FIELD,
  ],
  component: StatsGridPreview,
}
```

- [ ] **Step 2: Create SingleStatHero template**

Create `src/components/stories/templates/nutrition/SingleStatHero.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SingleStatHeroPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const statValue = data.statValue || '8g'
  const statLabel = data.statLabel || 'Proteína'
  const description = data.description || 'Por porción · Proteína de arveja\n100% vegano · Sin TACC'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-[80px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 100%)' }}
    >
      <p className="absolute top-[80px] text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>

      {/* Big stat */}
      <p
        className="text-[300px] font-black leading-none text-white"
        style={{ textShadow: '0 12px 72px rgba(0,0,0,0.2)' }}
      >
        {statValue}
      </p>
      <p className="mt-4 text-[64px] font-bold tracking-[14px] text-white/85 uppercase">
        {statLabel}
      </p>
      <p className="mt-8 whitespace-pre-line text-center text-[36px] leading-relaxed text-white/50">
        {description}
      </p>

      {/* Product */}
      <div className="absolute bottom-[80px] flex flex-col items-center gap-4">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[300px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
        />
        <p className="text-[28px] text-white/40">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const SingleStatHeroConfig: TemplateConfig = {
  id: 'nutri-single-stat',
  name: 'Single Stat Hero',
  category: 'nutricional',
  fields: [
    { key: 'statValue', label: 'Valor', type: 'text', default: '8g' },
    { key: 'statLabel', label: 'Label', type: 'text', default: 'Proteína' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Por porción · Proteína de arveja\n100% vegano · Sin TACC' },
    PRODUCT_FIELD,
  ],
  component: SingleStatHeroPreview,
}
```

- [ ] **Step 3: Create CleanList template**

Create `src/components/stories/templates/nutrition/CleanList.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CleanListPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const title = data.title || '¿Qué tiene adentro?'
  const stat1Val = data.stat1Val || '8g'
  const stat1Desc = data.stat1Desc || 'Proteína de arveja'
  const stat2Val = data.stat2Val || '6.6g'
  const stat2Desc = data.stat2Desc || 'Fibra natural'
  const stat3Val = data.stat3Val || '0g'
  const stat3Desc = data.stat3Desc || 'Grasas trans'
  const stat4Val = data.stat4Val || '✓'
  const stat4Desc = data.stat4Desc || 'Sin TACC · Vegano'

  const rows = [
    { val: stat1Val, desc: stat1Desc },
    { val: stat2Val, desc: stat2Desc },
    { val: stat3Val, desc: stat3Desc },
    { val: stat4Val, desc: stat4Desc },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-background px-[80px] py-[120px] font-headline">
      <p className="text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>

      <div className="w-full text-center">
        <p className="mb-[48px] text-[64px] font-extrabold text-tertiary">{title}</p>

        <div className="flex flex-col gap-[24px]">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-[40px] rounded-[32px] px-[48px] py-[32px]"
              style={{ background: 'rgba(0,180,216,0.08)' }}
            >
              <p className="min-w-[160px] text-left text-[72px] font-black text-primary">
                {row.val}
              </p>
              <p className="text-left text-[36px] text-tertiary">{row.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[300px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
        />
        <p className="text-[28px] text-secondary">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const CleanListConfig: TemplateConfig = {
  id: 'nutri-clean-list',
  name: 'Clean List',
  category: 'nutricional',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: '¿Qué tiene adentro?' },
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Desc', label: 'Stat 1 desc', type: 'text', default: 'Proteína de arveja' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '6.6g' },
    { key: 'stat2Desc', label: 'Stat 2 desc', type: 'text', default: 'Fibra natural' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '0g' },
    { key: 'stat3Desc', label: 'Stat 3 desc', type: 'text', default: 'Grasas trans' },
    { key: 'stat4Val', label: 'Stat 4 valor', type: 'text', default: '✓' },
    { key: 'stat4Desc', label: 'Stat 4 desc', type: 'text', default: 'Sin TACC · Vegano' },
    PRODUCT_FIELD,
  ],
  component: CleanListPreview,
}
```

- [ ] **Step 4: Add to registry**

Update `src/components/stories/templates/registry.ts`:

```typescript
import type { TemplateConfig } from './types'
import { BoldDiscountConfig } from './promo/BoldDiscount'
import { GlassCardConfig } from './promo/GlassCard'
import { SplitDiagonalConfig } from './promo/SplitDiagonal'
import { BigAccentConfig } from './lifestyle/BigAccent'
import { EditorialLightConfig } from './lifestyle/EditorialLight'
import { StatsGridConfig } from './nutrition/StatsGrid'
import { SingleStatHeroConfig } from './nutrition/SingleStatHero'
import { CleanListConfig } from './nutrition/CleanList'

export const templates: TemplateConfig[] = [
  BoldDiscountConfig,
  GlassCardConfig,
  SplitDiagonalConfig,
  BigAccentConfig,
  EditorialLightConfig,
  StatsGridConfig,
  SingleStatHeroConfig,
  CleanListConfig,
]
```

- [ ] **Step 5: Verify — Nutricional tab, all 3 templates, edit stats, download**

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add nutrition templates — StatsGrid, SingleStatHero, CleanList"
```

---

### Task 7: Launch templates — BoldAnnouncement, MinimalDrop

**Files:**
- Create: `src/components/stories/templates/launch/BoldAnnouncement.tsx`
- Create: `src/components/stories/templates/launch/MinimalDrop.tsx`
- Modify: `src/components/stories/templates/registry.ts`

- [ ] **Step 1: Create BoldAnnouncement template**

Create `src/components/stories/templates/launch/BoldAnnouncement.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldAnnouncementPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const badge = data.badge || '★ NUEVO ★'
  const headline = data.headline || 'YA\nDISPONIBLE'
  const productName = data.productName || 'Sabor Chocolate'
  const cta = data.cta || 'COMPRÁ AHORA'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[100px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 50%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>

      {/* Badge */}
      <div
        className="rounded-full border border-white/30 px-[48px] py-[14px]"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-[32px] font-bold tracking-[8px] text-white">{badge}</p>
      </div>

      {/* Product */}
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="h-[500px] w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
        style={{ transform: 'rotate(-3deg)' }}
      />

      {/* Headline */}
      <div className="text-center">
        <p className="whitespace-pre-line text-[96px] font-black leading-[1.05] text-white">
          {headline}
        </p>
        <p className="mt-4 text-[36px] text-white/50">{productName}</p>
      </div>

      {/* CTA */}
      <div className="rounded-full bg-white px-[72px] py-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
        <p className="text-[36px] font-extrabold text-secondary">{cta}</p>
      </div>
    </div>
  )
}

export const BoldAnnouncementConfig: TemplateConfig = {
  id: 'launch-bold-announcement',
  name: 'Bold Announcement',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ NUEVO ★' },
    { key: 'headline', label: 'Título', type: 'text', default: 'YA\nDISPONIBLE' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor Chocolate' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    PRODUCT_FIELD,
  ],
  component: BoldAnnouncementPreview,
}
```

- [ ] **Step 2: Create MinimalDrop template**

Create `src/components/stories/templates/launch/MinimalDrop.tsx`:

```tsx
import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MinimalDropPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const label = data.label || 'NEW DROP'
  const productName = data.productName || 'Sabor\nChocolate'
  const subtitle = data.subtitle || 'Ya disponible en la web'

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background px-[80px] font-headline">
      <p className="absolute top-[80px] text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>

      {/* Product */}
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="mb-[64px] h-[500px] w-auto object-contain drop-shadow-[0_48px_96px_rgba(0,53,64,0.15)]"
      />

      {/* Label */}
      <p className="text-[36px] font-bold tracking-[14px] text-primary uppercase">{label}</p>

      {/* Product name */}
      <p className="mt-4 whitespace-pre-line text-center text-[80px] font-extrabold leading-[1.15] text-tertiary">
        {productName}
      </p>

      {/* Divider */}
      <div className="mt-8 h-[6px] w-[100px] rounded-full bg-primary" />

      {/* Subtitle */}
      <p className="mt-8 text-[32px] text-on-surface-variant">{subtitle}</p>

      <p className="absolute bottom-[80px] text-[28px] text-secondary">@fivefood.ok</p>
    </div>
  )
}

export const MinimalDropConfig: TemplateConfig = {
  id: 'launch-minimal-drop',
  name: 'Minimal Drop',
  category: 'lanzamientos',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'NEW DROP' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor\nChocolate' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Ya disponible en la web' },
    PRODUCT_FIELD,
  ],
  component: MinimalDropPreview,
}
```

- [ ] **Step 3: Final registry update**

Update `src/components/stories/templates/registry.ts`:

```typescript
import type { TemplateConfig } from './types'
import { BoldDiscountConfig } from './promo/BoldDiscount'
import { GlassCardConfig } from './promo/GlassCard'
import { SplitDiagonalConfig } from './promo/SplitDiagonal'
import { BigAccentConfig } from './lifestyle/BigAccent'
import { EditorialLightConfig } from './lifestyle/EditorialLight'
import { StatsGridConfig } from './nutrition/StatsGrid'
import { SingleStatHeroConfig } from './nutrition/SingleStatHero'
import { CleanListConfig } from './nutrition/CleanList'
import { BoldAnnouncementConfig } from './launch/BoldAnnouncement'
import { MinimalDropConfig } from './launch/MinimalDrop'

export const templates: TemplateConfig[] = [
  BoldDiscountConfig,
  GlassCardConfig,
  SplitDiagonalConfig,
  BigAccentConfig,
  EditorialLightConfig,
  StatsGridConfig,
  SingleStatHeroConfig,
  CleanListConfig,
  BoldAnnouncementConfig,
  MinimalDropConfig,
]
```

- [ ] **Step 4: Verify — all 4 tabs work, all 10 templates render, download works**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add launch templates — BoldAnnouncement, MinimalDrop"
```

---

### Task 8: Final build verification and type check

- [ ] **Step 1: Run TypeScript type check**

Run:
```bash
npx tsc -b
```
Expected: no errors.

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```
Expected: build completes successfully.

- [ ] **Step 3: Test with preview server**

Run:
```bash
npm run preview
```
Open `http://localhost:4173/stories` — verify all templates render. Open `http://localhost:4173/` — verify homepage still works. Test download on a template.

- [ ] **Step 4: Fix any issues found, commit if needed**

```bash
git add -A
git commit -m "fix: resolve build issues for story generator"
```
