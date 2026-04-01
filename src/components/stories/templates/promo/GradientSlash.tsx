import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GradientSlashPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = (data.discount as string) || '30% OFF'
  const subtitle = (data.subtitle as string) || 'Promo exclusiva'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Thick diagonal gradient slash — top-right to bottom-left */}
      <div
        className="absolute"
        style={{
          width: '40px',
          height: '3000px',
          background: 'linear-gradient(180deg, #00b4d8, #0077b6, #03045e)',
          top: '-400px',
          left: '50%',
          transform: 'translate(-50%) rotate(35deg)',
          transformOrigin: 'center center',
          borderRadius: '20px',
        }}
      />

      {/* Secondary thinner slash — parallel */}
      <div
        className="absolute"
        style={{
          width: '6px',
          height: '3000px',
          background: 'linear-gradient(180deg, rgba(0,180,216,0.4), rgba(0,119,182,0.2), transparent)',
          top: '-400px',
          left: 'calc(50% + 60px)',
          transform: 'translate(-50%) rotate(35deg)',
          transformOrigin: 'center center',
          borderRadius: '3px',
        }}
      />

      {/* Tertiary accent line */}
      <div
        className="absolute"
        style={{
          width: '3px',
          height: '3000px',
          background: 'linear-gradient(180deg, rgba(144,224,239,0.2), transparent)',
          top: '-400px',
          left: 'calc(50% - 50px)',
          transform: 'translate(-50%) rotate(35deg)',
          transformOrigin: 'center center',
        }}
      />

      {/* Logo top-left */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-[80px] z-10 w-[160px] opacity-20"
      />

      {/* Product — left side of slash */}
      <div
        className="absolute left-0 top-0 z-10 flex h-full items-center justify-center"
        style={{ width: '55%', ...(lockLayout ? { minHeight: '600px' } : {}) }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize * 0.85}px`,
            filter:
              'drop-shadow(0 30px 70px rgba(0,0,0,0.4)) drop-shadow(0 0 60px rgba(0,180,216,0.1))',
          }}
        />
      </div>

      {/* Discount text — right side of slash */}
      <div
        className="absolute right-0 top-0 z-10 flex h-full flex-col items-center justify-center"
        style={{ width: '45%' }}
      >
        <p
          className="text-center text-[120px] font-black leading-[0.85]"
          style={{
            color: '#ffffff',
            textShadow: '0 0 60px rgba(0,180,216,0.2)',
          }}
        >
          {discount}
        </p>

        {/* Thin line */}
        <div
          className="my-[24px]"
          style={{
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,180,216,0.5), transparent)',
          }}
        />

        <p
          className="text-center text-[30px] tracking-[6px] uppercase"
          style={{ color: 'rgba(144,224,239,0.5)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Handle bottom center */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2 text-[26px] tracking-[3px]"
        style={{ color: 'rgba(0,180,216,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const GradientSlashConfig: TemplateConfig = {
  id: 'promo-gradient-slash',
  name: 'Gradient Slash',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '30% OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Promo exclusiva' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GradientSlashPreview,
}
