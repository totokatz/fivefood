import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SunriseSplitPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 540
  const lockLayout = !!data.lockLayout
  const topText = (data.topText as string) || 'NUEVO DÍA'
  const bottomText = (data.bottomText as string) || 'Misma energía'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-headline">
      {/* Top half — warm gradient */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: '960px',
          background: 'linear-gradient(180deg, #f4a261 0%, #e9c46a 30%, #90e0ef 70%, #00b4d8 100%)',
        }}
      >
        {/* Logo */}
        <img
          src={logoBlue}
          alt="FiveFoods"
          className="absolute top-[70px] w-[160px] opacity-25"
        />

        {/* Top text */}
        <p
          className="absolute top-[260px] text-center text-[72px] font-bold tracking-[12px] uppercase"
          style={{ color: 'rgba(3,4,94,0.8)' }}
        >
          {topText}
        </p>
      </div>

      {/* Bottom half — white */}
      <div
        className="relative flex flex-1 items-center justify-center"
        style={{ background: '#ffffff' }}
      />

      {/* Wavy SVG divider */}
      <div className="absolute left-0 w-full" style={{ top: '880px' }}>
        <svg
          viewBox="0 0 1080 200"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '200px', display: 'block' }}
        >
          <path
            d="M0,100 C180,180 360,20 540,100 C720,180 900,20 1080,100 L1080,200 L0,200 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Product at the wave intersection */}
      <div
        className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center justify-center"
        style={{
          top: '660px',
          ...(lockLayout ? { minHeight: '600px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-[160px] left-0 z-10 w-full text-center">
        <p
          className="text-[44px] font-light tracking-[10px] uppercase"
          style={{ color: '#03045e' }}
        >
          {bottomText}
        </p>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] left-1/2 z-10 -translate-x-1/2 text-[24px] tracking-[4px]"
        style={{ color: 'rgba(0,119,182,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const SunriseSplitConfig: TemplateConfig = {
  id: 'lifestyle-sunrise-split',
  name: 'Sunrise Split',
  category: 'lifestyle',
  fields: [
    { key: 'topText', label: 'Texto superior', type: 'text', default: 'NUEVO DÍA' },
    { key: 'bottomText', label: 'Texto inferior', type: 'text', default: 'Misma energía' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SunriseSplitPreview,
}
