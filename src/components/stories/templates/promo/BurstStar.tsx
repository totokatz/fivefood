import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BurstStarPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = data.discount || '40% OFF'
  const subtitle = data.subtitle || 'No te lo pierdas'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Sunburst rays via conic-gradient */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -65%)',
          width: '1400px',
          height: '1400px',
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(0,180,216,0.25) 5deg, transparent 10deg, transparent 20deg, rgba(0,180,216,0.25) 25deg, transparent 30deg, transparent 40deg, rgba(0,180,216,0.25) 45deg, transparent 50deg, transparent 60deg, rgba(0,180,216,0.25) 65deg, transparent 70deg, transparent 80deg, rgba(0,180,216,0.25) 85deg, transparent 90deg, transparent 100deg, rgba(0,180,216,0.25) 105deg, transparent 110deg, transparent 120deg, rgba(0,180,216,0.25) 125deg, transparent 130deg, transparent 140deg, rgba(0,180,216,0.25) 145deg, transparent 150deg, transparent 160deg, rgba(0,180,216,0.25) 165deg, transparent 170deg, transparent 180deg, rgba(0,180,216,0.25) 185deg, transparent 190deg, transparent 200deg, rgba(0,180,216,0.25) 205deg, transparent 210deg, transparent 220deg, rgba(0,180,216,0.25) 225deg, transparent 230deg, transparent 240deg, rgba(0,180,216,0.25) 245deg, transparent 250deg, transparent 260deg, rgba(0,180,216,0.25) 265deg, transparent 270deg, transparent 280deg, rgba(0,180,216,0.25) 285deg, transparent 290deg, transparent 300deg, rgba(0,180,216,0.25) 305deg, transparent 310deg, transparent 320deg, rgba(0,180,216,0.25) 325deg, transparent 330deg, transparent 340deg, rgba(0,180,216,0.25) 345deg, transparent 350deg, transparent 360deg)',
          borderRadius: '50%',
        }}
      />

      {/* Glowing center */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -65%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[160px] opacity-20" />

      {/* Discount text — center of burst */}
      <div className="z-10 mt-[200px] flex flex-col items-center">
        <p
          className="text-center text-[180px] font-black leading-[0.9]"
          style={{ color: '#ffffff', textShadow: '0 0 80px rgba(0,180,216,0.4)' }}
        >
          {discount}
        </p>
        <p
          className="mt-[30px] text-center text-[40px] font-medium tracking-[6px] uppercase"
          style={{ color: '#90e0ef' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Product */}
      <div
        className="z-10 mt-auto mb-[60px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[60px] text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(144,224,239,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const BurstStarConfig: TemplateConfig = {
  id: 'promo-burst-star',
  name: 'Burst Star',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '40% OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'No te lo pierdas' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BurstStarPreview,
}
