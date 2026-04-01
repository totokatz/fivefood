import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: linear-gradient(180deg, #00b4d8 0%, #0077b6 40%, #03045e 100%)
// flex-col items-center overflow-hidden
// logo mt-[80px] w-[220px] opacity-40
// ghost stat absolute top:320px centered fontSize:600px text-white/[0.06]
// mt-[160px] both products overlapping (chocolate rotate(-5deg) translateX(+gap) z2, queso *0.88 rotate(4deg) translateX(-gap) z1)
// mt-auto mb-[40px] stats row: 2 stats with vertical divider, gap-[64px] px-[80px]
// mb-[80px] tagline

export const GradientStatsTemplate: KanvasTemplate = {
  id: 'k-nutri-gradient-stats',
  name: 'Gradient Stats',
  category: 'nutricional',
  fields: [
    { key: 'ghostStat', label: 'Stat fantasma (fondo)', type: 'text', default: '8g' },
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '0g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Trans Fat' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Nutrición que se nota' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const ghostStat = (data.ghostStat as string) || '8g'
    const stat1Val = (data.stat1Val as string) || '8g'
    const stat1Label = (data.stat1Label as string) || 'Proteína'
    const stat2Val = (data.stat2Val as string) || '0g'
    const stat2Label = (data.stat2Label as string) || 'Trans Fat'
    const tagline = (data.tagline as string) || 'Nutrición que se nota'
    const productSize = Number(data.productSize) || 440
    const productGap = 30

    // Queso is 0.88x
    const quesoSize = Math.round(productSize * 0.88)

    // Logo: mt-[80px] w-[220px] h=220/2.62≈84
    const logoW = 220
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // Products: mt-[160px] after logo → y=80+84+160=324
    const productsY = logoY + logoH + 160
    // SQUARE, centered, overlapping
    const chocolateX = (1080 - productSize) / 2 + productGap
    const quesoX = (1080 - quesoSize) / 2 - productGap
    const quesoY = productsY + (productSize - quesoSize) / 2

    // Tagline: mb-[80px] text-[30px] → y = 1920-80-30 = 1810
    const taglineY = 1920 - 80 - 30

    // Stats row: mt-auto mb-[40px] → bottom of stats = taglineY - 40
    // Stats block: text-[80px] stat + mt-[8px] + text-[24px] label = 80+8+24 = 112
    const statsBlockH = 112
    const statsBottomY = taglineY - 40
    const statsY = statsBottomY - statsBlockH
    const statLabelY = statsY + 80 + 8

    // Stats layout: justify-center gap-[64px] px-[80px]
    // Two stat columns + divider in between
    // Left column: from 80 to ~540-32, right from ~540+32 to 1000
    // Divider at center, h-[100px] w-[2px]
    const statColW = (1080 - 160 - 64) / 2 // (920-64)/2 = 428
    const leftStatX = 80
    const rightStatX = 80 + statColW + 64

    return {
      background: '#00b4d8',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#00b4d8', 0.4, '#0077b6', 1, '#03045e'],
      },
      elements: [
        // Logo — mt-[80px] w-[220px] opacity-40
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.4,
          draggable: true,
        },

        // Ghost stat watermark — absolute top:320px centered, fontSize:600px, text-white/[0.06]
        {
          id: 'ghost-stat',
          type: 'text',
          text: ghostStat,
          x: 0,
          y: 320,
          width: 1080,
          fontSize: 600,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: 'rgba(255,255,255,0.06)',
          align: 'center',
          lineHeight: 1,
          draggable: false,
        },

        // Queso (behind, zIndex 1) — SQUARE, height*0.88, rotate(4deg), translateX(-gap)
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: quesoSize,
          height: quesoSize,
          rotation: 4,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 48,
          shadowOffsetY: 24,
          shadowOpacity: 1,
          draggable: true,
        },
        // Chocolate (front, zIndex 2) — SQUARE, rotate(-5deg), translateX(+gap)
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: -5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 48,
          shadowOffsetY: 24,
          shadowOpacity: 1,
          draggable: true,
        },

        // Stat 1 value — text-[80px] font-black leading-none text-white
        {
          id: 'stat1-val',
          type: 'text',
          text: stat1Val,
          x: leftStatX,
          y: statsY,
          width: statColW,
          fontSize: 80,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Stat 1 label — mt-[8px] text-[24px] font-semibold tracking-[4px] text-white/40 uppercase
        {
          id: 'stat1-label',
          type: 'text',
          text: stat1Label.toUpperCase(),
          x: leftStatX,
          y: statLabelY,
          width: statColW,
          fontSize: 24,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Vertical divider — h-[100px] w-[2px] bg-white/15, centered vertically with stats
        {
          id: 'stats-divider',
          type: 'rect',
          x: 539,
          y: statsY + (statsBlockH - 100) / 2,
          width: 2,
          height: 100,
          fill: 'rgba(255,255,255,0.15)',
          draggable: false,
        },

        // Stat 2 value
        {
          id: 'stat2-val',
          type: 'text',
          text: stat2Val,
          x: rightStatX,
          y: statsY,
          width: statColW,
          fontSize: 80,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Stat 2 label
        {
          id: 'stat2-label',
          type: 'text',
          text: stat2Label.toUpperCase(),
          x: rightStatX,
          y: statLabelY,
          width: statColW,
          fontSize: 24,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Tagline — mb-[80px] text-[30px] font-light text-white/30
        {
          id: 'tagline',
          type: 'text',
          text: tagline,
          x: 0,
          y: taglineY,
          width: 1080,
          fontSize: 30,
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
