import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GlassCardPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const label = data.label || 'PROMO ESPECIAL'
  const discount = data.discount || '10% OFF'
  const subtitle = data.subtitle || 'En toda la web'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[100px] font-headline"
      style={{ background: 'linear-gradient(180deg, #caf0f8 0%, #90e0ef 100%)' }}
    >
      <img src={logoBlue} alt="FiveFoods" className="w-[260px] opacity-60" />
      <div
        className="w-[800px] rounded-[48px] border border-white/70 px-[60px] py-[72px] text-center"
        style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)' }}
      >
        <p className="text-[32px] font-semibold tracking-[8px] text-secondary">
          {label}
        </p>
        <p className="mt-4 text-[120px] font-black leading-none text-tertiary">
          {discount}
        </p>
        <p className="mt-4 text-[36px] text-secondary">{subtitle}</p>
      </div>
      {/* Product — fixed container */}
      <div className="flex items-center justify-center" style={lockLayout ? { minHeight: '420px' } : undefined}>
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          style={{ height: `${productSize}px` }}
        />
      </div>
      <div className="text-center">
        <p className="text-[36px] font-bold text-tertiary">COMPRÁ AHORA →</p>
        <p className="mt-1 text-[28px] text-secondary">fivefood.com.ar</p>
      </div>
    </div>
  )
}

export const GlassCardConfig: TemplateConfig = {
  id: 'promo-glass-card',
  name: 'Glass Card',
  category: 'promociones',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'PROMO ESPECIAL' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '10% OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En toda la web' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GlassCardPreview,
}
