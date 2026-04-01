import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CircleSalePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '50%'
  const label = data.label || 'DESCUENTO'
  const subtitle = data.subtitle || 'En toda la tienda'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#ffffff' }}
    >
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="z-20 mt-[70px] w-[160px] opacity-30" />

      {/* Large cyan circle */}
      <div
        className="absolute z-10 flex flex-col items-center justify-center"
        style={{
          top: '320px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
          boxShadow: '0 40px 120px rgba(0,180,216,0.3)',
        }}
      >
        {/* Label */}
        <p
          className="text-[32px] font-medium tracking-[10px]"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {label}
        </p>
        {/* Discount huge inside circle */}
        <p
          className="-mt-[10px] text-[220px] font-black leading-none"
          style={{ color: '#ffffff' }}
        >
          {discount}
        </p>
      </div>

      {/* Product half-in, half-out of circle bottom */}
      <div
        className="absolute z-20 flex items-end justify-center"
        style={{
          top: '880px',
          left: '50%',
          transform: 'translateX(-50%)',
          ...(lockLayout ? { minHeight: '400px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* Subtitle */}
      <p
        className="absolute z-20 text-[36px] font-medium"
        style={{ bottom: '200px', color: '#03045e' }}
      >
        {subtitle}
      </p>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] z-20 text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.25)' }}
      >
        fivefood.com.ar
      </p>
    </div>
  )
}

export const CircleSaleConfig: TemplateConfig = {
  id: 'promo-circle-sale',
  name: 'Circle Sale',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '50%' },
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'DESCUENTO' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En toda la tienda' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CircleSalePreview,
}
