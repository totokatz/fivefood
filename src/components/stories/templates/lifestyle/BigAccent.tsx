import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BigAccentPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const topLine = data.topLine || 'Tu dosis de'
  const accent = data.accent || 'energía real'
  const bottomLine = data.bottomLine || 'sin vueltas'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[100px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 60%, #03045e 100%)' }}
    >
      <img src={logo} alt="FiveFoods" className="w-[240px] opacity-50" />
      <div className="text-center">
        <p className="text-[48px] font-light tracking-[10px] text-white uppercase">
          {topLine}
        </p>
        <p
          className="font-accent text-[140px] leading-none text-white"
          style={{ textShadow: '0 12px 48px rgba(0,0,0,0.3)' }}
        >
          {accent}
        </p>
        <p className="mt-2 text-[48px] font-light tracking-[10px] text-white uppercase">
          {bottomLine}
        </p>
      </div>
      {/* Product — fixed container */}
      <div className="flex items-center justify-center" style={lockLayout ? { minHeight: '400px' } : undefined}>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          style={{ height: `${productSize}px`, transform: 'rotate(3deg)' }}
        />
      </div>
      <p className="text-[28px] text-white/40">@fivefood.ok</p>
    </div>
  )
}

export const BigAccentConfig: TemplateConfig = {
  id: 'lifestyle-big-accent',
  name: 'Big Accent',
  category: 'lifestyle',
  fields: [
    { key: 'topLine', label: 'Línea superior', type: 'text', default: 'Tu dosis de' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'energía real' },
    { key: 'bottomLine', label: 'Línea inferior', type: 'text', default: 'sin vueltas' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BigAccentPreview,
}
