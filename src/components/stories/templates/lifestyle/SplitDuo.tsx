import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SplitDuoPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
  const headline = data.headline || 'DOS SABORES'
  const subtitle = data.subtitle || 'Una misma pasión'
  const productSize = Number(data.productSize) || 500
  const productGap = data.productGap != null ? Number(data.productGap) : 0
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full overflow-hidden font-headline">
      {/* Left half — dark navy */}
      <div className="flex h-full w-1/2 items-center justify-center" style={{ background: '#03045e', paddingRight: productGap }}>
        <div
          className="flex items-center justify-center"
          style={lockLayout ? { minHeight: '500px' } : undefined}
        >
          <img
            src={products[product as keyof typeof products]}
            alt={product}
            className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            style={{ height: `${productSize * 0.8}px`, transform: 'rotate(-3deg)' }}
          />
        </div>
      </div>

      {/* Right half — off-white */}
      <div className="flex h-full w-1/2 items-center justify-center" style={{ background: '#f8fdff', paddingLeft: productGap }}>
        <div
          className="flex items-center justify-center"
          style={lockLayout ? { minHeight: '500px' } : undefined}
        >
          <img
            src={products[secondary as keyof typeof products]}
            alt={secondary}
            className="w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)]"
            style={{ height: `${productSize * 0.8}px`, transform: 'rotate(3deg)' }}
          />
        </div>
      </div>

      {/* Centered text overlapping both halves */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className="text-center text-[72px] font-black tracking-[6px] uppercase"
          style={{
            background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #03045e 50%, #03045e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {headline}
        </p>
        <p
          className="mt-2 text-center text-[40px] font-light tracking-[6px] uppercase"
          style={{
            background: 'linear-gradient(90deg, #90e0ef 0%, #90e0ef 50%, #0077b6 50%, #0077b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Logo top center */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 w-[200px] -translate-x-1/2 opacity-40"
        style={{ mixBlendMode: 'difference' }}
      />

      {/* Handle bottom center */}
      <p
        className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-[28px]"
        style={{
          background: 'linear-gradient(90deg, #ffffff80 0%, #ffffff80 50%, #03045e80 50%, #03045e80 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const SplitDuoConfig: TemplateConfig = {
  id: 'lifestyle-split-duo',
  name: 'Split Duo',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'DOS SABORES' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Una misma pasión' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SplitDuoPreview,
}
