import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import logoBlue from '../../../../assets/logos/logo-blue.svg'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD, LOCK_LAYOUT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function GridSnapPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const productSize = Number(data.productSize) || 500
  const lockLayout = !!data.lockLayout
  const headline = (data.headline as string) || 'EDITORIAL'
  const subtitle = (data.subtitle as string) || 'Snack con actitud'

  // 3-column, multi-row magazine grid
  const colW = 360 // 1080 / 3
  const borderColor = 'rgba(3,4,94,0.1)'

  return (
    <div
      className="relative flex h-full w-full overflow-hidden font-headline"
      style={{ background: '#f8fdff' }}
    >
      {/* Vertical grid lines */}
      <div className="absolute left-0 top-0 h-full w-full">
        <div
          className="absolute top-0 h-full"
          style={{ left: `${colW}px`, width: '1px', background: borderColor }}
        />
        <div
          className="absolute top-0 h-full"
          style={{ left: `${colW * 2}px`, width: '1px', background: borderColor }}
        />
        {/* Horizontal grid lines */}
        {[320, 640, 960, 1280, 1600].map((y) => (
          <div
            key={y}
            className="absolute left-0 w-full"
            style={{ top: `${y}px`, height: '1px', background: borderColor }}
          />
        ))}
      </div>

      {/* Cell: Headline — spans col 1-2, row 1 */}
      <div
        className="absolute flex items-end"
        style={{
          top: '0px',
          left: '0px',
          width: `${colW * 2}px`,
          height: '320px',
          padding: '40px 50px',
        }}
      >
        <p
          className="tracking-[8px] uppercase"
          style={{ fontSize: '72px', color: '#03045e', fontWeight: 800, lineHeight: 1 }}
        >
          {headline}
        </p>
      </div>

      {/* Cell: Logo — col 3, row 1 */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '0px',
          left: `${colW * 2}px`,
          width: `${colW}px`,
          height: '320px',
        }}
      >
        <img src={logoBlue} alt="FiveFoods" style={{ width: '120px', opacity: 0.3 }} />
      </div>

      {/* Cell: Color block — col 1, row 2 */}
      <div
        className="absolute"
        style={{
          top: '320px',
          left: '0px',
          width: `${colW}px`,
          height: '320px',
          background: '#03045e',
        }}
      />

      {/* Cell: Subtitle in navy block */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '320px',
          left: '0px',
          width: `${colW}px`,
          height: '320px',
          padding: '40px',
        }}
      >
        <p
          className="text-center tracking-[4px] uppercase"
          style={{ fontSize: '26px', color: '#90e0ef', fontWeight: 300 }}
        >
          {subtitle}
        </p>
      </div>

      {/* Cell: Product — spans col 2-3, rows 2-4 (large area) */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          top: '320px',
          left: `${colW}px`,
          width: `${colW * 2}px`,
          height: '960px',
          ...(lockLayout ? { minHeight: '500px' } : {}),
        }}
      >
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="w-auto object-contain"
          style={{
            height: `${productSize}px`,
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.12))',
          }}
        />
      </div>

      {/* Cell: Cyan accent block — col 1, row 4 */}
      <div
        className="absolute"
        style={{
          top: '960px',
          left: '0px',
          width: `${colW}px`,
          height: '320px',
          background: '#00b4d8',
          opacity: 0.15,
        }}
      />

      {/* Cell: Brand mark — col 1, row 3 */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: '640px',
          left: '0px',
          width: `${colW}px`,
          height: '320px',
        }}
      >
        <p
          className="tracking-[6px] uppercase"
          style={{ fontSize: '18px', color: '#03045e', fontWeight: 400, opacity: 0.3 }}
        >
          FIVE<br />FOODS
        </p>
      </div>

      {/* Bottom row — col 1-3, row 6 */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          top: '1600px',
          left: '0px',
          width: '1080px',
          height: '320px',
          padding: '0 50px',
        }}
      >
        <p
          className="tracking-[3px] uppercase"
          style={{ fontSize: '20px', color: '#40484c', opacity: 0.4 }}
        >
          @fivefood.ok
        </p>
        <p
          className="tracking-[3px] uppercase"
          style={{ fontSize: '20px', color: '#40484c', opacity: 0.4 }}
        >
          fivefood.com.ar
        </p>
      </div>
    </div>
  )
}

export const GridSnapConfig: TemplateConfig = {
  id: 'lifestyle-grid-snap',
  name: 'Grid Snap',
  category: 'lifestyle',
  fields: [
    { key: 'headline', label: 'Titular', type: 'text', default: 'EDITORIAL' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text', default: 'Snack con actitud' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
    LOCK_LAYOUT_FIELD,
  ],
  component: GridSnapPreview,
}
