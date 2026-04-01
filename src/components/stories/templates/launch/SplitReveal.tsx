import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function SplitRevealPreview({ data }: TemplateProps) {
  const headline = data.headline || 'NUEVO'
  const subtitle = data.subtitle || 'Dos sabores que lo cambian todo'
  const productSize = Number(data.productSize) || 420
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full flex-col font-headline" style={{ overflow: 'hidden' }}>
      {/* Top half — white */}
      <div
        className="relative flex w-full items-end justify-center"
        style={{ height: '50%', background: '#ffffff' }}
      >
        <img src={logoBlue} alt="FiveFoods" className="absolute top-[60px] left-1/2 w-[200px] -translate-x-1/2 opacity-40" />
        <div className="flex items-end justify-center" style={lockLayout ? { minHeight: '380px' } : undefined}>
          <img
            src={productoChocolate}
            alt="Chocolate"
            className="w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
            style={{ height: `${productSize}px`, transform: `translateY(${productGap}px)` }}
          />
        </div>
      </div>

      {/* Bottom half — navy */}
      <div
        className="relative flex w-full items-start justify-center"
        style={{ height: '50%', background: '#03045e' }}
      >
        {/* Shadow overlay at split line */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-full"
          style={{ height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)' }}
        />
        <div className="flex items-start justify-center" style={lockLayout ? { minHeight: '380px' } : undefined}>
          <img
            src={productoQueso}
            alt="Queso"
            className="w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
            style={{ height: `${productSize}px`, transform: `translateY(-${productGap}px)` }}
          />
        </div>
      </div>

      {/* Overlapping headline — centered on split line */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p
          className="text-center font-black leading-none"
          style={{
            fontSize: '160px',
            color: '#03045e',
            WebkitTextStroke: '3px #00b4d8',
            textShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          {headline}
        </p>
      </div>

      {/* Subtitle at bottom */}
      <div className="absolute bottom-[80px] left-0 w-full text-center">
        <p className="text-[32px] text-white/60">{subtitle}</p>
      </div>

      {/* Logo at bottom */}
      <img src={logo} alt="FiveFoods" className="absolute bottom-[140px] left-1/2 w-[160px] -translate-x-1/2 opacity-30" />
    </div>
  )
}

export const SplitRevealConfig: TemplateConfig = {
  id: 'launch-split-reveal',
  name: 'Split Reveal',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'NUEVO' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Dos sabores que lo cambian todo' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SplitRevealPreview,
}
