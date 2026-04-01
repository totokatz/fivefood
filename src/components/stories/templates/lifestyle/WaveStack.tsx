import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function WaveStackPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 550
  const lockLayout = !!data.lockLayout
  const topLine = (data.topLine as string) || 'NATURALEZA'
  const bottomLine = (data.bottomLine as string) || 'en tus manos'

  const waves = [
    { color: '#f8fdff', top: 900, curve: 'M0,80 C270,0 810,160 1080,80 L1080,1100 L0,1100 Z' },
    { color: '#caf0f8', top: 960, curve: 'M0,90 C360,10 720,170 1080,70 L1080,1100 L0,1100 Z' },
    { color: '#90e0ef', top: 1020, curve: 'M0,70 C300,150 780,0 1080,90 L1080,1100 L0,1100 Z' },
    { color: '#00b4d8', top: 1100, curve: 'M0,60 C240,140 840,10 1080,80 L1080,1100 L0,1100 Z' },
    { color: '#03045e', top: 1200, curve: 'M0,80 C350,0 730,160 1080,60 L1080,1100 L0,1100 Z' },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden font-headline"
      style={{ background: '#03045e' }}
    >
      {/* Top text */}
      <div className="relative z-20 flex flex-col items-center pt-[120px]">
        <p
          className="text-center tracking-[12px] uppercase"
          style={{ fontSize: '64px', color: '#ffffff', fontWeight: 800 }}
        >
          {topLine}
        </p>
        <p
          className="mt-[16px] text-center tracking-[6px] uppercase"
          style={{ fontSize: '32px', color: '#90e0ef', fontWeight: 300 }}
        >
          {bottomLine}
        </p>
      </div>

      {/* Product floating above waves */}
      <div
        className="relative z-20 mt-[80px] flex items-center justify-center"
        style={lockLayout ? { minHeight: '500px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.3))',
          }}
        />
      </div>

      {/* Wave layers */}
      {waves.map((wave, i) => (
        <svg
          key={i}
          className="absolute left-0"
          style={{ top: `${wave.top}px`, zIndex: i + 1 }}
          width="1080"
          height="1100"
          viewBox="0 0 1080 1100"
          preserveAspectRatio="none"
        >
          <path d={wave.curve} fill={wave.color} />
        </svg>
      ))}

      {/* Logo */}
      <img
        src={logo}
        alt="FiveFoods"
        className="absolute top-[40px] left-1/2 z-20 -translate-x-1/2"
        style={{ width: '150px', opacity: 0.25 }}
      />

      {/* Handle */}
      <p
        className="absolute bottom-[80px] left-1/2 z-20 -translate-x-1/2"
        style={{ fontSize: '24px', color: '#ffffff', opacity: 0.4 }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const WaveStackConfig: TemplateConfig = {
  id: 'lifestyle-wave-stack',
  name: 'Wave Stack',
  category: 'lifestyle',
  fields: [
    { key: 'topLine', label: 'Línea superior', type: 'text', default: 'NATURALEZA' },
    { key: 'bottomLine', label: 'Línea inferior', type: 'text', default: 'en tus manos' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: WaveStackPreview,
}
