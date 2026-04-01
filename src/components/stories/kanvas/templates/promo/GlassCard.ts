import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const GlassCardTemplate: KanvasTemplate = {
  id: 'k-promo-glass-card',
  name: 'Glass Card',
  category: 'promociones',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'PROMO ESPECIAL' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '10% OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En toda la web' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const label = (data.label as string) || 'PROMO ESPECIAL'
    const discount = (data.discount as string) || '10% OFF'
    const subtitle = (data.subtitle as string) || 'En toda la web'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const primarySrc = `producto-${product}`

    // HTML layout: flex-col items-center justify-between px-[80px] py-[100px]
    // bg: linear-gradient(180deg, #caf0f8 0%, #90e0ef 100%)
    // 5 items distributed between y=100 and y=1820:
    //   1. Logo (w=260, opacity=0.6)
    //   2. Glass card (w=800, rounded-48, px-60 py-72)
    //   3. Product (centered)
    //   4. Bottom text block (CTA + url)

    // Logo: w=260, h=260/2.62=99
    const logoW = 260
    const logoH = 99
    const logoX = (1080 - logoW) / 2
    const logoY = 100

    // Glass card: w=800, centered, px-60 py-72
    const cardW = 800
    const cardX = (1080 - cardW) / 2
    const cardPadX = 60
    const cardPadY = 72
    const contentW = cardW - cardPadX * 2

    // Card content:
    //   label: text-[32px] font-semibold tracking-[8px] text-secondary (#0077b6)
    //   discount: mt-4(16px) text-[120px] font-black leading-none text-tertiary (#03045e)
    //   subtitle: mt-4(16px) text-[36px] text-secondary (#0077b6)
    const labelFontSize = 32
    const discountFontSize = 120
    const subtitleFontSize = 36

    // justify-between distributes: logo, card, product, bottom
    // total height = 1920 - 100*2 = 1720 for content
    // Let's calculate card position: logo bottom at ~199, bottom block top at ~1720
    // Card starts after some gap from logo
    const cardY = logoY + logoH + 80
    const labelY = cardY + cardPadY
    const discountY = labelY + labelFontSize + 16
    const cardSubtitleY = discountY + discountFontSize + 16
    const cardH = cardSubtitleY + subtitleFontSize + cardPadY - cardY

    // Bottom text block: at bottom of py-[100px]
    // "COMPRÁ AHORA →" text-[36px] font-bold text-tertiary (#03045e)
    // mt-1 (4px) "fivefood.com.ar" text-[28px] text-secondary (#0077b6)
    const urlFontSize = 28
    const ctaFontSize = 36
    const urlY = 1920 - 100 - urlFontSize
    const ctaY = urlY - 4 - ctaFontSize

    // Product: centered between card bottom and CTA top
    // Product is SQUARE: width = height = productSize
    const productAreaTop = cardY + cardH + 20
    const productAreaBottom = ctaY - 20
    const productCenterY = (productAreaTop + productAreaBottom) / 2
    const productX = (1080 - productSize) / 2
    const productY = productCenterY - productSize / 2

    return {
      background: '#caf0f8',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#caf0f8', 1, '#90e0ef'],
      },
      elements: [
        // Logo top center
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.6,
          draggable: true,
        },
        // Glass card background — semi-transparent white
        {
          id: 'glass-card-bg',
          type: 'rect',
          x: cardX,
          y: cardY,
          width: cardW,
          height: cardH,
          fill: 'rgba(255,255,255,0.55)',
          cornerRadius: 48,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          draggable: false,
        },
        // Glass card border
        {
          id: 'glass-card-border',
          type: 'rect',
          x: cardX,
          y: cardY,
          width: cardW,
          height: cardH,
          fill: 'rgba(255,255,255,0)',
          stroke: 'rgba(255,255,255,0.7)',
          strokeWidth: 1,
          cornerRadius: 48,
          draggable: false,
        },
        // Label inside card
        {
          id: 'card-label',
          type: 'text',
          text: label,
          x: cardX + cardPadX,
          y: labelY,
          width: contentW,
          fontSize: labelFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: '#0077b6',
          align: 'center',
          letterSpacing: 8,
          draggable: true,
        },
        // Discount text — big
        {
          id: 'card-discount',
          type: 'text',
          text: discount,
          x: cardX + cardPadX,
          y: discountY,
          width: contentW,
          fontSize: discountFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Card subtitle
        {
          id: 'card-subtitle',
          type: 'text',
          text: subtitle,
          x: cardX + cardPadX,
          y: cardSubtitleY,
          width: contentW,
          fontSize: subtitleFontSize,
          fontFamily: 'Josefin Sans',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
        // Product — centered between card and CTA, SQUARE
        {
          id: 'product',
          type: 'image',
          src: primarySrc,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.12)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          shadowOpacity: 1,
          draggable: true,
        },
        // CTA text
        {
          id: 'cta',
          type: 'text',
          text: 'COMPRÁ AHORA →',
          x: 80,
          y: ctaY,
          width: 920,
          fontSize: ctaFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#03045e',
          align: 'center',
          draggable: true,
        },
        // URL
        {
          id: 'url',
          type: 'text',
          text: 'fivefood.com.ar',
          x: 80,
          y: urlY,
          width: 920,
          fontSize: urlFontSize,
          fontFamily: 'Josefin Sans',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
