import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function PriceDropPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const oldPrice = (data.oldPrice as string) || '$4500'
  const newPrice = (data.newPrice as string) || '$2990'
  const headline = (data.headline as string) || 'BAJAMOS EL PRECIO'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#ffffff' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute"
        style={{
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.04) 0%, transparent 60%)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo top */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="z-10 mt-[80px] w-[160px] opacity-20"
      />

      {/* Headline */}
      <p
        className="z-10 mt-[80px] text-center text-[52px] font-black tracking-[10px] uppercase"
        style={{ color: '#03045e' }}
      >
        {headline}
      </p>

      {/* Down arrow accent */}
      <div className="z-10 mt-[24px] flex flex-col items-center">
        <div
          style={{
            width: '3px',
            height: '60px',
            background: 'linear-gradient(180deg, #00b4d8, #0077b6)',
          }}
        />
        <div
          style={{
            width: '0',
            height: '0',
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '18px solid #0077b6',
          }}
        />
      </div>

      {/* Product — medium-sized */}
      <div
        className="z-10 mt-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize * 0.75}px`,
            filter: 'drop-shadow(0 20px 50px rgba(0,29,37,0.12))',
          }}
        />
      </div>

      {/* Price comparison — hero element */}
      <div className="z-10 mt-[50px] flex flex-col items-center gap-[12px]">
        {/* Old price — crossed out */}
        <div className="relative">
          <p
            className="text-center text-[72px] font-bold"
            style={{ color: '#40484c', opacity: 0.5 }}
          >
            {oldPrice}
          </p>
          {/* Strikethrough line */}
          <div
            className="absolute left-[-10px] right-[-10px] top-1/2"
            style={{
              height: '4px',
              background: '#c0392b',
              transform: 'rotate(-5deg)',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* New price — bold cyan */}
        <p
          className="text-center text-[130px] font-black leading-[0.9]"
          style={{
            color: '#00b4d8',
            textShadow: '0 4px 20px rgba(0,180,216,0.15)',
          }}
        >
          {newPrice}
        </p>
      </div>

      {/* Bottom */}
      <div className="z-10 mb-[80px] mt-auto flex flex-col items-center gap-[12px]">
        <div
          style={{
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0077b6, transparent)',
          }}
        />
        <p
          className="text-[26px] tracking-[3px]"
          style={{ color: 'rgba(3,4,94,0.3)' }}
        >
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const PriceDropConfig: TemplateConfig = {
  id: 'promo-price-drop',
  name: 'Price Drop',
  category: 'promociones',
  fields: [
    { key: 'oldPrice', label: 'Precio anterior', type: 'text', default: '$4500' },
    { key: 'newPrice', label: 'Precio nuevo', type: 'text', default: '$2990' },
    { key: 'headline', label: 'Encabezado', type: 'text', default: 'BAJAMOS EL PRECIO' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: PriceDropPreview,
}
