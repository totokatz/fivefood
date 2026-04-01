import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CircleFramePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
  const tagline = data.tagline || 'Snack con propósito'
  const productSize = Number(data.productSize) || 500
  const productGap = data.productGap != null ? Number(data.productGap) : 70
  const lockLayout = !!data.lockLayout

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-[80px] font-headline">
      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[80px] w-[200px] opacity-50"
      />

      {/* Circle + products */}
      <div
        className="relative flex items-center justify-center"
        style={lockLayout ? { minHeight: '760px', minWidth: '760px' } : undefined}
      >
        {/* Circle border */}
        <div
          className="absolute rounded-full border-[2px] border-primary/40"
          style={{ width: '700px', height: '700px' }}
        />

        {/* Secondary product — offset left, behind */}
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="absolute w-auto object-contain"
          style={{
            height: `${productSize * 0.7}px`,
            transform: `translateX(${productGap}px) translateY(30px) rotate(6deg)`,
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.08))',
            opacity: 0.85,
          }}
        />

        {/* Primary product — centered, in front */}
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="relative w-auto object-contain"
          style={{
            height: `${productSize * 0.85}px`,
            transform: `translateX(-${Math.round(productGap * 0.57)}px) rotate(-4deg)`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
          }}
        />
      </div>

      {/* Text below circle */}
      <div className="mt-[60px] text-center">
        <p className="text-[38px] font-light tracking-[8px] text-tertiary uppercase">{tagline}</p>
        <p className="mt-4 text-[28px] text-secondary/50">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const CircleFrameConfig: TemplateConfig = {
  id: 'lifestyle-circle-frame',
  name: 'Circle Frame',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Snack con propósito' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CircleFramePreview,
}
