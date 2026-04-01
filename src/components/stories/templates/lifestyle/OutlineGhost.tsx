import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function OutlineGhostPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout
  const ghostText = (data.ghostText as string) || 'FIVEFOODS'
  const subtitle = (data.subtitle as string) || 'Real protein. Real flavor.'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Ghost text rows */}
      {[0, 1, 2, 3].map((i) => (
        <p
          key={i}
          className="absolute w-full text-center font-black uppercase"
          style={{
            fontSize: '180px',
            top: `${200 + i * 380}px`,
            color: 'transparent',
            WebkitTextStroke: '1.5px #90e0ef',
            opacity: 0.3,
            letterSpacing: '12px',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          {ghostText}
        </p>
      ))}

      {/* Product floating above ghost text */}
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
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Subtitle */}
      <p
        className="relative z-10 mt-[60px] text-center tracking-[6px] uppercase"
        style={{
          fontSize: '30px',
          color: '#90e0ef',
          fontWeight: 300,
        }}
      >
        {subtitle}
      </p>

      {/* Logo top */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ width: '170px', opacity: 0.3 }}
      />

      {/* Handle */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ fontSize: '24px', color: '#90e0ef', opacity: 0.4 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const OutlineGhostConfig: TemplateConfig = {
  id: 'lifestyle-outline-ghost',
  name: 'Outline Ghost',
  category: 'lifestyle',
  fields: [
    { key: 'ghostText', label: 'Texto fantasma', type: 'text', default: 'FIVEFOODS' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Real protein. Real flavor.' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: OutlineGhostPreview,
}
