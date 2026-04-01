import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GlassMorphPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 520
  const lockLayout = !!data.lockLayout
  const title = (data.title as string) || 'SNACK INTELIGENTE'
  const description = (data.description as string) || 'Proteína real, sabor increíble'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{
        background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 40%, #03045e 70%, #2d1b69 100%)',
      }}
    >
      {/* Decorative blurred circles */}
      <div
        className="absolute"
        style={{
          top: '200px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(144,224,239,0.3)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '300px',
          right: '-80px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(100,60,180,0.3)',
          filter: 'blur(80px)',
        }}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[70px] w-[170px] opacity-30"
        style={{ zIndex: 10 }}
      />

      {/* Product peeks above card */}
      <div
        className="relative z-20 mb-[-180px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
          }}
        />
      </div>

      {/* Glass card */}
      <div
        className="relative z-10 flex flex-col items-center px-[80px] pt-[200px] pb-[80px]"
        style={{
          width: '860px',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '40px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <p
          className="text-center text-[52px] font-bold tracking-[8px] uppercase"
          style={{ color: '#ffffff' }}
        >
          {title}
        </p>

        <div
          className="my-[24px]"
          style={{
            width: '60px',
            height: '3px',
            background: 'rgba(144,224,239,0.6)',
            borderRadius: '2px',
          }}
        />

        <p
          className="text-center text-[34px] font-light leading-[48px]"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {description}
        </p>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] text-[24px] tracking-[4px]"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const GlassMorphConfig: TemplateConfig = {
  id: 'lifestyle-glass-morph',
  name: 'Glass Morph',
  category: 'lifestyle',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: 'SNACK INTELIGENTE' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'Proteína real, sabor increíble' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GlassMorphPreview,
}
