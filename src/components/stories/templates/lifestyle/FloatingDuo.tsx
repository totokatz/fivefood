import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function FloatingDuoPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
  const tagline = data.tagline || 'ELEVÁ TU SNACK'
  const productSize = Number(data.productSize) || 500
  const productGap = data.productGap != null ? Number(data.productGap) : 80
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden px-[80px] py-[100px] font-headline"
      style={{ background: 'linear-gradient(180deg, #90e0ef 0%, #f8fdff 60%, #ffffff 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="w-[220px] opacity-40" />

      {/* Tagline */}
      <p className="text-[38px] font-light tracking-[14px] text-tertiary/70 uppercase">
        {tagline}
      </p>

      {/* Floating products */}
      <div
        className="relative flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px', minWidth: '500px' } : undefined}
      >
        {/* Secondary product — rotated left, offset */}
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="absolute w-auto object-contain"
          style={{
            height: `${productSize * 0.8}px`,
            transform: `rotate(8deg) translateX(${productGap}px) translateY(20px)`,
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.12))',
          }}
        />
        {/* Primary product — rotated right, in front */}
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="relative w-auto object-contain"
          style={{
            height: `${productSize}px`,
            transform: `rotate(-6deg) translateX(-${Math.round(productGap / 2)}px)`,
            filter: 'drop-shadow(0 50px 80px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* Handle */}
      <p className="text-[28px] text-tertiary/30">@fivefood.ok</p>
    </div>
  )
}

export const FloatingDuoConfig: TemplateConfig = {
  id: 'lifestyle-floating-duo',
  name: 'Floating Duo',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'ELEVÁ TU SNACK' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FloatingDuoPreview,
}
