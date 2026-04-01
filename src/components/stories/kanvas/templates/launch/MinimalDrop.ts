import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of MinimalDrop.tsx
// Canvas: 1080×1920  |  bg: #f8fdff (bg-background)
// HTML: relative flex col items-center justify-center px-[80]
// Logo absolute top-[80], handle absolute bottom-[80]
// Center group: product (mb-[64]) | label | productName (mt-4) | divider (mt-8) | subtitle (mt-8)

export const MinimalDropTemplate: KanvasTemplate = {
  id: 'k-launch-minimal-drop',
  name: 'Minimal Drop',
  category: 'lanzamientos',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'NEW DROP' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor\nChocolate' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Ya disponible en la web' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const label = (data.label as string) || 'NEW DROP'
    const productName = (data.productName as string) || 'Sabor\nChocolate'
    const subtitle = (data.subtitle as string) || 'Ya disponible en la web'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 500

    // Center group calculation:
    // product (productSize) + mb-[64] (64) + label (36) + mt-4 (16) + productName + mt-8 (32) + divider (6) + mt-8 (32) + subtitle (32)
    const productNameLines = productName.split('\n').length
    const productNameH = Math.round(80 * 1.15 * productNameLines)
    const centerGroupH = productSize + 64 + 36 + 16 + productNameH + 32 + 6 + 32 + 32
    const centerStartY = (1920 - centerGroupH) / 2

    const productY = centerStartY
    const productX = (1080 - productSize) / 2 // SQUARE

    const labelY = productY + productSize + 64
    const productNameY = labelY + 36 + 16
    const barY = productNameY + productNameH + 32
    const subtitleY = barY + 6 + 32

    // Logo height: w=240 → h=240/2.62 ≈ 92
    const logoW = 240
    const logoH = Math.round(logoW / 2.62)

    return {
      background: '#f8fdff',
      elements: [
        // Logo — logo-blue, absolute top-[80px] centered, w=240, opacity=60%
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: 80,
          width: logoW,
          height: logoH,
          opacity: 0.6,
          draggable: true,
        },

        // Product image — SQUARE, drop-shadow, no rotation
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          draggable: true,
          shadowColor: 'rgba(0,53,64,0.15)',
          shadowBlur: 96,
          shadowOffsetX: 0,
          shadowOffsetY: 48,
        },

        // Label — text-[36px] font-bold tracking-[14px] text-primary (#00b4d8) uppercase
        {
          id: 'label',
          type: 'text',
          text: label.toUpperCase(),
          x: 80,
          y: labelY,
          width: 920,
          fontSize: 36,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#00b4d8',
          align: 'center',
          letterSpacing: 14,
          draggable: true,
        },

        // Product name — text-[80px] font-extrabold leading-[1.15] text-tertiary (#03045e)
        {
          id: 'product-name',
          type: 'text',
          text: productName,
          x: 80,
          y: productNameY,
          width: 920,
          fontSize: 80,
          fontFamily: 'Josefin Sans',
          fontStyle: '800',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1.15,
          draggable: true,
        },

        // Divider bar — h-[6px] w-[100px] rounded-full bg-primary, mt-8
        {
          id: 'divider',
          type: 'rect',
          x: (1080 - 100) / 2,
          y: barY,
          width: 100,
          height: 6,
          fill: '#00b4d8',
          cornerRadius: 3,
          draggable: false,
        },

        // Subtitle — text-[32px] text-on-surface-variant (#40484c), mt-8
        {
          id: 'subtitle',
          type: 'text',
          text: subtitle,
          x: 80,
          y: subtitleY,
          width: 920,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: '#40484c',
          align: 'center',
          draggable: true,
        },

        // Handle — absolute bottom-[80px], text-[28px] text-secondary (#0077b6)
        {
          id: 'handle',
          type: 'text',
          text: '@fivefood.ok',
          x: 0,
          y: 1920 - 80 - 28,
          width: 1080,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
