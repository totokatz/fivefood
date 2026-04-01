import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function SplashLaunchPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout
  const headline = String(data.headline || '¡YA LLEGÓ!')
  const productName = String(data.productName || 'EL NUEVO SABOR')
  const cta = String(data.cta || 'COMPRÁ AHORA')

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Radiating rays — conic gradient */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2400px',
          height: '2400px',
          background: `conic-gradient(
            from 0deg at 50% 50%,
            rgba(0,180,216,0.12) 0deg,
            transparent 10deg,
            transparent 20deg,
            rgba(0,180,216,0.12) 30deg,
            transparent 40deg,
            transparent 50deg,
            rgba(0,180,216,0.12) 60deg,
            transparent 70deg,
            transparent 80deg,
            rgba(0,180,216,0.12) 90deg,
            transparent 100deg,
            transparent 110deg,
            rgba(0,180,216,0.12) 120deg,
            transparent 130deg,
            transparent 140deg,
            rgba(0,180,216,0.12) 150deg,
            transparent 160deg,
            transparent 170deg,
            rgba(0,180,216,0.12) 180deg,
            transparent 190deg,
            transparent 200deg,
            rgba(0,180,216,0.12) 210deg,
            transparent 220deg,
            transparent 230deg,
            rgba(0,180,216,0.12) 240deg,
            transparent 250deg,
            transparent 260deg,
            rgba(0,180,216,0.12) 270deg,
            transparent 280deg,
            transparent 290deg,
            rgba(0,180,216,0.12) 300deg,
            transparent 310deg,
            transparent 320deg,
            rgba(0,180,216,0.12) 330deg,
            transparent 340deg,
            transparent 350deg,
            rgba(0,180,216,0.12) 360deg
          )`,
        }}
      />

      {/* Center glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.15) 0%, rgba(0,180,216,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[160px] opacity-25" />

      {/* Headline */}
      <p
        className="z-10 mt-[60px] text-center font-black leading-[0.9]"
        style={{
          fontSize: '130px',
          color: 'white',
          textShadow: '0 0 60px rgba(0,180,216,0.4), 0 4px 20px rgba(0,0,0,0.3)',
          letterSpacing: '-3px',
        }}
      >
        {headline}
      </p>

      {/* Product name */}
      <p
        className="z-10 mt-[20px] text-[36px] font-bold tracking-[8px]"
        style={{ color: '#00b4d8' }}
      >
        {productName}
      </p>

      {/* Product at center */}
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
            filter: 'drop-shadow(0 0 60px rgba(0,180,216,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* CTA pill */}
      <div
        className="z-10 mt-auto mb-[40px] rounded-full px-[64px] py-[24px]"
        style={{
          background: '#00b4d8',
          boxShadow: '0 0 40px rgba(0,180,216,0.4), 0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <p className="text-[32px] font-bold tracking-[6px]" style={{ color: 'white' }}>
          {cta}
        </p>
      </div>

      {/* Handle */}
      <p
        className="z-10 mb-[50px] text-[26px] font-semibold"
        style={{ color: 'rgba(144,224,239,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const SplashLaunchConfig: TemplateConfig = {
  id: 'launch-splash',
  name: 'Splash Launch',
  category: 'lanzamientos',
  fields: [
    { key: 'headline', label: 'Título', type: 'text', default: '¡YA LLEGÓ!' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'EL NUEVO SABOR' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: SplashLaunchPreview,
}
