import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: linear-gradient(180deg, #001d25 0%, #03045e 100%)
// flex-col items-center overflow-hidden
// light cone conic-gradient at top
// logo mt-[70px] w-[180px] opacity-20
// mt-[40px] product centered (large, dramatic shadow)
// mt-[40px] 3 stat cards stacked gap-[16px] px-[72px]
//   each card: rounded-[24px] px-[44px] py-[36px], gradient bg + border + left accent
//   val text-[60px] min-w-[120px], label text-[28px]
// mt-auto mb-[80px] tagline block: line + text gap-[12px]

export const DarkCardsTemplate: KanvasTemplate = {
  id: 'k-nutri-dark-cards',
  name: 'Dark Cards',
  category: 'nutricional',
  fields: [
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína de arveja' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '0g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Grasas trans' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '✓' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Sin TACC · Vegano' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Cada dato cuenta' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const stat1Val = (data.stat1Val as string) || '8g'
    const stat1Label = (data.stat1Label as string) || 'Proteína de arveja'
    const stat2Val = (data.stat2Val as string) || '0g'
    const stat2Label = (data.stat2Label as string) || 'Grasas trans'
    const stat3Val = (data.stat3Val as string) || '✓'
    const stat3Label = (data.stat3Label as string) || 'Sin TACC · Vegano'
    const tagline = (data.tagline as string) || 'Cada dato cuenta'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const cards = [
      { val: stat1Val, label: stat1Label, id: '1' },
      { val: stat2Val, label: stat2Label, id: '2' },
      { val: stat3Val, label: stat3Label, id: '3' },
    ]

    // Logo: mt-[70px] w-[180px] h=180/2.62≈69
    const logoW = 180
    const logoH = Math.round(logoW / 2.62)
    const logoY = 70

    // Product: mt-[40px] after logo → y=70+69+40=179
    // SQUARE: width=height=productSize
    const productY = logoY + logoH + 40

    // Cards: mt-[40px] after product, px-[72px] gap-[16px]
    const cardPaddingX = 72
    const cardW = 1080 - cardPaddingX * 2 // 936
    const cardGap = 16
    // Card: rounded-[24px] px-[44px] py-[36px], content: val 60px + label 28px → height = 36+60+36=132
    const cardH = 132
    const cardsStartY = productY + productSize + 40

    // Tagline block: mt-auto mb-[80px], gap-[12px]
    // line h-[2px] + gap-[12px] + text-[26px] = 2+12+26=40
    // block bottom = 1920-80 = 1840, block top = 1840-40=1800
    const taglineLineY = 1920 - 80 - 26 - 12 - 2
    const taglineY = 1920 - 80 - 26

    return {
      background: '#001d25',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#001d25', 1, '#03045e'],
      },
      elements: [
        // Light cone effect — approximated as faint gradient rect
        {
          id: 'light-cone',
          type: 'rect',
          x: 240,
          y: 0,
          width: 600,
          height: 700,
          fillLinearGradientStartPoint: { x: 300, y: 0 },
          fillLinearGradientEndPoint: { x: 300, y: 700 },
          fillLinearGradientColorStops: [0, 'rgba(0,180,216,0.10)', 1, 'rgba(0,180,216,0)'],
          draggable: false,
        },

        // Logo — mt-[70px] w-[180px] opacity-20
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.2,
          draggable: true,
        },

        // Product — SQUARE, centered, dramatic shadow
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 60,
          shadowOffsetY: 30,
          shadowOpacity: 1,
          draggable: true,
        },

        // Stat cards — luminous panels
        ...cards.flatMap((card, i) => {
          const cardY = cardsStartY + i * (cardH + cardGap)
          return [
            // Card bg — gradient + border + rounded-[24px]
            {
              id: `card-bg-${card.id}`,
              type: 'rect' as const,
              x: cardPaddingX,
              y: cardY,
              width: cardW,
              height: cardH,
              fillLinearGradientStartPoint: { x: 0, y: 0 },
              fillLinearGradientEndPoint: { x: cardW, y: cardH },
              fillLinearGradientColorStops: [0, 'rgba(0,180,216,0.06)', 1, 'rgba(255,255,255,0.02)'],
              cornerRadius: 24,
              stroke: 'rgba(0,180,216,0.1)',
              strokeWidth: 1,
              draggable: false,
            },
            // Glow accent on left edge — w-[3px], gradient top to bottom
            {
              id: `card-accent-${card.id}`,
              type: 'rect' as const,
              x: cardPaddingX,
              y: cardY,
              width: 3,
              height: cardH,
              fillLinearGradientStartPoint: { x: 0, y: 0 },
              fillLinearGradientEndPoint: { x: 0, y: cardH },
              fillLinearGradientColorStops: [0, 'rgba(0,180,216,0.4)', 1, 'rgba(144,224,239,0.1)'],
              cornerRadius: 24,
              draggable: false,
            },
            // Stat value — px-[44px] py-[36px], min-w-[120px] text-[60px] font-black, color #00b4d8
            {
              id: `card-val-${card.id}`,
              type: 'text' as const,
              text: card.val,
              x: cardPaddingX + 44,
              y: cardY + 36,
              width: 120,
              fontSize: 60,
              fontFamily: 'Josefin Sans',
              fontStyle: '900',
              fill: '#00b4d8',
              align: 'left',
              lineHeight: 1,
              draggable: true,
            },
            // Stat label — gap-[36px] after val, text-[28px] font-medium, color rgba(255,255,255,0.45)
            {
              id: `card-label-${card.id}`,
              type: 'text' as const,
              text: card.label,
              x: cardPaddingX + 44 + 120 + 36,
              y: cardY + (cardH - 28) / 2,
              width: cardW - 44 - 120 - 36 - 44,
              fontSize: 28,
              fontFamily: 'Josefin Sans',
              fontStyle: '500',
              fill: 'rgba(255,255,255,0.45)',
              align: 'left',
              draggable: true,
            },
          ]
        }),

        // Tagline line — w-[40px] h-[2px] bg-rgba(0,180,216,0.3), centered
        {
          id: 'tagline-line',
          type: 'rect',
          x: (1080 - 40) / 2,
          y: taglineLineY,
          width: 40,
          height: 2,
          fill: 'rgba(0,180,216,0.3)',
          draggable: false,
        },
        // Tagline — text-[26px] font-light tracking-[4px] color:rgba(144,224,239,0.25)
        {
          id: 'tagline',
          type: 'text',
          text: tagline,
          x: 0,
          y: taglineY,
          width: 1080,
          fontSize: 26,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(144,224,239,0.25)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },
      ],
    }
  },
}
