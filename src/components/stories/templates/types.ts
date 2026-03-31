export type Product = 'chocolate' | 'queso'

export interface TemplateField {
  key: string
  label: string
  type: 'text' | 'number' | 'select' | 'checkbox'
  default: string | number | boolean
  options?: { value: string; label: string }[]
}

export interface TemplateConfig {
  id: string
  name: string
  category: Category
  fields: TemplateField[]
  component: React.ComponentType<TemplateProps>
}

export type Category = 'promociones' | 'lifestyle' | 'nutricional' | 'lanzamientos'

export interface TemplateProps {
  data: Record<string, string | number | boolean>
}

export const PRODUCT_FIELD: TemplateField = {
  key: 'product',
  label: 'Producto',
  type: 'select',
  default: 'chocolate',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'queso', label: 'Queso' },
  ],
}

export const PRODUCT_SIZE_FIELD: TemplateField = {
  key: 'productSize',
  label: 'Tamaño paquete',
  type: 'number',
  default: 500,
}

export const LOCK_LAYOUT_FIELD: TemplateField = {
  key: 'lockLayout',
  label: 'Fijar layout',
  type: 'checkbox',
  default: false,
}

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'promociones', label: 'Promociones' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'nutricional', label: 'Nutricional' },
  { key: 'lanzamientos', label: 'Lanzamientos' },
]
