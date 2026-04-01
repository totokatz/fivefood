import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SilhouetteTeasePreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 600
  const lockLayout = !!data.lockLayout
  const question = String(data.question || '¿QUÉ SERÁ?')
  const hint = String(data.hint || 'Muy pronto lo vas a saber')
  const revealed = !!data.revealed

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-headline"
      style={{
        background: 'linear-gradient(135deg, #03045e 0%, #0077b6 50%, #00b4d8 100%)',
      }}
    >
      {/* Floating question marks */}
      {['120px', '800px', '300px', '1400px', '600px', '1100px'].map((top, i) => (
        <p
          key={i}
          className="pointer-events-none absolute"
          style={{
            top,
            left: `${[80, 750, 900, 150, 650, 50][i]}px`,
            fontSize: `${[120, 90, 70, 100, 80, 110][i]}px`,
            color: 'rgba(255,255,255,0.04)',
            fontWeight: 900,
            transform: `rotate(${[15, -10, 25, -20, 5, -15][i]}deg)`,
          }}
        >
          ?
        </p>
      ))}

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="absolute top-[60px] z-20 w-[160px] opacity-20" />

      {/* Question text */}
      <p
        className="z-20 text-center font-black leading-[0.9]"
        style={{
          fontSize: '120px',
          color: 'white',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          letterSpacing: '-2px',
        }}
      >
        {question}
      </p>

      {/* Product — silhouette or revealed */}
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
            filter: revealed
              ? 'drop-shadow(0 20px 60px rgba(0,0,0,0.3))'
              : 'brightness(0) drop-shadow(0 20px 60px rgba(0,0,0,0.3))',
            transition: 'filter 0.5s ease',
          }}
        />
      </div>

      {/* Hint */}
      <p
        className="z-20 mt-[40px] text-[30px] font-medium tracking-[4px]"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {hint}
      </p>

      {/* Handle */}
      <p
        className="absolute bottom-[60px] z-20 text-[26px] font-semibold"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const SilhouetteTeaseConfig: TemplateConfig = {
  id: 'launch-silhouette-tease',
  name: 'Silhouette Tease',
  category: 'lanzamientos',
  fields: [
    { key: 'question', label: 'Pregunta', type: 'text', default: '¿QUÉ SERÁ?' },
    { key: 'hint', label: 'Pista', type: 'text', default: 'Muy pronto lo vas a saber' },
    { key: 'revealed', label: 'Revelar producto', type: 'checkbox', default: false },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SilhouetteTeasePreview,
}
