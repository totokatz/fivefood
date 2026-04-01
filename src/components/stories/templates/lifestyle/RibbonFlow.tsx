import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function RibbonFlowPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout
  const ribbonText = (data.ribbonText as string) || 'SNACK TIME'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#ffffff' }}
    >
      {/* Ribbon 1 — top flowing left to right */}
      <div
        className="absolute"
        style={{
          top: '280px',
          left: '-100px',
          width: '1300px',
          height: '140px',
          background: 'linear-gradient(135deg, rgba(0,180,216,0.15) 0%, rgba(0,180,216,0.25) 100%)',
          borderRadius: '70px',
          transform: 'rotate(-8deg)',
        }}
      />

      {/* Ribbon 2 — center flowing right to left */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '750px',
          left: '-150px',
          width: '1400px',
          height: '160px',
          background: 'linear-gradient(135deg, rgba(0,180,216,0.2) 0%, rgba(0,119,182,0.3) 100%)',
          borderRadius: '80px',
          transform: 'rotate(5deg)',
        }}
      >
        <p
          className="tracking-[16px] uppercase"
          style={{
            fontSize: '42px',
            color: '#0077b6',
            fontWeight: 700,
            opacity: 0.4,
          }}
        >
          {ribbonText}
        </p>
      </div>

      {/* Ribbon 3 — bottom flowing left to right */}
      <div
        className="absolute"
        style={{
          top: '1300px',
          left: '-80px',
          width: '1280px',
          height: '120px',
          background: 'linear-gradient(135deg, rgba(0,119,182,0.12) 0%, rgba(0,180,216,0.18) 100%)',
          borderRadius: '60px',
          transform: 'rotate(-3deg)',
        }}
      />

      {/* Product centered at intersection */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.12))',
          }}
        />
      </div>

      {/* Ribbon text at top */}
      <p
        className="absolute top-[140px] left-1/2 z-10 -translate-x-1/2 text-center tracking-[14px] uppercase"
        style={{
          fontSize: '56px',
          color: '#03045e',
          fontWeight: 700,
        }}
      >
        {ribbonText}
      </p>

      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[60px] left-1/2 -translate-x-1/2"
        style={{ width: '140px', opacity: 0.2 }}
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

export const RibbonFlowConfig: TemplateConfig = {
  id: 'lifestyle-ribbon-flow',
  name: 'Ribbon Flow',
  category: 'lifestyle',
  fields: [
    { key: 'ribbonText', label: 'Texto cinta', type: 'text', default: 'SNACK TIME' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: RibbonFlowPreview,
}
