import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const BoldDiscountTemplate: KanvasTemplate = {
  id: 'k-promo-bold-discount',
  name: 'Bold Discount',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'EN TODA LA WEB' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const discount = data.discount ?? 10
    const subtitle = (data.subtitle as string) || 'EN TODA LA WEB'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const primarySrc = `producto-${product}`

    // HTML layout: flex-col items-center, gradient bg
    // - Logo at top center: mt-[80px] w-[280px] opacity-70
    // - Discount badge: mt-[100px] — big number + % + OFF side by side
    // - Product: flex-1 centered, rotated -8deg
    // - Bottom bar: mb-[80px] — subtitle + url

    // Logo: w=280, h=280/2.62=107
    const logoW = 280
    const logoH = 107
    const logoX = (1080 - logoW) / 2
    const logoY = 80

    // Discount block: mt-[100px] from logo bottom
    const discountY = logoY + logoH + 100
    const discountFontSize = 280
    const percentFontSize = 100
    const offFontSize = 80

    // Layout: flex items-baseline justify-center gap-[12px]
    // Big number on left, then gap-12, then column with % on top and OFF below
    // Estimate number width: ~170px per digit for 280px font
    const numStr = String(discount)
    const numCharW = 170
    const numW = numStr.length * numCharW
    const stackW = 130 // width for % and OFF column
    const totalBlockW = numW + 12 + stackW
    const blockStartX = (1080 - totalBlockW) / 2

    const numberX = blockStartX
    const percentX = blockStartX + numW + 12
    // items-baseline: % aligns at number baseline. For leading-none 280px, baseline ~discountY
    const percentY = discountY
    // OFF below %: leading-none means next line at percentY + percentFontSize
    const offY = percentY + percentFontSize

    // Bottom bar: mb-[80px] text-center
    // subtitle at 48px, then mt-[16px] url at 28px
    // url bottom edge at 1920-80 => urlY + 28 = 1840 => urlY = 1812
    const urlY = 1920 - 80 - 28
    // subtitle above: subtitleY + 48 + 16 = urlY => subtitleY = urlY - 64
    const subtitleY = urlY - 64

    // Product: flex-1 centered between discount block bottom and subtitle top
    const discountBlockBottom = discountY + discountFontSize
    const productAreaTop = discountBlockBottom + 20
    const productAreaBottom = subtitleY - 20
    const productCenterY = (productAreaTop + productAreaBottom) / 2
    // Product is square: width = height = productSize
    const productX = (1080 - productSize) / 2
    const productY = productCenterY - productSize / 2

    return {
      background: '#03045e',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#03045e', 0.4, '#0077b6', 1, '#00b4d8'],
      },
      elements: [
        // Decorative circle — top-right: w=900, h=900, top=-200, right=-300
        // CSS: top=-200, right=-300 means x=1080-(-300)=1380 for right edge => left=1380-900=480? No.
        // right=-300 means the element's right edge is 300px past the container right.
        // So element left = 1080 - (-300) - 900... actually right=-300 => right side at 1080+300=1380, left at 1380-900=480
        // But for circle in Konva, x,y is center. Center: x=480+450=930, y=-200+450=250
        // Actually CSS: right: -300px means offset from right: element left = 1080 + 300 - 900 = 480
        {
          id: 'deco-circle-1',
          type: 'circle',
          x: 480 + 450,
          y: -200 + 450,
          width: 900,
          height: 900,
          fill: '#00b4d8',
          opacity: 0.10,
          draggable: false,
        },
        // Decorative circle — bottom-left: w=600, h=600, bottom=200, left=-200
        // CSS: bottom: 200px => top = 1920 - 200 - 600 = 1120, left: -200
        // Circle center: x=-200+300=100, y=1120+300=1420
        {
          id: 'deco-circle-2',
          type: 'circle',
          x: -200 + 300,
          y: 1120 + 300,
          width: 600,
          height: 600,
          fill: '#90e0ef',
          opacity: 0.08,
          draggable: false,
        },
        // Logo — top center
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: logoX,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.7,
          draggable: true,
        },
        // Discount big number
        {
          id: 'discount-number',
          type: 'text',
          text: String(discount),
          x: numberX,
          y: discountY,
          width: numW + 20,
          fontSize: discountFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'right',
          lineHeight: 1,
          shadowColor: 'rgba(0,0,0,0.25)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 8,
          shadowOpacity: 1,
          draggable: true,
        },
        // % sign
        {
          id: 'percent',
          type: 'text',
          text: '%',
          x: percentX,
          y: percentY,
          width: 140,
          fontSize: percentFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#ffffff',
          align: 'left',
          lineHeight: 1,
          draggable: true,
        },
        // OFF label
        {
          id: 'off-label',
          type: 'text',
          text: 'OFF',
          x: percentX,
          y: offY,
          width: 200,
          fontSize: offFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#90e0ef',
          align: 'left',
          lineHeight: 1,
          draggable: true,
        },
        // Product — centered in remaining space, rotated -8deg, SQUARE
        {
          id: 'product',
          type: 'image',
          src: primarySrc,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          rotation: -8,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
          shadowOpacity: 1,
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
          fontSize: 48,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          letterSpacing: 8,
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
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
