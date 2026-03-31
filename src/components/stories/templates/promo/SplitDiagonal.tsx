import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SplitDiagonalPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '10'
  const label = data.label || 'DESCUENTO'
  const code = data.code || 'Usá el código: SNACK10'
  const productSize = Number(data.productSize) || 500

  return (
    <div className="relative flex h-full w-full flex-col font-headline" style={{ background: '#03045e' }}>
      <div
        className="flex w-full flex-col items-center justify-center"
        style={{
          height: '55%',
          background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        }}
      >
        <p className="text-[28px] font-light tracking-[12px] text-white/50 uppercase">
          FIVE FOODS
        </p>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="mt-8 w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
          style={{ height: `${productSize}px`, transform: 'rotate(3deg)' }}
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-[80px] text-center">
        <p className="text-[160px] font-black leading-none text-primary">
          {discount}%
        </p>
        <p className="mt-2 text-[56px] font-bold tracking-[16px] text-primary-container">
          {label}
        </p>
        <p className="mt-6 text-[30px] text-white/40">{code}</p>
        <div className="mt-8 rounded-full bg-primary px-[64px] py-[20px]">
          <p className="text-[32px] font-bold text-white">SHOP NOW</p>
        </div>
      </div>
    </div>
  )
}

export const SplitDiagonalConfig: TemplateConfig = {
  id: 'promo-split-diagonal',
  name: 'Split Diagonal',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento %', type: 'number', default: 10 },
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'DESCUENTO' },
    { key: 'code', label: 'Código', type: 'text', default: 'Usá el código: SNACK10' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
  ],
  component: SplitDiagonalPreview,
}
