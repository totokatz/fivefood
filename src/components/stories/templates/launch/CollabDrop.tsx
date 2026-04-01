import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CollabDropPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout
  const partnerName = String(data.partnerName || 'PARTNER')
  const headline = String(data.headline || 'EDICIÓN ESPECIAL')
  const subtitle = String(data.subtitle || 'Colaboración limitada')

  return (
    <div
      className="relative flex h-full w-full overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Left half — FiveFoods */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{
          width: '540px',
          background: 'linear-gradient(180deg, #03045e 0%, #0077b6 100%)',
        }}
      >
        {/* Logo on left */}
        <div className="flex h-full flex-col items-center justify-start pt-[100px]">
          <img src={logo} alt="FiveFoods" className="w-[180px] opacity-30" />
          <p
            className="mt-[40px] text-[28px] font-bold tracking-[6px]"
            style={{ color: 'rgba(144,224,239,0.4)', writingMode: 'vertical-rl' }}
          >
            FIVEFOODS
          </p>
        </div>
      </div>

      {/* Right half — Partner */}
      <div
        className="absolute right-0 top-0 h-full"
        style={{
          width: '540px',
          background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)',
        }}
      >
        <div className="flex h-full flex-col items-center justify-start pt-[100px]">
          <p
            className="text-[72px] font-black"
            style={{ color: 'rgba(0,180,216,0.15)' }}
          >
            ×
          </p>
          <p
            className="mt-[20px] text-[28px] font-bold tracking-[6px]"
            style={{ color: 'rgba(255,255,255,0.3)', writingMode: 'vertical-rl' }}
          >
            {partnerName}
          </p>
        </div>
      </div>

      {/* Center divider line */}
      <div
        className="absolute left-[539px] top-0 h-full"
        style={{ width: '2px', background: 'rgba(0,180,216,0.15)' }}
      />

      {/* Product — centered, overlapping both halves */}
      <div
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(0,180,216,0.15))',
          }}
        />
      </div>

      {/* Headline badge — top center */}
      <div
        className="absolute left-1/2 top-[340px] z-30 -translate-x-1/2 rounded-full px-[48px] py-[16px]"
        style={{
          background: '#00b4d8',
          boxShadow: '0 0 30px rgba(0,180,216,0.4)',
        }}
      >
        <p className="whitespace-nowrap text-[28px] font-bold tracking-[6px]" style={{ color: 'white' }}>
          {headline}
        </p>
      </div>

      {/* × symbol large between names */}
      <p
        className="absolute left-1/2 top-[200px] z-30 -translate-x-1/2 text-[120px] font-black leading-none"
        style={{ color: '#00b4d8', textShadow: '0 0 40px rgba(0,180,216,0.3)' }}
      >
        ×
      </p>

      {/* Subtitle at bottom */}
      <div className="absolute bottom-[120px] left-0 right-0 z-30 flex flex-col items-center gap-[16px]">
        <p
          className="text-[30px] font-medium tracking-[4px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] left-1/2 z-30 -translate-x-1/2 text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const CollabDropConfig: TemplateConfig = {
  id: 'launch-collab-drop',
  name: 'Collab Drop',
  category: 'lanzamientos',
  fields: [
    { key: 'partnerName', label: 'Nombre partner', type: 'text', default: 'PARTNER' },
    { key: 'headline', label: 'Título', type: 'text', default: 'EDICIÓN ESPECIAL' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Colaboración limitada' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CollabDropPreview,
}
