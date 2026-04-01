import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MinimalOfferPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const title = data.title || 'Llevá los dos,\npagá uno.'
  const description = data.description || 'Válido hasta agotar stock. Solo en fivefood.com.ar'
  const badge = data.badge || '2x1'
  const productSize = Number(data.productSize) || 300
  const productGap = data.productGap != null ? Number(data.productGap) : 60
  const lockLayout = !!data.lockLayout

  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'

  return (
    <div
      className="flex h-full w-full flex-col font-headline"
      style={{ background: '#ffffff' }}
    >
      {/* Top: logo + badge row */}
      <div className="flex items-center justify-between px-[80px] pt-[80px]">
        <img src={logoBlue} alt="FiveFoods" className="w-[180px] opacity-40" />
        <div
          className="rounded-full px-[40px] py-[14px]"
          style={{ background: '#03045e' }}
        >
          <p className="text-[28px] font-bold tracking-[4px] text-white">{badge}</p>
        </div>
      </div>

      {/* Products side by side */}
      <div
        className="flex items-center justify-center py-[80px]"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
          style={{ height: `${productSize}px` }}
        />
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
          style={{ height: `${productSize * 0.95}px`, marginLeft: `${productGap}px` }}
        />
      </div>

      {/* Large title text — left aligned, editorial */}
      <div className="flex flex-1 flex-col justify-center px-[80px]">
        <p
          className="whitespace-pre-line text-[72px] font-black leading-[1.05]"
          style={{ color: '#03045e' }}
        >
          {title}
        </p>

        {/* Thin divider */}
        <div className="my-[40px]" style={{ width: '120px', height: '2px', background: '#00b4d8' }} />

        <p className="max-w-[700px] text-[30px] leading-[1.5] font-light" style={{ color: '#40484c' }}>
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-[80px] pb-[80px]">
        <p className="text-[26px] font-light tracking-[4px]" style={{ color: '#40484c', opacity: 0.4 }}>
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const MinimalOfferConfig: TemplateConfig = {
  id: 'promo-minimal-offer',
  name: 'Minimal Offer',
  category: 'promociones',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'Llevá los dos,\npagá uno.' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Válido hasta agotar stock. Solo en fivefood.com.ar' },
    { key: 'badge', label: 'Badge', type: 'text', default: '2x1' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MinimalOfferPreview,
}
