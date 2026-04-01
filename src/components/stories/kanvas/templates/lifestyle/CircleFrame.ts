import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const CircleFrameTemplate: KanvasTemplate = {
  id: 'k-lifestyle-circle-frame',
  name: 'Circle Frame',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Snack con propósito' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 500
    const tagline = (data.tagline as string) || 'Snack con propósito'

    // HTML default productGap = 70
    const productGap = 70

    // HTML: flex-col items-center justify-center px-[80px], overflow-hidden, bg-white
    // All content is vertically centered on the canvas.
    //
    // Logo: absolute top-[80px] w-[200px] opacity-0.5
    //
    // Circle + products: relative div, centered
    //   Circle border: 700×700px, 2px border primary/40
    //   Secondary: h=productSize*0.7, translateX(+70px) translateY(30px) rotate(6deg), opacity 0.85
    //   Primary: h=productSize*0.85, translateX(-70*0.57=-40px) rotate(-4deg)
    //
    // Text below circle: mt-[60px]
    //   tagline: text-[38px] font-light tracking-[8px] text-tertiary uppercase
    //   handle: mt-4(16px) text-[28px] text-secondary/50
    //
    // justify-center: the circle+products block + text block are centered vertically.
    // Circle diameter = 700
    // Text block: 60(mt) + 38(tagline) + 16(mt-4) + 28(handle) = 142
    // Total centered block height = 700 + 142 = 842
    // Top of centered block = (1920 - 842) / 2 = 539
    // Circle center = 539 + 350 = 889

    const circleD = 700
    const textBlockH = 60 + 38 + 16 + 28 // mt + tagline + mt-4 + handle = 142
    const totalBlockH = circleD + textBlockH
    const blockTop = (1920 - totalBlockH) / 2
    const circleCenterY = blockTop + circleD / 2
    const circleCenterX = 540

    // Product sizes (SQUARE: width = height)
    const primaryH = productSize * 0.85
    const secondaryH = productSize * 0.7

    const logoW = 200
    const logoH = Math.round(logoW / 2.62) // ~76

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Logo — absolute top, logo-blue, 200px wide, 50% opacity
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: 80,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },

        // Circle border — primary/40 stroke, no fill
        {
          id: 'circle-frame',
          type: 'circle',
          x: circleCenterX,
          y: circleCenterY,
          width: circleD,
          height: circleD,
          fill: 'transparent',
          stroke: 'rgba(0,180,216,0.4)',
          strokeWidth: 2,
          draggable: false,
        },

        // Secondary product — offset right & down, behind primary, rotate +6deg, opacity 0.85 (SQUARE)
        {
          id: 'product-secondary',
          type: 'image',
          src: `producto-${secondary}`,
          x: circleCenterX - secondaryH / 2 + productGap,
          y: circleCenterY - secondaryH / 2 + 30,
          width: secondaryH,
          height: secondaryH,
          rotation: 6,
          opacity: 0.85,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 16,
          shadowOpacity: 1,
        },

        // Primary product — slightly left, in front, rotate -4deg (SQUARE)
        {
          id: 'product-primary',
          type: 'image',
          src: `producto-${product}`,
          x: circleCenterX - primaryH / 2 - Math.round(productGap * 0.57),
          y: circleCenterY - primaryH / 2,
          width: primaryH,
          height: primaryH,
          rotation: -4,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 40,
          shadowOffsetX: 0,
          shadowOffsetY: 20,
          shadowOpacity: 1,
        },

        // Tagline — below circle, uppercase, light weight, tracked
        {
          id: 'tagline',
          type: 'text',
          x: 80,
          y: blockTop + circleD + 60,
          width: 920,
          text: tagline.toUpperCase(),
          fontSize: 38,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#03045e',
          align: 'center',
          letterSpacing: 8,
          draggable: true,
        },

        // Handle — below tagline (mt-4=16px)
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: blockTop + circleD + 60 + 38 + 16,
          width: 920,
          text: '@fivefood.ok',
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fill: 'rgba(0,119,182,0.5)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
