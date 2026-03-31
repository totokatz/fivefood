import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldDiscountPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '10'
  const subtitle = data.subtitle || 'EN TODA LA WEB'

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[120px] font-headline"
      style={{ background: 'linear-gradient(160deg, #03045e 0%, #0077b6 50%, #00b4d8 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-white/50 uppercase">
        FIVE FOODS
      </p>
      <div className="text-center">
        <p className="text-[220px] font-black leading-none text-white" style={{ textShadow: '0 12px 60px rgba(0,0,0,0.3)' }}>
          {discount}%
        </p>
        <p className="text-[72px] font-bold tracking-[16px] text-primary-container">
          OFF
        </p>
      </div>
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="h-[420px] w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
        style={{ transform: 'rotate(-5deg)' }}
      />
      <div className="text-center">
        <p className="text-[42px] font-bold tracking-[6px] text-white">
          {subtitle}
        </p>
        <p className="mt-2 text-[28px] text-white/40">fivefood.com.ar</p>
      </div>
    </div>
  )
}

export const BoldDiscountConfig: TemplateConfig = {
  id: 'promo-bold-discount',
  name: 'Bold Discount',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'EN TODA LA WEB' },
    PRODUCT_FIELD,
  ],
  component: BoldDiscountPreview,
}
