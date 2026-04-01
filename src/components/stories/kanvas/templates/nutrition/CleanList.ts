import type { KanvasTemplate, KanvasScene } from '../../types'
import { K_PRODUCT_FIELD, K_PRODUCT_SIZE_FIELD } from '../../types'

// HTML: bg-background (white), flex-col items-center justify-between px-[80px] py-[100px]
// Layout (justify-between): logo | center-block(title, 4 rows) | product | handle

export const CleanListTemplate: KanvasTemplate = {
  id: 'k-nutri-clean-list',
  name: 'Clean List',
  category: 'nutricional',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: '¿Qué tiene adentro?' },
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Desc', label: 'Stat 1 desc', type: 'text', default: 'Proteína de arveja' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '6.6g' },
    { key: 'stat2Desc', label: 'Stat 2 desc', type: 'text', default: 'Fibra natural' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '0g' },
    { key: 'stat3Desc', label: 'Stat 3 desc', type: 'text', default: 'Grasas trans' },
    { key: 'stat4Val', label: 'Stat 4 valor', type: 'text', default: '✓' },
    { key: 'stat4Desc', label: 'Stat 4 desc', type: 'text', default: 'Sin TACC · Vegano' },
    K_PRODUCT_FIELD,
    K_PRODUCT_SIZE_FIELD,
  ],
  build(data): KanvasScene {
    const title = (data.title as string) || '¿Qué tiene adentro?'
    const stat1Val = (data.stat1Val as string) || '8g'
    const stat1Desc = (data.stat1Desc as string) || 'Proteína de arveja'
    const stat2Val = (data.stat2Val as string) || '6.6g'
    const stat2Desc = (data.stat2Desc as string) || 'Fibra natural'
    const stat3Val = (data.stat3Val as string) || '0g'
    const stat3Desc = (data.stat3Desc as string) || 'Grasas trans'
    const stat4Val = (data.stat4Val as string) || '✓'
    const stat4Desc = (data.stat4Desc as string) || 'Sin TACC · Vegano'
    const product = (data.product as string) || 'chocolate'
    const productSize = Number(data.productSize) || 500

    const rows = [
      { val: stat1Val, desc: stat1Desc, id: '1' },
      { val: stat2Val, desc: stat2Desc, id: '2' },
      { val: stat3Val, desc: stat3Desc, id: '3' },
      { val: stat4Val, desc: stat4Desc, id: '4' },
    ]

    // px-[80px] py-[100px] justify-between
    const paddingX = 80
    const rowW = 1080 - paddingX * 2 // 920

    // Logo: w-[240px], h=240/2.62≈92
    const logoW = 240
    const logoH = Math.round(logoW / 2.62)
    const logoY = 100

    // Handle: text-[28px] at bottom py-[100px]
    const handleY = 1920 - 100 - 28

    // Row: rounded-[32px] px-[48px] py-[32px], content has 72px val + 36px desc
    // Row height = 32 + 72 + 32 = 136
    const rowH = 136
    const rowGap = 24
    const valColW = 160

    // Title: text-[64px], mb-[48px]
    const titleH = 64
    // Center block = title + mb-[48px] + 4 rows + 3 gaps
    const rowsBlockH = 4 * rowH + 3 * rowGap // 544+72=616
    const centerBlockH = titleH + 48 + rowsBlockH // 64+48+616=728

    // justify-between: logo, center, product, handle
    const totalContentH = logoH + centerBlockH + productSize + 28
    const availableH = 1920 - 100 * 2
    const betweenGap = (availableH - totalContentH) / 3

    const centerBlockY = logoY + logoH + betweenGap
    const titleY = centerBlockY
    const rowsStartY = titleY + titleH + 48
    const productY = centerBlockY + centerBlockH + betweenGap

    return {
      background: '#ffffff',
      backgroundStyle: {
        fill: '#ffffff',
      },
      elements: [
        // Logo — w-[240px] opacity-60
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
        // Title — text-[64px] font-extrabold text-tertiary, centered
        {
          id: 'title',
          type: 'text',
          text: title,
          x: paddingX,
          y: titleY,
          width: rowW,
          fontSize: 64,
          fontFamily: 'Josefin Sans',
          fontStyle: '800',
          fill: '#03045e',
          align: 'center',
          draggable: true,
        },

        // Stat rows
        ...rows.flatMap((row, i) => {
          const rowY = rowsStartY + i * (rowH + rowGap)
          return [
            // Row card bg — rgba(0,180,216,0.08) rounded-[32px]
            {
              id: `row-bg-${row.id}`,
              type: 'rect' as const,
              x: paddingX,
              y: rowY,
              width: rowW,
              height: rowH,
              fill: 'rgba(0,180,216,0.08)',
              cornerRadius: 32,
              draggable: false,
            },
            // Stat value — min-w-[160px] text-[72px] font-black text-primary, left-aligned
            // px-[48px] py-[32px] → text at x+48, y+32
            {
              id: `stat-val-${row.id}`,
              type: 'text' as const,
              text: row.val,
              x: paddingX + 48,
              y: rowY + 32,
              width: valColW,
              fontSize: 72,
              fontFamily: 'Josefin Sans',
              fontStyle: '900',
              fill: '#00b4d8',
              align: 'left',
              lineHeight: 1,
              draggable: true,
            },
            // Stat desc — gap-[40px] text-[36px] text-tertiary, vertically centered
            {
              id: `stat-desc-${row.id}`,
              type: 'text' as const,
              text: row.desc,
              x: paddingX + 48 + valColW + 40,
              y: rowY + (rowH - 36) / 2,
              width: rowW - 48 - valColW - 40 - 48,
              fontSize: 36,
              fontFamily: 'Josefin Sans',
              fontStyle: '400',
              fill: '#03045e',
              align: 'left',
              draggable: true,
            },
          ]
        }),

        // Product — SQUARE, centered, drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]
        {
          id: 'product',
          type: 'image',
          src: `producto-${product}`,
          x: (1080 - productSize) / 2,
          y: productY,
          width: productSize,
          height: productSize,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowBlur: 24,
          shadowOffsetY: 12,
          shadowOpacity: 1,
          draggable: true,
        },

        // Handle — text-[28px] text-secondary
        {
          id: 'handle',
          type: 'text',
          text: '@fivefood.ok',
          x: paddingX,
          y: handleY,
          width: rowW,
          fontSize: 28,
          fontFamily: 'Josefin Sans',
          fontStyle: '300',
          fill: '#0077b6',
          align: 'center',
          draggable: true,
        },
      ],
    }
  },
}
