import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of CountdownStyle.tsx
// Canvas: 1080×1920  |  bg: white
// HTML: flex col items-center justify-between py-[100] overflow-hidden
// Dot pattern bg (decorative, opacity=4%)
// Layout (top→bottom): logo | headline+bar | products | date+subtitle | handle

export const CountdownStyleTemplate: KanvasTemplate = {
  id: 'k-launch-countdown',
  name: 'Countdown Style',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'MUY PRONTO' },
    { key: 'date', label: 'Fecha / Etiqueta', type: 'text', default: 'PRÓXIMAMENTE' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Dos nuevos sabores que no te podés perder' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const headline = (data.headline as string) || 'MUY PRONTO'
    const date = (data.date as string) || 'PRÓXIMAMENTE'
    const subtitle = (data.subtitle as string) || 'Dos nuevos sabores que no te podés perder'
    const productSize = Number(data.productSize) || 400

    // Products are SQUARE
    const productW = productSize

    // productGap default = 40
    const productGap = 40

    // Logo: w=200, h=200/2.62 ≈ 76
    const logoW = 200
    const logoH = Math.round(logoW / 2.62)

    // justify-between py-[100] → distribute 5 items across y=100..1820
    // Item heights:
    // logo: 76
    // headline block: 88(text) + 24(mt) + 4(bar) = 116
    // product area: productSize + 40 (spacer)
    const productAreaH = productSize + 40
    // date block: pill 68px + 20gap + subtitle ~42 (30*1.4) = 130
    const datePillH = 68 // py-[16]*2 + 36 = 68
    const subtitleLineH = Math.round(30 * 1.4)
    const dateBlockH = datePillH + 20 + subtitleLineH
    // handle: 28
    const headlineBlockH = 88 + 24 + 4

    const totalItemH = logoH + headlineBlockH + productAreaH + dateBlockH + 28
    const gapBetween = (1720 - totalItemH) / 4

    const logoY = 100
    const headlineY = logoY + logoH + gapBetween
    const barY = headlineY + 88 + 24
    const productAreaTop = barY + 4 + gapBetween
    const productCenterY = productAreaTop + productAreaH / 2
    const dateBlockTop = productAreaTop + productAreaH + gapBetween
    const handleY = dateBlockTop + dateBlockH + gapBetween

    // Products: 700px wide container, chocolate left, queso right
    const containerLeft = (1080 - 700) / 2 // 190
    const chocolateX = containerLeft + productGap
    const chocolateY = productCenterY - productSize / 2
    const quesoX = containerLeft + 700 - productGap - productW
    const quesoY = productCenterY - productSize / 2

    // Date pill
    const datePillW = 640
    const datePillX = (1080 - datePillW) / 2
    const datePillY = dateBlockTop

    // Subtitle below date pill
    const subtitleY = datePillY + datePillH + 20

    return {
      background: '#ffffff',
      elements: [
        // Dot pattern hint (faint overlay — CSS radial-gradient dots approximated)
        {
          id: 'dot-bg',
          type: 'rect',
          x: 0,
          y: 0,
          width: 1080,
          height: 1920,
          fill: '#03045e',
          opacity: 0.02,
          draggable: false,
        },

        // Logo — logo-blue, top centered, w=200, opacity=50%
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

        // Headline — text-[88px] font-black leading-none tracking-[-2px] text-tertiary
        {
          id: 'headline',
          type: 'text',
          text: headline,
          x: 0,
          y: headlineY,
          width: 1080,
          fontSize: 88,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1,
          letterSpacing: -2,
          draggable: true,
        },

        // Divider bar — h-[4px] w-[120px] rounded-full bg-primary, mt-[24px]
        {
          id: 'headline-bar',
          type: 'rect',
          x: (1080 - 120) / 2,
          y: barY,
          width: 120,
          height: 4,
          fill: '#00b4d8',
          cornerRadius: 2,
          draggable: false,
        },

        // Chocolate product — SQUARE, left side, rotate(-5deg)
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: chocolateY,
          width: productW,
          height: productSize,
          rotation: -5,
          draggable: true,
          shadowColor: 'rgba(0,53,64,0.12)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 24,
        },

        // Queso product — SQUARE, right side, rotate(5deg)
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: productW,
          height: productSize,
          rotation: 5,
          draggable: true,
          shadowColor: 'rgba(0,53,64,0.12)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 24,
        },

        // Date pill border — rounded-full border-2 border-tertiary/15
        {
          id: 'date-pill-bg',
          type: 'rect',
          x: datePillX,
          y: datePillY,
          width: datePillW,
          height: datePillH,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(3,4,94,0.15)',
          strokeWidth: 2,
          cornerRadius: 34,
          draggable: true,
        },

        // Date text — text-[36px] font-bold tracking-[10px] text-primary
        {
          id: 'date',
          type: 'text',
          text: date,
          x: datePillX,
          y: datePillY + 16,
          width: datePillW,
          fontSize: 36,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#00b4d8',
          align: 'center',
          letterSpacing: 10,
          draggable: true,
        },

        // Subtitle — max-w-[600px] text-center text-[30px] leading-[1.4] text-on-surface-variant
        {
          id: 'subtitle',
          type: 'text',
          text: subtitle,
          x: (1080 - 600) / 2,
          y: subtitleY,
          width: 600,
          fontSize: 30,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: '#40484c',
          align: 'center',
          lineHeight: 1.4,
          draggable: true,
        },

        // Handle — text-[28px] font-semibold text-secondary
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
