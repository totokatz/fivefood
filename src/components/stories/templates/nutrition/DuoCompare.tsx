import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoWhite from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function DuoComparePreview({ data }: TemplateProps) {
  const leftStat = data.leftStat || '8g'
  const leftLabel = data.leftLabel || 'Proteína'
  const rightStat = data.rightStat || '6.6g'
  const rightLabel = data.rightLabel || 'Fibra'
  const tagline = data.tagline || 'Dos sabores, misma potencia'
  const productSize = Number(data.productSize) || 420
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #03045e 0%, #001d25 100%)' }}
    >
      {/* Logo */}
      <img src={logoWhite} alt="FiveFoods" className="z-10 mt-[80px] w-[220px] opacity-40" />

      {/* Products side by side */}
      <div
        className="z-10 mt-[120px] flex w-full items-end justify-center px-[60px]"
        style={lockLayout ? { minHeight: '520px' } : undefined}
      >
        {/* Left — Chocolate */}
        <div className="flex flex-col items-center">
          <img
            src={productoChocolate}
            alt="Chocolate"
            className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,180,216,0.2)]"
            style={{ height: `${productSize}px`, transform: 'rotate(-4deg)' }}
          />
          <p className="mt-[32px] text-[96px] font-black leading-none text-primary">{leftStat}</p>
          <p className="mt-[8px] text-[28px] font-semibold tracking-[4px] text-white/40 uppercase">
            {leftLabel}
          </p>
        </div>

        {/* VS divider */}
        <div className="mb-[80px] flex flex-col items-center gap-[16px]" style={{ marginLeft: `${productGap}px`, marginRight: `${productGap}px` }}>
          <div className="h-[120px] w-[2px] bg-white/10" />
          <p
            className="text-[48px] font-black text-primary"
            style={{ textShadow: '0 0 40px rgba(0,180,216,0.4)' }}
          >
            VS
          </p>
          <div className="h-[120px] w-[2px] bg-white/10" />
        </div>

        {/* Right — Queso */}
        <div className="flex flex-col items-center">
          <img
            src={productoQueso}
            alt="Queso"
            className="w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,180,216,0.2)]"
            style={{ height: `${productSize}px`, transform: 'rotate(4deg)' }}
          />
          <p className="mt-[32px] text-[96px] font-black leading-none text-primary">{rightStat}</p>
          <p className="mt-[8px] text-[28px] font-semibold tracking-[4px] text-white/40 uppercase">
            {rightLabel}
          </p>
        </div>
      </div>

      {/* Tagline */}
      <p className="z-10 mt-auto mb-[80px] text-[32px] font-light text-white/30">{tagline}</p>
    </div>
  )
}

export const DuoCompareConfig: TemplateConfig = {
  id: 'nutri-duo-compare',
  name: 'Duo Compare',
  category: 'nutricional',
  fields: [
    { key: 'leftStat', label: 'Stat izquierda', type: 'text', default: '8g' },
    { key: 'leftLabel', label: 'Label izquierda', type: 'text', default: 'Proteína' },
    { key: 'rightStat', label: 'Stat derecha', type: 'text', default: '6.6g' },
    { key: 'rightLabel', label: 'Label derecha', type: 'text', default: 'Fibra' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Dos sabores, misma potencia' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DuoComparePreview,
}
