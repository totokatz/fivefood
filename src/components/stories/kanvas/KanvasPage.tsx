import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import KanvasEditor, { type KanvasEditorRef } from './KanvasEditor'
import KanvasControls from './KanvasControls'
import { kanvasTemplates } from './templates/registry'
import type { KanvasCategory, KanvasElement, KanvasTemplate } from './types'
import { CATEGORIES, CANVAS_WIDTH, CANVAS_HEIGHT } from './types'

// ── Inline template picker (kanvas templates use a different type than TemplateConfig)
interface KanvasTemplatePickerProps {
  templates: KanvasTemplate[]
  activeId: string
  onChange: (id: string) => void
}

function KanvasTemplatePicker({ templates, activeId, onChange }: KanvasTemplatePickerProps) {
  if (templates.length === 0) {
    return (
      <div className="flex gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
        <span className="font-body text-xs text-inverse-on-surface/40">
          Sin templates en esta categoría
        </span>
      </div>
    )
  }

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-shrink-0 rounded-xl px-4 py-2 font-headline text-xs font-semibold transition-all ${
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildDefaults(template: KanvasTemplate): Record<string, string | number> {
  const defaults: Record<string, string | number> = {}
  template.fields.forEach((f) => (defaults[f.key] = f.default))
  return defaults
}

// ── Undo/Redo hook ───────────────────────────────────────────────────────────
type OverridesMap = Record<string, Partial<KanvasElement>>
const MAX_HISTORY = 50

function useUndoRedo(initial: OverridesMap) {
  const [state, setState] = useState(initial)
  const historyRef = useRef<OverridesMap[]>([initial])
  const indexRef = useRef(0)

  const push = useCallback((next: OverridesMap) => {
    // Trim any redo entries beyond current index
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1)
    historyRef.current.push(next)
    if (historyRef.current.length > MAX_HISTORY) {
      historyRef.current.shift()
    } else {
      indexRef.current++
    }
    setState(next)
  }, [])

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current--
      setState(historyRef.current[indexRef.current])
    }
  }, [])

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current++
      setState(historyRef.current[indexRef.current])
    }
  }, [])

  const reset = useCallback((val: OverridesMap) => {
    historyRef.current = [val]
    indexRef.current = 0
    setState(val)
  }, [])

  const canUndo = indexRef.current > 0
  const canRedo = indexRef.current < historyRef.current.length - 1

  return { state, push, undo, redo, reset, canUndo, canRedo }
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function KanvasPage() {
  const [activeCategory, setActiveCategory] = useState<KanvasCategory>('promociones')
  const [activeTemplateId, setActiveTemplateId] = useState<string>(() => {
    const first = kanvasTemplates.find((t) => t.category === 'promociones')
    return first?.id ?? ''
  })
  const [templateData, setTemplateData] = useState<Record<string, string | number>>(() => {
    const first = kanvasTemplates.find((t) => t.category === 'promociones')
    return first ? buildDefaults(first) : {}
  })
  // Per-element position/transform overrides with undo/redo
  const {
    state: elementOverrides,
    push: pushOverrides,
    undo,
    redo,
    reset: resetOverrides,
    canUndo,
    canRedo,
  } = useUndoRedo({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  const editorRef = useRef<KanvasEditorRef>(null)

  // Keyboard shortcuts: Ctrl+Z = undo, Ctrl+Shift+Z / Ctrl+Y = redo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'y' || (e.key === 'z' && e.shiftKey))
      ) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo])

  // Filtered templates for the active category
  const categoryTemplates = useMemo(
    () => kanvasTemplates.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  const activeTemplate = useMemo(
    () => kanvasTemplates.find((t) => t.id === activeTemplateId) ?? null,
    [activeTemplateId]
  )

  // Build the scene from the active template + data
  const rawScene = useMemo(() => {
    if (!activeTemplate) return null
    return activeTemplate.build(templateData)
  }, [activeTemplate, templateData])

  // Apply per-element overrides on top of the built scene
  const scene = useMemo(() => {
    if (!rawScene) return null
    return {
      ...rawScene,
      elements: rawScene.elements.map((el) => {
        const override = elementOverrides[el.id]
        return override ? { ...el, ...override } : el
      }),
    }
  }, [rawScene, elementOverrides])

  // Resolve the currently selected element (after overrides)
  const selectedElement = useMemo(() => {
    if (!selectedId || !scene) return null
    return scene.elements.find((el) => el.id === selectedId) ?? null
  }, [selectedId, scene])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCategoryChange = useCallback((cat: KanvasCategory) => {
    setActiveCategory(cat)
    setSelectedId(null)
    resetOverrides({})
    const first = kanvasTemplates.find((t) => t.category === cat)
    if (first) {
      setActiveTemplateId(first.id)
      setTemplateData(buildDefaults(first))
    }
  }, [resetOverrides])

  const handleTemplateChange = useCallback((id: string) => {
    setActiveTemplateId(id)
    setSelectedId(null)
    resetOverrides({})
    const tmpl = kanvasTemplates.find((t) => t.id === id)
    if (tmpl) setTemplateData(buildDefaults(tmpl))
  }, [resetOverrides])

  const handleFieldChange = useCallback((key: string, value: string | number) => {
    setTemplateData((prev) => ({ ...prev, [key]: value }))
    resetOverrides({})
    setSelectedId(null)
  }, [resetOverrides])

  const handleElementUpdate = useCallback((id: string, changes: Partial<KanvasElement>) => {
    const next = {
      ...elementOverrides,
      [id]: { ...(elementOverrides[id] ?? {}), ...changes },
    }
    pushOverrides(next)
  }, [elementOverrides, pushOverrides])

  // Alignment helpers — centre selected element on the canvas
  const handleAlign = useCallback(
    (axis: 'h' | 'v' | 'both') => {
      if (!selectedId || !scene) return
      const el = scene.elements.find((e) => e.id === selectedId)
      if (!el) return

      const elW = (el.width ?? 0) * (el.scaleX ?? 1)
      const elH = (el.height ?? 0) * (el.scaleY ?? 1)

      const changes: Partial<KanvasElement> = {}
      if (axis === 'h' || axis === 'both') {
        changes.x = (CANVAS_WIDTH - elW) / 2
      }
      if (axis === 'v' || axis === 'both') {
        changes.y = (CANVAS_HEIGHT - elH) / 2
      }
      handleElementUpdate(selectedId, changes)
    },
    [selectedId, scene, handleElementUpdate]
  )

  const handleDownload = useCallback(async () => {
    if (!editorRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await editorRef.current.exportPng()
      const link = document.createElement('a')
      link.download = `fivefoods-kanvas-${activeTemplateId}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('[KanvasPage] Export failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [activeTemplateId])

  return (
    <div className="flex h-screen flex-col bg-on-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-inverse-on-surface/10 px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-lg font-bold text-inverse-on-surface">
            Kanvas
          </h1>
          <a
            href="/stories"
            className="rounded-full bg-inverse-on-surface/10 px-3 py-1 font-headline text-xs font-semibold text-inverse-on-surface/60 transition-all hover:bg-inverse-on-surface/20"
          >
            Templates
          </a>
        </div>
        <a href="/" className="font-label text-xs text-primary hover:underline">
          ← Volver al sitio
        </a>
      </div>

      {/* Category tabs — reuse the existing component with KanvasCategory types */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`whitespace-nowrap rounded-full px-5 py-2 font-headline text-sm font-semibold transition-all ${
              activeCategory === cat.key
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/25'
                : 'bg-inverse-surface/80 text-inverse-on-surface hover:bg-inverse-surface'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template picker */}
      <KanvasTemplatePicker
        templates={categoryTemplates}
        activeId={activeTemplateId}
        onChange={handleTemplateChange}
      />

      {/* Canvas area — click outside canvas deselects */}
      <div
        className="flex flex-1 items-center justify-center overflow-auto p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null)
        }}
      >
        {scene ? (
          <KanvasEditor
            ref={editorRef}
            scene={scene}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onElementUpdate={handleElementUpdate}
          />
        ) : (
          <div
            style={{ width: '360px', height: '640px' }}
            className="flex items-center justify-center rounded-2xl bg-inverse-surface"
          >
            <p className="font-headline text-xl text-inverse-on-surface/40">Elegí un template</p>
          </div>
        )}
      </div>

      {/* Controls bar */}
      {activeTemplate && (
        <KanvasControls
          fields={activeTemplate.fields}
          data={templateData}
          onChange={handleFieldChange}
          onDownload={handleDownload}
          downloading={downloading}
          selectedElement={selectedElement}
          onElementUpdate={handleElementUpdate}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onAlign={handleAlign}
        />
      )}
    </div>
  )
}
