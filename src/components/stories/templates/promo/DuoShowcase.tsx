import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import simbolo from '../../../../assets/logos/simbolo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, PRODUCT_GAP_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function DuoShowcasePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const promoText = data.promoText || '2x1'
  const cta = data.cta || 'COMPRÁ AHORA'
  const productSize = Number(data.productSize) || 1000
  const productGap = data.productGap != null ? Number(data.productGap) : 40
  const lockLayout = !!data.lockLayout

  const secondary = product === 'chocolate' ? 'queso' : 'chocolate'

  return (
    <div className="relative flex h-full w-full overflow-hidden font-headline">
      {/* Left half — deep navy */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{ width: '50%', background: '#03045e' }}
      />
      {/* Right half — ice white */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: '50%', background: '#f8fdff' }}
      />

      {/* Thin accent line at the split */}
      <div
        className="absolute top-0 h-full"
        style={{
          left: '50%',
          width: '3px',
          background: 'linear-gradient(180deg, transparent 5%, #00b4d8 30%, #00b4d8 70%, transparent 95%)',
          transform: 'translateX(-50%)',
          zIndex: 5,
        }}
      />

      {/* Massive promo text — bleeds across the split */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <p
          className="text-[220px] font-black leading-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 48%, rgba(3,4,94,0.08) 52%, rgba(3,4,94,0.08) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {promoText}
        </p>
      </div>

      {/* Simbolo top-left */}
      <div className="absolute top-[80px] left-[80px] z-10">
        <img src={simbolo} alt="FiveFoods" className="w-[48px] opacity-40" style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Left product — on navy side */}
      <div
        className="absolute z-20 flex items-center justify-center"
        style={{
          top: '50%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          ...(lockLayout ? { minHeight: '600px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            transform: `translateX(-${productGap}px)`,
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.35))',
          }}
        />
      </div>

      {/* Right product — on white side */}
      <div
        className="absolute z-20 flex items-center justify-center"
        style={{
          top: '50%',
          right: '25%',
          transform: 'translate(50%, -50%)',
          ...(lockLayout ? { minHeight: '600px' } : {}),
        }}
      >
        <img
          src={products[secondary as keyof typeof products]}
          alt={secondary}
          className="w-auto object-contain"
          style={{
            height: `${productSize * 0.92}px`,
            transform: `translateX(${productGap}px)`,
            filter: 'drop-shadow(0 30px 60px rgba(0,119,182,0.2))',
          }}
        />
      </div>

      {/* Bottom CTA bar — spans full width */}
      <div className="absolute bottom-0 z-30 flex w-full flex-col items-center pb-[100px]">
        <div
          className="rounded-full px-[72px] py-[24px]"
          style={{ background: '#00b4d8', boxShadow: '0 8px 40px rgba(0,180,216,0.3)' }}
        >
          <p className="text-[34px] font-bold tracking-[4px] text-white">{cta}</p>
        </div>
        <p className="mt-[24px] text-[24px] font-light tracking-[4px]" style={{ color: 'rgba(3,4,94,0.3)' }}>
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const DuoShowcaseConfig: TemplateConfig = {
  id: 'promo-duo-showcase',
  name: 'Duo Showcase',
  category: 'promociones',
  fields: [
    { key: 'promoText', label: 'Texto promo', type: 'text', default: '2x1' },
    { key: 'cta', label: 'Call to action', type: 'text', default: 'COMPRÁ AHORA' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    PRODUCT_GAP_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: DuoShowcasePreview,
}
