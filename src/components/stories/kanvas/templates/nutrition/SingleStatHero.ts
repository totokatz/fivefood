import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: linear-gradient(160deg, #00b4d8 0%, #0077b6 100%)
// flex-col items-center justify-between px-[80px] py-[80px]
// Layout (justify-between): logo | center block (statValue, statLabel, description) | product | handle

export const SingleStatHeroTemplate: KanvasTemplate = {
  id: 'k-nutri-single-stat',
  name: 'Single Stat Hero',
  category: 'nutricional',
  fields: [
    { key: 'statValue', label: 'Valor', type: 'text', default: '8g' },
    { key: 'statLabel', label: 'Label', type: 'text', default: 'Proteína' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Por porción · Proteína de arveja\n100% vegano · Sin TACC' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const statValue = (data.statValue as string) || '8g'
    const statLabel = (data.statLabel as string) || 'Proteína'
    const description = (data.description as string) || 'Por porción · Proteína de arveja\n100% vegano · Sin TACC'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 500

    // px-[80px] py-[80px] justify-between
    // Items: logo, center-block, product, handle
    // Logo: w-[220px], h=220/2.62≈84
    const logoW = 220
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // Handle at bottom: y=1920-80-28=1812
    const handleY = 1920 - 80 - 28

    // Product above handle: productSize square
    // product bottom edge ~ handleY - some gap
    // justify-between distributes: logo, center-block, product, handle
    // Total content: logoH + centerBlock + productSize + 28(handle)
    // centerBlock: 300(statVal) + 16(mt-4) + 64(statLabel) + 32(mt-8) + ~120(desc 2 lines) = ~532
    // total = 84+532+productSize+28 = 644+productSize
    // available = 1920-80-80=1760
    // gap = (1760-644-productSize)/3 between 4 items

    const centerBlockH = 300 + 16 + 64 + 32 + 120 // ~532
    const handleH = 28
    const totalContentH = logoH + centerBlockH + productSize + handleH
    const availableH = 1920 - 80 * 2
    const betweenGap = (availableH - totalContentH) / 3

    const centerBlockY = logoY + logoH + betweenGap
    const statValueY = centerBlockY
    const statLabelY = statValueY + 300 + 16
    const descY = statLabelY + 64 + 32

    const productY = centerBlockY + centerBlockH + betweenGap

    return {
      background: '#00b4d8',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 1080, y: 1920 },
        fillLinearGradientColorStops: [0, '#00b4d8', 1, '#0077b6'],
      },
      elements: [
        // Logo — w-[220px] opacity-50
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
        // Stat value — text-[300px] font-black leading-none text-white, textShadow
        {
          id: 'stat-value',
          type: 'text',
          text: statValue,
          x: 80,
          y: statValueY,
          width: 1080 - 160,
          fontSize: 300,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowBlur: 72,
          shadowOffsetY: 12,
          shadowOpacity: 1,
          draggable: true,
        },
        // Stat label — mt-4 text-[64px] font-bold tracking-[14px] text-white/85 uppercase
        {
          id: 'stat-label',
          type: 'text',
          text: statLabel.toUpperCase(),
          x: 80,
          y: statLabelY,
          width: 1080 - 160,
          fontSize: 64,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: 'rgba(255,255,255,0.85)',
          align: 'center',
          letterSpacing: 14,
          draggable: true,
        },
        // Description — mt-8 text-[36px] leading-relaxed text-white/50
        {
          id: 'description',
          type: 'text',
          text: description,
          x: 80,
          y: descY,
          width: 1080 - 160,
          fontSize: 36,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(255,255,255,0.5)',
          align: 'center',
          lineHeight: 1.625,
          draggable: true,
        },
        // Product — SQUARE, drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)]
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowBlur: 32,
          shadowOffsetY: 16,
          shadowOpacity: 1,
          draggable: true,
        },
        // Handle — text-[28px] text-white/40 at bottom
        {
          id: 'handle',
          type: 'text',
          text: '@fivefood.ok',
          x: 80,
          y: handleY,
          width: 1080 - 160,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
