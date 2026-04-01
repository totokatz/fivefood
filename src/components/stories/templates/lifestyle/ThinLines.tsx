import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function ThinLinesPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'LESS IS MORE'
  const subtitle = (data.subtitle as string) || 'Proteína que se siente'

  const lineCount = Math.floor(1920 / 40)
  const lines = Array.from({ length: lineCount }, (_, i) => i * 40)

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Thin horizontal lines */}
      {lines.map((y) => (
        <div
          key={y}
          className="absolute left-0 w-full"
          style={{
            top: `${y}px`,
            height: '1px',
            background: 'rgba(144,224,239,0.3)',
          }}
        />
      ))}

      {/* Headline — positioned in upper third between lines */}
      <p
        className="absolute z-10 w-full text-center tracking-[10px] uppercase"
        style={{
          top: '380px',
          fontSize: '60px',
          color: '#03045e',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {headline}
      </p>

      {/* Subtitle */}
      <p
        className="absolute z-10 w-full text-center tracking-[4px] uppercase"
        style={{
          top: '460px',
          fontSize: '26px',
          color: '#0077b6',
          fontWeight: 300,
        }}
      >
        {subtitle}
      </p>

      {/* Product centered — large, breaking through lines */}
      <div
        className="relative z-10 mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ width: '150px', opacity: 0.2 }}
      />

      {/* Handle */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ fontSize: '22px', color: '#40484c', opacity: 0.4 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const ThinLinesConfig: TemplateConfig = {
  id: 'lifestyle-thin-lines',
  name: 'Thin Lines',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Titular', type: 'text', default: 'LESS IS MORE' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Proteína que se siente' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: ThinLinesPreview,
}
