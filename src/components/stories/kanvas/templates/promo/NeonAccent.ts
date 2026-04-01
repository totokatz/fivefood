import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const NeonAccentTemplate: KanvasTemplate = {
  id: 'k-promo-neon-accent',
  name: 'Neon Accent',
  category: 'promociones',
  fields: [
    { key: 'headline', label: 'Encabezado', type: 'text', default: 'OFERTA ESPECIAL' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '30% OFF' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const headline = (data.headline as string) || 'OFERTA ESPECIAL'
    const discount = (data.discount as string) || '30% OFF'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const primarySrc = `producto-${product}`

    // HTML layout: flex-col items-center overflow-hidden, bg #001d25
    //
    // Decorative orbs (background):
    //   Main: w=1000 h=1000, top=30% left=50% translate(-50%,-50%)
    //     radial-gradient: rgba(0,180,216,0.25) center fading to transparent
    //   Secondary: w=500 h=500, top=55% left=30% translate(-50%,-50%)
    //     radial-gradient: rgba(144,224,239,0.12) fading to transparent
    //
    // Logo: mt-[80px] w-[180px] opacity-15 (very subtle)
    //
    // Headline block: mt-[100px] flex-col items-center
    //   headline: text-[26px] font-medium tracking-[16px] uppercase, color rgba(144,224,239,0.5)
    //   discount: mt-[16px] text-[180px] font-black leading-[0.85], color #fff
    //     textShadow: 0 0 80px rgba(0,180,216,0.3)
    //   accent line: mt-[32px] w=120 h=2, gradient 90deg transparent->#00b4d8->transparent
    //
    // Product: mt-[40px] flex-1 centered, SQUARE
    //
    // Bottom: mb-[80px] flex-col items-center gap-[12px]
    //   URL pill: rounded-full px-[48px] py-[14px], border 1px solid rgba(0,180,216,0.25)
    //     text-[26px] font-medium tracking-[6px], color rgba(0,180,216,0.7)

    // Logo: w=180, h=180/2.62=69
    const logoW = 180
    const logoH = 69
    const logoX = (1080 - logoW) / 2
    const logoY = 80

    // Headline block: mt-[100px] from logo bottom
    const headlineY = logoY + logoH + 100
    const headlineFontSize = 26

    // Discount: mt-[16px]
    const discountFontSize = 180
    const discountY = headlineY + headlineFontSize + 16

    // Accent line: mt-[32px] from discount bottom (leading-[0.85])
    const accentLineY = discountY + discountFontSize * 0.85 + 32
    const accentLineW = 120
    const accentLineX = (1080 - accentLineW) / 2

    // Bottom: mb-[80px]
    const urlPillFontSize = 26
    const urlPillPadY = 14
    const urlPillH = urlPillFontSize + urlPillPadY * 2
    const urlPillW = 420
    const urlPillX = (1080 - urlPillW) / 2
    const urlPillY = 1920 - 80 - urlPillH

    // Product: mt-[40px] from accent line, flex-1 centered between accent line and url pill
    const productAreaTop = accentLineY + 2 + 40
    const productAreaBottom = urlPillY - 20
    const productCenterY = (productAreaTop + productAreaBottom) / 2
    const productX = (1080 - productSize) / 2
    const productY = productCenterY - productSize / 2

    // Orb positions
    // Main orb: top=30% => y=576, left=50% => x=540, translate(-50%,-50%) => center at (540, 576)
    const mainOrbCenterY = Math.round(1920 * 0.3)
    // Secondary orb: top=55% => y=1056, left=30% => x=324, translate(-50%,-50%) => center at (324, 1056)
    const secOrbCenterX = Math.round(1080 * 0.3)
    const secOrbCenterY = Math.round(1920 * 0.55)

    return {
      background: '#001d25',
      backgroundStyle: {
        fill: '#001d25',
      },
      elements: [
        // Large gradient orb — behind product
        {
          id: 'orb-main',
          type: 'circle',
          x: 540,
          y: mainOrbCenterY,
          width: 1000,
          height: 1000,
          fill: 'rgba(0,180,216,0.12)',
          draggable: false,
        },
        // Secondary smaller orb — offset
        {
          id: 'orb-secondary',
          type: 'circle',
          x: secOrbCenterX,
          y: secOrbCenterY,
          width: 500,
          height: 500,
          fill: 'rgba(144,224,239,0.06)',
          draggable: false,
        },

        // Logo — top center, very faint
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.15,
          draggable: true,
        },
        // Headline — small, spaced
        {
          id: 'headline',
          type: 'text',
          text: headline,
          x: 60,
          y: headlineY,
          width: 960,
          fontSize: headlineFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '500',
          fill: 'rgba(144,224,239,0.5)',
          align: 'center',
          letterSpacing: 16,
          draggable: true,
        },
        // Discount text — massive white with glow
        {
          id: 'discount',
          type: 'text',
          text: discount,
          x: 60,
          y: discountY,
          width: 960,
          fontSize: discountFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'center',
          lineHeight: 0.85,
          shadowColor: 'rgba(0,180,216,0.3)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowOpacity: 1,
          draggable: true,
        },
        // Thin accent line — centered below discount
        {
          id: 'accent-line',
          type: 'rect',
          x: accentLineX,
          y: accentLineY,
          width: accentLineW,
          height: 2,
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: accentLineW, y: 0 },
          fillLinearGradientColorStops: [0, 'transparent', 0.5, '#00b4d8', 1, 'transparent'],
          draggable: false,
        },
        // Product — large, floating, centered, SQUARE
        {
          id: 'product',
          type: 'image',
          src: primarySrc,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          shadowOpacity: 1,
          draggable: true,
        },
        // URL pill border (outline only)
        {
          id: 'url-pill-border',
          type: 'rect',
          x: urlPillX,
          y: urlPillY,
          width: urlPillW,
          height: urlPillH,
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,180,216,0.25)',
          strokeWidth: 1,
          cornerRadius: urlPillH / 2,
          draggable: false,
        },
        // URL text
        {
          id: 'url',
          type: 'text',
          text: 'fivefood.com.ar',
          x: urlPillX,
          y: urlPillY + (urlPillH - urlPillFontSize) / 2,
          width: urlPillW,
          fontSize: urlPillFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '500',
          fill: 'rgba(0,180,216,0.7)',
          align: 'center',
          letterSpacing: 6,
          draggable: true,
        },
      ],
    }
  },
}
