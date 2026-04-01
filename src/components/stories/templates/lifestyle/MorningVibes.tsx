import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function MorningVibesPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const greeting = (data.greeting as string) || 'Buenos días'
  const subtitle = (data.subtitle as string) || 'tu ritual saludable'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{
        background: 'linear-gradient(180deg, #f4a261 0%, #e9c46a 30%, #fdf6ec 60%, #f8fdff 100%)',
      }}
    >
      {/* Sun circle */}
      <div
        className="absolute"
        style={{
          top: '-80px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,196,106,0.7) 0%, rgba(244,162,97,0.3) 50%, transparent 70%)',
        }}
      />

      {/* Smaller inner sun */}
      <div
        className="absolute"
        style={{
          top: '40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,162,97,0.6) 0%, rgba(233,196,106,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[80px] w-[160px] opacity-30"
        style={{ zIndex: 5 }}
      />

      {/* Greeting text */}
      <div className="z-10 mt-[320px] text-center">
        <p
          className="text-[80px] font-bold tracking-[4px]"
          style={{ color: '#03045e' }}
        >
          {greeting}
        </p>
        <p
          className="mt-[8px] text-[36px] font-light tracking-[8px] uppercase"
          style={{ color: '#0077b6' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Thin cyan accent line */}
      <div
        className="mt-[40px]"
        style={{
          width: '120px',
          height: '3px',
          background: 'linear-gradient(90deg, #00b4d8, #e9c46a)',
          borderRadius: '2px',
        }}
      />

      {/* Product */}
      <div
        className="z-10 mt-[60px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 24px 48px rgba(244,162,97,0.3))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[70px] text-[26px] tracking-[3px]"
        style={{ color: 'rgba(3,4,94,0.35)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const MorningVibesConfig: TemplateConfig = {
  id: 'lifestyle-morning-vibes',
  name: 'Morning Vibes',
  category: 'lifestyle',
  fields: [
    { key: 'greeting', label: 'Saludo', type: 'text', default: 'Buenos días' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'tu ritual saludable' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: MorningVibesPreview,
}
