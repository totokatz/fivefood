import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const VerticalTypeTemplate: KanvasTemplate = {
  id: 'k-lifestyle-vertical-type',
  name: 'Vertical Type',
  category: 'lifestyle',
  fields: [
    { key: 'verticalText', label: 'Texto vertical', type: 'text', default: 'SNACK TIME' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'El momento es ahora' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 1000
    const verticalText = (data.verticalText as string) || 'SNACK TIME'
    const subtitle = (data.subtitle as string) || 'El momento es ahora'

    // HTML layout: relative, no flex column — position: absolute for most elements
    // Background: #f8fdff
    //
    // 1. Soft gradient circle: 800×800, top:-200, right:-200 → center at (1080-200, -200+400)=(880, 200)
    //    radial gradient with rgba(202,240,248,0.6) center
    //
    // 2. Vertical text: absolute, top:50%, left:60px, translateY(-50%) rotate(-90deg)
    //    text-[140px] font-black, letter-spacing:20px
    //    Stroke only text (transparent fill, 2px stroke rgba(0,119,182,0.08))
    //    After rotation -90deg around center, the text runs vertically upward from center
    //    The text center is at (60px, 960px). Rotation -90deg means text reads bottom-to-top.
    //
    // 3. Top section: flex w-full justify-between px-[80px] pt-[80px]
    //    Left: "Lifestyle" label (22px, medium, tracking-[10px], color #0077b6 opacity 0.5)
    //          + thin line below (60×2px, #00b4d8, opacity 0.4, gap-[12px] below label)
    //    Right: logo w-[160px], opacity 0.5, filter: brightness(0) (black logo)
    //
    // 4. Product: absolute, top:50%, right:40px, translateY(-50%)
    //    Height=productSize, SQUARE → width=productSize
    //    Shadow: drop-shadow(0 30px 60px rgba(3,4,94,0.12)) + drop-shadow(0 8px 20px rgba(0,180,216,0.08))
    //
    // 5. Bottom text: absolute bottom-[100px] left-[80px]
    //    subtitle: max-w-[500px] text-[52px] font-bold leading-[1.1] color #03045e
    //    handle: text-[26px] font-light tracking-[4px] color rgba(0,119,182,0.4), gap-[16px] below subtitle

    const logoW = 160
    const logoH = Math.round(logoW / 2.62) // ~61

    // Product positioned: right edge at 1080-40=1040, width=productSize
    const productX = 1040 - productSize
    const productY = 960 - productSize / 2

    return {
      background: '#f8fdff',
      backgroundStyle: {
        fill: '#f8fdff',
      },
      elements: [
        // Soft radial gradient wash — top-right corner (approximated as circle)
        {
          id: 'bg-glow',
          type: 'circle',
          x: 880,
          y: 200,
          width: 800,
          height: 800,
          fill: 'rgba(202,240,248,0.5)',
          draggable: false,
        },

        // Vertical ghost text — rotated -90deg, centered at left:60px, top:50%(960)
        // The text after rotation occupies vertical space. We position the text
        // so its center is at x=60, y=960.
        {
          id: 'vertical-text',
          type: 'text',
          x: 60,
          y: 960,
          width: 1400,
          text: verticalText,
          fontSize: 140,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: 'transparent',
          stroke: 'rgba(0,119,182,0.08)',
          strokeWidth: 2,
          align: 'center',
          letterSpacing: 20,
          rotation: -90,
          draggable: true,
        },

        // Top-left label: "Lifestyle" uppercase
        {
          id: 'label-lifestyle',
          type: 'text',
          x: 80,
          y: 80,
          width: 400,
          text: 'Lifestyle',
          fontSize: 22,
          fontFamily: 'Josefin Sans',
          fontStyle: '500',
          fill: '#0077b6',
          align: 'left',
          letterSpacing: 10,
          opacity: 0.5,
          draggable: true,
        },

        // Thin accent line below the label (gap-[12px] → y = 80 + 22 + 12 = 114)
        {
          id: 'label-line',
          type: 'rect',
          x: 80,
          y: 114,
          width: 60,
          height: 2,
          fill: '#00b4d8',
          opacity: 0.4,
          draggable: false,
        },

        // Logo — top right, 50% opacity, 160px wide
        // Right edge at 1080-80=1000, so x=1000-160=840
        {
          id: 'logo',
          type: 'image',
          src: 'logo',
          x: 1080 - 80 - logoW,
          y: 80,
          width: logoW,
          height: logoH,
          opacity: 0.5,
          draggable: true,
        },

        // Product — off-center right, vertically centered (SQUARE: width=height=productSize)
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: productX,
          y: productY,
          width: productSize,
          height: productSize,
          draggable: true,
          shadowColor: 'rgba(3,4,94,0.12)',
          shadowBlur: 60,
          shadowOffsetX: 0,
          shadowOffsetY: 30,
          shadowOpacity: 1,
        },

        // Subtitle — bottom-left, bold, tertiary color
        // absolute bottom-[100px] left-[80px] → y = 1920-100 - subtitleHeight
        // subtitle is text-[52px] leading-[1.1], max-w-[500px]
        // For single line: height ≈ 52*1.1 = ~57px
        // y = 1920 - 100 - 57 - 16 - 26 ≈ 1721 (accounting for handle below)
        // Simpler: bottom of container = 1920-100=1820. The div is flex-col gap-[16px]
        // handle at bottom: fontSize=26, so handle top ≈ 1820-26=1794
        // gap: 16px → subtitle bottom = 1794-16=1778
        // subtitle top = 1778 - 57 = 1721
        {
          id: 'subtitle',
          type: 'text',
          x: 80,
          y: 1720,
          width: 500,
          text: subtitle,
          fontSize: 52,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#03045e',
          align: 'left',
          lineHeight: 1.1,
          draggable: true,
        },

        // Handle — bottom-left below subtitle
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: 1794,
          width: 500,
          text: '@fivefood.ok',
          fontSize: 26,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(0,119,182,0.4)',
          align: 'left',
          letterSpacing: 4,
          draggable: true,
        },
      ],
    }
  },
}
