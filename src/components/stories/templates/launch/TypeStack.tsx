import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const lines = ['YA', 'DIS', 'PO', 'NI', 'BLE']

export function TypeStackPreview({ data }: TemplateProps) {
  const badge = data.badge || '★ LANZAMIENTO ★'
  const cta = data.cta || 'COMPRÁ AHORA'
  const productSize = Number(data.productSize) || 440
  const productGap = data.productGap != null ? Number(data.productGap) : 20
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between font-headline"
      style={{ background: 'linear-gradient(180deg, #03045e 0%, #0077b6 100%)' }}
    >
      {/* Background stacked text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {lines.map((line, i) => (
          <p
            key={i}
            className="font-black leading-[0.95] text-white"
            style={{ fontSize: '280px', opacity: 0.08, letterSpacing: '-8px' }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Top spacer */}
      <div style={{ height: '120px' }} />

      {/* Badge */}
      <div
        className="z-10 rounded-full border border-white/20 px-[44px] py-[12px]"
        style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-[28px] font-bold tracking-[6px] text-white">{badge}</p>
      </div>

      {/* Both products overlaid */}
      <div
        className="z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '520px' } : undefined}
      >
        <div className="relative flex items-center justify-center" style={{ width: '700px' }}>
          <img
            src={productoChocolate}
            alt="Chocolate"
            className="absolute w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.45)]"
            style={{ height: `${productSize}px`, left: `${productGap}px`, transform: 'rotate(-8deg)' }}
          />
          <img
            src={productoQueso}
            alt="Queso"
            className="absolute w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.45)]"
            style={{ height: `${productSize}px`, right: `${productGap}px`, transform: 'rotate(8deg)' }}
          />
          {/* Spacer to maintain height */}
          <div style={{ height: `${productSize + 40}px` }} />
        </div>
      </div>

      {/* CTA */}
      <div className="z-10 mb-[100px] rounded-full bg-white px-[64px] py-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
        <p className="text-[34px] font-extrabold text-tertiary">{cta}</p>
      </div>
    </div>
  )
}

export const TypeStackConfig: TemplateConfig = {
  id: 'launch-type-stack',
  name: 'Type Stack',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ LANZAMIENTO ★' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: TypeStackPreview,
}
