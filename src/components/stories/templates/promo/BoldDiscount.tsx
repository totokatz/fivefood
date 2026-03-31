import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldDiscountPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '10'
  const subtitle = data.subtitle || 'EN TODA LA WEB'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(170deg, #03045e 0%, #0077b6 40%, #00b4d8 100%)' }}
    >
      {/* Background decorative circles */}
      <div
        className="absolute rounded-full opacity-10"
        style={{ width: '900px', height: '900px', background: '#00b4d8', top: '-200px', right: '-300px' }}
      />
      <div
        className="absolute rounded-full opacity-8"
        style={{ width: '600px', height: '600px', background: '#90e0ef', bottom: '200px', left: '-200px' }}
      />

      {/* Logo top */}
      <img src={logo} alt="FiveFoods" className="mt-[80px] w-[280px] opacity-70" />

      {/* Discount badge */}
      <div className="z-10 mt-[100px] text-center">
        <div className="flex items-baseline justify-center gap-[12px]">
          <p
            className="text-[280px] font-black leading-none text-white"
            style={{ textShadow: '0 8px 40px rgba(0,0,0,0.25)' }}
          >
            {discount}
          </p>
          <div className="flex flex-col items-start">
            <p className="text-[100px] font-black leading-none text-white">%</p>
            <p className="text-[80px] font-black leading-none text-primary-container">OFF</p>
          </div>
        </div>
      </div>

      {/* Product — fixed container */}
      <div className="z-10 flex flex-1 items-center justify-center" style={lockLayout ? { minHeight: '500px' } : undefined}>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          style={{ height: `${productSize}px`, transform: 'rotate(-8deg)' }}
        />
      </div>

      {/* Bottom bar */}
      <div className="z-10 mb-[80px] text-center">
        <p className="text-[48px] font-bold tracking-[8px] text-white">{subtitle}</p>
        <p className="mt-[16px] text-[28px] font-light text-white/40">fivefood.com.ar</p>
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
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BoldDiscountPreview,
}
