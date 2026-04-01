import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const FloatingDuoTemplate: KanvasTemplate = {
  id: 'k-lifestyle-floating-duo',
  name: 'Floating Duo',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'ELEVÁ TU SNACK' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 500
    const tagline = (data.tagline as string) || 'ELEVÁ TU SNACK'

    // HTML default productGap = 80
    const productGap = 80
    const secondarySize = productSize * 0.8

    // HTML: flex-col items-center justify-between px-[80px] py-[100px]
    // gradient: linear-gradient(180deg, #90e0ef 0%, #f8fdff 60%, #ffffff 100%)
    //
    // 4 items in justify-between: logo, tagline, products-div, handle
    //
    // Logo: w=220, h=220/2.62≈84, opacity 0.4
    // Tagline: text-[38px]
    // Products: the taller is productSize (primary), so container height ≈ productSize
    //   secondary: h=productSize*0.8, rotate(8deg) translateX(+80px) translateY(20px)
    //   primary: h=productSize, rotate(-6deg) translateX(-40px)
    // Handle: text-[28px]
    //
    // justify-between: first at y=100, last ending at y=1820
    const logoW = 220
    const logoH = Math.round(logoW / 2.62) // ~84
    const taglineFontSize = 38
    const handleFontSize = 28
    const totalPadRange = 1920 - 100 - 100 // 1720
    const totalContent = logoH + taglineFontSize + productSize + handleFontSize
    const gap = (totalPadRange - totalContent) / 3

    const logoY = 100
    const taglineY = logoY + logoH + gap
    const productsY = taglineY + taglineFontSize + gap
    const handleY = productsY + productSize + gap

    // Products center point
    const productsCenterX = 540
    const productsCenterY = productsY + productSize / 2

    // Secondary: rotate(8deg) translateX(+productGap) translateY(20px) — pushed right & down
    // Center would be at (productsCenterX, productsCenterY), then offset by translate
    const secondaryX = productsCenterX - secondarySize / 2 + productGap
    const secondaryY = productsCenterY - secondarySize / 2 + 20

    // Primary: rotate(-6deg) translateX(-productGap/2) — pulled left
    const primaryX = productsCenterX - productSize / 2 - Math.round(productGap / 2)
    const primaryY = productsCenterY - productSize / 2

    return {
      background: '#90e0ef',
      backgroundStyle: {
        fillLinearGradientStartPoint: { x: 540, y: 0 },
        fillLinearGradientEndPoint: { x: 540, y: 1920 },
        fillLinearGradientColorStops: [0, '#90e0ef', 0.6, '#f8fdff', 1, '#ffffff'],
      },
      elements: [
        // Logo — top center, white logo, 40% opacity
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.4,
          draggable: true,
        },

        // Tagline — light tracking uppercase, tertiary/70
        {
          id: 'tagline',
          type: 'text',
          x: 80,
          y: taglineY,
          width: 920,
          text: tagline,
          fontSize: 38,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#03045e',
          align: 'center',
          letterSpacing: 14,
          opacity: 0.7,
          draggable: true,
        },

        // Secondary product — rotated +8deg, offset right, behind primary (SQUARE)
        {
          id: 'product-secondary',
          type: 'image',
          src: `producto-${secondary}`,
          x: secondaryX,
          y: secondaryY,
          width: secondarySize,
          height: secondarySize,
          rotation: 8,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.12)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 40,
          shadowOpacity: 1,
        },

        // Primary product — rotated -6deg, offset left, in front (SQUARE)
        {
          id: 'product-primary',
          type: 'image',
          src: `producto-${product}`,
          x: primaryX,
          y: primaryY,
          width: productSize,
          height: productSize,
          rotation: -6,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.15)',
          shadowBlur: 80,
          shadowOffsetX: 0,
          shadowOffsetY: 50,
          shadowOpacity: 1,
        },

        // Handle — bottom, tertiary at 30%
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: handleY,
          width: 920,
          text: '@fivefood.ok',
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fill: 'rgba(3,4,94,0.3)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
