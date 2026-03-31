import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function EditorialLightPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const headline = data.headline || 'Snackeá'
  const accent = data.accent || 'sin culpa'
  const subtitle = data.subtitle || '100% vegano · sin TACC · proteína real'
  const productSize = Number(data.productSize) || 500

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-background px-[80px] py-[120px] font-headline">
      <p className="text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>
      <div className="text-center">
        <p className="text-[72px] font-bold text-tertiary">{headline}</p>
        <p className="font-accent text-[120px] leading-none text-primary">{accent}</p>
        <div className="mx-auto mt-8 h-[6px] w-[100px] rounded-full bg-primary" />
        <p className="mt-8 text-[32px] leading-relaxed text-on-surface-variant">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)]"
          style={{ height: `${productSize}px` }}
        />
        <p className="text-[28px] text-secondary">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const EditorialLightConfig: TemplateConfig = {
  id: 'lifestyle-editorial-light',
  name: 'Editorial Light',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'Snackeá' },
    { key: 'accent', label: 'Palabra accent', type: 'text', default: 'sin culpa' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: '100% vegano · sin TACC · proteína real' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
  ],
  component: EditorialLightPreview,
}
