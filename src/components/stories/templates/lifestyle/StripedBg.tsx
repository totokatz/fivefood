import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function StripedBgPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const headline = (data.headline as string) || 'ICONIC'
  const subtitle = (data.subtitle as string) || 'Snack de culto'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Vertical stripes background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(144,224,239,0.03) 60px, rgba(144,224,239,0.03) 120px)',
        }}
      />

      {/* Logo top */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="z-10 mt-[80px] w-[160px] opacity-20"
      />

      {/* Headline — massive bold */}
      <p
        className="z-10 mt-[120px] text-center text-[140px] font-black leading-[0.9] tracking-[12px] uppercase"
        style={{ color: '#03045e' }}
      >
        {headline}
      </p>

      {/* Subtitle — accent font for lifestyle */}
      <p
        className="z-10 mt-[20px] text-center font-accent text-[44px]"
        style={{ color: '#0077b6' }}
      >
        {subtitle}
      </p>

      {/* Thin accent bar */}
      <div
        className="z-10 mt-[30px]"
        style={{
          width: '160px',
          height: '3px',
          background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
          borderRadius: '2px',
        }}
      />

      {/* Product — large and centered */}
      <div
        className="z-10 mt-[60px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter:
              'drop-shadow(0 30px 70px rgba(3,4,94,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
          }}
        />
      </div>

      {/* Handle bottom */}
      <p
        className="z-10 mb-[80px] text-[26px] tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const StripedBgConfig: TemplateConfig = {
  id: 'lifestyle-striped-bg',
  name: 'Striped Bg',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'ICONIC' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Snack de culto' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: StripedBgPreview,
}
