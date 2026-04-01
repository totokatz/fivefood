import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of FramedDuo.tsx
// Canvas: 1080×1920  |  bg: white
// HTML: flex col items-center justify-between px-[60] py-[100]
// Layout (top→bottom): logo | headline | framed duo (2 frames + 2 products) | subtitle | handle
// Frames: 380×480, border 3px, rounded 24px
// Frame left: rotate(-4deg) translateX(-80px), stroke #03045e, opacity=0.2
// Frame right: rotate(4deg) translateX(+80px), stroke #00b4d8, opacity=0.25
// Products: SQUARE, left rotate(-4deg) translateX(-productGap), right rotate(4deg) translateX(+productGap)
// productGap default = 100

export const FramedDuoTemplate: KanvasTemplate = {
  id: 'k-launch-framed-duo',
  name: 'Framed Duo',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'NUEVOS\nSABORES' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Ya disponibles en nuestra web' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const headline = (data.headline as string) || 'NUEVOS\nSABORES'
    const subtitle = (data.subtitle as string) || 'Ya disponibles en nuestra web'
    const productSize = Number(data.productSize) || 380

    // Products are SQUARE
    const productW = productSize

    // productGap default = 100
    const productGap = 100

    // Logo: w=200, h=200/2.62 ≈ 76
    const logoW = 200
    const logoH = Math.round(logoW / 2.62)

    // Frame dimensions
    const frameW = 380
    const frameH = 480

    // HTML: justify-between with py-[100] → items distributed across y=100..1820
    // Items: logo(76), headline(~151 for 2 lines), framed-duo(~500), subtitle(30), handle(28)
    // Total item height ≈ 76+151+500+30+28 = 785
    // 5 items, 4 gaps: (1720-785)/4 ≈ 234
    const headlineLines = headline.split('\n').length
    const headlineH = Math.round(72 * 1.05 * headlineLines)
    const duoAreaH = Math.max(productSize + 80, 500)

    const totalItemH = logoH + headlineH + duoAreaH + 30 + 28
    const gapBetween = (1720 - totalItemH) / 4

    const logoY = 100
    const headlineY = logoY + logoH + gapBetween
    const duoCenterY = headlineY + headlineH + gapBetween + duoAreaH / 2
    const subtitleY = headlineY + headlineH + gapBetween + duoAreaH + gapBetween
    const handleY = subtitleY + 30 + gapBetween

    // Frame and product centers
    const frameCenterX = 540
    const frameCenterY = duoCenterY

    // Frame left: center at (540-80, centerY), rotated -4deg
    const frameLeftX = frameCenterX - 80 - frameW / 2
    const frameLeftY = frameCenterY - frameH / 2

    // Frame right: center at (540+80, centerY), rotated 4deg
    const frameRightX = frameCenterX + 80 - frameW / 2
    const frameRightY = frameCenterY - frameH / 2

    // Products: centered, with translateX offsets
    const chocolateX = frameCenterX - productGap - productW / 2
    const chocolateY = frameCenterY - productSize / 2
    const quesoX = frameCenterX + productGap - productW / 2
    const quesoY = frameCenterY - productSize / 2

    return {
      background: '#ffffff',
      elements: [
        // Logo — logo-blue, top center, w=200, opacity=50%
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

        // Headline — text-[72px] font-black leading-[1.05] text-tertiary (#03045e) text-center
        {
          id: 'headline',
          type: 'text',
          text: headline,
          x: 60,
          y: headlineY,
          width: 960,
          fontSize: 72,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1.05,
          draggable: true,
        },

        // Frame 1 — 380×480, border 3px #03045e, borderRadius 24, rotate(-4deg), opacity=0.2
        {
          id: 'frame-left',
          type: 'rect',
          x: frameLeftX,
          y: frameLeftY,
          width: frameW,
          height: frameH,
          fill: 'rgba(0,0,0,0)',
          stroke: '#03045e',
          strokeWidth: 3,
          cornerRadius: 24,
          rotation: -4,
          opacity: 0.2,
          draggable: false,
        },

        // Frame 2 — 380×480, border 3px #00b4d8, borderRadius 24, rotate(4deg), opacity=0.25
        {
          id: 'frame-right',
          type: 'rect',
          x: frameRightX,
          y: frameRightY,
          width: frameW,
          height: frameH,
          fill: 'rgba(0,0,0,0)',
          stroke: '#00b4d8',
          strokeWidth: 3,
          cornerRadius: 24,
          rotation: 4,
          opacity: 0.25,
          draggable: false,
        },

        // Chocolate product — SQUARE, rotate(-4deg), translateX(-productGap)
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: chocolateY,
          width: productW,
          height: productSize,
          rotation: -4,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
        },

        // Queso product — SQUARE, rotate(4deg), translateX(+productGap)
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: productW,
          height: productSize,
          rotation: 4,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
        },

        // Subtitle — text-[30px] text-on-surface-variant (#40484c)
        {
          id: 'subtitle',
          type: 'text',
          text: subtitle,
          x: 0,
          y: subtitleY,
          width: 1080,
          fontSize: 30,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: '#40484c',
          align: 'center',
          draggable: true,
        },

        // Handle — text-[28px] font-semibold text-secondary (#0077b6)
        {
          id: 'handle',
          type: 'text',
          text: '@fivefood.ok',
          x: 0,
          y: handleY,
          width: 1080,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
