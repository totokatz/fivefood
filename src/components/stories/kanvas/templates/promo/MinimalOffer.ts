import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const MinimalOfferTemplate: KanvasTemplate = {
  id: 'k-promo-minimal-offer',
  name: 'Minimal Offer',
  category: 'promociones',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'Llevá los dos,\npagá uno.' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Válido hasta agotar stock. Solo en fivefood.com.ar' },
    { key: 'badge', label: 'Badge', type: 'text', default: '2x1' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const title = (data.title as string) || 'Llevá los dos,\npagá uno.'
    const description = (data.description as string) || 'Válido hasta agotar stock. Solo en fivefood.com.ar'
    const badge = (data.badge as string) || '2x1'
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 1000
    const secondarySize = Math.round(productSize * 0.95)

    const primarySrc = `producto-${product}`
    const secondarySrc = `producto-${secondary}`

    // HTML layout: flex-col, bg #ffffff
    //
    // 1. Top row: flex items-center justify-between px-[80px] pt-[80px]
    //    Left: logo w=180 opacity=0.4
    //    Right: badge pill, rounded-full px-[40px] py-[14px] bg #03045e
    //      text-[28px] font-bold tracking-[4px] text-white
    //
    // 2. Products: flex items-center justify-center py-[80px]
    //    primary: height=productSize
    //    secondary: height=productSize*0.95, marginLeft=productGap (default 60)
    //
    // 3. Title block: flex-1 flex-col justify-center px-[80px]
    //    title: text-[72px] font-black leading-[1.05] whitespace-pre-line, color #03045e
    //    divider: my-[40px] w=120 h=2 bg #00b4d8
    //    description: text-[30px] font-light leading-[1.5] color #40484c, max-w-[700px]
    //
    // 4. Footer: px-[80px] pb-[80px]
    //    "fivefood.com.ar" text-[26px] font-light tracking-[4px] color #40484c opacity 0.4

    // Logo: w=180, h=180/2.62=69
    const logoW = 180
    const logoH = 69
    const logoX = 80
    const logoY = 80

    // Badge pill: right-aligned
    const badgeFontSize = 28
    const badgePadX = 40
    const badgePadY = 14
    const badgePillH = badgeFontSize + badgePadY * 2
    const badgePillW = 160
    const badgePillX = 1080 - 80 - badgePillW
    const badgePillY = 80

    // Products section: py-[80px], side by side centered, SQUARE
    const productsTopY = logoY + logoH + 80
    const productsAreaH = productSize + 80  // py-[80px] top only, bottom is visual
    const productsTotalW = productSize + secondarySize + 60
    const productsStartX = (1080 - productsTotalW) / 2
    const product1X = productsStartX
    const product2X = productsStartX + productSize + 60
    const product1Y = productsTopY
    const product2Y = productsTopY + (productSize - secondarySize) / 2

    // Footer at bottom: pb-[80px]
    const footerFontSize = 26
    const footerY = 1920 - 80 - footerFontSize

    // Title block: flex-1 flex-col justify-center between products bottom and footer
    const titleAreaTop = productsTopY + productSize + 80
    const titleAreaBottom = footerY - 20

    const titleFontSize = 72
    const titleLineH = titleFontSize * 1.05
    const titleLines = title.split('\n').length
    const titleH = titleLineH * titleLines

    const dividerH = 2
    const descFontSize = 30
    const descLineH = descFontSize * 1.5

    // Estimate description height (roughly 2 lines for default text)
    const descEstimatedLines = Math.ceil(description.length / 35)
    const descH = descLineH * Math.max(descEstimatedLines, 2)

    // Total content: title + my-[40px] + divider + my-[40px] + description
    const totalContentH = titleH + 40 + dividerH + 40 + descH
    const contentStartY = (titleAreaTop + titleAreaBottom) / 2 - totalContentH / 2

    const titleY = contentStartY
    const dividerY = titleY + titleH + 40
    const descY = dividerY + dividerH + 40

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Logo — top left
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.4,
          draggable: true,
        },
        // Badge pill background
        {
          id: 'badge-bg',
          type: 'rect',
          x: badgePillX,
          y: badgePillY,
          width: badgePillW,
          height: badgePillH,
          fill: '#03045e',
          cornerRadius: badgePillH / 2,
          draggable: false,
        },
        // Badge text
        {
          id: 'badge-text',
          type: 'text',
          text: badge,
          x: badgePillX,
          y: badgePillY + (badgePillH - badgeFontSize) / 2,
          width: badgePillW,
          fontSize: badgeFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
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
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 16,
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
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 16,
          shadowOpacity: 1,
          draggable: true,
        },
        // Title text — large, editorial
        {
          id: 'title',
          type: 'text',
          text: title,
          x: 80,
          y: titleY,
          width: 920,
          fontSize: titleFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'left',
          lineHeight: 1.05,
          draggable: true,
        },
        // Thin cyan divider line
        {
          id: 'divider',
          type: 'rect',
          x: 80,
          y: dividerY,
          width: 120,
          height: dividerH,
          fill: '#00b4d8',
          draggable: false,
        },
        // Description text
        {
          id: 'description',
          type: 'text',
          text: description,
          x: 80,
          y: descY,
          width: 700,
          fontSize: descFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#40484c',
          align: 'left',
          lineHeight: 1.5,
          draggable: true,
        },
        // Footer URL
        {
          id: 'url',
          type: 'text',
          text: 'fivefood.com.ar',
          x: 80,
          y: footerY,
          width: 500,
          fontSize: footerFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#40484c',
          align: 'left',
          letterSpacing: 4,
          opacity: 0.4,
          draggable: true,
        },
      ],
    }
  },
}
