import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

const barColors = [
  { fill: '#00b4d8', bg: 'rgba(0,180,216,0.1)' },
  { fill: '#0077b6', bg: 'rgba(0,119,182,0.1)' },
  { fill: '#90e0ef', bg: 'rgba(144,224,239,0.15)' },
]

export function CleanDataVizPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 360
  const lockLayout = !!data.lockLayout
  const title = String(data.title || 'POR PORCIÓN')
  const stat1Label = String(data.stat1Label || 'Proteína')
  const stat1Pct = Math.min(100, Math.max(0, Number(data.stat1Pct) || 85))
  const stat2Label = String(data.stat2Label || 'Fibra')
  const stat2Pct = Math.min(100, Math.max(0, Number(data.stat2Pct) || 60))
  const stat3Label = String(data.stat3Label || 'Vitaminas')
  const stat3Pct = Math.min(100, Math.max(0, Number(data.stat3Pct) || 45))

  const stats = [
    { label: stat1Label, pct: stat1Pct, ...barColors[0] },
    { label: stat2Label, pct: stat2Pct, ...barColors[1] },
    { label: stat3Label, pct: stat3Pct, ...barColors[2] },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="z-10 mt-[80px] w-[180px] opacity-40" />

      {/* Title */}
      <p
        className="z-10 mt-[80px] text-[40px] font-bold tracking-[8px]"
        style={{ color: '#03045e' }}
      >
        {title}
      </p>
      <div
        className="z-10 mt-[16px]"
        style={{ width: '60px', height: '3px', background: '#00b4d8', borderRadius: '2px' }}
      />

      {/* Progress bars */}
      <div className="z-10 mt-[80px] flex w-full flex-col gap-[56px] px-[90px]">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-[16px]">
            {/* Label row */}
            <div className="flex items-center justify-between">
              <p className="text-[30px] font-semibold" style={{ color: '#03045e' }}>
                {stat.label}
              </p>
              <p className="text-[30px] font-bold" style={{ color: stat.fill }}>
                {stat.pct}%
              </p>
            </div>
            {/* Bar */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: '40px',
                borderRadius: '20px',
                background: stat.bg,
              }}
            >
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: `${stat.pct}%`,
                  borderRadius: '20px',
                  background: stat.fill,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Spacer + Product */}
      <div
        className="z-10 mt-auto mb-[30px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '350px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 16px 32px rgba(0,29,37,0.1))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[60px] text-[26px] font-semibold"
        style={{ color: '#0077b6' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const CleanDataVizConfig: TemplateConfig = {
  id: 'nutri-clean-data-viz',
  name: 'Clean Data Viz',
  category: 'nutricional',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'POR PORCIÓN' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat1Pct', label: 'Stat 1 %', type: 'text', default: '85' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Fibra' },
    { key: 'stat2Pct', label: 'Stat 2 %', type: 'text', default: '60' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Vitaminas' },
    { key: 'stat3Pct', label: 'Stat 3 %', type: 'text', default: '45' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CleanDataVizPreview,
}
