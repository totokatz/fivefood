import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MinimalQuotePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 340
  const lockLayout = !!data.lockLayout
  const quote = (data.quote as string) || 'Lo simple es lo mejor'
  const author = (data.author as string) || '— FiveFoods'

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-[100px] font-headline">
      {/* Logo top */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[90px] w-[160px] opacity-25"
      />

      {/* Top thin line */}
      <div
        style={{
          width: '80px',
          height: '2px',
          background: '#00b4d8',
          marginBottom: '60px',
        }}
      />

      {/* Quote */}
      <p
        className="text-center text-[56px] font-light leading-[76px]"
        style={{ color: '#03045e' }}
      >
        "{quote}"
      </p>

      {/* Author */}
      <p
        className="mt-[32px] text-[30px] font-light tracking-[6px]"
        style={{ color: '#0077b6' }}
      >
        {author}
      </p>

      {/* Bottom thin line */}
      <div
        style={{
          width: '80px',
          height: '2px',
          background: '#00b4d8',
          marginTop: '60px',
        }}
      />

      {/* Product small at bottom */}
      <div
        className="mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[70px] text-[24px] tracking-[4px]"
        style={{ color: 'rgba(0,119,182,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const MinimalQuoteConfig: TemplateConfig = {
  id: 'lifestyle-minimal-quote',
  name: 'Minimal Quote',
  category: 'lifestyle',
  fields: [
    { key: 'quote', label: 'Cita', type: 'text', default: 'Lo simple es lo mejor' },
    { key: 'author', label: 'Autor', type: 'text', default: '— FiveFoods' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MinimalQuotePreview,
}
