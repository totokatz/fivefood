import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function MinimalFactsPreview({ data }: TemplateProps) {
  const heroStat = data.heroStat || '0g'
  const heroLabel = data.heroLabel || 'Grasas Trans'
  const fact1 = data.fact1 || '8g de proteína por porción'
  const fact2 = data.fact2 || '100% ingredientes de origen vegetal'
  const fact3 = data.fact3 || 'Sin TACC · Apto vegano'
  const productSize = Number(data.productSize) || 340
  const productGap = data.productGap != null ? Number(data.productGap) : 24
  const lockLayout = !!data.lockLayout

  const facts = [fact1, fact2, fact3].filter(Boolean)

  return (
    <div className="flex h-full w-full flex-col items-center bg-white px-[80px] py-[100px] font-headline">
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="w-[200px] opacity-40" />

      {/* Hero stat */}
      <div className="mt-[100px] text-center">
        <p className="text-[280px] font-black leading-none text-tertiary">{heroStat}</p>
        <p className="mt-[8px] text-[48px] font-semibold tracking-[8px] text-secondary/60 uppercase">
          {heroLabel}
        </p>
      </div>

      {/* Divider */}
      <div className="mt-[60px] h-[2px] w-[200px] bg-primary/20" />

      {/* Both products */}
      <div
        className="mt-[60px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={productoChocolate}
          alt="Chocolate"
          className="w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          style={{ height: `${productSize}px`, transform: 'rotate(-3deg)' }}
        />
        <img
          src={productoQueso}
          alt="Queso"
          className="w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          style={{ height: `${productSize}px`, transform: 'rotate(3deg)', marginLeft: `${productGap}px` }}
        />
      </div>

      {/* Facts list */}
      <div className="mt-[60px] flex flex-col items-center gap-[20px]">
        {facts.map((fact, i) => (
          <p key={i} className="text-center text-[28px] text-tertiary/50">
            {fact}
          </p>
        ))}
      </div>

      {/* Handle */}
      <p className="mt-auto text-[28px] text-secondary/40">@fivefood.ok</p>
    </div>
  )
}

export const MinimalFactsConfig: TemplateConfig = {
  id: 'nutri-minimal-facts',
  name: 'Minimal Facts',
  category: 'nutricional',
  fields: [
    { key: 'heroStat', label: 'Stat principal', type: 'text', default: '0g' },
    { key: 'heroLabel', label: 'Label principal', type: 'text', default: 'Grasas Trans' },
    { key: 'fact1', label: 'Dato 1', type: 'text', default: '8g de proteína por porción' },
    { key: 'fact2', label: 'Dato 2', type: 'text', default: '100% ingredientes de origen vegetal' },
    { key: 'fact3', label: 'Dato 3', type: 'text', default: 'Sin TACC · Apto vegano' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MinimalFactsPreview,
}
