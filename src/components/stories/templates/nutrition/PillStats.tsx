import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function PillStatsPreview({ data }: TemplateProps) {
  const stat1 = data.stat1 || '8g Proteína'
  const stat2 = data.stat2 || '6.6g Fibra'
  const stat3 = data.stat3 || '0g Trans Fat'
  const stat4 = data.stat4 || 'Sin TACC'
  const tagline = data.tagline || 'Lo que importa, a la vista'
  const productSize = Number(data.productSize) || 400
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  const pills = [stat1, stat2, stat3, stat4]

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden bg-background font-headline">
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="z-10 mt-[80px] w-[220px] opacity-50" />

      {/* Both products overlapping */}
      <div
        className="z-10 mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '480px' } : undefined}
      >
        <img
          src={productoChocolate}
          alt="Chocolate"
          className="w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
          style={{
            height: `${productSize}px`,
            transform: `rotate(-6deg) translateX(${productGap}px)`,
            zIndex: 2,
            position: 'relative',
          }}
        />
        <img
          src={productoQueso}
          alt="Queso"
          className="w-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
          style={{
            height: `${productSize * 0.9}px`,
            transform: `rotate(5deg) translateX(-${productGap}px)`,
            zIndex: 1,
            position: 'relative',
          }}
        />
      </div>

      {/* Pill badges */}
      <div className="z-10 mt-[60px] flex flex-wrap justify-center gap-[20px] px-[60px]">
        {pills.map((pill, i) => (
          <div
            key={i}
            className="rounded-full px-[48px] py-[24px]"
            style={{ background: '#00b4d8' }}
          >
            <p className="text-[32px] font-bold text-white">{pill}</p>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <p className="z-10 mt-auto mb-[80px] text-[32px] font-light text-tertiary/40">{tagline}</p>
    </div>
  )
}

export const PillStatsConfig: TemplateConfig = {
  id: 'nutri-pill-stats',
  name: 'Pill Stats',
  category: 'nutricional',
  fields: [
    { key: 'stat1', label: 'Pill 1', type: 'text', default: '8g Proteína' },
    { key: 'stat2', label: 'Pill 2', type: 'text', default: '6.6g Fibra' },
    { key: 'stat3', label: 'Pill 3', type: 'text', default: '0g Trans Fat' },
    { key: 'stat4', label: 'Pill 4', type: 'text', default: 'Sin TACC' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Lo que importa, a la vista' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: PillStatsPreview,
}
