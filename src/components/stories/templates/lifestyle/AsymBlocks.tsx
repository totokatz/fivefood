import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function AsymBlocksPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'BALANCE'
  const subtext = (data.subtext as string) || 'en cada bocado'

  return (
    <div
      className="relative flex h-full w-full overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Block 1 — Large navy top-left */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: '680px',
          height: '520px',
          background: '#03045e',
        }}
      />

      {/* Block 2 — Cyan accent top-right */}
      <div
        className="absolute"
        style={{
          top: '60px',
          right: 0,
          width: '340px',
          height: '280px',
          background: '#00b4d8',
        }}
      />

      {/* Block 3 — Light cyan mid-left */}
      <div
        className="absolute"
        style={{
          top: '580px',
          left: 0,
          width: '280px',
          height: '600px',
          background: '#90e0ef',
          opacity: 0.4,
        }}
      />

      {/* Block 4 — Navy bottom-right */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          right: 0,
          width: '520px',
          height: '400px',
          background: '#03045e',
        }}
      />

      {/* Block 5 — Small white accent */}
      <div
        className="absolute"
        style={{
          top: '520px',
          left: '280px',
          width: '200px',
          height: '200px',
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
      />

      {/* Headline in navy block */}
      <p
        className="absolute tracking-[10px] uppercase"
        style={{
          top: '180px',
          left: '60px',
          fontSize: '72px',
          color: '#ffffff',
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {headline}
      </p>

      {/* Subtext */}
      <p
        className="absolute tracking-[4px] uppercase"
        style={{
          top: '420px',
          left: '60px',
          fontSize: '28px',
          color: '#90e0ef',
          fontWeight: 300,
        }}
      >
        {subtext}
      </p>

      {/* Product — positioned at the intersection of blocks */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          ...(lockLayout ? { minHeight: '500px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
          }}
        />
      </div>

      {/* Logo in cyan block */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute"
        style={{
          top: '120px',
          right: '60px',
          width: '140px',
          opacity: 0.5,
        }}
      />

      {/* Handle in bottom navy block */}
      <p
        className="absolute z-10"
        style={{
          bottom: '80px',
          right: '60px',
          fontSize: '24px',
          color: '#90e0ef',
          opacity: 0.5,
        }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const AsymBlocksConfig: TemplateConfig = {
  id: 'lifestyle-asym-blocks',
  name: 'Asym Blocks',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Titular', type: 'text', default: 'BALANCE' },
    { key: 'subtext', label: 'Subtexto', type: 'text', default: 'en cada bocado' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: AsymBlocksPreview,
}
