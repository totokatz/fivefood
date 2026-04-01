import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CornerFramesPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const tagline = (data.tagline as string) || 'Diseñado para vos'

  const cornerStyle = {
    position: 'absolute' as const,
    width: '120px',
    height: '120px',
    borderColor: '#00b4d8',
    borderStyle: 'solid' as const,
    borderWidth: '0px',
  }

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center font-headline"
      style={{ background: '#f6f5f0' }}
    >
      {/* Corner frames */}
      <div
        style={{
          ...cornerStyle,
          top: '80px',
          left: '80px',
          borderTopWidth: '2px',
          borderLeftWidth: '2px',
        }}
      />
      <div
        style={{
          ...cornerStyle,
          top: '80px',
          right: '80px',
          borderTopWidth: '2px',
          borderRightWidth: '2px',
        }}
      />
      <div
        style={{
          ...cornerStyle,
          bottom: '80px',
          left: '80px',
          borderBottomWidth: '2px',
          borderLeftWidth: '2px',
        }}
      />
      <div
        style={{
          ...cornerStyle,
          bottom: '80px',
          right: '80px',
          borderBottomWidth: '2px',
          borderRightWidth: '2px',
        }}
      />

      {/* Logo top */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[120px] left-1/2 -translate-x-1/2"
        style={{ width: '160px', opacity: 0.25 }}
      />

      {/* Product centered */}
      <div
        className="flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12))',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="absolute bottom-[200px] left-1/2 -translate-x-1/2 text-center tracking-[8px] uppercase"
        style={{
          fontSize: '32px',
          color: '#03045e',
          fontWeight: 300,
          letterSpacing: '8px',
        }}
      >
        {tagline}
      </p>

      {/* Handle */}
      <p
        className="absolute bottom-[120px] left-1/2 -translate-x-1/2"
        style={{ fontSize: '24px', color: '#40484c', opacity: 0.5 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const CornerFramesConfig: TemplateConfig = {
  id: 'lifestyle-corner-frames',
  name: 'Corner Frames',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Diseñado para vos' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CornerFramesPreview,
}
