import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of TypeStack.tsx
// Canvas: 1080×1920
// bg: linear-gradient(180deg, #03045e 0%, #0077b6 100%)
// Background stacked text: ['YA','DIS','PO','NI','BLE'] font-[280px] opacity=8% white, leading-[0.95] letterSpacing=-8px
// HTML: flex col items-center justify-between
// Top spacer (120px) | Badge | Products (both overlaid in 700px container) | CTA (mb-[100px])

export const TypeStackTemplate: KanvasTemplate = {
  id: 'k-launch-type-stack',
  name: 'Type Stack',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ LANZAMIENTO ★' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const badge = (data.badge as string) || '★ LANZAMIENTO ★'
    const cta = (data.cta as string) || 'COMPRÁ AHORA'
    const productSize = Number(data.productSize) || 440

    // Products are SQUARE
    const productW = productSize

    // productGap default = 20
    const gap = 20

    // Stacked bg text — 5 lines, fontSize=280, leading-[0.95]
    const bgFontSize = 280
    const bgLineH = bgFontSize * 0.95
    const bgTotalH = bgLineH * 5
    const bgStartY = (1920 - bgTotalH) / 2
    const bgLines = ['YA', 'DIS', 'PO', 'NI', 'BLE']

    const bgTextElements = bgLines.map((line, i) => ({
      id: `bg-text-${i}`,
      type: 'text' as const,
      text: line,
      x: 0,
      y: bgStartY + i * bgLineH,
      width: 1080,
      fontSize: bgFontSize,
      fontFamily: 'Josefin Sans',
      fontStyle: '900',
      fill: '#ffffff',
      align: 'center' as const,
      letterSpacing: -8,
      lineHeight: 0.95,
      opacity: 0.08,
      draggable: false,
    }))

    // Layout: justify-between with items at y=0(topspacer)..1920
    // Top spacer: 120px (empty)
    // Badge pill: px-[44] py-[12] text-[28px] → pill height = 28+2*12 = 52
    const pillH = 52
    const pillW = 600
    const pillX = (1080 - pillW) / 2

    // CTA: mb-[100px] → bottom edge at y=1820. px-[64] py-[22] text-[34px] → btn height = 34+2*22 = 78
    const btnH = 78
    const btnW = 640
    const btnX = (1080 - btnW) / 2
    const btnY = 1920 - 100 - btnH // 1742

    // Product area: spacer div height = productSize+40
    const productAreaH = productSize + 40

    // justify-between across 3 visible items (spacer is empty, so it's: badge, products, CTA)
    // Available space from top of badge to bottom of CTA
    // Badge top: after 120px spacer + some gap → roughly y=160
    // Actually with justify-between across full height:
    // Items positioned at: topSpacer(120px height, y=0-120), badge, products, CTA(bottom=1820)
    // 4 items, 3 gaps. Total item height = 120+52+productAreaH+78 = 250+productAreaH
    // Remaining = 1920 - (250+productAreaH), 3 gaps
    const totalItemH = 120 + pillH + productAreaH + btnH
    const gapBetween = (1920 - totalItemH) / 3

    // Top spacer ends at y=120
    // Badge starts after first gap
    const badgeY = 120 + gapBetween
    // Products center after badge + second gap
    const productAreaTop = badgeY + pillH + gapBetween
    const productCenterY = productAreaTop + productAreaH / 2

    // 700px wide container, both products absolutely positioned
    // chocolate: left=gap(20px from container left), queso: right=gap(20px from container right)
    const containerLeft = (1080 - 700) / 2 // 190
    const chocolateX = containerLeft + gap
    const quesoX = containerLeft + 700 - gap - productW

    const productY = productCenterY - productSize / 2

    return {
      background: '#03045e',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#03045e', 1, '#0077b6'],
      },
      elements: [
        // Background stacked ghost text
        ...bgTextElements,

        // Badge glass pill background
        {
          id: 'badge-bg',
          type: 'rect',
          x: pillX,
          y: badgeY,
          width: pillW,
          height: pillH,
          fill: 'rgba(255,255,255,0.1)',
          stroke: 'rgba(255,255,255,0.2)',
          strokeWidth: 1,
          cornerRadius: 26,
          draggable: true,
        },

        // Badge text — text-[28px] font-bold tracking-[6px] text-white
        {
          id: 'badge',
          type: 'text',
          text: badge,
          x: pillX,
          y: badgeY + 12,
          width: pillW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 6,
          draggable: true,
        },

        // Chocolate product — left side, rotate(-8deg), SQUARE
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: productY,
          width: productW,
          height: productSize,
          rotation: -8,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.45)',
          shadowBlur: 64,
          shadowOffsetX: 0,
          shadowOffsetY: 32,
        },

        // Queso product — right side, rotate(8deg), SQUARE
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: productY,
          width: productW,
          height: productSize,
          rotation: 8,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.45)',
          shadowBlur: 64,
          shadowOffsetX: 0,
          shadowOffsetY: 32,
        },

        // CTA button background — rounded-full bg-white
        {
          id: 'cta-bg',
          type: 'rect',
          x: btnX,
          y: btnY,
          width: btnW,
          height: btnH,
          fill: '#ffffff',
          cornerRadius: 39,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.25)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
        },

        // CTA text — text-[34px] font-extrabold text-tertiary (#03045e)
        {
          id: 'cta-text',
          type: 'text',
          text: cta,
          x: btnX,
          y: btnY + 22,
          width: btnW,
          fontSize: 34,
          fontFamily: 'Josefin Sans',
          fontStyle: '800',
          fill: '#03045e',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
