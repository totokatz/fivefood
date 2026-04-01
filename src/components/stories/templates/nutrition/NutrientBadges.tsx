import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

const badgeGradients = [
  'linear-gradient(135deg, rgba(0,180,216,0.25) 0%, rgba(0,119,182,0.15) 100%)',
  'linear-gradient(135deg, rgba(144,224,239,0.2) 0%, rgba(0,180,216,0.12) 100%)',
  'linear-gradient(135deg, rgba(0,119,182,0.25) 0%, rgba(3,4,94,0.15) 100%)',
  'linear-gradient(135deg, rgba(0,180,216,0.2) 0%, rgba(144,224,239,0.1) 100%)',
  'linear-gradient(135deg, rgba(3,4,94,0.3) 0%, rgba(0,119,182,0.15) 100%)',
  'linear-gradient(135deg, rgba(144,224,239,0.25) 0%, rgba(0,119,182,0.1) 100%)',
]

export function NutrientBadgesPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout

  const badges = [
    String(data.badge1 || 'P 25g'),
    String(data.badge2 || 'Fe 6mg'),
    String(data.badge3 || 'Ca 300mg'),
    String(data.badge4 || 'Fi 8g'),
    String(data.badge5 || 'Vit D'),
    String(data.badge6 || 'B12'),
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] w-[160px] opacity-20" />

      {/* Title */}
      <p
        className="z-10 mt-[50px] text-[36px] font-bold tracking-[6px]"
        style={{ color: 'rgba(144,224,239,0.6)' }}
      >
        NUTRIENTES CLAVE
      </p>

      {/* Badge grid — 2x3 */}
      <div
        className="z-10 mt-[60px] grid gap-[28px] px-[80px]"
        style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        {badges.map((badge, i) => {
          const parts = badge.split(' ')
          const abbr = parts[0] || ''
          const value = parts.slice(1).join(' ') || ''
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-full"
              style={{
                width: '240px',
                height: '240px',
                background: badgeGradients[i],
                border: '1px solid rgba(0,180,216,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="text-[52px] font-black leading-none"
                style={{ color: '#00b4d8' }}
              >
                {abbr}
              </p>
              {value && (
                <p
                  className="mt-[8px] text-[28px] font-medium leading-none"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {value}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Product */}
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
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[50px] text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.4)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const NutrientBadgesConfig: TemplateConfig = {
  id: 'nutri-nutrient-badges',
  name: 'Nutrient Badges',
  category: 'nutricional',
  fields: [
    { key: 'badge1', label: 'Badge 1', type: 'text', default: 'P 25g' },
    { key: 'badge2', label: 'Badge 2', type: 'text', default: 'Fe 6mg' },
    { key: 'badge3', label: 'Badge 3', type: 'text', default: 'Ca 300mg' },
    { key: 'badge4', label: 'Badge 4', type: 'text', default: 'Fi 8g' },
    { key: 'badge5', label: 'Badge 5', type: 'text', default: 'Vit D' },
    { key: 'badge6', label: 'Badge 6', type: 'text', default: 'B12' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: NutrientBadgesPreview,
}
