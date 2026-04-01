import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function IngredientSpotPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const ingredient = data.ingredient || 'PROTEÍNA'
  const amount = data.amount || '25g'
  const description = data.description || 'por porción'
  const subtitle = data.subtitle || 'La base de tu snack'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#001d25' }}
    >
      {/* Large glowing spotlight circle */}
      <div
        className="absolute"
        style={{
          top: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.12) 0%, rgba(0,180,216,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Spotlight ring */}
      <div
        className="absolute"
        style={{
          top: '400px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(0,180,216,0.08)',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[160px] opacity-20" />

      {/* Ingredient name — HUGE */}
      <div className="z-10 mt-[200px] flex flex-col items-center">
        <p
          className="text-center text-[140px] font-black leading-[0.95]"
          style={{
            color: '#ffffff',
            textShadow: '0 0 100px rgba(0,180,216,0.3), 0 0 200px rgba(0,180,216,0.1)',
          }}
        >
          {ingredient}
        </p>

        {/* Amount */}
        <p
          className="mt-[30px] text-[100px] font-black leading-none"
          style={{ color: '#00b4d8' }}
        >
          {amount}
        </p>

        {/* Description */}
        <p
          className="mt-[16px] text-[32px] font-light tracking-[4px]"
          style={{ color: 'rgba(144,224,239,0.4)' }}
        >
          {description}
        </p>

        {/* Divider */}
        <div
          className="mt-[40px]"
          style={{ width: '80px', height: '2px', background: 'rgba(0,180,216,0.3)' }}
        />

        {/* Subtitle */}
        <p
          className="mt-[30px] text-[30px] font-medium"
          style={{ color: 'rgba(144,224,239,0.3)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Product at bottom */}
      <div
        className="z-10 mt-auto mb-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '400px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 60px rgba(0,180,216,0.1))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[60px] text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(144,224,239,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const IngredientSpotConfig: TemplateConfig = {
  id: 'nutri-ingredient-spot',
  name: 'Ingredient Spotlight',
  category: 'nutricional',
  fields: [
    { key: 'ingredient', label: 'Ingrediente', type: 'text', default: 'PROTEÍNA' },
    { key: 'amount', label: 'Cantidad', type: 'text', default: '25g' },
    { key: 'description', label: 'Descripción', type: 'text', default: 'por porción' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'La base de tu snack' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: IngredientSpotPreview,
}
