import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DuoBalancePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'
  const accentWord = data.accentWord || 'balance'
  const tagline = data.tagline || 'Snack inteligente, sabor real'
  const productSize = Number(data.productSize) || 500
  const productGap = data.productGap != null ? Number(data.productGap) : 0
  const lockLayout = !!data.lockLayout

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-white px-[80px] py-[100px] font-headline">
      {/* Logo */}
      <img src={logoBlue} alt="FiveFoods" className="w-[200px] opacity-50" />

      {/* Composition area */}
      <div
        className="relative flex w-full flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '900px' } : undefined}
      >
        {/* Thin accent line — top-right to center */}
        <div
          className="absolute bg-primary"
          style={{
            width: '1px',
            height: '300px',
            top: '60px',
            right: '140px',
            transform: 'rotate(-35deg)',
            transformOrigin: 'top right',
            opacity: 0.3,
          }}
        />

        {/* Thin accent line — bottom-left to center */}
        <div
          className="absolute bg-primary"
          style={{
            width: '1px',
            height: '300px',
            bottom: '60px',
            left: '140px',
            transform: 'rotate(-35deg)',
            transformOrigin: 'bottom left',
            opacity: 0.3,
          }}
        />

        {/* Primary product — top right */}
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="absolute w-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          style={{
            height: `${productSize * 0.75}px`,
            top: '40px',
            right: `${productGap}px`,
            transform: 'rotate(5deg)',
          }}
        />

        {/* Accent word centered */}
        <p className="font-accent text-[130px] leading-none text-primary/20">{accentWord}</p>

        {/* Secondary product — bottom left */}
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="absolute w-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          style={{
            height: `${productSize * 0.75}px`,
            bottom: '40px',
            left: `${productGap}px`,
            transform: 'rotate(-5deg)',
          }}
        />
      </div>

      {/* Tagline + handle */}
      <div className="text-center">
        <p className="text-[32px] font-light tracking-[4px] text-on-surface-variant uppercase">
          {tagline}
        </p>
        <p className="mt-4 text-[28px] text-secondary/50">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const DuoBalanceConfig: TemplateConfig = {
  id: 'lifestyle-duo-balance',
  name: 'Duo Balance',
  category: 'lifestyle',
  fields: [
    { key: 'accentWord', label: 'Palabra accent', type: 'text', default: 'balance' },
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'Snack inteligente, sabor real' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DuoBalancePreview,
}
