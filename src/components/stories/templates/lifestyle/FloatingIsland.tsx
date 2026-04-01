import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function FloatingIslandPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const title = (data.title as string) || 'TU ISLA'
  const subtitle = (data.subtitle as string) || 'de bienestar'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden font-headline"
      style={{
        background: 'linear-gradient(160deg, #90e0ef 0%, #00b4d8 40%, #0077b6 100%)',
      }}
    >
      {/* Subtle background circles for depth */}
      <div
        className="absolute"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          top: '-200px',
          right: '-200px',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      {/* The floating island card */}
      <div
        className="relative z-10 flex flex-col items-center overflow-hidden"
        style={{
          width: '600px',
          height: '1000px',
          borderRadius: '40px',
          background: '#f8fdff',
          boxShadow:
            '0 40px 100px rgba(0,29,37,0.25), 0 10px 40px rgba(0,29,37,0.15)',
        }}
      >
        {/* Logo inside island — top */}
        <img
          src={logoBlue}
          alt="FiveFoods"
          className="mt-[60px] w-[140px] opacity-25"
        />

        {/* Title */}
        <p
          className="mt-[60px] text-center text-[72px] font-black tracking-[8px] uppercase"
          style={{ color: '#03045e' }}
        >
          {title}
        </p>

        {/* Subtitle with accent font */}
        <p
          className="mt-[8px] text-center font-accent text-[48px]"
          style={{ color: '#0077b6' }}
        >
          {subtitle}
        </p>

        {/* Thin separator */}
        <div
          className="mt-[30px]"
          style={{
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00b4d8, transparent)',
          }}
        />

        {/* Product inside island */}
        <div
          className="mt-[30px] flex flex-1 items-center justify-center"
          style={lockLayout ? { minHeight: '500px' } : undefined}
        >
          <img
            src={products[product as keyof typeof products]}
            alt={product}
            className="w-auto object-contain"
            style={{
              height: `${productSize * 0.7}px`,
              filter: 'drop-shadow(0 20px 50px rgba(0,29,37,0.2))',
            }}
          />
        </div>

        {/* Handle inside island — bottom */}
        <p
          className="mb-[50px] text-[24px] tracking-[4px]"
          style={{ color: 'rgba(0,119,182,0.4)' }}
        >
          @fivefood.ok
        </p>
      </div>
    </div>
  )
}

export const FloatingIslandConfig: TemplateConfig = {
  id: 'lifestyle-floating-island',
  name: 'Floating Island',
  category: 'lifestyle',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'TU ISLA' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'de bienestar' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FloatingIslandPreview,
}
