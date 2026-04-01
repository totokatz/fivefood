import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: linear-gradient(180deg, #03045e 0%, #001d25 100%)
// flex-col items-center overflow-hidden
// logo mt-[80px] w-[220px] opacity-40
// mt-[120px] products side-by-side items-end px-[60px], VS divider in center
// stats below each product (mt-[32px] stat, mt-[8px] label)
// tagline mt-auto mb-[80px]

export const DuoCompareTemplate: KanvasTemplate = {
  id: 'k-nutri-duo-compare',
  name: 'Duo Compare',
  category: 'nutricional',
  fields: [
    { key: 'leftStat', label: 'Stat izquierda', type: 'text', default: '8g' },
    { key: 'leftLabel', label: 'Label izquierda', type: 'text', default: 'Proteína' },
    { key: 'rightStat', label: 'Stat derecha', type: 'text', default: '6.6g' },
    { key: 'rightLabel', label: 'Label derecha', type: 'text', default: 'Fibra' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Dos sabores, misma potencia' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const leftStat = (data.leftStat as string) || '8g'
    const leftLabel = (data.leftLabel as string) || 'Proteína'
    const rightStat = (data.rightStat as string) || '6.6g'
    const rightLabel = (data.rightLabel as string) || 'Fibra'
    const tagline = (data.tagline as string) || 'Dos sabores, misma potencia'
    const productSize = Number(data.productSize) || 420
    const productGap = 40

    // Logo: mt-[80px] w-[220px] h=220/2.62≈84
    const logoW = 220
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // Products: mt-[120px] after logo → y=80+84+120=284
    // SQUARE images: width=height=productSize
    const productsY = logoY + logoH + 120

    // px-[60px], products side by side with VS divider (gap = productGap*2 + VS width ~80)
    // VS divider: mb-[80px] gap-[16px] → line(120)+gap(16)+VS text(48)+gap(16)+line(120) = 320
    // VS sits between products horizontally
    // Left column center: x from 60 to ~540-productGap
    // Right column center: x from ~540+productGap to 1020

    const leftColLeft = 60
    const leftColRight = 540 - productGap
    const leftColW = leftColRight - leftColLeft // 440
    const leftProductX = leftColLeft + (leftColW - productSize) / 2

    const rightColLeft = 540 + productGap
    const rightColRight = 1080 - 60
    const rightColW = rightColRight - rightColLeft // 440
    const rightProductX = rightColLeft + (rightColW - productSize) / 2

    // Items-end: products and VS divider align at bottom
    // Stats below products
    const statsY = productsY + productSize + 32
    const statLabelY = statsY + 96 + 8

    // VS divider: centered vertically with products, mb-[80px] from bottom of product area
    // VS block: line(120)+gap(16)+text(48)+gap(16)+line(120) = 320
    // VS block bottom aligns with products bottom - 80px
    const vsBlockBottom = productsY + productSize - 80
    const vsBlockTop = vsBlockBottom - 320
    const vsLineTopY = vsBlockTop
    const vsTextY = vsBlockTop + 120 + 16
    const vsLineBottomY = vsTextY + 48 + 16

    // Tagline: mt-auto mb-[80px]
    const taglineY = 1920 - 80 - 32

    return {
      background: '#03045e',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#03045e', 1, '#001d25'],
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

        // Left product (Chocolate) — rotate(-4deg), drop-shadow
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: leftProductX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: -4,
          shadowColor: 'rgba(0,180,216,0.2)',
          shadowBlur: 40,
          shadowOffsetY: 20,
          shadowOpacity: 1,
          draggable: true,
        },

        // VS divider — top line h-[120px] w-[2px] bg-white/10
        {
          id: 'vs-line-top',
          type: 'rect',
          x: 539,
          y: vsLineTopY,
          width: 2,
          height: 120,
          fill: 'rgba(255,255,255,0.10)',
          draggable: false,
        },
        // VS text — text-[48px] font-black text-primary, glow shadow
        {
          id: 'vs-text',
          type: 'text',
          text: 'VS',
          x: 440,
          y: vsTextY,
          width: 200,
          fontSize: 48,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'center',
          shadowColor: 'rgba(0,180,216,0.4)',
          shadowBlur: 40,
          shadowOpacity: 1,
          draggable: true,
        },
        // VS divider — bottom line
        {
          id: 'vs-line-bottom',
          type: 'rect',
          x: 539,
          y: vsLineBottomY,
          width: 2,
          height: 120,
          fill: 'rgba(255,255,255,0.10)',
          draggable: false,
        },

        // Right product (Queso) — rotate(4deg), drop-shadow
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: rightProductX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: 4,
          shadowColor: 'rgba(0,180,216,0.2)',
          shadowBlur: 40,
          shadowOffsetY: 20,
          shadowOpacity: 1,
          draggable: true,
        },

        // Left stat value — text-[96px] font-black leading-none text-primary
        {
          id: 'left-stat-val',
          type: 'text',
          text: leftStat,
          x: leftColLeft,
          y: statsY,
          width: leftColW,
          fontSize: 96,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Left stat label — mt-[8px] text-[28px] font-semibold tracking-[4px] text-white/40 uppercase
        {
          id: 'left-stat-label',
          type: 'text',
          text: leftLabel.toUpperCase(),
          x: leftColLeft,
          y: statLabelY,
          width: leftColW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Right stat value
        {
          id: 'right-stat-val',
          type: 'text',
          text: rightStat,
          x: rightColLeft,
          y: statsY,
          width: rightColW,
          fontSize: 96,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Right stat label
        {
          id: 'right-stat-label',
          type: 'text',
          text: rightLabel.toUpperCase(),
          x: rightColLeft,
          y: statLabelY,
          width: rightColW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Tagline — text-[32px] font-light text-white/30
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
          fill: 'rgba(255,255,255,0.3)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
