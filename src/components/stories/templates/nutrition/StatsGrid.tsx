import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function StatsGridPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const stat1Val = data.stat1Val || '8g'
  const stat1Label = data.stat1Label || 'Proteína'
  const stat2Val = data.stat2Val || '6.6g'
  const stat2Label = data.stat2Label || 'Fibra'
  const stat3Val = data.stat3Val || '0g'
  const stat3Label = data.stat3Label || 'Trans Fat'
  const stat4Val = data.stat4Val || '✓'
  const stat4Label = data.stat4Label || 'Sin TACC'
  const tagline = data.tagline || 'Energía real, sin vueltas'
  const productSize = Number(data.productSize) || 500

  const stats = [
    { val: stat1Val, label: stat1Label },
    { val: stat2Val, label: stat2Label },
    { val: stat3Val, label: stat3Label },
    { val: stat4Val, label: stat4Label },
  ]

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(180deg, #003540 0%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-primary/50 uppercase">
        FIVE FOODS
      </p>
      <div className="grid w-full grid-cols-2 gap-[32px]">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-[32px] border border-primary/20 px-[40px] py-[48px] text-center"
            style={{ background: 'rgba(0,180,216,0.08)' }}
          >
            <p className="text-[96px] font-black leading-none text-primary">{s.val}</p>
            <p className="mt-3 text-[28px] font-semibold tracking-[6px] text-white/40 uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)]"
          style={{ height: `${productSize}px` }}
        />
        <p className="text-[28px] text-white/35">{tagline}</p>
      </div>
    </div>
  )
}

export const StatsGridConfig: TemplateConfig = {
  id: 'nutri-stats-grid',
  name: 'Stats Grid',
  category: 'nutricional',
  fields: [
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '6.6g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Fibra' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '0g' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Trans Fat' },
    { key: 'stat4Val', label: 'Stat 4 valor', type: 'text', default: '✓' },
    { key: 'stat4Label', label: 'Stat 4 label', type: 'text', default: 'Sin TACC' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Energía real, sin vueltas' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
  ],
  component: StatsGridPreview,
}
