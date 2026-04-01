import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function StampBadgePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = (data.discount as string) || '2x1'
  const badgeText = (data.badgeText as string) || 'OFERTA VERIFICADA'
  const subtitle = (data.subtitle as string) || 'Por tiempo limitado'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute"
        style={{
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,182,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo top */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 w-[160px] -translate-x-1/2 opacity-20"
      />

      {/* Product — large behind the stamp */}
      <div
        className="z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 70px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Circular stamp/seal overlay */}
      <div
        className="absolute z-20 flex flex-col items-center justify-center"
        style={{
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          border: '4px dashed rgba(0,180,216,0.7)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-8deg)',
          background: 'rgba(0,29,37,0.75)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            border: '2px solid rgba(0,180,216,0.3)',
          }}
        />

        {/* Badge text — top arc label */}
        <p
          className="text-center text-[24px] font-bold tracking-[8px] uppercase"
          style={{ color: 'rgba(144,224,239,0.7)' }}
        >
          {badgeText}
        </p>

        {/* Discount — massive centered */}
        <p
          className="my-[10px] text-center text-[140px] font-black leading-[0.9]"
          style={{
            color: '#ffffff',
            textShadow: '0 0 40px rgba(0,180,216,0.3)',
          }}
        >
          {discount}
        </p>

        {/* Thin line */}
        <div
          style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.5), transparent)',
          }}
        />

        {/* Subtitle */}
        <p
          className="mt-[14px] text-center text-[26px] tracking-[4px]"
          style={{ color: 'rgba(144,224,239,0.5)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Handle bottom */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-[26px] tracking-[3px]"
        style={{ color: 'rgba(0,180,216,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const StampBadgeConfig: TemplateConfig = {
  id: 'promo-stamp-badge',
  name: 'Stamp Badge',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '2x1' },
    { key: 'badgeText', label: 'Texto badge', type: 'text', default: 'OFERTA VERIFICADA' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Por tiempo limitado' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: StampBadgePreview,
}
