import type { TemplateField } from './templates/types'

interface Props {
  fields: TemplateField[]
  data: Record<string, string | number>
  onChange: (key: string, value: string | number) => void
  onDownload: () => void
  downloading: boolean
}

export default function StoryControls({ fields, data, onChange, onDownload, downloading }: Props) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto border-t border-surface-variant bg-inverse-surface/95 px-4 py-3 no-scrollbar">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-shrink-0 flex-col gap-1">
          <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              value={data[field.key] ?? field.default}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={data[field.key] ?? field.default}
              onChange={(e) =>
                onChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
              }
              className="w-36 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          )}
        </div>
      ))}

      <button
        onClick={onDownload}
        disabled={downloading}
        className="ml-auto flex-shrink-0 rounded-xl bg-primary px-6 py-2.5 font-headline text-sm font-bold text-on-primary shadow-lg shadow-primary/25 transition-all hover:bg-primary-dim disabled:opacity-50"
      >
        <span className="material-symbols-outlined mr-1 align-middle text-base">download</span>
        {downloading ? 'Exportando...' : 'Descargar PNG'}
      </button>
    </div>
  )
}
