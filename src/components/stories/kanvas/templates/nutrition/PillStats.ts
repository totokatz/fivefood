import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: bg-background (white), flex-col items-center overflow-hidden
// logo mt-[80px] w-[220px] opacity-50
// mt-[80px] both products overlapping (chocolate rotate(-6deg) translateX(gap), queso *0.9 rotate(5deg) translateX(-gap))
// mt-[60px] pill badges flex-wrap justify-center gap-[20px] px-[60px]
// tagline mt-auto mb-[80px]

export const PillStatsTemplate: KanvasTemplate = {
  id: 'k-nutri-pill-stats',
  name: 'Pill Stats',
  category: 'nutricional',
  fields: [
    { key: 'stat1', label: 'Pill 1', type: 'text', default: '8g Proteína' },
    { key: 'stat2', label: 'Pill 2', type: 'text', default: '6.6g Fibra' },
    { key: 'stat3', label: 'Pill 3', type: 'text', default: '0g Trans Fat' },
    { key: 'stat4', label: 'Pill 4', type: 'text', default: 'Sin TACC' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Lo que importa, a la vista' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const stat1 = (data.stat1 as string) || '8g Proteína'
    const stat2 = (data.stat2 as string) || '6.6g Fibra'
    const stat3 = (data.stat3 as string) || '0g Trans Fat'
    const stat4 = (data.stat4 as string) || 'Sin TACC'
    const tagline = (data.tagline as string) || 'Lo que importa, a la vista'
    const productSize = Number(data.productSize) || 400
    const productGap = 40

    // Both products always: chocolate + queso
    // Queso is 0.9x size
    const quesoSize = Math.round(productSize * 0.9)

    // Logo: mt-[80px] w-[220px] h=220/2.62≈84
    const logoW = 220
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // Products: mt-[80px] after logo → y=80+84+80=244
    const productsY = logoY + logoH + 80
    // Products are SQUARE, centered, overlapping via translateX
    // Chocolate: rotate(-6deg) translateX(+gap), zIndex 2
    // Queso: height*0.9, rotate(5deg) translateX(-gap), zIndex 1
    const chocolateX = (1080 - productSize) / 2 + productGap
    const quesoX = (1080 - quesoSize) / 2 - productGap
    const quesoY = productsY + (productSize - quesoSize) / 2

    // Pills: mt-[60px] after products, flex-wrap justify-center gap-[20px] px-[60px]
    // Pill: rounded-full px-[48px] py-[24px] text-[32px] → h=24+32+24=80
    const pillsStartY = productsY + productSize + 60
    const pillH = 80
    const pillGap = 20
    // 2 pills per row (flex-wrap), container w = 1080-120=960
    const pillW = 460
    const pillsPerRow = 2
    const totalPillsW = pillsPerRow * pillW + (pillsPerRow - 1) * pillGap
    const pillsStartX = (1080 - totalPillsW) / 2

    const pills = [stat1, stat2, stat3, stat4]

    // Tagline: mt-auto mb-[80px] text-[32px]
    const taglineY = 1920 - 80 - 32

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Logo — mt-[80px] w-[220px] opacity-50
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },

        // Queso (behind, zIndex 1) — SQUARE, height*0.9, rotate(5deg), translateX(-gap)
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: quesoSize,
          height: quesoSize,
          rotation: 5,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 40,
          shadowOffsetY: 16,
          shadowOpacity: 1,
          draggable: true,
        },
        // Chocolate (front, zIndex 2) — SQUARE, rotate(-6deg), translateX(+gap)
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: -6,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 40,
          shadowOffsetY: 16,
          shadowOpacity: 1,
          draggable: true,
        },

        // Pill badges — 2x2 grid
        ...pills.flatMap((pill, i) => {
          const row = Math.floor(i / pillsPerRow)
          const col = i % pillsPerRow
          const px = pillsStartX + col * (pillW + pillGap)
          const py = pillsStartY + row * (pillH + pillGap)
          return [
            // Pill bg — bg-primary, rounded-full
            {
              id: `pill-bg-${i}`,
              type: 'rect' as const,
              x: px,
              y: py,
              width: pillW,
              height: pillH,
              fill: '#00b4d8',
              cornerRadius: 40,
              draggable: false,
            },
            // Pill text — text-[32px] font-bold text-white
            {
              id: `pill-text-${i}`,
              type: 'text' as const,
              text: pill,
              x: px,
              y: py + (pillH - 32) / 2,
              width: pillW,
              fontSize: 32,
              fontFamily: 'Josefin Sans',
              fontStyle: '700',
              fill: '#ffffff',
              align: 'center',
              draggable: true,
            },
          ]
        }),

        // Tagline — mt-auto mb-[80px] text-[32px] font-light text-tertiary/40
        {
          id: 'tagline',
          type: 'text',
          text: tagline,
          x: 0,
          y: taglineY,
          width: 1080,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(3,4,94,0.4)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
