import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function FactLabelPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const serving = data.serving || '1 porción (30g)'
  const calories = data.calories || '120'
  const protein = data.protein || '25g'
  const fiber = data.fiber || '8g'
  const sugar = data.sugar || '2g'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  const rows = [
    { label: 'Calorías', value: `${calories} kcal`, bold: true },
    { label: 'Proteínas', value: protein, bold: false },
    { label: 'Fibra', value: fiber, bold: false },
    { label: 'Azúcares', value: sugar, bold: false },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] w-[160px] opacity-20" />

      {/* Product to the right, label to the left — but stacked vertically for story format */}
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

      {/* Nutrition facts label panel */}
      <div
        className="z-10 mx-[72px] mt-[50px] flex flex-col overflow-hidden"
        style={{
          background: '#ffffff',
          border: '4px solid #000000',
          borderRadius: '8px',
          width: '840px',
        }}
      >
        {/* Header */}
        <div
          className="px-[36px] py-[24px]"
          style={{ background: '#03045e', borderBottom: '4px solid #000000' }}
        >
          <p className="text-[36px] font-black tracking-[2px] text-white">
            INFORMACIÓN NUTRICIONAL
          </p>
        </div>

        {/* Serving size */}
        <div
          className="flex items-center justify-between px-[36px] py-[20px]"
          style={{ borderBottom: '2px solid #e5e7eb' }}
        >
          <p className="text-[26px] font-medium" style={{ color: '#6b7280' }}>
            Porción
          </p>
          <p className="text-[26px] font-bold" style={{ color: '#03045e' }}>
            {serving}
          </p>
        </div>

        {/* Thick divider */}
        <div style={{ height: '6px', background: '#000000' }} />

        {/* Nutrient rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-[36px] py-[20px]"
            style={{
              borderBottom: i < rows.length - 1 ? '1px solid #e5e7eb' : 'none',
            }}
          >
            <p
              className={`text-[28px] ${row.bold ? 'font-black' : 'font-medium'}`}
              style={{ color: '#1f2937' }}
            >
              {row.label}
            </p>
            <p
              className="text-[30px] font-black"
              style={{ color: row.bold ? '#00b4d8' : '#03045e' }}
            >
              {row.value}
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

export const FactLabelConfig: TemplateConfig = {
  id: 'nutri-fact-label',
  name: 'Fact Label',
  category: 'nutricional',
  fields: [
    { key: 'serving', label: 'Porción', type: 'text', default: '1 porción (30g)' },
    { key: 'calories', label: 'Calorías', type: 'text', default: '120' },
    { key: 'protein', label: 'Proteínas', type: 'text', default: '25g' },
    { key: 'fiber', label: 'Fibra', type: 'text', default: '8g' },
    { key: 'sugar', label: 'Azúcares', type: 'text', default: '2g' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FactLabelPreview,
}
