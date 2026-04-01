import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function TicketCouponPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = (data.discount as string) || '25% OFF'
  const code = (data.code as string) || 'FIVE25'
  const subtitle = (data.subtitle as string) || 'Canjeá tu descuento'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f0f4f6' }}
    >
      {/* Ticket container */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: '940px',
          height: '1720px',
          borderRadius: '40px',
          border: '3px dashed #0077b6',
          background: '#ffffff',
        }}
      >
        {/* Top half — product area */}
        <div
          className="flex flex-1 flex-col items-center justify-center"
          style={{ background: '#f8fdff' }}
        >
          {/* Logo */}
          <img
            src={logoBlue}
            alt="FiveFoods"
            className="mb-[40px] w-[140px] opacity-25"
          />

          {/* Product */}
          <div
            className="flex items-center justify-center"
            style={lockLayout ? { minHeight: '500px' } : undefined}
          >
            <img
              src={products[product as keyof typeof products]}
              alt={product}
              className="w-auto object-contain"
              style={{
                height: `${productSize * 0.7}px`,
                filter: 'drop-shadow(0 20px 50px rgba(0,29,37,0.15))',
              }}
            />
          </div>
        </div>

        {/* Perforated line — tear-off */}
        <div className="relative flex items-center" style={{ height: '40px' }}>
          {/* Left semicircle cutout */}
          <div
            className="absolute"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f0f4f6',
              left: '-22px',
              top: '0px',
            }}
          />
          {/* Dashed line */}
          <div
            className="mx-[30px] flex-1"
            style={{
              height: '2px',
              backgroundImage:
                'repeating-linear-gradient(90deg, #0077b6 0px, #0077b6 12px, transparent 12px, transparent 24px)',
            }}
          />
          {/* Right semicircle cutout */}
          <div
            className="absolute"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f0f4f6',
              right: '-22px',
              top: '0px',
            }}
          />
        </div>

        {/* Bottom half — coupon info */}
        <div className="flex flex-1 flex-col items-center justify-center gap-[24px]">
          {/* Discount — hero */}
          <p
            className="text-center text-[120px] font-black leading-[0.9]"
            style={{ color: '#03045e' }}
          >
            {discount}
          </p>

          {/* Code in pill */}
          <div
            className="rounded-full px-[60px] py-[16px]"
            style={{
              border: '2px solid #00b4d8',
              background: 'rgba(0,180,216,0.06)',
            }}
          >
            <p
              className="text-center text-[40px] font-bold tracking-[10px]"
              style={{ color: '#00b4d8' }}
            >
              {code}
            </p>
          </div>

          {/* Subtitle */}
          <p
            className="mt-[10px] text-center text-[30px] tracking-[4px]"
            style={{ color: '#40484c' }}
          >
            {subtitle}
          </p>

          {/* Website */}
          <p
            className="text-[24px] tracking-[3px]"
            style={{ color: 'rgba(0,119,182,0.4)' }}
          >
            fivefood.com.ar
          </p>
        </div>
      </div>
    </div>
  )
}

export const TicketCouponConfig: TemplateConfig = {
  id: 'promo-ticket-coupon',
  name: 'Ticket Coupon',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '25% OFF' },
    { key: 'code', label: 'Código', type: 'text', default: 'FIVE25' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Canjeá tu descuento' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: TicketCouponPreview,
}
