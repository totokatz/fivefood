export type KanvasCategory = 'promociones' | 'lifestyle' | 'nutricional' | 'lanzamientos'

export interface KanvasElement {
  id: string
  type: 'text' | 'image' | 'rect' | 'circle' | 'line'
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  draggable?: boolean
  // Text props
  text?: string
  fontSize?: number
  fontFamily?: string
  fontStyle?: string
  fill?: string
  align?: string
  letterSpacing?: number
  lineHeight?: number
  opacity?: number
  textDecoration?: string
  // Image props
  src?: string
  // Shape props
  stroke?: string
  strokeWidth?: number
  cornerRadius?: number
  // Gradient
  fillLinearGradientStartPoint?: { x: number; y: number }
  fillLinearGradientEndPoint?: { x: number; y: number }
  fillLinearGradientColorStops?: (string | number)[]
  // Shadow
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  shadowOpacity?: number
  // Scale
  scaleX?: number
  scaleY?: number
}

export interface KanvasField {
  key: string
  label: string
  type: 'text' | 'number' | 'select'
  default: string | number
  options?: { value: string; label: string }[]
}

export interface KanvasTemplate {
  id: string
  name: string
  category: KanvasCategory
  fields: KanvasField[]
  build: (data: Record<string, string | number>) => KanvasScene
}

export interface KanvasScene {
  background: string | CanvasGradient
  backgroundStyle?: {
    fill?: string
    fillLinearGradientStartPoint?: { x: number; y: number }
    fillLinearGradientEndPoint?: { x: number; y: number }
    fillLinearGradientColorStops?: (string | number)[]
  }
  elements: KanvasElement[]
}

// Canvas dimensions (Instagram Story)
export const CANVAS_WIDTH = 1080
export const CANVAS_HEIGHT = 1920

// Reusable fields
export const K_PRODUCT_FIELD: KanvasField = {
  key: 'product',
  label: 'Producto',
  type: 'select',
  default: 'chocolate',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'queso', label: 'Queso' },
  ],
}

export const K_PRODUCT_SIZE_FIELD: KanvasField = {
  key: 'productSize',
  label: 'Tamaño paquete',
  type: 'number',
  default: 1000,
}

export const CATEGORIES: { key: KanvasCategory; label: string }[] = [
  { key: 'promociones', label: 'Promociones' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'nutricional', label: 'Nutricional' },
  { key: 'lanzamientos', label: 'Lanzamientos' },
]
