import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function ArchGalleryPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 520
  const lockLayout = !!data.lockLayout
  const label = (data.label as string) || 'COLECCIÓN SALUDABLE'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f5f0eb' }}
    >
      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[70px] w-[160px] opacity-20"
        style={{ zIndex: 10 }}
      />

      {/* Thin decorative line — left */}
      <div
        className="absolute"
        style={{
          left: '80px',
          top: '200px',
          bottom: '200px',
          width: '1px',
          background: 'rgba(0,119,182,0.15)',
        }}
      />

      {/* Thin decorative line — right */}
      <div
        className="absolute"
        style={{
          right: '80px',
          top: '200px',
          bottom: '200px',
          width: '1px',
          background: 'rgba(0,119,182,0.15)',
        }}
      />

      {/* Arch frame */}
      <div
        className="relative flex flex-col items-center justify-end overflow-hidden"
        style={{
          width: '640px',
          height: '1000px',
          borderRadius: '320px 320px 0 0',
          background: 'linear-gradient(180deg, #f8fdff 0%, #e8f6f8 100%)',
          border: '1.5px solid rgba(0,119,182,0.15)',
        }}
      >
        {/* Inner thin arch border */}
        <div
          className="absolute"
          style={{
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            borderRadius: '300px 300px 0 0',
            border: '1px solid rgba(0,180,216,0.1)',
          }}
        />

        {/* Product inside arch */}
        <div
          className="relative z-10 mb-[40px] flex items-center justify-center"
          style={lockLayout ? { minHeight: '600px' } : undefined}
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
      </div>

      {/* Label below arch */}
      <div className="mt-[60px] text-center">
        <p
          className="text-[32px] font-light tracking-[12px] uppercase"
          style={{ color: '#03045e' }}
        >
          {label}
        </p>
        <div
          className="mx-auto mt-[20px]"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(0,119,182,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00b4d8',
            }}
          />
        </div>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] text-[24px] tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const ArchGalleryConfig: TemplateConfig = {
  id: 'lifestyle-arch-gallery',
  name: 'Arch Gallery',
  category: 'lifestyle',
  fields: [
    { key: 'label', label: 'Etiqueta', type: 'text', default: 'COLECCIÓN SALUDABLE' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: ArchGalleryPreview,
}
