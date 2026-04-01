import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const DuoShowcaseTemplate: KanvasTemplate = {
  id: 'k-promo-duo-showcase',
  name: 'Duo Showcase',
  category: 'promociones',
  fields: [
    { key: 'promoText', label: 'Texto promo', type: 'text', default: '2x1' },
    { key: 'cta', label: 'Call to action', type: 'text', default: 'COMPRÁ AHORA' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const promoText = (data.promoText as string) || '2x1'
    const cta = (data.cta as string) || 'COMPRÁ AHORA'
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 1000
    const secondarySize = Math.round(productSize * 0.92)

    const primarySrc = `producto-${product}`
    const secondarySrc = `producto-${secondary}`

    // HTML layout: relative flex, overflow-hidden
    //
    // Split screen:
    //   Left half: absolute top-0 left-0 h-full w=50% bg #03045e
    //   Right half: absolute top-0 right-0 h-full w=50% bg #f8fdff
    //
    // Thin accent line at split: absolute, left=50%, w=3px, h=full
    //   gradient: 180deg transparent 5%, #00b4d8 30%, #00b4d8 70%, transparent 95%
    //
    // Promo text: absolute z-10, top=100px, left=50% translateX(-50%)
    //   text-[220px] font-black leading-none
    //   CSS gradient text (left half white/15%, right half navy/8%) — approximate as single color
    //
    // Simbolo: absolute top-[80px] left-[80px] z-10, w=48, opacity=0.4, inverted to white
    //
    // Left product: absolute z-20, top=50% left=25% translate(-50%,-50%)
    //   height=productSize, translateX(-productGap) default -40px
    //   shadow: 0 30px 60px rgba(0,0,0,0.35)
    //
    // Right product: absolute z-20, top=50% right=25% translate(50%,-50%)
    //   height=productSize*0.92, translateX(productGap) default +40px
    //   shadow: 0 30px 60px rgba(0,119,182,0.2)
    //
    // Bottom CTA: absolute bottom-0 z-30, w-full, pb-[100px]
    //   Button: rounded-full px-[72px] py-[24px] bg #00b4d8
    //     text-[34px] font-bold tracking-[4px] text-white
    //   URL: mt-[24px] text-[24px] font-light tracking-[4px] color rgba(3,4,94,0.3)

    const splitX = 540

    // Simbolo: w=48, h=48*1.02=49
    const simboloW = 48
    const simboloH = 49

    // Promo text at top: y=100, centered
    const promoTextFontSize = 220

    // Products: centered in each half, SQUARE
    // Left center: x=25% of 1080 = 270, y=50% of 1920 = 960
    // Product shifted left by 40px (translateX(-40))
    const leftProductCenterX = 270 - 40
    const productCenterY = 960
    const product1X = leftProductCenterX - productSize / 2
    const product1Y = productCenterY - productSize / 2

    // Right center: x=75% of 1080 = 810, y=960
    // Product shifted right by 40px (translateX(40))
    const rightProductCenterX = 810 + 40
    const product2X = rightProductCenterX - secondarySize / 2
    const product2Y = productCenterY - secondarySize / 2

    // CTA button: pb-[100px] from bottom
    const ctaBtnFontSize = 34
    const ctaBtnPadX = 72
    const ctaBtnPadY = 24
    const ctaBtnH = ctaBtnFontSize + ctaBtnPadY * 2
    const ctaBtnW = 520
    const ctaBtnX = (1080 - ctaBtnW) / 2
    const ctaBtnY = 1920 - 100 - 24 - ctaBtnFontSize - ctaBtnH // space for url below

    // URL: mt-[24px] below button
    const urlFontSize = 24
    const urlY = 1920 - 100 - urlFontSize

    // Recalculate CTA button position from url
    const ctaButtonY = urlY - 24 - ctaBtnH

    return {
      background: '#03045e',
      backgroundStyle: {
        fill: '#03045e',
      },
      elements: [
        // Left half — navy
        {
          id: 'left-bg',
          type: 'rect',
          x: 0,
          y: 0,
          width: splitX,
          height: 1920,
          fill: '#03045e',
          draggable: false,
        },
        // Right half — ice white
        {
          id: 'right-bg',
          type: 'rect',
          x: splitX,
          y: 0,
          width: 540,
          height: 1920,
          fill: '#f8fdff',
          draggable: false,
        },
        // Thin accent line at the split
        {
          id: 'split-line',
          type: 'rect',
          x: splitX - 1,
          y: 0,
          width: 3,
          height: 1920,
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: 0, y: 1920 },
          fillLinearGradientColorStops: [0, 'transparent', 0.05, 'transparent', 0.3, '#00b4d8', 0.7, '#00b4d8', 0.95, 'transparent', 1, 'transparent'],
          draggable: false,
        },
        // Simbolo top-left (white version via opacity)
        {
          id: 'simbolo',
          type: 'image',
          src: 'simbolo',
          x: 80,
          y: 80,
          width: simboloW,
          height: simboloH,
          opacity: 0.4,
          draggable: true,
        },
        // Massive promo text — centered across split
        // In HTML it uses gradient text (white on left, navy on right) — approximate as semi-transparent
        {
          id: 'promo-text',
          type: 'text',
          text: promoText,
          x: 0,
          y: 100,
          width: 1080,
          fontSize: promoTextFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: 'rgba(255,255,255,0.15)',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Left product — on navy side, SQUARE
        {
          id: 'product-primary',
          type: 'image',
          src: primarySrc,
          x: product1X,
          y: product1Y,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.35)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
          shadowOpacity: 1,
          draggable: true,
        },
        // Right product — on white side, SQUARE
        {
          id: 'product-secondary',
          type: 'image',
          src: secondarySrc,
          x: product2X,
          y: product2Y,
          width: secondarySize,
          height: secondarySize,
          shadowColor: 'rgba(0,119,182,0.2)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
          shadowOpacity: 1,
          draggable: true,
        },
        // CTA button background
        {
          id: 'cta-btn-bg',
          type: 'rect',
          x: ctaBtnX,
          y: ctaButtonY,
          width: ctaBtnW,
          height: ctaBtnH,
          fill: '#00b4d8',
          cornerRadius: ctaBtnH / 2,
          shadowColor: 'rgba(0,180,216,0.3)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 8,
          draggable: false,
        },
        // CTA text
        {
          id: 'cta-text',
          type: 'text',
          text: cta,
          x: ctaBtnX,
          y: ctaButtonY + (ctaBtnH - ctaBtnFontSize) / 2,
          width: ctaBtnW,
          fontSize: ctaBtnFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },
        // URL text
        {
          id: 'url',
          type: 'text',
          text: 'fivefood.com.ar',
          x: 80,
          y: urlY,
          width: 920,
          fontSize: urlFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(3,4,94,0.3)',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },
      ],
    }
  },
}
