import type { TemplateConfig } from './types'
import { BoldDiscountConfig } from './promo/BoldDiscount'
import { GlassCardConfig } from './promo/GlassCard'
import { SplitDiagonalConfig } from './promo/SplitDiagonal'

export const templates: TemplateConfig[] = [
  BoldDiscountConfig,
  GlassCardConfig,
  SplitDiagonalConfig,
]
