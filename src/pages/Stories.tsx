import { useState, useRef, useCallback, useMemo } from 'react'
import { toPng } from 'html-to-image'
import CategoryTabs from '../components/stories/CategoryTabs'
import TemplatePicker from '../components/stories/TemplatePicker'
import StoryPreview from '../components/stories/StoryPreview'
import StoryControls from '../components/stories/StoryControls'
import { templates } from '../components/stories/templates/registry'
import type { Category } from '../components/stories/templates/types'

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<Category>('promociones')
  const [activeTemplateId, setActiveTemplateId] = useState<string>('')
  const [templateData, setTemplateData] = useState<Record<string, string | number | boolean>>({})
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const categoryTemplates = useMemo(
    () => templates.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  const activeTemplate = useMemo(
    () => templates.find((t) => t.id === activeTemplateId),
    [activeTemplateId]
  )

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat)
    const first = templates.find((t) => t.category === cat)
    if (first) {
      setActiveTemplateId(first.id)
      const defaults: Record<string, string | number | boolean> = {}
      first.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  }, [])

  const handleTemplateChange = useCallback((id: string) => {
    setActiveTemplateId(id)
    const tmpl = templates.find((t) => t.id === id)
    if (tmpl) {
      const defaults: Record<string, string | number | boolean> = {}
      tmpl.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  }, [])

  const handleFieldChange = useCallback((key: string, value: string | number | boolean) => {
    setTemplateData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleDownload = useCallback(async () => {
    if (!previewRef.current || !activeTemplate) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1080,
        height: 1920,
        pixelRatio: 2,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `fivefoods-story-${activeTemplate.id}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [activeTemplate])

  // Initialize first template on mount
  useState(() => {
    const first = templates.find((t) => t.category === 'promociones')
    if (first) {
      setActiveTemplateId(first.id)
      const defaults: Record<string, string | number | boolean> = {}
      first.fields.forEach((f) => (defaults[f.key] = f.default))
      setTemplateData(defaults)
    }
  })

  const TemplateComponent = activeTemplate?.component

  return (
    <div className="flex h-screen flex-col bg-on-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-inverse-on-surface/10 px-4 py-3">
        <h1 className="font-headline text-lg font-bold text-inverse-on-surface">
          Story Generator
        </h1>
        <a href="/" className="font-label text-xs text-primary hover:underline">
          ← Volver al sitio
        </a>
      </div>

      {/* Category tabs */}
      <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

      {/* Template picker */}
      <TemplatePicker
        templates={categoryTemplates}
        activeId={activeTemplateId}
        onChange={handleTemplateChange}
      />

      {/* Preview */}
      <StoryPreview ref={previewRef}>
        {TemplateComponent ? (
          <TemplateComponent data={templateData} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-inverse-surface">
            <p className="font-headline text-2xl text-inverse-on-surface/40">
              Elegí un template
            </p>
          </div>
        )}
      </StoryPreview>

      {/* Controls */}
      {activeTemplate && (
        <StoryControls
          fields={activeTemplate.fields}
          data={templateData}
          onChange={handleFieldChange}
          onDownload={handleDownload}
          downloading={downloading}
        />
      )}
    </div>
  )
}
