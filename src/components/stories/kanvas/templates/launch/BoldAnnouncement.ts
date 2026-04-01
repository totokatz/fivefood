import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of BoldAnnouncement.tsx
// Canvas: 1080×1920  |  bg: gradient 160deg #00b4d8→#0077b6→#03045e
// HTML: flex col items-center justify-between px-[80] py-[100]
// Layout (top→bottom): logo | glass badge | product | headline + productName | CTA button

export const BoldAnnouncementTemplate: KanvasTemplate = {
  id: 'k-launch-bold-announcement',
  name: 'Bold Announcement',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ NUEVO ★' },
    { key: 'headline', label: 'Título', type: 'text', default: 'YA\nDISPONIBLE' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor Chocolate' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const badge = (data.badge as string) || '★ NUEVO ★'
    const headline = (data.headline as string) || 'YA\nDISPONIBLE'
    const productName = (data.productName as string) || 'Sabor Chocolate'
    const cta = (data.cta as string) || 'COMPRÁ AHORA'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 500

    // HTML: px-[80] py-[100] → content area x=80..1000 (width=920), y=100..1820
    // justify-between distributes 5 items across y=100..1820 (1720px available)
    // Items: logo, badge, product, headline-block, CTA
    // Approximate natural sizes: logo ~92px, badge ~60px, product ~productSize, headline-block ~250px, CTA ~96px
    // Total content height ≈ 92+60+productSize+250+96 = productSize+498
    // Remaining space = 1720 - (productSize+498), distributed as 4 gaps

    const logoW = 240
    const logoH = Math.round(logoW / 2.62) // ~92

    // Glass badge pill: px-[48] py-[14] → text-[32px] + 2*14 = 60px tall
    const pillH = 60
    const pillTextH = 32

    // Headline block: text-[96px] leading-[1.05], possibly 2 lines + mt-4(16) + productName text-[36px]
    const headlineLines = headline.split('\n').length
    const headlineBlockH = Math.round(96 * 1.05 * headlineLines) + 16 + 36

    // CTA: py-[24] → text-[36px] + 2*24 = 84px
    const ctaH = 84

    const totalContent = logoH + pillH + productSize + headlineBlockH + ctaH
    const gap = (1720 - totalContent) / 4

    // Y positions
    const logoY = 100
    const badgeY = logoY + logoH + gap
    const productY = badgeY + pillH + gap
    const headlineY = productY + productSize + gap
    const ctaBtnY = headlineY + headlineBlockH + gap

    // Badge pill sizing: estimate text width + px-[48]*2 = 96 padding
    const pillW = 520
    const pillX = (1080 - pillW) / 2

    // Product: SQUARE (width = height = productSize), centered, rotate(-3deg)
    const productX = (1080 - productSize) / 2

    // CTA button: px-[72] py-[24]
    const btnW = 680
    const btnX = (1080 - btnW) / 2

    return {
      background: '#00b4d8',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 1080, y: 1920 },
        fillLinearGradientColorStops: [0, '#00b4d8', 0.5, '#0077b6', 1, '#03045e'],
      },
      elements: [
        // Logo — white, top center, w=240, opacity=50%
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },

        // Glass badge background pill
        {
          id: 'badge-bg',
          type: 'rect',
          x: pillX,
          y: badgeY,
          width: pillW,
          height: pillH,
          fill: 'rgba(255,255,255,0.15)',
          stroke: 'rgba(255,255,255,0.3)',
          strokeWidth: 1,
          cornerRadius: 30,
          draggable: true,
        },

        // Badge text — text-[32px] font-bold tracking-[8px] text-white
        {
          id: 'badge',
          type: 'text',
          text: badge,
          x: pillX,
          y: badgeY + 14,
          width: pillW,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 8,
          draggable: true,
        },

        // Product image — SQUARE, rotated -3deg, drop-shadow
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          rotation: -3,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 64,
          shadowOffsetX: 0,
          shadowOffsetY: 32,
        },

        // Headline — text-[96px] font-black leading-[1.05] text-white, whitespace-pre-line
        {
          id: 'headline',
          type: 'text',
          text: headline,
          x: 80,
          y: headlineY,
          width: 920,
          fontSize: 96,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1.05,
          draggable: true,
        },

        // Product name — text-[36px] text-white/50, mt-4 (16px below headline)
        {
          id: 'product-name',
          type: 'text',
          text: productName,
          x: 80,
          y: headlineY + Math.round(96 * 1.05 * headlineLines) + 16,
          width: 920,
          fontSize: 36,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: 'rgba(255,255,255,0.5)',
          align: 'center',
          draggable: true,
        },

        // CTA button background — rounded-full bg-white shadow
        {
          id: 'cta-bg',
          type: 'rect',
          x: btnX,
          y: ctaBtnY,
          width: btnW,
          height: ctaH,
          fill: '#ffffff',
          cornerRadius: 42,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
        },

        // CTA text — text-[36px] font-extrabold text-secondary (#0077b6)
        {
          id: 'cta-text',
          type: 'text',
          text: cta,
          x: btnX,
          y: ctaBtnY + 24,
          width: btnW,
          fontSize: 36,
          fontFamily: 'Josefin Sans',
          fontStyle: '800',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
