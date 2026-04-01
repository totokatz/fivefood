import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function VerticalTypePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const verticalText = data.verticalText || 'SNACK TIME'
  const subtitle = data.subtitle || 'El momento es ahora'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Soft gradient wash — top right corner */}
      <div
        className="absolute"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(202,240,248,0.6) 0%, rgba(144,224,239,0.2) 40%, transparent 70%)',
          top: '-200px',
          right: '-200px',
        }}
      />

      {/* Vertical text — large, ghosted, left edge */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '60px',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          whiteSpace: 'nowrap',
        }}
      >
        <p
          className="text-[140px] font-black uppercase"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,119,182,0.08)',
            letterSpacing: '20px',
          }}
        >
          {verticalText}
        </p>
      </div>

      {/* Top section — logo + editorial label */}
      <div className="z-10 flex w-full items-start justify-between px-[80px] pt-[80px]">
        <div className="flex flex-col gap-[12px]">
          <p className="text-[22px] font-medium uppercase tracking-[10px]" style={{ color: '#0077b6', opacity: 0.5 }}>
            Lifestyle
          </p>
          <div style={{ width: '60px', height: '2px', background: '#00b4d8', opacity: 0.4 }} />
        </div>
        <img
          src={logo}
          alt="FiveFoods"
          className="w-[160px]"
          style={{ opacity: 0.5, filter: 'brightness(0) saturate(100%)' }}
        />
      </div>

      {/* Product — off-center right, large, dramatic */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          top: '50%',
          right: '40px',
          transform: 'translateY(-50%)',
          ...(lockLayout ? { minHeight: '600px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(3,4,94,0.12)) drop-shadow(0 8px 20px rgba(0,180,216,0.08))',
          }}
        />
      </div>

      {/* Bottom text block — left aligned, editorial */}
      <div className="absolute bottom-[100px] left-[80px] z-10 flex flex-col gap-[16px]">
        <p
          className="max-w-[500px] text-[52px] font-bold leading-[1.1]"
          style={{ color: '#03045e' }}
        >
          {subtitle}
        </p>
        <p className="text-[26px] font-light tracking-[4px]" style={{ color: 'rgba(0,119,182,0.4)' }}>
          @fivefood.ok
        </p>
      </div>
    </div>
  )
}

export const VerticalTypeConfig: TemplateConfig = {
  id: 'lifestyle-vertical-type',
  name: 'Vertical Type',
  category: 'lifestyle',
  fields: [
    { key: 'verticalText', label: 'Texto vertical', type: 'text', default: 'SNACK TIME' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'El momento es ahora' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: VerticalTypePreview,
}
