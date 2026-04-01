import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CenterPillPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '2x1'
  const subtitle = data.subtitle || 'En snacks seleccionados'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Geometric grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large soft cyan circle glow behind product */}
      <div
        className="absolute"
        style={{
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(144,224,239,0.35) 0%, rgba(202,240,248,0.15) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />

      {/* Top bar — logo + wordmark */}
      <div className="z-10 flex w-full items-center justify-between px-[80px] pt-[80px]">
        <img src={logo} alt="FiveFoods" className="w-[180px]" style={{ opacity: 0.6, filter: 'brightness(0) saturate(100%)' }} />
        <p className="text-[24px] font-medium tracking-[6px]" style={{ color: '#0077b6', opacity: 0.4 }}>
          FIVEFOODS
        </p>
      </div>

      {/* Frosted arch frame with discount inside */}
      <div className="z-10 mt-[140px] flex flex-col items-center">
        <div
          className="flex flex-col items-center px-[120px] py-[48px]"
          style={{
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(40px)',
            borderRadius: '200px',
            border: '1px solid rgba(0,119,182,0.1)',
            boxShadow: '0 20px 80px rgba(0,180,216,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <p className="text-[28px] font-semibold uppercase tracking-[12px]" style={{ color: '#0077b6' }}>
            Promo
          </p>
          <p
            className="mt-[8px] text-[160px] font-black leading-none"
            style={{ color: '#03045e' }}
          >
            {discount}
          </p>
        </div>
      </div>

      {/* Product — large, centered, floating */}
      <div
        className="z-10 mt-[-40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 40px 80px rgba(3,4,94,0.15)) drop-shadow(0 10px 30px rgba(0,180,216,0.1))',
          }}
        />
      </div>

      {/* Bottom text block */}
      <div className="z-10 mt-auto mb-[100px] flex flex-col items-center gap-[16px]">
        <p className="text-[36px] font-medium tracking-[2px]" style={{ color: '#03045e', opacity: 0.6 }}>
          {subtitle}
        </p>
        <div
          className="mt-[8px] rounded-full px-[56px] py-[18px]"
          style={{ background: '#00b4d8' }}
        >
          <p className="text-[28px] font-bold tracking-[4px] text-white">fivefood.com.ar</p>
        </div>
      </div>
    </div>
  )
}

export const CenterPillConfig: TemplateConfig = {
  id: 'promo-center-pill',
  name: 'Center Pill',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '2x1' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'En snacks seleccionados' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CenterPillPreview,
}
