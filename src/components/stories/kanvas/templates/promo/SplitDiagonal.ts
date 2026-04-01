import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const SplitDiagonalTemplate: KanvasTemplate = {
  id: 'k-promo-split-diagonal',
  name: 'Split Diagonal',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'DESCUENTO' },
    { key: 'code', label: 'Código', type: 'text', default: 'Usá el código: SNACK10' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const discount = data.discount ?? 10
    const label = (data.label as string) || 'DESCUENTO'
    const code = (data.code as string) || 'Usá el código: SNACK10'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000

    const primarySrc = `producto-${product}`

    // HTML layout:
    // Background: #03045e (navy)
    // Top section: height=55% (1056px), gradient bg (135deg #00b4d8 to #0077b6)
    //   clipPath: polygon(0 0, 100% 0, 100% 85%, 0 100%)
    //   -> full width top, then bottom-right at 85% height, bottom-left at 100% height
    //   Contains: simbolo (w=80, opacity=0.5) + product (rotated 3deg)
    // Bottom section: flex-1, flex-col items-center justify-center px-[80px]
    //   discount% (160px, #00b4d8), label (56px tracking-16 #90e0ef),
    //   code (30px, white/40), SHOP NOW button

    const topSectionH = Math.round(1920 * 0.55) // 1056

    // Top gradient rect (covers full top section, clipped area simulated)
    // The clip cuts from (0, 100%) to (100%, 85%), creating a diagonal
    // 85% of 1056 = 898, 100% of 1056 = 1056
    // We draw the full rect and overlay a triangle to simulate the clip

    // Simbolo: w=80, h=80*1.02=82, centered in top section, near top
    const simboloW = 80
    const simboloH = 82
    const simboloX = (1080 - simboloW) / 2
    const simboloY = 60

    // Product: centered in top section (between simbolo and bottom of clipped area)
    // Center of usable area: roughly between simboloY+simboloH and the midpoint of the clip
    // Average bottom of clip: (898 + 1056) / 2 = 977
    const clipMidBottom = (topSectionH * 0.85 + topSectionH) / 2
    const productCenterY = (simboloY + simboloH + clipMidBottom) / 2
    const productX = (1080 - productSize) / 2
    const productY = productCenterY - productSize / 2

    // Bottom section: from topSectionH to 1920, flex-col items-center justify-center
    // Center of bottom section
    const bottomCenterY = (topSectionH + 1920) / 2

    const discountFontSize = 160
    const labelFontSize = 56
    const codeFontSize = 30
    const buttonFontSize = 32
    const buttonH = 72
    const buttonW = 340

    // Total bottom content height (approx):
    // discount (160*1=160) + mt-2(8) + label (56) + mt-6(24) + code (30) + mt-8(32) + button (72)
    const totalBottomH = discountFontSize + 8 + labelFontSize + 24 + codeFontSize + 32 + buttonH
    const bottomStartY = bottomCenterY - totalBottomH / 2

    const discountTextY = bottomStartY
    const labelY = discountTextY + discountFontSize + 8
    const codeY = labelY + labelFontSize + 24
    const buttonY = codeY + codeFontSize + 32
    const buttonX = (1080 - buttonW) / 2

    return {
      background: '#03045e',
      backgroundStyle: {
        fill: '#03045e',
      },
      elements: [
        // Top section gradient background
        {
          id: 'top-bg',
          type: 'rect',
          x: 0,
          y: 0,
          width: 1080,
          height: topSectionH,
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: 1080, y: topSectionH },
          fillLinearGradientColorStops: [0, '#00b4d8', 1, '#0077b6'],
          draggable: false,
        },
        // Diagonal overlay — simulate clipPath polygon(0 0, 100% 0, 100% 85%, 0 100%)
        // The navy background shows through below the diagonal.
        // Bottom-right corner at 85% of topSectionH = 898, bottom-left at 1056.
        // We fade from transparent to navy to approximate the diagonal cut.
        {
          id: 'diagonal-overlay',
          type: 'rect',
          x: 0,
          y: Math.round(topSectionH * 0.85),
          width: 1080,
          height: Math.round(topSectionH * 0.15) + 2,
          fillLinearGradientStartPoint: { x: 1080, y: 0 },
          fillLinearGradientEndPoint: { x: 0, y: Math.round(topSectionH * 0.15) + 2 },
          fillLinearGradientColorStops: [0, 'rgba(3,4,94,0)', 0.5, '#03045e', 1, '#03045e'],
          draggable: false,
        },
        // Simbolo — top center of upper section
        {
          id: 'simbolo',
          type: 'image',
          src: 'simbolo',
          x: simboloX,
          y: simboloY,
          width: simboloW,
          height: simboloH,
          opacity: 0.5,
          draggable: true,
        },
        // Product — centered in upper section, rotated 3deg, SQUARE
        {
          id: 'product',
          type: 'image',
          src: primarySrc,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          rotation: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 48,
          shadowOffsetX: 0,
          shadowOffsetY: 24,
          shadowOpacity: 1,
          draggable: true,
        },
        // Discount % — big, primary color
        {
          id: 'discount',
          type: 'text',
          text: `${discount}%`,
          x: 80,
          y: discountTextY,
          width: 920,
          fontSize: discountFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#00b4d8',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },
        // Label — tracking-[16px]
        {
          id: 'label',
          type: 'text',
          text: label,
          x: 80,
          y: labelY,
          width: 920,
          fontSize: labelFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#90e0ef',
          align: 'center',
          letterSpacing: 16,
          draggable: true,
        },
        // Code text
        {
          id: 'code',
          type: 'text',
          text: code,
          x: 80,
          y: codeY,
          width: 920,
          fontSize: codeFontSize,
          fontFamily: 'Josefin Sans',
          fill: 'rgba(255,255,255,0.4)',
          align: 'center',
          draggable: true,
        },
        // SHOP NOW button background
        {
          id: 'button-bg',
          type: 'rect',
          x: buttonX,
          y: buttonY,
          width: buttonW,
          height: buttonH,
          fill: '#00b4d8',
          cornerRadius: buttonH / 2,
          draggable: false,
        },
        // SHOP NOW text
        {
          id: 'button-text',
          type: 'text',
          text: 'SHOP NOW',
          x: buttonX,
          y: buttonY + (buttonH - buttonFontSize) / 2,
          width: buttonW,
          fontSize: buttonFontSize,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#ffffff',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
