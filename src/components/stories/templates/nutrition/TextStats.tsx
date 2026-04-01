import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function TextStatsPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 380
  const lockLayout = !!data.lockLayout
  const stat1Num = String(data.stat1Num || '25')
  const stat1Label = String(data.stat1Label || 'g proteína')
  const stat2Num = String(data.stat2Num || '2')
  const stat2Label = String(data.stat2Label || 'g azúcar')
  const stat3Num = String(data.stat3Num || '120')
  const stat3Label = String(data.stat3Label || 'calorías')

  const stats = [
    { num: stat1Num, label: stat1Label },
    { num: stat2Num, label: stat2Label },
    { num: stat3Num, label: stat3Label },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,180,216,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] ml-[72px] w-[140px] opacity-15" />

      {/* Stats — massive typography */}
      <div className="z-10 mt-[60px] flex flex-col gap-[20px] pl-[72px]">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-baseline gap-[16px]">
            <p
              className="font-black leading-[0.85]"
              style={{
                fontSize: '220px',
                color: '#00b4d8',
                textShadow: '0 0 80px rgba(0,180,216,0.15)',
              }}
            >
              {stat.num}
            </p>
            <p
              className="text-[36px] font-medium leading-tight"
              style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '200px' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative line */}
      <div
        className="z-10 mt-[40px] ml-[72px]"
        style={{ width: '80px', height: '3px', background: 'rgba(0,180,216,0.3)' }}
      />

      {/* Product */}
      <div
        className="z-10 mt-auto mb-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '350px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[50px] text-center text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const TextStatsConfig: TemplateConfig = {
  id: 'nutri-text-stats',
  name: 'Text Stats',
  category: 'nutricional',
  fields: [
    { key: 'stat1Num', label: 'Stat 1 número', type: 'text', default: '25' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'g proteína' },
    { key: 'stat2Num', label: 'Stat 2 número', type: 'text', default: '2' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'g azúcar' },
    { key: 'stat3Num', label: 'Stat 3 número', type: 'text', default: '120' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'calorías' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: TextStatsPreview,
}
