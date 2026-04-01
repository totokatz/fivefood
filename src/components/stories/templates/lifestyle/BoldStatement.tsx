import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldStatementPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const bigWord = (data.bigWord as string) || 'SNACK'
  const subtitle = (data.subtitle as string) || 'Sin culpa, con propósito'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[70px] w-[170px] opacity-25"
        style={{ zIndex: 10 }}
      />

      {/* Massive outlined word */}
      <p
        className="absolute text-center font-black uppercase"
        style={{
          fontSize: '320px',
          lineHeight: '1',
          color: 'transparent',
          WebkitTextStroke: '3px #00b4d8',
          letterSpacing: '20px',
          opacity: 0.9,
        }}
      >
        {bigWord}
      </p>

      {/* Second layer — slightly offset for depth */}
      <p
        className="absolute text-center font-black uppercase"
        style={{
          fontSize: '320px',
          lineHeight: '1',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(144,224,239,0.25)',
          letterSpacing: '20px',
          transform: 'translate(6px, 6px)',
        }}
      >
        {bigWord}
      </p>

      {/* Product in the center of the text */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,180,216,0.3))',
          }}
        />
      </div>

      {/* Subtitle below */}
      <p
        className="absolute bottom-[180px] z-10 text-center text-[36px] font-light tracking-[8px] uppercase"
        style={{ color: 'rgba(144,224,239,0.7)' }}
      >
        {subtitle}
      </p>

      {/* Handle */}
      <p
        className="absolute bottom-[70px] text-[24px] tracking-[4px]"
        style={{ color: 'rgba(0,180,216,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const BoldStatementConfig: TemplateConfig = {
  id: 'lifestyle-bold-statement',
  name: 'Bold Statement',
  category: 'lifestyle',
  fields: [
    { key: 'bigWord', label: 'Palabra grande', type: 'text', default: 'SNACK' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Sin culpa, con propósito' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: BoldStatementPreview,
}
