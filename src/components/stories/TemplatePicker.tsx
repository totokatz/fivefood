import type { TemplateConfig } from './templates/types'

interface Props {
  templates: TemplateConfig[]
  activeId: string
  onChange: (id: string) => void
}

export default function TemplatePicker({ templates, activeId, onChange }: Props) {
  return (
    <div className="flex max-h-[120px] flex-wrap gap-2 overflow-y-auto px-4 py-2 thin-scrollbar">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-shrink-0 rounded-xl px-3 py-1.5 font-headline text-xs font-semibold transition-all ${
            activeId === t.id
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-variant text-on-surface-variant hover:bg-primary-container'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
