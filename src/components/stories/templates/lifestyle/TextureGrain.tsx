import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function TextureGrainPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 520
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'ARTESANAL'
  const subtitle = (data.subtitle as string) || 'Hecho con intención'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{ background: '#f5f0e8' }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 1,
        }}
      />

      {/* Additional CSS grain layer for density */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.008) 2px, rgba(0,0,0,0.008) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.006) 2px, rgba(0,0,0,0.006) 4px)',
        }}
      />

      {/* Headline — large, light weight */}
      <p
        className="relative z-10 text-center tracking-[14px] uppercase"
        style={{
          fontSize: '88px',
          color: '#03045e',
          fontWeight: 300,
          lineHeight: 1,
          marginTop: '-200px',
        }}
      >
        {headline}
      </p>

      {/* Thin decorative line */}
      <div
        className="relative z-10 my-[30px]"
        style={{
          width: '160px',
          height: '1px',
          background: '#0077b6',
          opacity: 0.3,
        }}
      />

      {/* Subtitle */}
      <p
        className="relative z-10 text-center tracking-[6px] uppercase"
        style={{
          fontSize: '28px',
          color: '#40484c',
          fontWeight: 300,
        }}
      >
        {subtitle}
      </p>

      {/* Product */}
      <div
        className="relative z-10 mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.08))',
          }}
        />
      </div>

      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ width: '150px', opacity: 0.18 }}
      />

      {/* Handle */}
      <p
        className="absolute bottom-[80px] left-1/2 z-10 -translate-x-1/2"
        style={{ fontSize: '22px', color: '#40484c', opacity: 0.35 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const TextureGrainConfig: TemplateConfig = {
  id: 'lifestyle-texture-grain',
  name: 'Texture Grain',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Titular', type: 'text', default: 'ARTESANAL' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Hecho con intención' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: TextureGrainPreview,
}
