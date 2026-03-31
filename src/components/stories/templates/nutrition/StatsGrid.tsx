import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoWhite from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

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
  const lockLayout = !!data.lockLayout

  const stats = [
    { val: stat1Val, label: stat1Label },
    { val: stat2Val, label: stat2Label },
    { val: stat3Val, label: stat3Label },
    { val: stat4Val, label: stat4Label },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(160deg, #003540 0%, #03045e 60%, #0077b6 100%)' }}
    >
      {/* Subtle glow */}
      <div
        className="absolute rounded-full"
        style={{ width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Logo */}
      <img src={logoWhite} alt="FiveFoods" className="z-10 mt-[80px] w-[240px] opacity-50" />

      {/* Product — centered, fixed container */}
      <div className="z-10 flex items-center justify-center" style={lockLayout ? { minHeight: '500px' } : undefined}>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,180,216,0.25)]"
          style={{ height: `${productSize}px`, transform: 'rotate(-6deg)' }}
        />
      </div>

      {/* Stats — horizontal strip with glass effect */}
      <div className="z-10 flex w-full justify-center gap-[16px] px-[40px]">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center rounded-[24px] py-[36px]"
            style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.15)' }}
          >
            <p className="text-[64px] font-black leading-none text-primary">{s.val}</p>
            <p className="mt-[12px] text-[20px] font-semibold tracking-[3px] text-white/40 uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <p className="z-10 mt-[48px] mb-[80px] text-[28px] font-light text-white/30">{tagline}</p>
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
    LOCK_LAYOUT_FIELD,
  ],
  component: StatsGridPreview,
}
