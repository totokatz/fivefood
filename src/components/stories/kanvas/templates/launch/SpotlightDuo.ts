import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// Faithful Kanvas port of SpotlightDuo.tsx
// Canvas: 1080×1920  |  bg: #03045e
// Concentric rings at top:48% → y=922, sizes 700, 500, 300
// Radial spotlight 800×800 at top:45% → y=864
// Layout: logo(mt-80) | badge(mt-60) | productName(mt-40) | products(mt-20, flex-1) | CTA+website(mb-100)

export const SpotlightDuoTemplate: KanvasTemplate = {
  id: 'k-launch-spotlight-duo',
  name: 'Spotlight Duo',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ NUEVO ★' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Chocolate & Queso' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'DISPONIBLE AHORA' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const badge = (data.badge as string) || '★ NUEVO ★'
    const productName = (data.productName as string) || 'Chocolate & Queso'
    const cta = (data.cta as string) || 'DISPONIBLE AHORA'
    const productSize = Number(data.productSize) || 1000

    // Products are SQUARE
    const productW = productSize

    // productGap default = 40
    const productGap = 40

    // Ring/spotlight centers
    const spotCenterX = 540
    const ringCenterY = Math.round(1920 * 0.48) // 922 (top:48%)
    const spotlightCenterY = Math.round(1920 * 0.45) // 864 (top:45%)

    // Logo: mt-[80px], w=180, h=180/2.62 ≈ 69
    const logoW = 180
    const logoH = Math.round(logoW / 2.62)
    const logoY = 80

    // Badge: mt-[60px] after logo → y = 80+69+60 = 209
    // pill: px-[48] py-[14] text-[28px] → height = 28+2*14 = 56
    const pillH = 56
    const pillW = 640
    const pillX = (1080 - pillW) / 2
    const badgeY = logoY + logoH + 60

    // Product name: mt-[40px] after badge
    // text-[56px] leading-[1.1] → line height = 62
    const productNameY = badgeY + pillH + 40

    // Products: mt-[20px] after product name, flex-1 centers them in remaining space
    // Remaining space: from (productNameY + 62 + 20) to (btnBottom)
    // CTA bottom group: mb-[100px] → bottom of website text at 1920-100=1820
    // website text-[24px] → 24px, gap-[20px] above it
    // CTA button: px-[64] py-[22] text-[32px] → height=32+2*22=76
    const btnH = 76
    const websiteH = 24
    const ctaGroupH = btnH + 20 + websiteH // 120
    const ctaGroupTop = 1920 - 100 - ctaGroupH // 1700

    const productAreaTop = productNameY + 62 + 20
    const productAreaBottom = ctaGroupTop
    const productCenterY = (productAreaTop + productAreaBottom) / 2

    // Chocolate: translateX(+gap) rotate(-5deg), zIndex:1
    const chocolateX = spotCenterX + productGap - productW / 2
    const chocolateY = productCenterY - productSize / 2

    // Queso: translateX(-gap) rotate(5deg), height=productSize*0.95, zIndex:2
    const quesoSize = Math.round(productSize * 0.95)
    const quesoW = quesoSize // SQUARE
    const quesoX = spotCenterX - productGap - quesoW / 2
    const quesoY = productCenterY - quesoSize / 2

    // CTA button position
    const btnW = 660
    const btnX = (1080 - btnW) / 2
    const btnY = ctaGroupTop

    // Website text below CTA
    const websiteY = btnY + btnH + 20

    return {
      background: '#03045e',
      elements: [
        // Radial spotlight glow (large circle, 800×800 at top:45%)
        {
          id: 'spotlight',
          type: 'circle',
          x: spotCenterX,
          y: spotlightCenterY,
          width: 800,
          height: 800,
          fill: '#00b4d8',
          opacity: 0.1,
          draggable: false,
        },

        // Concentric ring 1 — outermost, 700px, opacity from HTML: 0.04+0*0.03=0.04
        {
          id: 'ring-1',
          type: 'circle',
          x: spotCenterX,
          y: ringCenterY,
          width: 700,
          height: 700,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,180,216,0.04)',
          strokeWidth: 1,
          draggable: false,
        },

        // Concentric ring 2 — 500px, opacity: 0.04+1*0.03=0.07
        {
          id: 'ring-2',
          type: 'circle',
          x: spotCenterX,
          y: ringCenterY,
          width: 500,
          height: 500,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,180,216,0.07)',
          strokeWidth: 1,
          draggable: false,
        },

        // Concentric ring 3 — innermost, 300px, opacity: 0.04+2*0.03=0.10
        {
          id: 'ring-3',
          type: 'circle',
          x: spotCenterX,
          y: ringCenterY,
          width: 300,
          height: 300,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,180,216,0.10)',
          strokeWidth: 1,
          draggable: false,
        },

        // Logo — white, mt-[80px], w=180, opacity=20%
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.2,
          draggable: true,
        },

        // Badge glass pill background
        {
          id: 'badge-bg',
          type: 'rect',
          x: pillX,
          y: badgeY,
          width: pillW,
          height: pillH,
          fill: 'rgba(0,180,216,0.08)',
          stroke: 'rgba(0,180,216,0.2)',
          strokeWidth: 1,
          cornerRadius: 28,
          draggable: true,
        },

        // Badge text — text-[28px] font-semibold tracking-[8px] color #00b4d8
        {
          id: 'badge',
          type: 'text',
          text: badge,
          x: pillX,
          y: badgeY + 14,
          width: pillW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: '#00b4d8',
          align: 'center',
          letterSpacing: 8,
          draggable: true,
        },

        // Product name — text-[56px] font-bold leading-[1.1] rgba(255,255,255,0.85)
        {
          id: 'product-name',
          type: 'text',
          text: productName,
          x: 0,
          y: productNameY,
          width: 1080,
          fontSize: 56,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: 'rgba(255,255,255,0.85)',
          align: 'center',
          lineHeight: 1.1,
          draggable: true,
        },

        // Chocolate product — translateX(+gap) rotate(-5deg), SQUARE
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
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
        },

        // Queso product — translateX(-gap) rotate(5deg), height=productSize*0.95, SQUARE
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: quesoY,
          width: quesoW,
          height: quesoSize,
          rotation: 5,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
        },

        // CTA button — gradient linear-gradient(135deg, #00b4d8, #0077b6)
        {
          id: 'cta-bg',
          type: 'rect',
          x: btnX,
          y: btnY,
          width: btnW,
          height: btnH,
          fill: '#00b4d8',
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: btnW, y: btnH },
          fillLinearGradientColorStops: [0, '#00b4d8', 1, '#0077b6'],
          cornerRadius: 38,
          draggable: true,
          shadowColor: 'rgba(0,180,216,0.25)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 8,
        },

        // CTA text — text-[32px] font-bold tracking-[4px] text-white
        {
          id: 'cta-text',
          type: 'text',
          text: cta,
          x: btnX,
          y: btnY + 22,
          width: btnW,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Website text — text-[24px] font-light tracking-[4px] rgba(144,224,239,0.2)
        {
          id: 'website',
          type: 'text',
          text: 'fivefood.com.ar',
          x: 0,
          y: websiteY,
          width: 1080,
          fontSize: 24,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(144,224,239,0.2)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },
      ],
    }
  },
}
