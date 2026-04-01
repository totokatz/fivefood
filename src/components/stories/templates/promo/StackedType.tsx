import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function StackedTypePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const line1 = data.line1 || 'HASTA'
  const line2 = data.line2 || '50%'
  const line3 = data.line3 || 'OFF'
  const subtitle = data.subtitle || 'Solo este fin de semana'
  const productSize = Number(data.productSize) || 320
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'

  return (
    <div
      className="flex h-full w-full flex-col font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Logo */}
      <div className="flex justify-start px-[80px] pt-[80px]">
        <img src={logoBlue} alt="FiveFoods" className="w-[200px] opacity-50" />
      </div>

      {/* Massive stacked typography */}
      <div className="flex flex-1 flex-col justify-center px-[80px]">
        <p
          className="text-[200px] font-black leading-[0.85] tracking-tight"
          style={{ color: '#03045e' }}
        >
          {line1}
        </p>
        <p
          className="text-[280px] font-black leading-[0.85] tracking-tight"
          style={{ color: '#00b4d8' }}
        >
          {line2}
        </p>
        <p
          className="text-[200px] font-black leading-[0.85] tracking-tight"
          style={{ color: '#03045e' }}
        >
          {line3}
        </p>
        <p className="mt-[40px] text-[32px] font-medium tracking-[2px] text-on-surface-variant">
          {subtitle}
        </p>
      </div>

      {/* Thin cyan accent line */}
      <div className="mx-[80px]" style={{ height: '3px', background: '#00b4d8' }} />

      {/* Both products side by side */}
      <div
        className="flex items-center justify-center px-[80px] py-[60px]"
        style={lockLayout ? { minHeight: '380px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
          style={{ height: `${productSize}px` }}
        />
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="w-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
          style={{ height: `${productSize * 0.9}px`, marginLeft: `${productGap}px` }}
        />
      </div>
    </div>
  )
}

export const StackedTypeConfig: TemplateConfig = {
  id: 'promo-stacked-type',
  name: 'Stacked Type',
  category: 'promociones',
  fields: [
    { key: 'line1', label: 'Línea 1', type: 'text', default: 'HASTA' },
    { key: 'line2', label: 'Línea 2', type: 'text', default: '50%' },
    { key: 'line3', label: 'Línea 3', type: 'text', default: 'OFF' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Solo este fin de semana' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: StackedTypePreview,
}
