import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

export function SpotlightDuoPreview({ data }: TemplateProps) {
  const badge = data.badge || '★ NUEVO ★'
  const productName = data.productName || 'Chocolate & Queso'
  const cta = data.cta || 'DISPONIBLE AHORA'
  const productSize = Number(data.productSize) || 1000
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Concentric light rings */}
      {[700, 500, 300].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            border: `1px solid rgba(0,180,216,${0.04 + i * 0.03})`,
            top: '48%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Soft radial spotlight */}
      <div
        className="absolute"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, rgba(0,119,182,0.05) 40%, transparent 70%)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Logo top */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[80px] w-[180px] opacity-20" />

      {/* Badge — glass pill */}
      <div
        className="z-10 mt-[60px] rounded-full px-[48px] py-[14px]"
        style={{
          background: 'rgba(0,180,216,0.08)',
          border: '1px solid rgba(0,180,216,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-[28px] font-semibold tracking-[8px]" style={{ color: '#00b4d8' }}>
          {badge}
        </p>
      </div>

      {/* Product name — large, centered */}
      <p
        className="z-10 mt-[40px] text-center text-[56px] font-bold leading-[1.1]"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        {productName}
      </p>

      {/* Products — stage center, overlapping slightly */}
      <div
        className="z-10 mt-[20px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={productoChocolate}
            alt="Chocolate"
            className="w-auto object-contain"
            style={{
              height: `${productSize}px`,
              transform: `translateX(${productGap}px) rotate(-5deg)`,
              filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.4)) drop-shadow(0 0 60px rgba(0,180,216,0.08))',
              zIndex: 1,
            }}
          />
          <img
            src={productoQueso}
            alt="Queso"
            className="w-auto object-contain"
            style={{
              height: `${productSize * 0.95}px`,
              transform: `translateX(-${productGap}px) rotate(5deg)`,
              filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.4)) drop-shadow(0 0 60px rgba(0,180,216,0.08))',
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* CTA button */}
      <div className="z-10 mb-[100px] flex flex-col items-center gap-[20px]">
        <div
          className="rounded-full px-[64px] py-[22px]"
          style={{
            background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
            boxShadow: '0 8px 40px rgba(0,180,216,0.25), 0 0 0 1px rgba(144,224,239,0.15)',
          }}
        >
          <p className="text-[32px] font-bold tracking-[4px] text-white">{cta}</p>
        </div>
        <p className="text-[24px] font-light tracking-[4px]" style={{ color: 'rgba(144,224,239,0.2)' }}>
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const SpotlightDuoConfig: TemplateConfig = {
  id: 'launch-spotlight-duo',
  name: 'Spotlight Duo',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ NUEVO ★' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Chocolate & Queso' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'DISPONIBLE AHORA' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SpotlightDuoPreview,
}
