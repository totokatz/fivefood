import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function NeonGlowPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const headline = (data.headline as string) || 'GLOW UP'
  const subtitle = (data.subtitle as string) || 'Brillá por dentro'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Neon glow circle behind product */}
      <div
        className="absolute"
        style={{
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,180,216,0.18) 0%, rgba(0,180,216,0.08) 30%, rgba(0,119,182,0.04) 55%, transparent 75%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary subtle ring */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(0,180,216,0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo top */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 w-[160px] -translate-x-1/2 opacity-15"
      />

      {/* Headline */}
      <p
        className="z-10 text-center text-[80px] font-black tracking-[14px] uppercase"
        style={{
          color: '#ffffff',
          textShadow: '0 0 60px rgba(0,180,216,0.4), 0 0 120px rgba(0,180,216,0.15)',
        }}
      >
        {headline}
      </p>

      {/* Thin neon line */}
      <div
        className="z-10 my-[20px]"
        style={{
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.6), transparent)',
        }}
      />

      {/* Subtitle */}
      <p
        className="z-10 text-center text-[36px] font-light tracking-[8px]"
        style={{ color: 'rgba(144,224,239,0.6)' }}
      >
        {subtitle}
      </p>

      {/* Product — dramatically floating with strong glow */}
      <div
        className="z-10 mt-[60px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter:
              'drop-shadow(0 30px 80px rgba(0,0,0,0.5)) drop-shadow(0 0 120px rgba(0,180,216,0.2)) drop-shadow(0 0 60px rgba(0,180,216,0.15))',
          }}
        />
      </div>

      {/* Handle bottom */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-[26px] tracking-[4px]"
        style={{ color: 'rgba(0,180,216,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const NeonGlowConfig: TemplateConfig = {
  id: 'lifestyle-neon-glow',
  name: 'Neon Glow',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'GLOW UP' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Brillá por dentro' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: NeonGlowPreview,
}
