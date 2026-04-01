import type { KanvasElement, KanvasField } from './types'

interface KanvasControlsProps {
  fields: KanvasField[]
  data: Record<string, string | number>
  onChange: (key: string, value: string | number) => void
  onDownload: () => void
  downloading: boolean
  selectedElement?: KanvasElement | null
  onElementUpdate?: (id: string, changes: Partial<KanvasElement>) => void
  onUndo?: () => void
  onRedo?: () => void
  canUndo?: boolean
  canRedo?: boolean
  onAlign?: (axis: 'h' | 'v' | 'both') => void
}

export default function KanvasControls({
  fields,
  data,
  onChange,
  onDownload,
  downloading,
  selectedElement,
  onElementUpdate,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onAlign,
}: KanvasControlsProps) {
  const handleElementChange = (key: keyof KanvasElement, value: number) => {
    if (!selectedElement || !onElementUpdate) return
    onElementUpdate(selectedElement.id, { [key]: value })
  }

  return (
    <div className="flex items-start gap-3 overflow-x-auto border-t border-surface-variant bg-inverse-surface/95 px-4 py-3 no-scrollbar">
      {/* Template fields */}
      {fields.map((field) => (
        <div key={field.key} className="flex flex-shrink-0 flex-col gap-1">
          <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
            {field.label}
          </label>

          {field.type === 'select' ? (
            <select
              value={(data[field.key] ?? field.default) as string}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'number' ? (
            <input
              type="number"
              value={(data[field.key] ?? field.default) as number}
              onChange={(e) => onChange(field.key, Number(e.target.value))}
              className="w-24 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          ) : (
            <textarea
              value={(data[field.key] ?? field.default) as string}
              onChange={(e) => onChange(field.key, e.target.value)}
              rows={1}
              className="w-40 resize-none rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) e.preventDefault()
              }}
            />
          )}
        </div>
      ))}

      {/* Undo / Redo */}
      <div className="mx-1 h-8 self-end border-l border-inverse-on-surface/20" />
      <div className="flex flex-shrink-0 items-end gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Deshacer (Ctrl+Z)"
          className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 p-1.5 text-inverse-on-surface transition-colors hover:bg-inverse-on-surface/10 disabled:opacity-30"
        >
          <span className="material-symbols-outlined text-lg">undo</span>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Rehacer (Ctrl+Shift+Z)"
          className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 p-1.5 text-inverse-on-surface transition-colors hover:bg-inverse-on-surface/10 disabled:opacity-30"
        >
          <span className="material-symbols-outlined text-lg">redo</span>
        </button>
      </div>

      {/* Selected element position controls */}
      {selectedElement && onElementUpdate && (
        <>
          {/* Divider */}
          <div className="mx-1 h-8 self-end border-l border-inverse-on-surface/20" />

          <div className="flex flex-shrink-0 flex-col gap-1">
            <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
              X
            </label>
            <input
              type="number"
              value={Math.round(selectedElement.x)}
              onChange={(e) => handleElementChange('x', Number(e.target.value))}
              className="w-20 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-shrink-0 flex-col gap-1">
            <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
              Y
            </label>
            <input
              type="number"
              value={Math.round(selectedElement.y)}
              onChange={(e) => handleElementChange('y', Number(e.target.value))}
              className="w-20 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-shrink-0 flex-col gap-1">
            <label className="font-label text-[10px] font-semibold uppercase tracking-wider text-inverse-on-surface/60">
              Rot°
            </label>
            <input
              type="number"
              value={Math.round(selectedElement.rotation ?? 0)}
              onChange={(e) => handleElementChange('rotation', Number(e.target.value))}
              className="w-20 rounded-lg bg-inverse-surface border border-inverse-on-surface/20 px-3 py-1.5 font-body text-sm text-inverse-on-surface outline-none focus:border-primary"
            />
          </div>

          {/* Alignment buttons */}
          <div className="mx-1 h-8 self-end border-l border-inverse-on-surface/20" />
          <div className="flex flex-shrink-0 items-end gap-1">
            <button
              onClick={() => onAlign?.('h')}
              title="Centrar horizontalmente"
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 p-1.5 text-inverse-on-surface transition-colors hover:bg-inverse-on-surface/10"
            >
              <span className="material-symbols-outlined text-lg">align_horizontal_center</span>
            </button>
            <button
              onClick={() => onAlign?.('v')}
              title="Centrar verticalmente"
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 p-1.5 text-inverse-on-surface transition-colors hover:bg-inverse-on-surface/10"
            >
              <span className="material-symbols-outlined text-lg">align_vertical_center</span>
            </button>
            <button
              onClick={() => onAlign?.('both')}
              title="Centrar en el canvas"
              className="rounded-lg bg-inverse-surface border border-inverse-on-surface/20 p-1.5 text-inverse-on-surface transition-colors hover:bg-inverse-on-surface/10"
            >
              <span className="material-symbols-outlined text-lg">center_focus_strong</span>
            </button>
          </div>
        </>
      )}

      {/* Download button */}
      <button
        onClick={onDownload}
        disabled={downloading}
        className="ml-auto flex-shrink-0 self-end rounded-xl bg-primary px-6 py-2.5 font-headline text-sm font-bold text-on-primary shadow-lg shadow-primary/25 transition-all hover:bg-primary-dim disabled:opacity-50"
      >
        <span className="material-symbols-outlined mr-1 align-middle text-base">download</span>
        {downloading ? 'Exportando...' : 'Descargar PNG'}
      </button>
    </div>
  )
}
