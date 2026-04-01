import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function FramedDealPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '3x2'
  const headline = data.headline || 'OFERTA EXCLUSIVA'
  const subtitle = data.subtitle || 'Solo en fivefood.com.ar'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,180,216,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Outer frame */}
      <div
        className="absolute z-10"
        style={{
          top: '120px',
          left: '80px',
          right: '80px',
          bottom: '120px',
          border: '2px solid rgba(0,180,216,0.5)',
        }}
      />

      {/* Inner frame (8px gap) */}
      <div
        className="absolute z-10"
        style={{
          top: '130px',
          left: '90px',
          right: '90px',
          bottom: '130px',
          border: '2px solid rgba(0,180,216,0.3)',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-20 mt-[60px] w-[140px] opacity-20" />

      {/* Headline at top of frame */}
      <div className="z-20 mt-[100px] flex flex-col items-center">
        <p
          className="text-[30px] font-medium tracking-[10px]"
          style={{ color: 'rgba(144,224,239,0.5)' }}
        >
          {headline}
        </p>
      </div>

      {/* Discount */}
      <div className="z-20 mt-[80px] flex flex-col items-center">
        <p
          className="text-[160px] font-black leading-none"
          style={{ color: '#00b4d8' }}
        >
          {discount}
        </p>
      </div>

      {/* Product centered in frame */}
      <div
        className="z-20 mt-[40px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,180,216,0.15)) drop-shadow(0 30px 80px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Subtitle at bottom */}
      <div className="z-20 mb-[80px] flex flex-col items-center gap-[16px]">
        <div style={{ width: '60px', height: '1px', background: 'rgba(0,180,216,0.3)' }} />
        <p
          className="text-[28px] font-light tracking-[4px]"
          style={{ color: 'rgba(144,224,239,0.35)' }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export const FramedDealConfig: TemplateConfig = {
  id: 'promo-framed-deal',
  name: 'Framed Deal',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '3x2' },
    { key: 'headline', label: 'Titular', type: 'text', default: 'OFERTA EXCLUSIVA' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Solo en fivefood.com.ar' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FramedDealPreview,
}
