import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function NeonAccentPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const headline = data.headline || 'OFERTA ESPECIAL'
  const discount = data.discount || '30% OFF'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Large gradient orb — soft, diffused */}
      <div
        className="absolute"
        style={{
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.25) 0%, rgba(0,119,182,0.12) 35%, rgba(3,4,94,0.06) 60%, transparent 80%)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary smaller orb — offset for depth */}
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(144,224,239,0.12) 0%, transparent 70%)',
          top: '55%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo — very subtle */}
      <img
        src={logo}
        alt="FiveFoods"
        className="z-10 mt-[80px] w-[180px] opacity-15"
      />

      {/* Headline — tight, uppercase, spaced */}
      <div className="z-10 mt-[100px] flex flex-col items-center">
        <p
          className="text-[26px] font-medium tracking-[16px] uppercase"
          style={{ color: 'rgba(144,224,239,0.5)' }}
        >
          {headline}
        </p>

        {/* Discount — massive condensed */}
        <p
          className="mt-[16px] text-[180px] font-black leading-[0.85]"
          style={{
            color: '#ffffff',
            textShadow: '0 0 80px rgba(0,180,216,0.3)',
          }}
        >
          {discount}
        </p>

        {/* Thin accent line */}
        <div
          className="mt-[32px]"
          style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00b4d8, transparent)',
          }}
        />
      </div>

      {/* Product — large, floating, centered */}
      <div
        className="z-10 mt-[40px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 100px rgba(0,180,216,0.12))',
          }}
        />
      </div>

      {/* Bottom — minimal */}
      <div className="z-10 mb-[80px] flex flex-col items-center gap-[12px]">
        <div
          className="rounded-full px-[48px] py-[14px]"
          style={{ border: '1px solid rgba(0,180,216,0.25)' }}
        >
          <p className="text-[26px] font-medium tracking-[6px]" style={{ color: 'rgba(0,180,216,0.7)' }}>
            fivefood.com.ar
          </p>
        </div>
      </div>
    </div>
  )
}

export const NeonAccentConfig: TemplateConfig = {
  id: 'promo-neon-accent',
  name: 'Neon Accent',
  category: 'promociones',
  fields: [
    { key: 'headline', label: 'Encabezado', type: 'text', default: 'OFERTA ESPECIAL' },
    { key: 'discount', label: 'Descuento', type: 'text', default: '30% OFF' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: NeonAccentPreview,
}
