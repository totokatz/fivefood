import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function FramedDuoPreview({ data }: TemplateProps) {
  const headline = data.headline || 'NUEVOS\nSABORES'
  const subtitle = data.subtitle || 'Ya disponibles en nuestra web'
  const productSize = Number(data.productSize) || 380
  const productGap = data.productGap != null ? Number(data.productGap) : 100
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-white px-[60px] py-[100px] font-headline">
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="w-[200px] opacity-50" />

      {/* Headline */}
      <p className="whitespace-pre-line text-center text-[72px] font-black leading-[1.05] text-tertiary">
        {headline}
      </p>

      {/* Framed duo */}
      <div
        className="relative flex w-full items-center justify-center"
        style={lockLayout ? { minHeight: '560px' } : undefined}
      >
        {/* Frame 1 — slight left tilt */}
        <div
          className="absolute"
          style={{
            width: '380px',
            height: '480px',
            border: '3px solid #03045e',
            borderRadius: '24px',
            transform: 'rotate(-4deg) translateX(-80px)',
            opacity: 0.2,
          }}
        />
        {/* Frame 2 — slight right tilt */}
        <div
          className="absolute"
          style={{
            width: '380px',
            height: '480px',
            border: '3px solid #00b4d8',
            borderRadius: '24px',
            transform: 'rotate(4deg) translateX(80px)',
            opacity: 0.25,
          }}
        />

        {/* Product 1 in left frame */}
        <img
          src={productoChocolate}
          alt="Chocolate"
          className="absolute w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          style={{
            height: `${productSize}px`,
            transform: `rotate(-4deg) translateX(-${productGap}px)`,
          }}
        />
        {/* Product 2 in right frame */}
        <img
          src={productoQueso}
          alt="Queso"
          className="absolute w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          style={{
            height: `${productSize}px`,
            transform: `rotate(4deg) translateX(${productGap}px)`,
          }}
        />
        {/* Height spacer */}
        <div style={{ height: `${Math.max(productSize + 80, 500)}px` }} />
      </div>

      {/* Subtitle */}
      <p className="text-[30px] text-on-surface-variant">{subtitle}</p>

      {/* Handle */}
      <p className="text-[28px] font-semibold text-secondary">@fivefood.ok</p>
    </div>
  )
}

export const FramedDuoConfig: TemplateConfig = {
  id: 'launch-framed-duo',
  name: 'Framed Duo',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'NUEVOS\nSABORES' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Ya disponibles en nuestra web' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: FramedDuoPreview,
}
