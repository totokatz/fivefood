import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CompareColumnsPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 420
  const lockLayout = !!data.lockLayout
  const title = String(data.title || 'VS EL RESTO')
  const stat1Label = String(data.stat1Label || 'Proteína')
  const stat1Ours = String(data.stat1Ours || '25g')
  const stat1Theirs = String(data.stat1Theirs || '3g')
  const stat2Label = String(data.stat2Label || 'Azúcar')
  const stat2Ours = String(data.stat2Ours || '2g')
  const stat2Theirs = String(data.stat2Theirs || '18g')
  const stat3Label = String(data.stat3Label || 'Fibra')
  const stat3Ours = String(data.stat3Ours || '8g')
  const stat3Theirs = String(data.stat3Theirs || '1g')

  const stats = [
    { label: stat1Label, ours: stat1Ours, theirs: stat1Theirs },
    { label: stat2Label, ours: stat2Ours, theirs: stat2Theirs },
    { label: stat3Label, ours: stat3Ours, theirs: stat3Theirs },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] w-[160px] opacity-20" />

      {/* Product at top */}
      <div
        className="z-10 mt-[30px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Title */}
      <p
        className="z-10 mt-[40px] text-[64px] font-black tracking-[-2px]"
        style={{ color: '#00b4d8' }}
      >
        {title}
      </p>

      {/* Column headers */}
      <div className="z-10 mt-[40px] flex w-full px-[72px]">
        <div className="flex-1 text-center">
          <p className="text-[24px] font-bold tracking-[4px]" style={{ color: '#00b4d8' }}>
            NUESTRO SNACK
          </p>
          <div className="mx-auto mt-[8px] h-[3px] w-[160px]" style={{ background: '#00b4d8' }} />
        </div>
        <div style={{ width: '60px' }} />
        <div className="flex-1 text-center">
          <p className="text-[24px] font-bold tracking-[4px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            SNACK COMÚN
          </p>
          <div className="mx-auto mt-[8px] h-[3px] w-[160px]" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>

      {/* Comparison rows */}
      <div className="z-10 mt-[36px] flex w-full flex-col gap-[20px] px-[72px]">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center">
            {/* Ours */}
            <div
              className="flex flex-1 flex-col items-center rounded-[20px] py-[28px]"
              style={{
                background: 'rgba(0,180,216,0.08)',
                border: '1px solid rgba(0,180,216,0.15)',
              }}
            >
              <p className="text-[56px] font-black leading-none" style={{ color: '#00b4d8' }}>
                {stat.ours}
              </p>
            </div>

            {/* Label center */}
            <div className="flex flex-col items-center" style={{ width: '60px' }}>
              <p
                className="text-center text-[22px] font-semibold leading-tight"
                style={{ color: 'rgba(255,255,255,0.4)', writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '2px' }}
              >
                {stat.label}
              </p>
            </div>

            {/* Theirs */}
            <div
              className="flex flex-1 flex-col items-center rounded-[20px] py-[28px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-[56px] font-black leading-none" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {stat.theirs}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Handle */}
      <p
        className="z-10 mt-auto mb-[60px] text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const CompareColumnsConfig: TemplateConfig = {
  id: 'nutri-compare-columns',
  name: 'Compare Columns',
  category: 'nutricional',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'VS EL RESTO' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat1Ours', label: 'Stat 1 nuestro', type: 'text', default: '25g' },
    { key: 'stat1Theirs', label: 'Stat 1 común', type: 'text', default: '3g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Azúcar' },
    { key: 'stat2Ours', label: 'Stat 2 nuestro', type: 'text', default: '2g' },
    { key: 'stat2Theirs', label: 'Stat 2 común', type: 'text', default: '18g' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Fibra' },
    { key: 'stat3Ours', label: 'Stat 3 nuestro', type: 'text', default: '8g' },
    { key: 'stat3Theirs', label: 'Stat 3 común', type: 'text', default: '1g' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CompareColumnsPreview,
}
