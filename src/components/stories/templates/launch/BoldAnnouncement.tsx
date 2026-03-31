import productoChocolate from '../../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../../assets/images/producto-queso.png'
import type { TemplateProps, TemplateConfig } from '../types'
import { PRODUCT_FIELD, PRODUCT_SIZE_FIELD } from '../types'

const products = { chocolate: productoChocolate, queso: productoQueso }

export function BoldAnnouncementPreview({ data }: TemplateProps) {
  const product = (data.product as string) || 'chocolate'
  const badge = data.badge || '★ NUEVO ★'
  const headline = data.headline || 'YA\nDISPONIBLE'
  const productName = data.productName || 'Sabor Chocolate'
  const cta = data.cta || 'COMPRÁ AHORA'
  const productSize = Number(data.productSize) || 500

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between px-[80px] py-[100px] font-headline"
      style={{ background: 'linear-gradient(160deg, #00b4d8 0%, #0077b6 50%, #03045e 100%)' }}
    >
      <p className="text-[28px] font-light tracking-[12px] text-white/60 uppercase">
        FIVE FOODS
      </p>
      <div
        className="rounded-full border border-white/30 px-[48px] py-[14px]"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-[32px] font-bold tracking-[8px] text-white">{badge}</p>
      </div>
      <img
        src={products[product as keyof typeof products]}
        alt={product}
        className="w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
        style={{ height: `${productSize}px`, transform: 'rotate(-3deg)' }}
      />
      <div className="text-center">
        <p className="whitespace-pre-line text-[96px] font-black leading-[1.05] text-white">
          {headline}
        </p>
        <p className="mt-4 text-[36px] text-white/50">{productName}</p>
      </div>
      <div className="rounded-full bg-white px-[72px] py-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
        <p className="text-[36px] font-extrabold text-secondary">{cta}</p>
      </div>
    </div>
  )
}

export const BoldAnnouncementConfig: TemplateConfig = {
  id: 'launch-bold-announcement',
  name: 'Bold Announcement',
  category: 'lanzamientos',
  fields: [
    { key: 'badge', label: 'Badge', type: 'text', default: '★ NUEVO ★' },
    { key: 'headline', label: 'Título', type: 'text', default: 'YA\nDISPONIBLE' },
    { key: 'productName', label: 'Nombre producto', type: 'text', default: 'Sabor Chocolate' },
    { key: 'cta', label: 'CTA', type: 'text', default: 'COMPRÁ AHORA' },
    PRODUCT_FIELD,
    PRODUCT_SIZE_FIELD,
  ],
  component: BoldAnnouncementPreview,
}
