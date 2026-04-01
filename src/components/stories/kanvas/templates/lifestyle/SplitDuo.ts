import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const SplitDuoTemplate: KanvasTemplate = {
  id: 'k-lifestyle-split-duo',
  name: 'Split Duo',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'DOS SABORES' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Una misma pasión' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 500
    const headline = (data.headline as string) || 'DOS SABORES'
    const subtitle = (data.subtitle as string) || 'Una misma pasión'

    const halfW = 540
    const itemSize = productSize * 0.8

    // HTML layout: relative, no padding, full bleed
    // Left half: w-1/2=540, h-full=1920, bg=#03045e, flex items-center justify-center
    //   Primary product: h=itemSize, rotate(-3deg), centered in left half
    // Right half: w-1/2=540, h-full=1920, bg=#f8fdff, flex items-center justify-center
    //   Secondary product: h=itemSize, rotate(3deg), centered in right half
    //
    // Centered text overlay (absolute inset-0 flex-col items-center justify-center):
    //   headline: text-[72px] font-black tracking-[6px] uppercase — split gradient text
    //   subtitle: mt-2(~8px) text-[40px] font-light tracking-[6px] uppercase — split gradient text
    //   In kanvas: use white for headline (readable on navy), cyan for subtitle
    //
    // Logo: absolute top-[80px] left-1/2 -translate-x-1/2 w-[200px] opacity-40
    //   mixBlendMode: difference (approximated as white logo)
    //
    // Handle: absolute bottom-[80px] left-1/2 -translate-x-1/2 text-[28px]
    //   Split gradient text — approximate as white/50

    const logoW = 200
    const logoH = Math.round(logoW / 2.62) // ~76

    // Products centered in their respective halves, vertically centered
    const primaryX = halfW / 2 - itemSize / 2
    const primaryY = 960 - itemSize / 2
    const secondaryX = halfW + halfW / 2 - itemSize / 2
    const secondaryY = 960 - itemSize / 2

    // Centered text — vertically centered at y=960
    // headline h=72, subtitle mt-2=8, subtitle h=40 → total=120
    // top of block = 960 - 120/2 = 900
    const headlineY = 960 - (72 + 8 + 40) / 2
    const subtitleY = headlineY + 72 + 8

    return {
      background: '#03045e',
      elements: [
        // Left half — dark navy (#03045e)
        {
          id: 'left-panel',
          type: 'rect',
          x: 0,
          y: 0,
          width: halfW,
          height: 1920,
          fill: '#03045e',
          draggable: false,
        },

        // Right half — off-white (#f8fdff)
        {
          id: 'right-panel',
          type: 'rect',
          x: halfW,
          y: 0,
          width: halfW,
          height: 1920,
          fill: '#f8fdff',
          draggable: false,
        },

        // Logo — top center, white logo, 40% opacity (mixBlendMode:difference ≈ white on navy)
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: 80,
          width: logoW,
          height: logoH,
          opacity: 0.4,
          draggable: true,
        },

        // Primary product — centered in LEFT half, rotate -3deg (SQUARE: width=height=itemSize)
        {
          id: 'product-primary',
          type: 'image',
          src: `producto-${product}`,
          x: primaryX,
          y: primaryY,
          width: itemSize,
          height: itemSize,
          rotation: -3,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          shadowOpacity: 1,
        },

        // Secondary product — centered in RIGHT half, rotate +3deg (SQUARE: width=height=itemSize)
        {
          id: 'product-secondary',
          type: 'image',
          src: `producto-${secondary}`,
          x: secondaryX,
          y: secondaryY,
          width: itemSize,
          height: itemSize,
          rotation: 3,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 16,
          shadowOpacity: 1,
        },

        // Headline — centered overlay, white text (best approximation of split-gradient)
        {
          id: 'headline',
          type: 'text',
          x: 0,
          y: headlineY,
          width: 1080,
          text: headline,
          fontSize: 72,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 6,
          draggable: true,
        },

        // Subtitle — centered, cyan (#90e0ef) approximation of split-gradient
        {
          id: 'subtitle',
          type: 'text',
          x: 0,
          y: subtitleY,
          width: 1080,
          text: subtitle.toUpperCase(),
          fontSize: 40,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#90e0ef',
          align: 'center',
          letterSpacing: 6,
          draggable: true,
        },

        // Handle — bottom center, white at 50% opacity
        {
          id: 'handle',
          type: 'text',
          x: 0,
          y: 1920 - 80 - 28,
          width: 1080,
          text: '@fivefood.ok',
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fill: 'rgba(255,255,255,0.5)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
