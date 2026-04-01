import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logo from '../../../../assets/logos/logo.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function RadialProgressPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const stat1Label = data.stat1Label || 'Proteína'
  const stat1Value = Number(data.stat1Value) || 85
  const stat2Label = data.stat2Label || 'Fibra'
  const stat2Value = Number(data.stat2Value) || 60
  const stat3Label = data.stat3Label || 'Vitaminas'
  const stat3Value = Number(data.stat3Value) || 70
  const productSize = Number(data.productSize) || 400
  const lockLayout = !!data.lockLayout

  const rings = [
    { size: 700, value: stat1Value, color: '#00b4d8', label: stat1Label, trackColor: 'rgba(0,180,216,0.1)' },
    { size: 540, value: stat2Value, color: '#0077b6', label: stat2Label, trackColor: 'rgba(0,119,182,0.1)' },
    { size: 380, value: stat3Value, color: '#03045e', label: stat3Label, trackColor: 'rgba(3,4,94,0.15)' },
  ]

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: 'linear-gradient(180deg, #001d25 0%, #03045e 100%)' }}
    >
      {/* Logo */}
      <img src={logo} alt="FiveFoods" className="z-10 mt-[70px] w-[160px] opacity-20" />

      {/* Rings container */}
      <div
        className="relative z-10 mt-[100px] flex items-center justify-center"
        style={{ width: '750px', height: '750px' }}
      >
        {/* Nested rings */}
        {rings.map((ring, i) => {
          const deg = (ring.value / 100) * 360
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: `${ring.size}px`,
                height: `${ring.size}px`,
                background: `conic-gradient(${ring.color} 0deg, ${ring.color} ${deg}deg, ${ring.trackColor} ${deg}deg, ${ring.trackColor} 360deg)`,
                mask: `radial-gradient(circle, transparent ${(ring.size / 2) - 30}px, black ${(ring.size / 2) - 30}px, black ${ring.size / 2}px, transparent ${ring.size / 2}px)`,
                WebkitMask: `radial-gradient(circle, transparent ${(ring.size / 2) - 30}px, black ${(ring.size / 2) - 30}px, black ${ring.size / 2}px, transparent ${ring.size / 2}px)`,
              }}
            />
          )
        })}

        {/* Product at center */}
        <div
          className="absolute z-10 flex items-center justify-center"
          style={lockLayout ? { minHeight: '300px' } : undefined}
        >
          <img
            src={products[product as keyof typeof products]}
            alt={product}
            className="w-auto object-contain"
            style={{
              height: `${productSize}px`,
              filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.4))',
            }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="z-10 mt-[80px] flex gap-[60px]">
        {rings.map((ring, i) => (
          <div key={i} className="flex flex-col items-center gap-[10px]">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '80px',
                height: '80px',
                background: ring.color,
                boxShadow: `0 0 30px ${ring.color}40`,
              }}
            >
              <p className="text-[28px] font-black text-white">{ring.value}%</p>
            </div>
            <p className="text-[26px] font-medium" style={{ color: 'rgba(144,224,239,0.6)' }}>
              {ring.label}
            </p>
          </div>
        ))}
      </div>

      {/* Handle */}
      <p
        className="z-10 mt-auto mb-[60px] text-[26px] font-light tracking-[4px]"
        style={{ color: 'rgba(144,224,239,0.25)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const RadialProgressConfig: TemplateConfig = {
  id: 'nutri-radial-progress',
  name: 'Radial Progress',
  category: 'nutricional',
  fields: [
    { key: 'stat1Label', label: 'Stat 1 nombre', type: 'text', default: 'Proteína' },
    { key: 'stat1Value', label: 'Stat 1 valor (%)', type: 'text', default: '85' },
    { key: 'stat2Label', label: 'Stat 2 nombre', type: 'text', default: 'Fibra' },
    { key: 'stat2Value', label: 'Stat 2 valor (%)', type: 'text', default: '60' },
    { key: 'stat3Label', label: 'Stat 3 nombre', type: 'text', default: 'Vitaminas' },
    { key: 'stat3Value', label: 'Stat 3 valor (%)', type: 'text', default: '70' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: RadialProgressPreview,
}
