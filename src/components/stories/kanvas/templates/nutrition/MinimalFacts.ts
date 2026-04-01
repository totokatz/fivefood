import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: bg-white, flex-col items-center px-[80px] py-[100px]
// Layout (no justify-between, uses mt-auto for handle):
// logo w-[200px] opacity-40
// mt-[100px] heroStat text-[280px], mt-[8px] heroLabel text-[48px]
// mt-[60px] divider w-[200px] h-[2px]
// mt-[60px] both products side by side (chocolate rotate(-3deg), queso rotate(3deg) marginLeft=gap)
// mt-[60px] facts list gap-[20px]
// mt-auto handle

export const MinimalFactsTemplate: KanvasTemplate = {
  id: 'k-nutri-minimal-facts',
  name: 'Minimal Facts',
  category: 'nutricional',
  fields: [
    { key: 'heroStat', label: 'Stat principal', type: 'text', default: '0g' },
    { key: 'heroLabel', label: 'Label principal', type: 'text', default: 'Grasas Trans' },
    { key: 'fact1', label: 'Dato 1', type: 'text', default: '8g de proteína por porción' },
    { key: 'fact2', label: 'Dato 2', type: 'text', default: '100% ingredientes de origen vegetal' },
    { key: 'fact3', label: 'Dato 3', type: 'text', default: 'Sin TACC · Apto vegano' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const heroStat = (data.heroStat as string) || '0g'
    const heroLabel = (data.heroLabel as string) || 'Grasas Trans'
    const fact1 = (data.fact1 as string) || '8g de proteína por porción'
    const fact2 = (data.fact2 as string) || '100% ingredientes de origen vegetal'
    const fact3 = (data.fact3 as string) || 'Sin TACC · Apto vegano'
    const productSize = Number(data.productSize) || 340
    const productGap = 24

    const facts = [fact1, fact2, fact3].filter(Boolean)

    // Logo: w-[200px] h=200/2.62≈76, at y=100
    const logoW = 200
    const logoH = Math.round(logoW / 2.62)
    const logoY = 100

    // Hero stat: mt-[100px] text-[280px] font-black leading-none
    const heroStatY = logoY + logoH + 100
    const heroStatH = 280
    // Hero label: mt-[8px] text-[48px]
    const heroLabelY = heroStatY + heroStatH + 8

    // Divider: mt-[60px] h-[2px] w-[200px]
    const dividerY = heroLabelY + 48 + 60

    // Products: mt-[60px], SQUARE, side by side
    const productsY = dividerY + 2 + 60
    // Chocolate at left, queso at right with marginLeft=gap
    const chocolateX = (1080 - productSize * 2 - productGap) / 2
    const quesoX = chocolateX + productSize + productGap

    // Facts: mt-[60px] gap-[20px] text-[28px]
    const factsY = productsY + productSize + 60
    const factGap = 20

    // Handle: mt-auto text-[28px] text-secondary/40 at bottom
    const handleY = 1920 - 100 - 28

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Logo — w-[200px] opacity-40
        {
          id: 'logo',
          type: 'image',
          src: 'logo-blue',
          x: (1080 - logoW) / 2,
          y: logoY,
          width: logoW,
          height: logoH,
          opacity: 0.4,
          draggable: true,
        },

        // Hero stat — text-[280px] font-black leading-none text-tertiary
        {
          id: 'hero-stat',
          type: 'text',
          text: heroStat,
          x: 80,
          y: heroStatY,
          width: 1080 - 160,
          fontSize: 280,
          fontFamily: 'Josefin Sans',
          fontStyle: '900',
          fill: '#03045e',
          align: 'center',
          lineHeight: 1,
          draggable: true,
        },

        // Hero label — mt-[8px] text-[48px] font-semibold tracking-[8px] text-secondary/60 uppercase
        {
          id: 'hero-label',
          type: 'text',
          text: heroLabel.toUpperCase(),
          x: 80,
          y: heroLabelY,
          width: 1080 - 160,
          fontSize: 48,
          fontFamily: 'Josefin Sans',
          fontStyle: '600',
          fill: 'rgba(0,119,182,0.6)',
          align: 'center',
          letterSpacing: 8,
          draggable: true,
        },

        // Divider — mt-[60px] h-[2px] w-[200px] bg-primary/20
        {
          id: 'divider',
          type: 'rect',
          x: (1080 - 200) / 2,
          y: dividerY,
          width: 200,
          height: 2,
          fill: 'rgba(0,180,216,0.2)',
          draggable: false,
        },

        // Chocolate product — SQUARE, rotate(-3deg), drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]
        {
          id: 'product-chocolate',
          type: 'image',
          src: 'producto-chocolate',
          x: chocolateX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: -3,
          shadowColor: 'rgba(0,0,0,0.06)',
          shadowBlur: 20,
          shadowOffsetY: 8,
          shadowOpacity: 1,
          draggable: true,
        },
        // Queso product — SQUARE, rotate(3deg), marginLeft=gap
        {
          id: 'product-queso',
          type: 'image',
          src: 'producto-queso',
          x: quesoX,
          y: productsY,
          width: productSize,
          height: productSize,
          rotation: 3,
          shadowColor: 'rgba(0,0,0,0.06)',
          shadowBlur: 20,
          shadowOffsetY: 8,
          shadowOpacity: 1,
          draggable: true,
        },

        // Facts list — mt-[60px] gap-[20px] text-[28px] text-tertiary/50
        ...facts.map((fact, i) => ({
          id: `fact-${i}`,
          type: 'text' as const,
          text: fact,
          x: 80,
          y: factsY + i * (28 + factGap),
          width: 1080 - 160,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '400',
          fill: 'rgba(3,4,94,0.5)',
          align: 'center',
          draggable: true,
        })),

        // Handle — mt-auto text-[28px] text-secondary/40
        {
          id: 'handle',
          type: 'text',
          text: '@fivefood.ok',
          x: 80,
          y: handleY,
          width: 1080 - 160,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: 'rgba(0,119,182,0.4)',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
