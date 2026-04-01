import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function FlashSalePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const discount = (data.discount as string) || '50% OFF'
  const headline = (data.headline as string) || 'FLASH SALE'
  const timer = (data.timer as string) || 'SOLO HOY'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#00b4d8' }}
    >
      {/* Giant angled "FLASH" text — background decoration */}
      <p
        className="absolute z-0 whitespace-nowrap text-[320px] font-black uppercase"
        style={{
          color: 'rgba(255,255,255,0.08)',
          top: '200px',
          left: '50%',
          transform: 'translate(-50%, 0) rotate(-12deg)',
          letterSpacing: '20px',
        }}
      >
        FLASH
      </p>

      {/* Secondary angled text */}
      <p
        className="absolute z-0 whitespace-nowrap text-[200px] font-black uppercase"
        style={{
          color: 'rgba(255,255,255,0.05)',
          bottom: '300px',
          left: '50%',
          transform: 'translate(-50%, 0) rotate(-12deg)',
          letterSpacing: '15px',
        }}
      >
        SALE
      </p>

      {/* Logo top */}
      <img
        src={logo}
        alt="FiveFoods"
        className="z-10 mt-[80px] w-[160px] opacity-40"
      />

      {/* Headline */}
      <p
        className="z-10 mt-[80px] text-center text-[64px] font-black tracking-[12px] uppercase"
        style={{
          color: '#ffffff',
          textShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {headline}
      </p>

      {/* Discount — massive */}
      <p
        className="z-10 mt-[20px] text-center text-[160px] font-black leading-[0.9]"
        style={{
          color: '#ffffff',
          textShadow: '0 6px 30px rgba(0,0,0,0.2)',
        }}
      >
        {discount}
      </p>

      {/* Product with motion-blur-like shadow trail */}
      <div
        className="z-10 mt-[20px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <div className="relative">
          {/* Shadow trail copies */}
          <img
            src={products[product as keyof typeof products]}
            alt=""
            className="absolute w-auto object-contain opacity-[0.08]"
            style={{
              height: `${productSize}px`,
              transform: 'translateX(-40px)',
            }}
          />
          <img
            src={products[product as keyof typeof products]}
            alt=""
            className="absolute w-auto object-contain opacity-[0.15]"
            style={{
              height: `${productSize}px`,
              transform: 'translateX(-20px)',
            }}
          />
          {/* Main product */}
          <img
            src={products[product as keyof typeof products]}
            alt={product}
            className="relative w-auto object-contain"
            style={{
              height: `${productSize}px`,
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.25))',
            }}
          />
        </div>
      </div>

      {/* Timer-style dots at bottom */}
      <div className="z-10 mb-[40px] flex flex-col items-center gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <div
            className="rounded-full"
            style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.6)' }}
          />
          <div
            className="rounded-full"
            style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.6)' }}
          />
          <div
            className="rounded-full"
            style={{ width: '12px', height: '12px', background: '#ffffff' }}
          />
          <div
            className="rounded-full"
            style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.6)' }}
          />
          <div
            className="rounded-full"
            style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
        <p
          className="text-[32px] font-bold tracking-[8px] uppercase"
          style={{ color: '#ffffff' }}
        >
          {timer}
        </p>
        <p
          className="mb-[30px] text-[24px] tracking-[3px]"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const FlashSaleConfig: TemplateConfig = {
  id: 'promo-flash-sale',
  name: 'Flash Sale',
  category: 'promociones',
  fields: [
    { key: 'discount', label: 'Descuento', type: 'text', default: '50% OFF' },
    { key: 'headline', label: 'Encabezado', type: 'text', default: 'FLASH SALE' },
    { key: 'timer', label: 'Timer', type: 'text', default: 'SOLO HOY' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FlashSalePreview,
}
