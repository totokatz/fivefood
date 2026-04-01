import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DotPatternPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'TU MOMENTO'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{
        background: 'white',
        backgroundImage:
          'radial-gradient(circle, #90e0ef 8px, transparent 8px)',
        backgroundSize: '60px 60px',
      }}
    >
      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[70px] w-[170px] opacity-30"
        style={{ zIndex: 10 }}
      />

      {/* Product — large, centered, breaking pattern */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '700px' } : undefined}
      >
        {/* White glow behind product to break the dots */}
        <div
          className="absolute"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, transparent 70%)',
          }}
        />
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="relative w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.12))',
          }}
        />
      </div>

      {/* Bottom text — left aligned, editorial */}
      <div
        className="absolute bottom-[100px] left-[80px] z-10"
      >
        <p
          className="text-[90px] font-black leading-[1] tracking-[6px]"
          style={{ color: '#03045e' }}
        >
          {headline}
        </p>
        <div
          className="mt-[16px]"
          style={{ width: '80px', height: '4px', background: '#00b4d8', borderRadius: '2px' }}
        />
        <p
          className="mt-[16px] text-[26px] tracking-[4px]"
          style={{ color: 'rgba(0,119,182,0.5)' }}
        >
          @fivefood.ok
        </p>
      </div>
    </div>
  )
}

export const DotPatternConfig: TemplateConfig = {
  id: 'lifestyle-dot-pattern',
  name: 'Dot Pattern',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'TU MOMENTO' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DotPatternPreview,
}
