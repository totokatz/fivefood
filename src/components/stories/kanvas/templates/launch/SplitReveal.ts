import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of SplitReveal.tsx
// Canvas: 1080×1920
// Top half (0–960) white — chocolate product anchored at bottom, pushed down by gap
// Bottom half (960–1920) navy #03045e — queso product anchored at top, pulled up by gap
// Headline centered on split line: text-[160px] font-black, color #03045e, stroke #00b4d8, textShadow
// Logo-blue absolute top-[60px] center, opacity=40%
// White logo absolute bottom-[140px] center, opacity=30%
// Subtitle absolute bottom-[80px], text-[32px] text-white/60

export const SplitRevealTemplate: KanvasTemplate = {
  id: 'k-launch-split-reveal',
  name: 'Split Reveal',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'NUEVO' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Dos sabores que lo cambian todo' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const headline = (data.headline as string) || 'NUEVO'
    const subtitle = (data.subtitle as string) || 'Dos sabores que lo cambian todo'
    const productSize = Number(data.productSize) || 420

    // Product images are SQUARE
    const productW = productSize

    // HTML: productGap default 40
    const gap = 40

    // Logo dimensions: w=200, h=200/2.62 ≈ 76
    const logoBlueW = 200
    const logoBlueH = Math.round(logoBlueW / 2.62)
    const logoWhiteW = 160
    const logoWhiteH = Math.round(logoWhiteW / 2.62)

    // Chocolate: in top half, items-end → bottom-aligned to y=960, then translateY(+gap) pushes down
    // So bottom edge at 960+gap=1000, top edge at 1000-productSize
    const chocolateY = 960 + gap - productSize
    const chocolateX = (1080 - productW) / 2

    // Queso: in bottom half, items-start → top-aligned to y=960, then translateY(-gap) pulls up
    // So top edge at 960-gap=920
    const quesoY = 960 - gap
    const quesoX = (1080 - productW) / 2

    // Headline: centered on split line at y=960
    // Text height = 160*1 = 160, so top = 960 - 80 = 880
    const headlineY = 960 - 80

    return {
      background: '#ffffff',
      elements: [
        // Top half — white (background covers this)
        {
          id: 'top-half',
          type: 'rect',
          x: 0,
          y: 0,
          width: 1080,
          height: 960,
          fill: '#ffffff',
          draggable: false,
        },

        // Bottom half — navy
        {
          id: 'bottom-half',
          type: 'rect',
          x: 0,
          y: 960,
          width: 1080,
          height: 960,
          fill: '#03045e',
          draggable: false,
        },

        // Shadow overlay at split line (gradient from rgba(0,0,0,0.15) to transparent, 80px tall)
        {
          id: 'split-shadow',
          type: 'rect',
          x: 0,
          y: 960,
          width: 1080,
          height: 80,
          fill: 'rgba(0,0,0,0.15)',
          opacity: 1,
          draggable: false,
        },

        // Logo-blue — absolute top-[60px] center, w=200, opacity=40%
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoBlueW) / 2,
          y: 60,
          width: logoBlueW,
          height: logoBlueH,
          opacity: 0.4,
          draggable: true,
        },

        // Chocolate product — top half, anchored bottom, translateY(+gap)
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: chocolateY,
          width: productW,
          height: productSize,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.12)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 24,
        },

        // Queso product — bottom half, anchored top, translateY(-gap)
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: productW,
          height: productSize,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.35)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 24,
        },

        // Headline stroke layer — text-[160px] font-black, stroke #00b4d8
        {
          id: 'headline-stroke',
          type: 'text',
          text: headline,
          x: 0,
          y: headlineY,
          width: 1080,
          fontSize: 160,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'center',
          lineHeight: 1,
          stroke: '#00b4d8',
          strokeWidth: 6,
          draggable: false,
        },

        // Headline fill layer — color #03045e, textShadow
        {
          id: 'headline',
          type: 'text',
          text: headline,
          x: 0,
          y: headlineY,
          width: 1080,
          fontSize: 160,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.25)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 8,
        },

        // White logo — absolute bottom-[140px], center, w=160, opacity=30%
        {
          id: 'logo-white',
          type: 'image',
          src: 'logo',
          x: (1080 - logoWhiteW) / 2,
          y: 1920 - 140 - logoWhiteH,
          width: logoWhiteW,
          height: logoWhiteH,
          opacity: 0.3,
          draggable: true,
        },

        // Subtitle — absolute bottom-[80px], text-[32px] text-white/60
        {
          id: 'subtitle',
          type: 'text',
          text: subtitle,
          x: 0,
          y: 1920 - 80 - 32,
          width: 1080,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: 'rgba(255,255,255,0.6)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
