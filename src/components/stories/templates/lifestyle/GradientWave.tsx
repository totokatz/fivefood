import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GradientWavePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const tagline = (data.tagline as string) || 'Fluí con lo natural'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #00b4d8 0%, #0077b6 40%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[70px] w-[180px] opacity-40"
        style={{ zIndex: 10 }}
      />

      {/* Product floating above waves */}
      <div
        className="relative z-10 mt-[280px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.35))',
            transform: 'rotate(-2deg)',
          }}
        />
      </div>

      {/* Wave layer 1 — back */}
      <div
        className="absolute w-[1400px]"
        style={{
          bottom: '320px',
          left: '-160px',
          height: '400px',
          background: 'rgba(144,224,239,0.15)',
          borderRadius: '50% 50% 0 0',
        }}
      />

      {/* Wave layer 2 — mid */}
      <div
        className="absolute w-[1300px]"
        style={{
          bottom: '220px',
          left: '-110px',
          height: '380px',
          background: 'rgba(0,180,216,0.2)',
          borderRadius: '45% 55% 0 0',
        }}
      />

      {/* Wave layer 3 — front */}
      <div
        className="absolute w-[1400px]"
        style={{
          bottom: '100px',
          left: '-160px',
          height: '360px',
          background: 'rgba(0,119,182,0.25)',
          borderRadius: '55% 45% 0 0',
        }}
      />

      {/* Wave layer 4 — base */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: '280px',
          background: 'linear-gradient(180deg, rgba(3,4,94,0.6) 0%, #03045e 100%)',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        }}
      />

      {/* Tagline */}
      <div className="absolute bottom-[120px] z-10 text-center">
        <p className="text-[42px] font-light tracking-[10px] text-white/90 uppercase">
          {tagline}
        </p>
        <p className="mt-[16px] text-[26px] tracking-[4px] text-white/40">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const GradientWaveConfig: TemplateConfig = {
  id: 'lifestyle-gradient-wave',
  name: 'Gradient Wave',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Fluí con lo natural' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GradientWavePreview,
}
