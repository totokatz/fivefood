import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SingleStatHeroPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const statValue = data.statValue || '8g'
  const statLabel = data.statLabel || 'Proteína'
  const description = data.description || 'Por porción · Proteína de arveja\n100% vegano · Sin TACC'
  const productSize = Number(data.productSize) || 500

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center px-[80px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 100%)' }}
    >
      <p className="absolute top-[80px] text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>
      <p
        className="text-[300px] font-black leading-none text-white"
        style={{ textShadow: '0 12px 72px rgba(0,0,0,0.2)' }}
      >
        {statValue}
      </p>
      <p className="mt-4 text-[64px] font-bold tracking-[14px] text-white/85 uppercase">
        {statLabel}
      </p>
      <p className="mt-8 whitespace-pre-line text-center text-[36px] leading-relaxed text-white/50">
        {description}
      </p>
      <div className="absolute bottom-[80px] flex flex-col items-center gap-4">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
          style={{ height: `${productSize}px` }}
        />
        <p className="text-[28px] text-white/40">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const SingleStatHeroConfig: TemplateConfig = {
  id: 'nutri-single-stat',
  name: 'Single Stat Hero',
  category: 'nutricional',
  fields: [
    { key: 'statValue', label: 'Valor', type: 'text', default: '8g' },
    { key: 'statLabel', label: 'Label', type: 'text', default: 'Proteína' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Por porción · Proteína de arveja\n100% vegano · Sin TACC' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
  ],
  component: SingleStatHeroPreview,
}
