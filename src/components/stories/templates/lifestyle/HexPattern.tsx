import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function HexPatternPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const tagline = (data.tagline as string) || 'ESTRUCTURA NATURAL'
  const productSize = Number(data.productSize) || 1000
  const lockLayout = !!data.lockLayout

  // Build a grid of hexagon outlines
  const hexSize = 80
  const hexWidth = hexSize * 2
  const hexHeight = Math.sqrt(3) * hexSize
  const cols = 10
  const rows = 18
  const hexagons: { cx: number; cy: number }[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * hexWidth * 0.75
      const cy = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0)
      hexagons.push({ cx, cy })
    }
  }

  const hexPath = (cx: number, cy: number, size: number) => {
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30)
      points.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`)
    }
    return points.join(' ')
  }

  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Hex pattern SVG background */}
      <svg
        className="absolute inset-0"
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hexagons.map((h, i) => (
          <polygon
            key={i}
            points={hexPath(h.cx, h.cy, hexSize)}
            fill="none"
            stroke="rgba(144,224,239,0.12)"
            strokeWidth="1.5"
          />
        ))}
        {/* Highlighted hexagon behind product center */}
        <polygon
          points={hexPath(540, 960, hexSize * 2.5)}
          fill="rgba(0,180,216,0.08)"
          stroke="rgba(0,180,216,0.25)"
          strokeWidth="2"
        />
      </svg>

      {/* Logo top */}
      <img
        src={logoBlue}
        alt="FiveFoods"
        className="z-10 mt-[80px] w-[160px] opacity-20"
      />

      {/* Tagline — top area */}
      <div className="z-10 mt-[140px] flex flex-col items-center">
        <p
          className="text-center text-[56px] font-black tracking-[10px] uppercase"
          style={{ color: '#03045e' }}
        >
          {tagline}
        </p>

        {/* Accent underline */}
        <div
          className="mt-[20px]"
          style={{
            width: '140px',
            height: '3px',
            background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Product — centered and large */}
      <div
        className="z-10 mt-[40px] flex flex-1 items-center justify-center"
        style={lockLayout ? { minHeight: '600px' } : undefined}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter:
              'drop-shadow(0 30px 70px rgba(3,4,94,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
          }}
        />
      </div>

      {/* Handle bottom */}
      <p
        className="z-10 mb-[80px] text-[26px] tracking-[4px]"
        style={{ color: 'rgba(3,4,94,0.3)' }}
      >
        @fivefood.ok
      </p>
    </div>
  )
}

export const HexPatternConfig: TemplateConfig = {
  id: 'lifestyle-hex-pattern',
  name: 'Hex Pattern',
  category: 'lifestyle',
  fields: [
    { key: 'tagline', label: 'Tagline', type: 'text', default: 'ESTRUCTURA NATURAL' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: HexPatternPreview,
}
