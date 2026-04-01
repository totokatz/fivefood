import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MinimalPromoCodePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const code = data.code || 'FIVE20'
  const discount = data.discount || '20% OFF'
  const instruction = data.instruction || 'Usá este código en fivefood.com.ar'
  const productSize = Number(data.productSize) || 350
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="flex h-full w-full flex-col items-center font-headline"
      style={{ background: '#ffffff' }}
    >
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="mt-[80px] w-[160px] opacity-30" />

      {/* Discount label */}
      <p
        className="mt-[160px] text-[42px] font-bold tracking-[6px]"
        style={{ color: '#03045e' }}
      >
        {discount}
      </p>

      {/* Subtle instruction */}
      <p
        className="mt-[30px] text-[28px] font-light"
        style={{ color: '#6b7280' }}
      >
        Usá este código
      </p>

      {/* Promo code box — dashed border, hero element */}
      <div
        className="mt-[50px] flex items-center justify-center px-[80px] py-[50px]"
        style={{
          border: '3px dashed #00b4d8',
          borderRadius: '20px',
          minWidth: '600px',
        }}
      >
        <p
          className="text-[96px] font-black tracking-[12px]"
          style={{ color: '#03045e' }}
        >
          {code}
        </p>
      </div>

      {/* Instruction */}
      <p
        className="mt-[40px] max-w-[700px] text-center text-[28px] font-light leading-[1.5]"
        style={{ color: '#6b7280' }}
      >
        {instruction}
      </p>

      {/* Product small below */}
      <div
        className="mt-auto mb-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '300px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="mb-[60px] text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.2)' }}
      >
        fivefood.com.ar
      </p>
    </div>
  )
}

export const MinimalPromoCodeConfig: TemplateConfig = {
  id: 'promo-minimal-code',
  name: 'Minimal Promo Code',
  category: 'promociones',
  fields: [
    { key: 'code', label: 'Código', type: 'text', default: 'FIVE20' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '20% OFF' },
    { key: 'instruction', label: 'Instrucción', type: 'text', default: 'Usá este código en fivefood.com.ar' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MinimalPromoCodePreview,
}
