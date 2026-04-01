import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoWhite from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function GradientStatsPreview({ data }: TemplateProps) {
  const ghostStat = data.ghostStat || '8g'
  const stat1Val = data.stat1Val || '8g'
  const stat1Label = data.stat1Label || 'Proteína'
  const stat2Val = data.stat2Val || '0g'
  const stat2Label = data.stat2Label || 'Trans Fat'
  const tagline = data.tagline || 'Nutrición que se nota'
  const productSize = Number(data.productSize) || 440
  const productGap = data.productGap != null ? Number(data.productGap) : 30
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #00b4d8 0%, #0077b6 40%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logoWhite} alt="FiveFoods" className="z-10 mt-[80px] w-[220px] opacity-40" />

      {/* Ghost stat — watermark behind products */}
      <p
        className="absolute select-none text-center font-black leading-none text-white/[0.06]"
        style={{ fontSize: '600px', top: '320px', left: '50%', transform: 'translateX(-50%)' }}
      >
        {ghostStat}
      </p>

      {/* Both products centered, overlapping */}
      <div
        className="z-10 mt-[160px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '520px' } : undefined}
      >
        <img
          src={productoChocolate}
          alt="Chocolate"
          className="w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
          style={{
            height: `${productSize}px`,
            transform: `rotate(-5deg) translateX(${productGap}px)`,
            zIndex: 2,
            position: 'relative',
          }}
        />
        <img
          src={productoQueso}
          alt="Queso"
          className="w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
          style={{
            height: `${productSize * 0.88}px`,
            transform: `rotate(4deg) translateX(-${productGap}px)`,
            zIndex: 1,
            position: 'relative',
          }}
        />
      </div>

      {/* Stats row */}
      <div className="z-10 mt-auto mb-[40px] flex w-full justify-center gap-[64px] px-[80px]">
        <div className="flex flex-col items-center">
          <p className="text-[80px] font-black leading-none text-white">{stat1Val}</p>
          <p className="mt-[8px] text-[24px] font-semibold tracking-[4px] text-white/40 uppercase">
            {stat1Label}
          </p>
        </div>
        <div className="h-[100px] w-[2px] bg-white/15" />
        <div className="flex flex-col items-center">
          <p className="text-[80px] font-black leading-none text-white">{stat2Val}</p>
          <p className="mt-[8px] text-[24px] font-semibold tracking-[4px] text-white/40 uppercase">
            {stat2Label}
          </p>
        </div>
      </div>

      {/* Tagline */}
      <p className="z-10 mb-[80px] text-[30px] font-light text-white/30">{tagline}</p>
    </div>
  )
}

export const GradientStatsConfig: TemplateConfig = {
  id: 'nutri-gradient-stats',
  name: 'Gradient Stats',
  category: 'nutricional',
  fields: [
    { key: 'ghostStat', label: 'Stat fantasma (fondo)', type: 'text', default: '8g' },
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '0g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Trans Fat' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Nutrición que se nota' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GradientStatsPreview,
}
