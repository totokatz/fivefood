import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldStripePromoPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '20% OFF'
  const headline = data.headline || 'APROVECHÁ'
  const productSize = Number(data.productSize) || 700
  const lockLayout = !!data.lockLayout

  const stripes = [
    { color: '#00b4d8', top: 640 },
    { color: '#03045e', top: 780 },
    { color: '#0077b6', top: 920 },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-30 mt-[70px] w-[160px] opacity-20" />

      {/* Headline */}
      <p
        className="z-30 mt-[60px] text-[38px] font-bold tracking-[12px]"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        {headline}
      </p>

      {/* Bold stripes across middle */}
      {stripes.map((s, i) => (
        <div
          key={i}
          className="absolute left-0 w-full"
          style={{
            top: `${s.top}px`,
            height: '120px',
            background: s.color,
            opacity: i === 1 ? 1 : 0.85,
          }}
        />
      ))}

      {/* Discount text between stripes */}
      <div
        className="absolute left-0 z-20 flex w-full items-center justify-center"
        style={{ top: '780px', height: '120px' }}
      >
        <p
          className="text-[90px] font-black tracking-[6px]"
          style={{ color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          {discount}
        </p>
      </div>

      {/* Product overlapping stripes */}
      <div
        className="absolute z-20 flex items-center justify-center"
        style={{
          top: '480px',
          left: '50%',
          transform: 'translateX(-50%)',
          ...(lockLayout ? { minHeight: '500px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Handle at bottom */}
      <p
        className="absolute bottom-[60px] z-30 text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(144,224,239,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const BoldStripePromoConfig: TemplateConfig = {
  id: 'promo-bold-stripe',
  name: 'Bold Stripe Promo',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '20% OFF' },
    { key: 'headline', label: 'Titular', type: 'text', default: 'APROVECHÁ' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BoldStripePromoPreview,
}
