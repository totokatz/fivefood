import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: linear-gradient(160deg, #003540 0%, #03045e 60%, #0077b6 100%)
// flex-col items-center overflow-hidden
// radial glow center, logo mt-[80px] w-[240px] opacity-50
// product centered rotate(-6deg) drop-shadow
// 4 glass stat cards horizontal strip px-[40px] gap-[16px]
// tagline mt-[48px] mb-[80px]

export const StatsGridTemplate: KanvasTemplate = {
  id: 'k-nutri-stats-grid',
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
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const stat1Val = (data.stat1Val as string) || '8g'
    const stat1Label = (data.stat1Label as string) || 'Proteína'
    const stat2Val = (data.stat2Val as string) || '6.6g'
    const stat2Label = (data.stat2Label as string) || 'Fibra'
    const stat3Val = (data.stat3Val as string) || '0g'
    const stat3Label = (data.stat3Label as string) || 'Trans Fat'
    const stat4Val = (data.stat4Val as string) || '✓'
    const stat4Label = (data.stat4Label as string) || 'Sin TACC'
    const tagline = (data.tagline as string) || 'Energía real, sin vueltas'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 500

    // Logo: mt-[80px], w-[240px], height=240/2.62≈92
    const logoW = 240
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // 4 stat cards: px-[40px] gap-[16px] → total usable 1080-80=1000
    // 4 cards, 3 gaps: (1000-48)/4 = 238 each
    const paddingX = 40
    const gap = 16
    const totalW = 1080 - paddingX * 2
    const cardW = Math.floor((totalW - gap * 3) / 4)
    // Card: py-[36px], content = 64px val + 12px gap + 20px label = 96px, total ≈ 36+96+36=168
    const cardH = 168

    // Tagline: mt-[48px] mb-[80px] text-[28px]
    // tagline y = cardsY + cardH + 48
    // tagline bottom = taglineY + 28 should be at ~1920-80=1840
    // So cardsY = 1840 - 28 - 48 - cardH = 1840 - 28 - 48 - 168 = 1596
    const taglineY = 1920 - 80 - 28
    const cardsY = taglineY - 48 - cardH

    // Product: centered between logo bottom and cards top
    // logoBottom = 80+92=172
    // available space = cardsY - 172
    // product centered in that space
    const logoBottom = logoY + logoH
    const productCenterY = logoBottom + (cardsY - logoBottom) / 2
    const productY = productCenterY - productSize / 2

    const stats = [
      { val: stat1Val, label: stat1Label, id: '1' },
      { val: stat2Val, label: stat2Label, id: '2' },
      { val: stat3Val, label: stat3Label, id: '3' },
      { val: stat4Val, label: stat4Label, id: '4' },
    ]

    return {
      background: '#003540',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 1080, y: 1920 },
        fillLinearGradientColorStops: [0, '#003540', 0.6, '#03045e', 1, '#0077b6'],
      },
      elements: [
        // Radial glow center
        {
          id: 'radial-glow',
          type: 'circle',
          x: 540,
          y: 960,
          width: 800,
          height: 800,
          fill: '#00b4d8',
          opacity: 0.12,
          draggable: false,
        },
        // Logo — mt-[80px] w-[240px] opacity-50
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
        // Product — centered, rotate(-6deg), drop-shadow-[0_24px_48px_rgba(0,180,216,0.25)]
        // SQUARE: width=height=productSize
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          rotation: -6,
          shadowColor: 'rgba(0,180,216,0.25)',
          shadowBlur: 48,
          shadowOffsetY: 24,
          shadowOpacity: 1,
          draggable: true,
        },

        // Stat cards — horizontal strip
        ...stats.flatMap((s, i) => {
          const cardX = paddingX + i * (cardW + gap)
          return [
            // Glass card bg — rgba(0,180,216,0.08), border rgba(0,180,216,0.15), rounded-[24px]
            {
              id: `card-bg-${s.id}`,
              type: 'rect' as const,
              x: cardX,
              y: cardsY,
              width: cardW,
              height: cardH,
              fill: 'rgba(0,180,216,0.08)',
              cornerRadius: 24,
              stroke: 'rgba(0,180,216,0.15)',
              strokeWidth: 1,
              draggable: false,
            },
            // Stat value — text-[64px] font-black leading-none text-primary, centered in card
            {
              id: `stat-val-${s.id}`,
              type: 'text' as const,
              text: s.val,
              x: cardX,
              y: cardsY + 36,
              width: cardW,
              fontSize: 64,
              fontFamily: 'Josefin Sans',
              fontStyle: '900',
              fill: '#00b4d8',
              align: 'center',
              lineHeight: 1,
              draggable: true,
            },
            // Stat label — mt-[12px] text-[20px] font-semibold tracking-[3px] text-white/40 uppercase
            {
              id: `stat-label-${s.id}`,
              type: 'text' as const,
              text: s.label.toUpperCase(),
              x: cardX,
              y: cardsY + 36 + 64 + 12,
              width: cardW,
              fontSize: 20,
              fontFamily: 'Josefin Sans',
              fontStyle: '600',
              fill: 'rgba(255,255,255,0.4)',
              align: 'center',
              letterSpacing: 3,
              draggable: true,
            },
          ]
        }),

        // Tagline — mt-[48px] mb-[80px] text-[28px] font-light text-white/30
        {
          id: 'tagline',
          type: 'text',
          text: tagline,
          x: 0,
          y: taglineY,
          width: 1080,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(255,255,255,0.3)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
