import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function HealthMeterPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const score = String(data.score || '92')
  const scoreLabel = String(data.scoreLabel || 'HEALTH SCORE')
  const subtitle = String(data.subtitle || 'Puntuación nutricional')

  const scoreNum = Math.min(100, Math.max(0, parseInt(score) || 92))
  // Needle angle: 0 = left (red), 180 = right (green). Map score 0-100 to 0-180deg
  const needleAngle = (scoreNum / 100) * 180

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[60px] w-[160px] opacity-20" />

      {/* Score label */}
      <p
        className="z-10 mt-[60px] text-[32px] font-bold tracking-[8px]"
        style={{ color: 'rgba(144,224,239,0.5)' }}
      >
        {scoreLabel}
      </p>

      {/* Semicircular meter */}
      <div className="z-10 relative mt-[40px]" style={{ width: '700px', height: '350px' }}>
        {/* Meter arc */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: `conic-gradient(from 180deg at 50% 50%, #ef4444 0deg, #f59e0b 60deg, #22c55e 120deg, #00b4d8 180deg, transparent 180deg)`,
            clipPath: 'inset(0 0 50% 0)',
          }}
        />
        {/* Inner cutout */}
        <div
          className="absolute"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #001d25, #03045e)',
            top: '100px',
            left: '100px',
            clipPath: 'inset(0 0 50% 0)',
          }}
        />
        {/* Tick marks */}
        {[0, 45, 90, 135, 180].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{
              width: '4px',
              height: '30px',
              background: 'rgba(255,255,255,0.3)',
              bottom: '0px',
              left: '348px',
              transformOrigin: '50% -250px',
              transform: `rotate(${deg - 90}deg) translateY(50px)`,
            }}
          />
        ))}
        {/* Needle */}
        <div
          className="absolute"
          style={{
            width: '6px',
            height: '260px',
            background: 'linear-gradient(to top, #00b4d8, white)',
            bottom: '0px',
            left: '347px',
            transformOrigin: '50% 100%',
            transform: `rotate(${needleAngle - 90}deg)`,
            borderRadius: '3px',
            filter: 'drop-shadow(0 0 12px rgba(0,180,216,0.6))',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute"
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#00b4d8',
            bottom: '-12px',
            left: '338px',
            boxShadow: '0 0 20px rgba(0,180,216,0.6)',
          }}
        />
        {/* Score number */}
        <div className="absolute bottom-[-20px] left-0 right-0 flex justify-center">
          <p
            className="text-[160px] font-black leading-none"
            style={{ color: '#00b4d8', textShadow: '0 0 60px rgba(0,180,216,0.3)' }}
          >
            {score}
          </p>
        </div>
      </div>

      {/* Subtitle */}
      <p
        className="z-10 mt-[80px] text-[30px] font-medium tracking-[4px]"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {subtitle}
      </p>

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

export const HealthMeterConfig: TemplateConfig = {
  id: 'nutri-health-meter',
  name: 'Health Meter',
  category: 'nutricional',
  fields: [
    { key: 'score', label: 'Puntaje', type: 'text', default: '92' },
    { key: 'scoreLabel', label: 'Etiqueta puntaje', type: 'text', default: 'HEALTH SCORE' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Puntuación nutricional' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: HealthMeterPreview,
}
