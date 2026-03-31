import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MinimalDropPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const label = data.label || 'NEW DROP'
  const productName = data.productName || 'Sabor\nChocolate'
  const subtitle = data.subtitle || 'Ya disponible en la web'

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-background px-[80px] font-headline">
      <p className="absolute top-[80px] text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="mb-[64px] h-[500px] w-auto object-contain drop-shadow-[0_48px_96px_rgba(0,53,64,0.15)]"
      />
      <p className="text-[36px] font-bold tracking-[14px] text-primary uppercase">{label}</p>
      <p className="mt-4 whitespace-pre-line text-center text-[80px] font-extrabold leading-[1.15] text-tertiary">
        {productName}
      </p>
      <div className="mt-8 h-[6px] w-[100px] rounded-full bg-primary" />
      <p className="mt-8 text-[32px] text-on-surface-variant">{subtitle}</p>
      <p className="absolute bottom-[80px] text-[28px] text-secondary">@fivefood.ok</p>
    </div>
  )
}

export const MinimalDropConfig: TemplateConfig = {
  id: 'launch-minimal-drop',
  name: 'Minimal Drop',
  category: 'lanzamientos',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'NEW DROP' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor\nChocolate' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Ya disponible en la web' },
    PRODUCT_FIELD,
  ],
  component: MinimalDropPreview,
}
