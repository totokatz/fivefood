import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const StackedTypeTemplate: KanvasTemplate = {
  id: 'k-promo-stacked-type',
  name: 'Stacked Type',
  category: 'promociones',
  fields: [
    { key: 'line1', label: 'Línea 1', type: 'text', default: 'HASTA' },
    { key: 'line2', label: 'Línea 2', type: 'text', default: '50%' },
    { key: 'line3', label: 'Línea 3', type: 'text', default: 'OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Solo este fin de semana' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const line1 = (data.line1 as string) || 'HASTA'
    const line2 = (data.line2 as string) || '50%'
    const line3 = (data.line3 as string) || 'OFF'
    const subtitle = (data.subtitle as string) || 'Solo este fin de semana'
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 1000
    const secondarySize = Math.round(productSize * 0.9)

    const primarySrc = `producto-${product}`
    const secondarySrc = `producto-${secondary}`

    // HTML layout: flex-col, bg #f8fdff
    //
    // 1. Logo: justify-start px-[80px] pt-[80px], w=200, opacity=0.5
    // 2. Stacked type: flex-1 flex-col justify-center px-[80px]
    //    line1: text-[200px] font-black leading-[0.85] tracking-tight color #03045e
    //    line2: text-[280px] font-black leading-[0.85] tracking-tight color #00b4d8
    //    line3: text-[200px] font-black leading-[0.85] tracking-tight color #03045e
    //    subtitle: mt-[40px] text-[32px] font-medium tracking-[2px] text-on-surface-variant #40484c
    // 3. Thin cyan line: mx-[80px] h=3px bg #00b4d8
    // 4. Products side by side: px-[80px] py-[60px], items-center justify-center
    //    primary: height=productSize
    //    secondary: height=productSize*0.9, marginLeft=productGap (default 40)

    // Logo: w=200, h=200/2.62=76
    const logoW = 200
    const logoH = 76
    const logoX = 80
    const logoY = 80

    // Products section at bottom: py-[60px]
    // Products are SQUARE: width = height
    const productsBottomPad = 60
    const productsSectionBottom = 1920
    // Product section height: 60 + max(productSize, secondarySize) + 60
    const productsSectionH = productsBottomPad + productSize + productsBottomPad
    const productsSectionTop = productsSectionBottom - productsSectionH

    // Divider line: just above products section
    const dividerY = productsSectionTop - 10
    const dividerH = 3

    // Type block: flex-1 between logo bottom and divider
    // flex-col justify-center => center the type block in this area
    const typeAreaTop = logoY + logoH
    const typeAreaBottom = dividerY - 10

    const line1FontSize = 200
    const line2FontSize = 280
    const line3FontSize = 200
    const subtitleFontSize = 32

    // Heights with leading-[0.85]
    const line1H = line1FontSize * 0.85
    const line2H = line2FontSize * 0.85
    const line3H = line3FontSize * 0.85
    const totalTypeH = line1H + line2H + line3H + 40 + subtitleFontSize

    const typeStartY = (typeAreaTop + typeAreaBottom) / 2 - totalTypeH / 2

    const line1Y = typeStartY
    const line2Y = line1Y + line1H
    const line3Y = line2Y + line2H
    const subtitleY = line3Y + line3H + 40

    // Products: side by side, centered in section
    const totalProductsW = productSize + secondarySize + 40
    const productsStartX = (1080 - totalProductsW) / 2
    const product1X = productsStartX
    const product2X = productsStartX + productSize + 40
    const productsCenterY = productsSectionTop + productsSectionH / 2
    const product1Y = productsCenterY - productSize / 2
    const product2Y = productsCenterY - secondarySize / 2

    return {
      background: '#f8fdff',
      backgroundStyle: {
        fill: '#f8fdff',
      },
      elements: [
        // Logo top-left
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },
        // Line 1 — "HASTA"
        {
          id: 'line1',
          type: 'text',
          text: line1,
          x: 80,
          y: line1Y,
          width: 920,
          fontSize: line1FontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'left',
          lineHeight: 0.85,
          draggable: true,
        },
        // Line 2 — "50%" — large, cyan
        {
          id: 'line2',
          type: 'text',
          text: line2,
          x: 80,
          y: line2Y,
          width: 920,
          fontSize: line2FontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'left',
          lineHeight: 0.85,
          draggable: true,
        },
        // Line 3 — "OFF"
        {
          id: 'line3',
          type: 'text',
          text: line3,
          x: 80,
          y: line3Y,
          width: 920,
          fontSize: line3FontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'left',
          lineHeight: 0.85,
          draggable: true,
        },
        // Subtitle
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
          fill: '#40484c',
          align: 'left',
          letterSpacing: 2,
          draggable: true,
        },
        // Thin cyan accent line
        {
          id: 'divider',
          type: 'rect',
          x: 80,
          y: dividerY,
          width: 920,
          height: dividerH,
          fill: '#00b4d8',
          draggable: false,
        },
        // Primary product — SQUARE
        {
          id: 'product-primary',
          type: 'image',
          src: primarySrc,
          x: product1X,
          y: product1Y,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
          shadowOpacity: 1,
          draggable: true,
        },
        // Secondary product (slightly smaller) — SQUARE
        {
          id: 'product-secondary',
          type: 'image',
          src: secondarySrc,
          x: product2X,
          y: product2Y,
          width: secondarySize,
          height: secondarySize,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
          shadowOpacity: 1,
          draggable: true,
        },
      ],
    }
  },
}
