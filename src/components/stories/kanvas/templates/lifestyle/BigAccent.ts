import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const BigAccentTemplate: KanvasTemplate = {
  id: 'k-lifestyle-big-accent',
  name: 'Big Accent',
  category: 'lifestyle',
  fields: [
    { key: 'topLine', label: 'Línea superior', type: 'text', default: 'Tu dosis de' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'energía real' },
    { key: 'bottomLine', label: 'Línea inferior', type: 'text', default: 'sin vueltas' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const topLine = (data.topLine as string) || 'Tu dosis de'
    const accent = (data.accent as string) || 'energía real'
    const bottomLine = (data.bottomLine as string) || 'sin vueltas'
    const productSize = Number(data.productSize) || 500

    // HTML layout: flex-col items-center justify-between px-[80px] py-[100px]
    // Canvas: 1080×1920
    // Content x=80, width=920
    // justify-between distributes: logo(y=100), text-block, product, handle(bottom at y=1820)
    //
    // Elements top→bottom:
    //   1. Logo: w=240, h=240/2.62≈92, at y=100, centered
    //   2. Text block (topLine + accent + bottomLine) — centered vertically in remaining space
    //   3. Product — centered below text block
    //   4. Handle: text-[28px] at bottom, ending at y=1820
    //
    // With justify-between and 4 items, they space evenly between y=100 and y=1820 (handle baseline)
    // Logo: top=100, h≈92 → bottom≈192
    // Handle: fontSize=28, baseline≈y=1820, so top≈1792
    // Available space for text block + product: 192..1792 = 1600px
    // Text block height: 48 + 140 + 8(mt-2) + 48 = ~244px
    // Product height: productSize
    // Gap = (1600 - 244 - productSize) / 3 (3 gaps between 4 items... but only 2 middle items)
    // Actually justify-between with 4 items: top item at top, bottom at bottom, middle 2 evenly spaced
    // space = 1792 - 192 = 1600
    // gap = (1600 - textBlockH - productSize) / 3... but actually it's (space) / 3 for the 2 middle items
    //
    // Simpler: 4 items, justify-between → gaps are equal
    // totalContentH = logoH + textBlockH + productSize + handleH
    // remaining = 1720(py range) - totalContentH
    // gap = remaining / 3
    const logoW = 240
    const logoH = Math.round(logoW / 2.62) // ~92
    const handleFontSize = 28
    const textBlockH = 48 + 140 + 8 + 48 // topLine + accent(lineHeight:1) + mt-2(~8px) + bottomLine ≈ 244
    const totalPadRange = 1920 - 100 - 100 // 1720
    const totalContent = logoH + textBlockH + productSize + handleFontSize
    const gap = (totalPadRange - totalContent) / 3

    const logoY = 100
    const textBlockY = logoY + logoH + gap
    const productY = textBlockY + textBlockH + gap
    const handleY = productY + productSize + gap

    return {
      background: '#00b4d8',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 432, y: 1920 },
        fillLinearGradientColorStops: [0, '#00b4d8', 0.6, '#0077b6', 1, '#03045e'],
      },
      elements: [
        // Logo — top center, white, 50% opacity
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

        // Top line — small uppercase, light weight, tracked
        {
          id: 'top-line',
          type: 'text',
          x: 80,
          y: textBlockY,
          width: 920,
          text: topLine.toUpperCase(),
          fontSize: 48,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 10,
          draggable: true,
        },

        // Accent word — large Satisfy cursive, white with text shadow
        {
          id: 'accent',
          type: 'text',
          x: 80,
          y: textBlockY + 48,
          width: 920,
          text: accent,
          fontSize: 140,
          fontFamily: 'Satisfy, cursive',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 1,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
          shadowOpacity: 1,
        },

        // Bottom line — small uppercase, light weight, tracked (mt-2 ≈ 8px after accent)
        {
          id: 'bottom-line',
          type: 'text',
          x: 80,
          y: textBlockY + 48 + 140 + 8,
          width: 920,
          text: bottomLine.toUpperCase(),
          fontSize: 48,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 10,
          draggable: true,
        },

        // Product — center, rotated 3deg, with drop shadow (SQUARE: width=height=productSize)
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          rotation: 3,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.25)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          shadowOpacity: 1,
        },

        // Handle — bottom, white at 40% opacity
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: handleY,
          width: 920,
          text: '@fivefood.ok',
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
