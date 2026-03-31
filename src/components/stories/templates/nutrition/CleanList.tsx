import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function CleanListPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const title = data.title || '¿Qué tiene adentro?'
  const stat1Val = data.stat1Val || '8g'
  const stat1Desc = data.stat1Desc || 'Proteína de arveja'
  const stat2Val = data.stat2Val || '6.6g'
  const stat2Desc = data.stat2Desc || 'Fibra natural'
  const stat3Val = data.stat3Val || '0g'
  const stat3Desc = data.stat3Desc || 'Grasas trans'
  const stat4Val = data.stat4Val || '✓'
  const stat4Desc = data.stat4Desc || 'Sin TACC · Vegano'

  const rows = [
    { val: stat1Val, desc: stat1Desc },
    { val: stat2Val, desc: stat2Desc },
    { val: stat3Val, desc: stat3Desc },
    { val: stat4Val, desc: stat4Desc },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-background px-[80px] py-[120px] font-headline">
      <p className="text-[28px] font-light tracking-[12px] text-tertiary uppercase">
        FIVE FOODS
      </p>
      <div className="w-full text-center">
        <p className="mb-[48px] text-[64px] font-extrabold text-tertiary">{title}</p>
        <div className="flex flex-col gap-[24px]">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-[40px] rounded-[32px] px-[48px] py-[32px]"
              style={{ background: 'rgba(0,180,216,0.08)' }}
            >
              <p className="min-w-[160px] text-left text-[72px] font-black text-primary">
                {row.val}
              </p>
              <p className="text-left text-[36px] text-tertiary">{row.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <img
          src={products[product as keyof typeof products]}
          alt={product}
          className="h-[300px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
        />
        <p className="text-[28px] text-secondary">@fivefood.ok</p>
      </div>
    </div>
  )
}

export const CleanListConfig: TemplateConfig = {
  id: 'nutri-clean-list',
  name: 'Clean List',
  category: 'nutricional',
  fields: [
    { key: 'title', label: 'Título', type: 'text', default: '¿Qué tiene adentro?' },
    { key: 'stat1Val', label: 'Stat 1 valor', type: 'text', default: '8g' },
    { key: 'stat1Desc', label: 'Stat 1 desc', type: 'text', default: 'Proteína de arveja' },
    { key: 'stat2Val', label: 'Stat 2 valor', type: 'text', default: '6.6g' },
    { key: 'stat2Desc', label: 'Stat 2 desc', type: 'text', default: 'Fibra natural' },
    { key: 'stat3Val', label: 'Stat 3 valor', type: 'text', default: '0g' },
    { key: 'stat3Desc', label: 'Stat 3 desc', type: 'text', default: 'Grasas trans' },
    { key: 'stat4Val', label: 'Stat 4 valor', type: 'text', default: '✓' },
    { key: 'stat4Desc', label: 'Stat 4 desc', type: 'text', default: 'Sin TACC · Vegano' },
    PRODUCT_FIELD,
  ],
  component: CleanListPreview,
}
