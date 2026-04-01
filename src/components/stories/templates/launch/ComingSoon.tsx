import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function ComingSoonPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout
  const headline = String(data.headline || 'COMING SOON')
  const date = String(data.date || '15.04.2026')
  const teaser = String(data.teaser || 'Algo increíble se viene')

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="absolute top-[60px] z-20 w-[160px] opacity-20" />

      {/* Blurred product — mystery */}
      <div
        className="z-10 flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'blur(20px) brightness(0.7)',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Headline overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <p
          className="text-center font-black leading-[0.9]"
          style={{
            fontSize: '140px',
            color: 'white',
            textShadow: '0 0 80px rgba(0,180,216,0.4), 0 4px 20px rgba(0,0,0,0.5)',
            letterSpacing: '-3px',
          }}
        >
          {headline}
        </p>

        {/* Decorative line */}
        <div
          className="mt-[40px]"
          style={{ width: '120px', height: '3px', background: '#00b4d8' }}
        />

        {/* Date */}
        <p
          className="mt-[32px] text-[48px] font-bold tracking-[12px]"
          style={{ color: '#00b4d8' }}
        >
          {date}
        </p>

        {/* Teaser */}
        <p
          className="mt-[24px] text-[30px] font-light tracking-[4px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {teaser}
        </p>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] z-20 text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const ComingSoonConfig: TemplateConfig = {
  id: 'launch-coming-soon',
  name: 'Coming Soon',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: 'COMING SOON' },
    { key: 'date', label: 'Fecha', type: 'text', default: '15.04.2026' },
    { key: 'teaser', label: 'Teaser', type: 'text', default: 'Algo increíble se viene' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: ComingSoonPreview,
}
