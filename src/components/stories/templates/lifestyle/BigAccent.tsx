import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BigAccentPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const topLine = data.topLine || 'Tu dosis de'
  const accent = data.accent || 'energía real'
  const bottomLine = data.bottomLine || 'sin vueltas'
  const productSize = Number(data.productSize) || 500

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 60%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>
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
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          style={{ height: `${productSize}px`, transform: 'rotate(3deg)' }}
        />
        <p className="text-[28px] text-white/40">@fivefood.ok</p>
      </div>
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
  ],
  component: BigAccentPreview,
}
