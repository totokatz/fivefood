import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CircleCropPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout
  const tagline = (data.tagline as string) || 'CIRCLE OF LIFE'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Circle background */}
      <div
        className="absolute"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'rgba(0,180,216,0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />

      {/* Circle border ring (decorative) */}
      <div
        className="absolute"
        style={{
          width: '740px',
          height: '740px',
          borderRadius: '50%',
          border: '1px solid rgba(0,180,216,0.2)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
        }}
      />

      {/* Product inside circle with overflow hidden */}
      <div
        className="relative z-10 flex items-center justify-center overflow-hidden"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          marginTop: '-100px',
          ...(lockLayout ? { minHeight: '500px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* Tagline below circle */}
      <p
        className="relative z-10 mt-[60px] text-center tracking-[10px] uppercase"
        style={{
          fontSize: '52px',
          color: '#03045e',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {tagline}
      </p>

      {/* Decorative thin line under tagline */}
      <div
        className="relative z-10 mt-[24px]"
        style={{
          width: '120px',
          height: '2px',
          background: '#00b4d8',
          opacity: 0.5,
        }}
      />

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
        style={{ fontSize: '24px', color: '#40484c', opacity: 0.45 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const CircleCropConfig: TemplateConfig = {
  id: 'lifestyle-circle-crop',
  name: 'Circle Crop',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'CIRCLE OF LIFE' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CircleCropPreview,
}
