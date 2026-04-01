import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DateRevealPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 400
  const lockLayout = !!data.lockLayout
  const month = String(data.month || 'ABRIL')
  const day = String(data.day || '15')
  const year = String(data.year || '2026')
  const productName = String(data.productName || 'NUEVO SABOR')

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #03045e 0%, #001d25 100%)' }}
    >
      {/* Decorative thin horizontal lines */}
      {[300, 520, 1100, 1320].map((top) => (
        <div
          key={top}
          className="absolute left-0 w-full"
          style={{ top: `${top}px`, height: '1px', background: 'rgba(0,180,216,0.08)' }}
        />
      ))}

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[150px] opacity-15" />

      {/* Product name badge */}
      <div
        className="z-10 mt-[60px] rounded-full px-[48px] py-[14px]"
        style={{ border: '1px solid rgba(0,180,216,0.2)', background: 'rgba(0,180,216,0.05)' }}
      >
        <p className="text-[26px] font-bold tracking-[8px]" style={{ color: '#00b4d8' }}>
          {productName}
        </p>
      </div>

      {/* Month */}
      <p
        className="z-10 mt-[60px] text-[52px] font-light tracking-[20px]"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        {month}
      </p>

      {/* Day — massive hero */}
      <p
        className="z-10 font-black leading-[0.8]"
        style={{
          fontSize: '420px',
          color: 'white',
          textShadow: '0 0 120px rgba(0,180,216,0.15)',
          letterSpacing: '-10px',
        }}
      >
        {day}
      </p>

      {/* Year */}
      <p
        className="z-10 text-[40px] font-light tracking-[16px]"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        {year}
      </p>

      {/* Thin decorative vertical line */}
      <div
        className="z-10 mt-[40px]"
        style={{ width: '1px', height: '80px', background: 'rgba(0,180,216,0.2)' }}
      />

      {/* Product */}
      <div
        className="z-10 mt-[20px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '350px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mt-auto mb-[50px] text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const DateRevealConfig: TemplateConfig = {
  id: 'launch-date-reveal',
  name: 'Date Reveal',
  category: 'lanzamientos',
  fields: [
    { key: 'month', label: 'Mes', type: 'text', default: 'ABRIL' },
    { key: 'day', label: 'Día', type: 'text', default: '15' },
    { key: 'year', label: 'Año', type: 'text', default: '2026' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'NUEVO SABOR' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DateRevealPreview,
}
