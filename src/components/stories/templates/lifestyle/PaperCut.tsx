import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function PaperCutPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 520
  const lockLayout = !!data.lockLayout
  const tagline = (data.tagline as string) || 'Capas de sabor'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[70px] w-[160px] opacity-20"
        style={{ zIndex: 20 }}
      />

      {/* Layer 1 — back, large, light cyan */}
      <div
        className="absolute"
        style={{
          top: '250px',
          left: '-60px',
          width: '900px',
          height: '900px',
          borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
          background: '#e0f7fa',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}
      />

      {/* Layer 2 — mid, offset right, light blue */}
      <div
        className="absolute"
        style={{
          top: '380px',
          right: '-40px',
          width: '780px',
          height: '780px',
          borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%',
          background: '#b8e8f0',
          boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
        }}
      />

      {/* Layer 3 — front-mid, shifted left, light */}
      <div
        className="absolute"
        style={{
          top: '500px',
          left: '40px',
          width: '700px',
          height: '700px',
          borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%',
          background: '#90e0ef',
          boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
        }}
      />

      {/* Layer 4 — topmost, center, white */}
      <div
        className="absolute"
        style={{
          top: '560px',
          left: '160px',
          width: '640px',
          height: '640px',
          borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
          background: '#ffffff',
          boxShadow: '0 10px 40px rgba(0,0,0,0.07)',
        }}
      />

      {/* Product on topmost layer */}
      <div
        className="relative z-10 mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
          }}
        />
      </div>

      {/* Tagline */}
      <div className="relative z-10 mt-[40px] text-center">
        <p
          className="text-[52px] font-bold tracking-[6px] uppercase"
          style={{ color: '#03045e' }}
        >
          {tagline}
        </p>
        <div
          className="mx-auto mt-[16px]"
          style={{ width: '60px', height: '3px', background: '#00b4d8', borderRadius: '2px' }}
        />
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] z-10 text-[24px] tracking-[4px]"
        style={{ color: 'rgba(0,119,182,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const PaperCutConfig: TemplateConfig = {
  id: 'lifestyle-paper-cut',
  name: 'Paper Cut',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Capas de sabor' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: PaperCutPreview,
}
