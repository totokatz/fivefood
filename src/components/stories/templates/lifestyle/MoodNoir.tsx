import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MoodNoirPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 580
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'DARK MODE'
  const subtitle = (data.subtitle as string) || 'Sabor sin filtro'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Subtle teal glow */}
      <div
        className="absolute"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,182,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary dim glow top */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)',
          top: '10%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Headline */}
      <p
        className="absolute z-10 w-full text-center tracking-[14px] uppercase"
        style={{
          top: '320px',
          fontSize: '68px',
          color: '#ffffff',
          fontWeight: 200,
          lineHeight: 1,
        }}
      >
        {headline}
      </p>

      {/* Thin separator */}
      <div
        className="absolute z-10"
        style={{
          top: '410px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '1px',
          background: 'rgba(144,224,239,0.3)',
        }}
      />

      {/* Subtitle */}
      <p
        className="absolute z-10 w-full text-center tracking-[6px] uppercase"
        style={{
          top: '440px',
          fontSize: '26px',
          color: '#90e0ef',
          fontWeight: 200,
          opacity: 0.6,
        }}
      >
        {subtitle}
      </p>

      {/* Product — dramatically lit */}
      <div
        className="relative z-10 mt-[120px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 50px 100px rgba(0,0,0,0.6)) drop-shadow(0 0 80px rgba(0,119,182,0.15))',
          }}
        />
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ width: '150px', opacity: 0.15 }}
      />

      {/* Handle */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ fontSize: '22px', color: '#90e0ef', opacity: 0.25 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const MoodNoirConfig: TemplateConfig = {
  id: 'lifestyle-mood-noir',
  name: 'Mood Noir',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Titular', type: 'text', default: 'DARK MODE' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Sabor sin filtro' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MoodNoirPreview,
}
