import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoWhite from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DarkCardsPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const stat1Val = data.stat1Val || '8g'
  const stat1Label = data.stat1Label || 'Proteína de arveja'
  const stat2Val = data.stat2Val || '0g'
  const stat2Label = data.stat2Label || 'Grasas trans'
  const stat3Val = data.stat3Val || '✓'
  const stat3Label = data.stat3Label || 'Sin TACC · Vegano'
  const tagline = data.tagline || 'Cada dato cuenta'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  const cards = [
    { val: stat1Val, label: stat1Label },
    { val: stat2Val, label: stat2Label },
    { val: stat3Val, label: stat3Label },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Top-down light cone effect */}
      <div
        className="absolute"
        style={{
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '800px',
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 30%, rgba(0,180,216,0.06) 45%, rgba(0,180,216,0.1) 50%, rgba(0,180,216,0.06) 55%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <img src={logoWhite} alt="FiveFoods" className="z-10 mt-[70px] w-[180px] opacity-20" />

      {/* Product — centered with dramatic shadow */}
      <div
        className="z-10 mt-[40px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 80px rgba(0,180,216,0.1))',
          }}
        />
      </div>

      {/* Stats cards — luminous panels */}
      <div className="z-10 mt-[40px] flex w-full flex-col gap-[16px] px-[72px]">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative flex items-center gap-[36px] overflow-hidden rounded-[24px] px-[44px] py-[36px]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,180,216,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(0,180,216,0.1)',
            }}
          >
            {/* Glow accent on left edge */}
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: '3px',
                background: 'linear-gradient(180deg, rgba(0,180,216,0.4), rgba(144,224,239,0.1))',
              }}
            />
            <p
              className="min-w-[120px] text-[60px] font-black leading-none"
              style={{ color: '#00b4d8' }}
            >
              {card.val}
            </p>
            <p className="text-[28px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div className="z-10 mt-auto mb-[80px] flex flex-col items-center gap-[12px]">
        <div style={{ width: '40px', height: '2px', background: 'rgba(0,180,216,0.3)' }} />
        <p className="text-[26px] font-light tracking-[4px]" style={{ color: 'rgba(144,224,239,0.25)' }}>
          {tagline}
        </p>
      </div>
    </div>
  )
}

export const DarkCardsConfig: TemplateConfig = {
  id: 'nutri-dark-cards',
  name: 'Dark Cards',
  category: 'nutricional',
  fields: [
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', default: 'Proteína de arveja' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '0g' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', default: 'Grasas trans' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '✓' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', default: 'Sin TACC · Vegano' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Cada dato cuenta' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DarkCardsPreview,
}
