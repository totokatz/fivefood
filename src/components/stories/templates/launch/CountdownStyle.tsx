import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function CountdownStylePreview({ data }: TemplateProps) {
  const headline = data.headline || 'MUY PRONTO'
  const date = data.date || 'PRÓXIMAMENTE'
  const subtitle = data.subtitle || 'Dos nuevos sabores que no te podés perder'
  const productSize = Number(data.productSize) || 400
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-white py-[100px] font-headline">
      {/* Subtle dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #03045e 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.04,
        }}
      />

      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="z-10 w-[200px] opacity-50" />

      {/* Headline */}
      <div className="z-10 text-center">
        <p className="text-[88px] font-black leading-none tracking-[-2px] text-tertiary">
          {headline}
        </p>
        <div className="mx-auto mt-[24px] h-[4px] w-[120px] rounded-full bg-primary" />
      </div>

      {/* Both products */}
      <div
        className="z-10 relative flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <div className="relative flex items-center justify-center" style={{ width: '700px' }}>
          <img
            src={productoChocolate}
            alt="Chocolate"
            className="absolute w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,53,64,0.12)]"
            style={{
              height: `${productSize}px`,
              left: `${productGap}px`,
              transform: 'rotate(-5deg)',
            }}
          />
          <img
            src={productoQueso}
            alt="Queso"
            className="absolute w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,53,64,0.12)]"
            style={{
              height: `${productSize}px`,
              right: `${productGap}px`,
              transform: 'rotate(5deg)',
            }}
          />
          {/* Spacer */}
          <div style={{ height: `${productSize + 40}px` }} />
        </div>
      </div>

      {/* Date label */}
      <div className="z-10 flex flex-col items-center gap-[20px]">
        <div className="rounded-full border-2 border-tertiary/15 px-[56px] py-[16px]">
          <p className="text-[36px] font-bold tracking-[10px] text-primary">{date}</p>
        </div>
        <p className="max-w-[600px] text-center text-[30px] leading-[1.4] text-on-surface-variant">
          {subtitle}
        </p>
      </div>

      {/* Handle */}
      <p className="z-10 text-[28px] font-semibold text-secondary">@fivefood.ok</p>
    </div>
  )
}

export const CountdownStyleConfig: TemplateConfig = {
  id: 'launch-countdown',
  name: 'Countdown Style',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'MUY PRONTO' },
    { key: 'date', label: 'Fecha / Etiqueta', type: 'text', default: 'PRÓXIMAMENTE' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Dos nuevos sabores que no te podés perder' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: CountdownStylePreview,
}
