import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DiagonalSlicePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const topText = (data.topText as string) || 'DARK'
  const bottomText = (data.bottomText as string) || 'LIGHT'
  const tagline = (data.tagline as string) || 'El balance perfecto'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full overflow-hidden font-headline">
      {/* Navy background (full) */}
      <div className="absolute inset-0" style={{ background: '#03045e' }} />

      {/* White triangle — bottom-right, cut diagonally */}
      <div
        className="absolute inset-0"
        style={{
          background: '#f8fdff',
          clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Diagonal line accent */}
      <div
        className="absolute"
        style={{
          width: '3px',
          height: '2800px',
          background: 'linear-gradient(180deg, rgba(0,180,216,0.6), rgba(0,119,182,0.3), transparent)',
          top: '-200px',
          left: '50%',
          transform: 'translate(-50%) rotate(45deg)',
          transformOrigin: 'top center',
        }}
      />

      {/* Top text — on navy zone */}
      <p
        className="absolute z-10 text-[120px] font-black tracking-[10px] uppercase"
        style={{
          color: '#ffffff',
          top: '280px',
          left: '80px',
          textShadow: '0 4px 30px rgba(0,0,0,0.3)',
        }}
      >
        {topText}
      </p>

      {/* Bottom text — on white zone */}
      <p
        className="absolute z-10 text-[120px] font-black tracking-[10px] uppercase"
        style={{
          color: '#03045e',
          bottom: '360px',
          right: '80px',
        }}
      >
        {bottomText}
      </p>

      {/* Tagline — centered */}
      <p
        className="absolute z-10 text-[32px] font-light tracking-[6px] uppercase"
        style={{
          color: '#0077b6',
          bottom: '280px',
          right: '80px',
        }}
      >
        {tagline}
      </p>

      {/* Product at diagonal intersection */}
      <div
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter:
              'drop-shadow(0 30px 60px rgba(0,0,0,0.35)) drop-shadow(0 10px 30px rgba(3,4,94,0.2))',
          }}
        />
      </div>

      {/* Logo top-left on navy */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-[80px] z-10 w-[160px] opacity-30"
      />

      {/* Handle bottom-right on white */}
      <p
        className="absolute bottom-[80px] right-[80px] z-10 text-[26px] tracking-[3px]"
        style={{ color: 'rgba(3,4,94,0.4)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const DiagonalSliceConfig: TemplateConfig = {
  id: 'lifestyle-diagonal-slice',
  name: 'Diagonal Slice',
  category: 'lifestyle',
  fields: [
    { key: 'topText', label: 'Texto arriba', type: 'text', default: 'DARK' },
    { key: 'bottomText', label: 'Texto abajo', type: 'text', default: 'LIGHT' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'El balance perfecto' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DiagonalSlicePreview,
}
