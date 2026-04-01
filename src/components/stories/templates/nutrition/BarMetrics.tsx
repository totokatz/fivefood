import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BarMetricsPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const stat1Label = data.stat1Label || 'Proteína'
  const stat1Value = data.stat1Value || '25g'
  const stat2Label = data.stat2Label || 'Fibra'
  const stat2Value = data.stat2Value || '8g'
  const stat3Label = data.stat3Label || 'Calcio'
  const stat3Value = data.stat3Value || '300mg'
  const stat4Label = data.stat4Label || 'Hierro'
  const stat4Value = data.stat4Value || '6mg'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  const bars = [
    { label: stat1Label, value: stat1Value, width: 85, color: '#00b4d8' },
    { label: stat2Label, value: stat2Value, width: 60, color: '#0096c7' },
    { label: stat3Label, value: stat3Value, width: 72, color: '#0077b6' },
    { label: stat4Label, value: stat4Value, width: 45, color: '#03045e' },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #021b33 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[160px] opacity-20" />

      {/* Product at top */}
      <div
        className="z-10 mt-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Title */}
      <p
        className="z-10 mt-[60px] text-[32px] font-medium tracking-[8px]"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        INFORMACIÓN
      </p>

      {/* Bar chart */}
      <div className="z-10 mt-[50px] flex w-full flex-col gap-[32px] px-[80px]">
        {bars.map((bar, i) => (
          <div key={i} className="flex items-center gap-[24px]">
            {/* Label */}
            <p
              className="w-[180px] text-right text-[28px] font-medium"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {bar.label}
            </p>
            {/* Bar track */}
            <div
              className="relative flex-1 overflow-hidden rounded-full"
              style={{ height: '40px', background: 'rgba(255,255,255,0.05)' }}
            >
              {/* Fill */}
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${bar.width}%`,
                  background: `linear-gradient(90deg, ${bar.color}, ${bar.color}cc)`,
                  boxShadow: `0 0 20px ${bar.color}30`,
                }}
              />
            </div>
            {/* Value */}
            <p
              className="w-[120px] text-[32px] font-black"
              style={{ color: bar.color }}
            >
              {bar.value}
            </p>
          </div>
        ))}
      </div>

      {/* Handle */}
      <p
        className="z-10 mt-auto mb-[60px] text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(144,224,239,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const BarMetricsConfig: TemplateConfig = {
  id: 'nutri-bar-metrics',
  name: 'Bar Metrics',
  category: 'nutricional',
  fields: [
    { key: 'stat1Label', label: 'Stat 1 nombre', type: 'text', default: 'Proteína' },
    { key: 'stat1Value', label: 'Stat 1 valor', type: 'text', default: '25g' },
    { key: 'stat2Label', label: 'Stat 2 nombre', type: 'text', default: 'Fibra' },
    { key: 'stat2Value', label: 'Stat 2 valor', type: 'text', default: '8g' },
    { key: 'stat3Label', label: 'Stat 3 nombre', type: 'text', default: 'Calcio' },
    { key: 'stat3Value', label: 'Stat 3 valor', type: 'text', default: '300mg' },
    { key: 'stat4Label', label: 'Stat 4 nombre', type: 'text', default: 'Hierro' },
    { key: 'stat4Value', label: 'Stat 4 valor', type: 'text', default: '6mg' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BarMetricsPreview,
}
