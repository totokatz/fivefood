import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MacroBreakdownPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const protein = data.protein || '25g'
  const carbs = data.carbs || '15g'
  const fats = data.fats || '8g'
  const title = data.title || 'MACROS POR PORCIÓN'
  const productSize = Number(data.productSize) || 450
  const lockLayout = !!data.lockLayout

  const macros = [
    { name: 'Proteínas', value: protein, percent: 52, bg: 'rgba(0,180,216,0.12)', accent: '#00b4d8', barBg: 'rgba(0,180,216,0.08)' },
    { name: 'Carbohidratos', value: carbs, percent: 31, bg: 'rgba(0,119,182,0.12)', accent: '#0077b6', barBg: 'rgba(0,119,182,0.08)' },
    { name: 'Grasas', value: fats, percent: 17, bg: 'rgba(3,4,94,0.15)', accent: '#03045e', barBg: 'rgba(3,4,94,0.08)' },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #021b33 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] w-[160px] opacity-20" />

      {/* Product at top */}
      <div
        className="z-10 mt-[30px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '350px' } : undefined}
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
        className="z-10 mt-[50px] text-[30px] font-medium tracking-[8px]"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        {title}
      </p>

      {/* Macro cards */}
      <div className="z-10 mt-[40px] flex w-full flex-col gap-[20px] px-[72px]">
        {macros.map((macro, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-[20px] px-[44px] py-[36px]"
            style={{
              background: macro.bg,
              border: `1px solid ${macro.accent}20`,
            }}
          >
            {/* Top row: name + value */}
            <div className="flex items-baseline justify-between">
              <p className="text-[32px] font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {macro.name}
              </p>
              <p className="text-[52px] font-black leading-none" style={{ color: macro.accent }}>
                {macro.value}
              </p>
            </div>

            {/* Percentage bar */}
            <div
              className="mt-[16px] overflow-hidden rounded-full"
              style={{ height: '12px', background: macro.barBg }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${macro.percent}%`,
                  background: `linear-gradient(90deg, ${macro.accent}, ${macro.accent}aa)`,
                }}
              />
            </div>

            {/* Percent label */}
            <p
              className="mt-[10px] text-right text-[22px] font-medium"
              style={{ color: `${macro.accent}80` }}
            >
              {macro.percent}%
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

export const MacroBreakdownConfig: TemplateConfig = {
  id: 'nutri-macro-breakdown',
  name: 'Macro Breakdown',
  category: 'nutricional',
  fields: [
    { key: 'protein', label: 'Proteínas', type: 'text', default: '25g' },
    { key: 'carbs', label: 'Carbohidratos', type: 'text', default: '15g' },
    { key: 'fats', label: 'Grasas', type: 'text', default: '8g' },
    { key: 'title', label: 'Título', type: 'text', default: 'MACROS POR PORCIÓN' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MacroBreakdownPreview,
}
