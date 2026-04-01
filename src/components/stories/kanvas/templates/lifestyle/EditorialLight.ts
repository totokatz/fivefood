import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

export const EditorialLightTemplate: KanvasTemplate = {
  id: 'k-lifestyle-editorial-light',
  name: 'Editorial Light',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'Snackeá' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'sin culpa' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: '100% vegano · sin TACC · proteína real' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const product = (data.product as string) || 'chocolate'
    const headline = (data.headline as string) || 'Snackeá'
    const accent = (data.accent as string) || 'sin culpa'
    const subtitle = (data.subtitle as string) || '100% vegano · sin TACC · proteína real'
    const productSize = Number(data.productSize) || 500

    // HTML: flex-col items-center justify-between bg-background px-[80px] py-[100px]
    // 3 main groups: logo, text-block, product, handle
    // justify-between with items: logo, text-center-div, product-div, handle
    //
    // Logo: w=260, h=260/2.62≈99, opacity 0.6
    // Text block: headline(72) + accent(120,lineHeight:1) + divider(mt-8=32,h=6) + subtitle(mt-8=32,fontSize=32,leading-relaxed~1.625)
    //   textBlockH ≈ 72 + 120 + 32 + 6 + 32 + 32*1.625 ≈ 72+120+32+6+32+52 = 314
    // Product: productSize (square)
    // Handle: fontSize=28

    const logoW = 260
    const logoH = Math.round(logoW / 2.62) // ~99

    const headlineFontSize = 72
    const accentFontSize = 120
    const dividerMt = 32 // mt-8
    const dividerH = 6
    const subtitleMt = 32 // mt-8
    const subtitleFontSize = 32
    const subtitleLineH = Math.round(subtitleFontSize * 1.625) // leading-relaxed ≈ 52
    const textBlockH = headlineFontSize + accentFontSize + dividerMt + dividerH + subtitleMt + subtitleLineH

    const handleFontSize = 28
    const totalPadRange = 1920 - 100 - 100 // 1720
    const totalContent = logoH + textBlockH + productSize + handleFontSize
    const gap = (totalPadRange - totalContent) / 3

    const logoY = 100
    const textBlockY = logoY + logoH + gap
    const productY = textBlockY + textBlockH + gap
    const handleY = productY + productSize + gap

    // Text block element positions
    const headlineY = textBlockY
    const accentY = headlineY + headlineFontSize
    const dividerY = accentY + accentFontSize + dividerMt
    const subtitleY = dividerY + dividerH + subtitleMt

    return {
      background: '#f8fdff',
      backgroundStyle: {
        fill: '#f8fdff',
      },
      elements: [
        // Logo — top center, logo-blue, 60% opacity
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.6,
          draggable: true,
        },

        // Headline — bold, tertiary color (#03045e)
        {
          id: 'headline',
          type: 'text',
          x: 80,
          y: headlineY,
          width: 920,
          text: headline,
          fontSize: 72,
          fontFamily: 'Josefin Sans',
          fontStyle: '700',
          fill: '#03045e',
          align: 'center',
          draggable: true,
        },

        // Accent — large Satisfy cursive, primary color
        {
          id: 'accent',
          type: 'text',
          x: 80,
          y: accentY,
          width: 920,
          text: accent,
          fontSize: 120,
          fontFamily: 'Satisfy, cursive',
          fill: '#00b4d8',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },

        // Divider bar — primary color, centered, 100px wide, rounded
        {
          id: 'divider',
          type: 'rect',
          x: (1080 - 100) / 2,
          y: dividerY,
          width: 100,
          height: 6,
          fill: '#00b4d8',
          cornerRadius: 3,
          draggable: false,
        },

        // Subtitle text — on-surface-variant color (#40484c)
        {
          id: 'subtitle',
          type: 'text',
          x: 80,
          y: subtitleY,
          width: 920,
          text: subtitle,
          fontSize: 32,
          fontFamily: 'Josefin Sans',
          fill: '#40484c',
          align: 'center',
          lineHeight: 1.625,
          draggable: true,
        },

        // Product — centered, no rotation, soft drop shadow (SQUARE: width=height)
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          draggable: true,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 32,
          shadowOffsetX: 0,
          shadowOffsetY: 16,
          shadowOpacity: 1,
        },

        // Handle — bottom, secondary color (#0077b6)
        {
          id: 'handle',
          type: 'text',
          x: 80,
          y: handleY,
          width: 920,
          text: '@fivefood.ok',
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
