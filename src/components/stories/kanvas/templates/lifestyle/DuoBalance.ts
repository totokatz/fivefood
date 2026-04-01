import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const DuoBalanceTemplate: KanvasTemplate = {
  id: 'k-lifestyle-duo-balance',
  name: 'Duo Balance',
  category: 'lifestyle',
  fields: [
    { key: 'accentWord', label: 'Palabra accent', type: 'text', default: 'balance' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Snack inteligente, sabor real' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
    const productSize = Number(data.productSize) || 500
    const accentWord = (data.accentWord as string) || 'balance'
    const tagline = (data.tagline as string) || 'Snack inteligente, sabor real'

    const itemSize = productSize * 0.75

    // HTML: flex-col items-center justify-between px-[80px] py-[100px]
    // 3 main sections: logo, composition-area (flex-1), bottom-text
    //
    // Logo: w=200, h=200/2.62≈76, opacity 0.5
    // Bottom text: tagline(32px) + handle(mt-4=16px, 28px) → height≈32+16+28=76
    //
    // justify-between: logo at y=100, bottom text ending at y=1820
    // Composition area (flex-1): fills from logo bottom to bottom text top
    // logo bottom = 100 + 76 = 176
    // bottom text top = 1820 - 76 = 1744
    // Composition area: y=176..1744, height=1568, center=176+784=960
    //
    // Inside composition area (relative, flex items-center justify-center):
    //   - Two thin accent lines (decorative, rotated -35deg)
    //   - Primary product: absolute, top:40px, right:productGap(0)px, rotate(5deg)
    //   - Accent word: centered (130px Satisfy, primary/20)
    //   - Secondary product: absolute, bottom:40px, left:productGap(0)px, rotate(-5deg)
    //
    // Composition center ≈ 960
    // Primary product: top:40px relative to composition → y=176+40=216, right edge at 1080-80-0=1000
    // Secondary product: bottom:40px relative to composition → bottom at 1744-40=1704, left:80+0=80

    const logoW = 200
    const logoH = Math.round(logoW / 2.62) // ~76
    const logoY = 100

    const compTop = logoY + logoH // 176
    const compBottom = 1820 - (32 + 16 + 28) // 1744
    const compCenterY = (compTop + compBottom) / 2 // ~960

    // Primary product — top-right of composition, rotate +5deg
    const primaryY = compTop + 40
    const primaryX = 1080 - 80 - itemSize // right edge at content right (1000), x = 1000 - itemSize

    // Secondary product — bottom-left of composition, rotate -5deg
    const secondaryY = compBottom - 40 - itemSize
    const secondaryX = 80

    // Accent word — centered in composition
    const accentY = compCenterY - 130 / 2

    // Tagline + handle at bottom
    const taglineY = 1820 - (32 + 16 + 28)
    const handleY = taglineY + 32 + 16

    // Accent line top-right: right:140px, top:60px relative to composition, h:300px, rotate(-35deg)
    const lineTopRightX = 1080 - 80 - 140 // relative to padded content
    const lineTopRightY = compTop + 60

    // Accent line bottom-left: left:140px, bottom:60px relative to composition
    const lineBottomLeftX = 80 + 140
    const lineBottomLeftY = compBottom - 60

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Thin diagonal accent line — top-right area, rotate(-35deg), origin top-right
        {
          id: 'accent-line-tr',
          type: 'line',
          x: lineTopRightX,
          y: lineTopRightY,
          width: 0,
          height: 300,
          stroke: 'rgba(0,180,216,0.3)',
          strokeWidth: 1,
          rotation: -35,
          draggable: false,
        },

        // Thin diagonal accent line — bottom-left area, rotate(-35deg), origin bottom-left
        {
          id: 'accent-line-bl',
          type: 'line',
          x: lineBottomLeftX,
          y: lineBottomLeftY,
          width: 0,
          height: 300,
          stroke: 'rgba(0,180,216,0.3)',
          strokeWidth: 1,
          rotation: -35,
          draggable: false,
        },

        // Logo — top center, logo-blue, 50% opacity
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },

        // Accent word centered — large Satisfy cursive, very faint primary/20
        {
          id: 'accent-word',
          type: 'text',
          x: 80,
          y: accentY,
          width: 920,
          text: accentWord,
          fontSize: 130,
          fontFamily: 'Satisfy, cursive',
          fill: 'rgba(0,180,216,0.2)',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },

        // Primary product — top-right, rotated +5deg (SQUARE: width=height=itemSize)
        {
          id: 'product-primary',
          type: 'image',
          src: `producto-${product}`,
          x: primaryX,
          y: primaryY,
          width: itemSize,
          height: itemSize,
          rotation: 5,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
          shadowOpacity: 1,
        },

        // Secondary product — bottom-left, rotated -5deg (SQUARE: width=height=itemSize)
        {
          id: 'product-secondary',
          type: 'image',
          src: `producto-${secondary}`,
          x: secondaryX,
          y: secondaryY,
          width: itemSize,
          height: itemSize,
          rotation: -5,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 12,
          shadowOpacity: 1,
        },

        // Tagline — bottom center, uppercase, light tracking
        {
          id: 'tagline',
          type: 'text',
          x: 80,
          y: taglineY,
          width: 920,
          text: tagline.toUpperCase(),
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#40484c',
          align: 'center',
          letterSpacing: 4,
          draggable: true,
        },

        // Handle — below tagline (mt-4=16px)
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: handleY,
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
