import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function PolaroidSnapPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 480
  const lockLayout = !!data.lockLayout
  const caption = (data.caption as string) || 'Snack time'
  const accentWord = (data.accentWord as string) || 'perfecto'

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{
        background: '#e8e8e8',
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
      }}
    >
      {/* Logo */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="absolute top-[70px] w-[150px] opacity-20"
      />

      {/* Polaroid frame */}
      <div
        className="flex flex-col items-center"
        style={{
          background: '#ffffff',
          padding: '40px 40px 100px 40px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          transform: 'rotate(-2.5deg)',
          width: '740px',
        }}
      >
        {/* Photo area */}
        <div
          className="flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #f8fdff 0%, #e0f7fa 50%, #f0f9ff 100%)',
            width: '660px',
            height: '660px',
            ...(lockLayout ? { minHeight: '660px' } : {}),
          }}
        >
          <img
            src={products[product as keyof typeof products]}
            alt={product}
            className="w-auto object-contain"
            style={{
              height: `${productSize}px`,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))',
              transform: 'rotate(2.5deg)',
            }}
          />
        </div>

        {/* Caption below photo */}
        <div className="mt-[30px] text-center">
          <p className="text-[42px] text-[#03045e]">
            {caption}{' '}
            <span className="font-accent text-[48px]" style={{ color: '#00b4d8' }}>
              {accentWord}
            </span>
          </p>
        </div>
      </div>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] text-[24px] tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const PolaroidSnapConfig: TemplateConfig = {
  id: 'lifestyle-polaroid-snap',
  name: 'Polaroid Snap',
  category: 'lifestyle',
  fields: [
    { key: 'caption', label: 'Texto', type: 'text', default: 'Snack time' },
    { key: 'accentWord', label: 'Palabra acento', type: 'text', default: 'perfecto' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: PolaroidSnapPreview,
}
