import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const CenterPillTemplate: KanvasTemplate = {
  id: 'k-promo-center-pill',
  name: 'Center Pill',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '2x1' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En snacks seleccionados' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const discount = (data.discount as string) || '2x1'
    const subtitle = (data.subtitle as string) || 'En snacks seleccionados'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const primarySrc = `producto-${product}`

    // HTML layout: flex-col items-center, overflow-hidden, bg #f8fdff
    //
    // Top bar: px-[80px] pt-[80px], flex justify-between items-center
    //   Left: logo w=180, opacity=0.6, filter brightness(0) (dark logo)
    //   Right: "FIVEFOODS" text-[24px] font-medium tracking-[6px] color #0077b6 opacity 0.4
    //
    // Frosted pill: mt-[140px], flex-col items-center
    //   Pill container: px-[120px] py-[48px], borderRadius 200px
    //     "PROMO" text-[28px] font-semibold tracking-[12px] uppercase color #0077b6
    //     discount text-[160px] font-black leading-none mt-[8px] color #03045e
    //
    // Product: mt-[-40px] (overlaps pill bottom), large centered
    //
    // Bottom: mt-auto mb-[100px], flex-col items-center gap-[16px]
    //   subtitle text-[36px] font-medium tracking-[2px] color #03045e opacity 0.6
    //   url pill: mt-[8px] bg #00b4d8 rounded-full px-[56px] py-[18px]
    //     "fivefood.com.ar" text-[28px] font-bold tracking-[4px] text-white

    // Logo: w=180, h=180/2.62=69
    const logoW = 180
    const logoH = 69
    const logoX = 80
    const logoY = 80

    // Wordmark "FIVEFOODS": right-aligned at x=1080-80
    const wordmarkFontSize = 24
    const wordmarkW = 240
    const wordmarkX = 1080 - 80 - wordmarkW
    const wordmarkY = logoY + (logoH - wordmarkFontSize) / 2

    // Frosted pill: mt-[140px] from top bar bottom
    const pillTopY = logoY + logoH + 140
    const pillPadX = 120
    const pillPadY = 48
    const promoFontSize = 28
    const discountFontSize = 160

    // Pill content width/height
    const pillContentH = promoFontSize + 8 + discountFontSize
    const pillH = pillPadY + pillContentH + pillPadY
    const pillW = 640
    const pillX = (1080 - pillW) / 2

    const promoLabelY = pillTopY + pillPadY
    const discountTextY = promoLabelY + promoFontSize + 8

    // Product: mt-[-40px] from pill bottom, SQUARE
    const productTopY = pillTopY + pillH - 40
    const productX = (1080 - productSize) / 2
    const productY = productTopY

    // Bottom block: mb-[100px]
    // url pill: rounded-full px-[56px] py-[18px], text-[28px]
    const urlPillH = 28 + 18 * 2 // 64
    const urlPillW = 400
    const urlPillX = (1080 - urlPillW) / 2
    const urlPillY = 1920 - 100 - urlPillH

    // subtitle: gap-[16px] above url pill, then mt-[8px] between subtitle and pill
    const subtitleFontSize = 36
    const subtitleY = urlPillY - 8 - 16 - subtitleFontSize

    return {
      background: '#f8fdff',
      backgroundStyle: {
        fill: '#f8fdff',
      },
      elements: [
        // Soft radial glow behind product — large circle
        // CSS: w=900, h=900, top=50% left=50% translate(-50%,-55%)
        // Center: x=540, y=1920*0.5 - 1920*0.05 = 960-96 = 864
        {
          id: 'glow',
          type: 'circle',
          x: 540,
          y: 864,
          width: 900,
          height: 900,
          fill: 'rgba(144,224,239,0.25)',
          draggable: false,
        },

        // Logo — top left (with dark filter in HTML, just opacity here)
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.6,
          draggable: true,
        },
        // Wordmark — top right
        {
          id: 'wordmark',
          type: 'text',
          text: 'FIVEFOODS',
          x: wordmarkX,
          y: wordmarkY,
          width: wordmarkW,
          fontSize: wordmarkFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '500',
          fill: '#0077b6',
          align: 'right',
          letterSpacing: 6,
          opacity: 0.4,
          draggable: true,
        },

        // Frosted pill badge background
        {
          id: 'pill-badge-bg',
          type: 'rect',
          x: pillX,
          y: pillTopY,
          width: pillW,
          height: pillH,
          fill: 'rgba(255,255,255,0.65)',
          cornerRadius: 200,
          stroke: 'rgba(0,119,182,0.1)',
          strokeWidth: 1,
          shadowColor: 'rgba(0,180,216,0.08)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          draggable: false,
        },
        // "PROMO" label inside badge
        {
          id: 'promo-label',
          type: 'text',
          text: 'PROMO',
          x: pillX,
          y: promoLabelY,
          width: pillW,
          fontSize: promoFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: '#0077b6',
          align: 'center',
          letterSpacing: 12,
          draggable: true,
        },
        // Discount text — massive
        {
          id: 'discount',
          type: 'text',
          text: discount,
          x: pillX,
          y: discountTextY,
          width: pillW,
          fontSize: discountFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },

        // Product — large, centered, SQUARE
        {
          id: 'product',
          type: 'image',
          src: primarySrc,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(3,4,94,0.15)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 40,
          shadowOpacity: 1,
          draggable: true,
        },

        // Subtitle text
        {
          id: 'subtitle',
          type: 'text',
          text: subtitle,
          x: 80,
          y: subtitleY,
          width: 920,
          fontSize: subtitleFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '500',
          fill: '#03045e',
          align: 'center',
          letterSpacing: 2,
          opacity: 0.6,
          draggable: true,
        },
        // URL pill background
        {
          id: 'url-pill-bg',
          type: 'rect',
          x: urlPillX,
          y: urlPillY,
          width: urlPillW,
          height: urlPillH,
          fill: '#00b4d8',
          cornerRadius: urlPillH / 2,
          draggable: false,
        },
        // URL text inside pill
        {
          id: 'url',
          type: 'text',
          text: 'fivefood.com.ar',
          x: urlPillX,
          y: urlPillY + (urlPillH - 28) / 2,
          width: urlPillW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },
      ],
    }
  },
}
