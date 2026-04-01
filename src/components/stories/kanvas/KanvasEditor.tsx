import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Circle,
  Line,
  Transformer,
} from 'react-konva'
import type Konva from 'konva'
import type { KanvasElement, KanvasScene } from './types'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './types'

// ── Asset imports ─────────────────────────────────────────────────────────────
import productoChocolate from '../../../assets/images/producto-chocolate.png'
import productoQueso from '../../../assets/images/producto-queso.png'
import logo from '../../../assets/logos/logo.svg'
import logoBlue from '../../../assets/logos/logo-blue.svg'
import simbolo from '../../../assets/logos/simbolo.svg'

const SRC_MAP: Record<string, string> = {
  'producto-chocolate': productoChocolate,
  'producto-queso': productoQueso,
  logo: logo,
  'logo-blue': logoBlue,
  simbolo: simbolo,
}

// ── Hook: load an HTMLImageElement ────────────────────────────────────────────
function useKonvaImage(src: string | undefined): HTMLImageElement | null {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) return
    const resolved = SRC_MAP[src] ?? src
    const img = new window.Image()
    img.src = resolved
    img.onload = () => setImage(img)
    img.onerror = () => console.warn(`[KanvasEditor] Failed to load image: ${resolved}`)
  }, [src])

  return image
}

// ── Single element renderers ──────────────────────────────────────────────────

interface ElementProps {
  el: KanvasElement
  isSelected: boolean
  onSelect: () => void
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void
  onTransformEnd: (e: Konva.KonvaEventObject<Event>) => void
  nodeRef?: (node: Konva.Node | null) => void
}

function ImageElement({ el, onSelect, onDragEnd, onTransformEnd, nodeRef }: ElementProps) {
  const image = useKonvaImage(el.src)
  if (!image) return null

  return (
    <KonvaImage
      ref={nodeRef as (node: Konva.Image | null) => void}
      id={el.id}
      image={image}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation ?? 0}
      scaleX={el.scaleX ?? 1}
      scaleY={el.scaleY ?? 1}
      opacity={el.opacity ?? 1}
      draggable={el.draggable ?? false}
      shadowColor={el.shadowColor}
      shadowBlur={el.shadowBlur}
      shadowOffsetX={el.shadowOffsetX}
      shadowOffsetY={el.shadowOffsetY}
      shadowOpacity={el.shadowOpacity}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}

function TextElement({ el, onSelect, onDragEnd, onTransformEnd, nodeRef }: ElementProps) {
  return (
    <Text
      ref={nodeRef as (node: Konva.Text | null) => void}
      id={el.id}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation ?? 0}
      scaleX={el.scaleX ?? 1}
      scaleY={el.scaleY ?? 1}
      text={el.text ?? ''}
      fontSize={el.fontSize ?? 48}
      fontFamily={el.fontFamily ?? 'Josefin Sans, sans-serif'}
      fontStyle={el.fontStyle ?? 'normal'}
      fill={el.fill ?? '#ffffff'}
      align={el.align ?? 'left'}
      letterSpacing={el.letterSpacing ?? 0}
      lineHeight={el.lineHeight ?? 1.2}
      opacity={el.opacity ?? 1}
      textDecoration={el.textDecoration ?? ''}
      draggable={el.draggable ?? false}
      shadowColor={el.shadowColor}
      shadowBlur={el.shadowBlur}
      shadowOffsetX={el.shadowOffsetX}
      shadowOffsetY={el.shadowOffsetY}
      shadowOpacity={el.shadowOpacity}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}

function RectElement({ el, onSelect, onDragEnd, onTransformEnd, nodeRef }: ElementProps) {
  const sharedProps = {
    ref: nodeRef as (node: Konva.Rect | null) => void,
    id: el.id,
    x: el.x,
    y: el.y,
    width: el.width ?? 200,
    height: el.height ?? 200,
    rotation: el.rotation ?? 0,
    scaleX: el.scaleX ?? 1,
    scaleY: el.scaleY ?? 1,
    opacity: el.opacity ?? 1,
    stroke: el.stroke,
    strokeWidth: el.strokeWidth,
    cornerRadius: el.cornerRadius ?? 0,
    draggable: el.draggable ?? false,
    shadowColor: el.shadowColor,
    shadowBlur: el.shadowBlur,
    shadowOffsetX: el.shadowOffsetX,
    shadowOffsetY: el.shadowOffsetY,
    shadowOpacity: el.shadowOpacity,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: onDragEnd,
    onTransformEnd: onTransformEnd,
  }

  if (el.fillLinearGradientColorStops) {
    return (
      <Rect
        {...sharedProps}
        fillLinearGradientStartPoint={el.fillLinearGradientStartPoint ?? { x: 0, y: 0 }}
        fillLinearGradientEndPoint={el.fillLinearGradientEndPoint ?? { x: 0, y: el.height ?? 200 }}
        fillLinearGradientColorStops={el.fillLinearGradientColorStops}
      />
    )
  }

  return <Rect {...sharedProps} fill={el.fill ?? 'transparent'} />
}

function CircleElement({ el, onSelect, onDragEnd, onTransformEnd, nodeRef }: ElementProps) {
  return (
    <Circle
      ref={nodeRef as (node: Konva.Circle | null) => void}
      id={el.id}
      x={el.x}
      y={el.y}
      radius={(el.width ?? 100) / 2}
      rotation={el.rotation ?? 0}
      scaleX={el.scaleX ?? 1}
      scaleY={el.scaleY ?? 1}
      fill={el.fill ?? 'transparent'}
      opacity={el.opacity ?? 1}
      stroke={el.stroke}
      strokeWidth={el.strokeWidth}
      draggable={el.draggable ?? false}
      shadowColor={el.shadowColor}
      shadowBlur={el.shadowBlur}
      shadowOffsetX={el.shadowOffsetX}
      shadowOffsetY={el.shadowOffsetY}
      shadowOpacity={el.shadowOpacity}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}

function LineElement({ el, onSelect, onDragEnd, onTransformEnd, nodeRef }: ElementProps) {
  return (
    <Line
      ref={nodeRef as (node: Konva.Line | null) => void}
      id={el.id}
      x={el.x}
      y={el.y}
      points={[0, 0, el.width ?? 200, 0]}
      rotation={el.rotation ?? 0}
      scaleX={el.scaleX ?? 1}
      scaleY={el.scaleY ?? 1}
      stroke={el.stroke ?? '#ffffff'}
      strokeWidth={el.strokeWidth ?? 2}
      opacity={el.opacity ?? 1}
      draggable={el.draggable ?? false}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}

// ── Background rect (supports solid + gradient) ───────────────────────────────
function BackgroundRect({ scene }: { scene: KanvasScene }) {
  const bg = scene.backgroundStyle
  if (bg?.fillLinearGradientColorStops) {
    return (
      <Rect
        x={0}
        y={0}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        fillLinearGradientStartPoint={bg.fillLinearGradientStartPoint ?? { x: 0, y: 0 }}
        fillLinearGradientEndPoint={bg.fillLinearGradientEndPoint ?? { x: 0, y: CANVAS_HEIGHT }}
        fillLinearGradientColorStops={bg.fillLinearGradientColorStops}
        listening={false}
      />
    )
  }
  return (
    <Rect
      x={0}
      y={0}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      fill={(bg?.fill ?? (typeof scene.background === 'string' ? scene.background : '#1a1a1a'))}
      listening={false}
    />
  )
}

// ── Props / Ref types ─────────────────────────────────────────────────────────
export interface KanvasEditorRef {
  exportPng: () => Promise<string>
}

interface KanvasEditorProps {
  scene: KanvasScene
  onElementUpdate: (id: string, changes: Partial<KanvasElement>) => void
  selectedId: string | null
  onSelect: (id: string | null) => void
}

// ── Main component ────────────────────────────────────────────────────────────
const KanvasEditor = forwardRef<KanvasEditorRef, KanvasEditorProps>(
  ({ scene, onElementUpdate, selectedId, onSelect }, ref) => {
    const stageRef = useRef<Konva.Stage>(null)
    const transformerRef = useRef<Konva.Transformer>(null)
    // Map from element id → Konva node ref
    const nodeRefs = useRef<Map<string, Konva.Node>>(new Map())

    // Expose exportPng via ref
    useImperativeHandle(ref, () => ({
      exportPng: () =>
        new Promise<string>((resolve, reject) => {
          if (!stageRef.current) return reject(new Error('Stage not ready'))
          const dataUrl = stageRef.current.toDataURL({ mimeType: 'image/png', pixelRatio: 1 })
          resolve(dataUrl)
        }),
    }))

    // Sync transformer to selected node
    useEffect(() => {
      const transformer = transformerRef.current
      if (!transformer) return

      if (!selectedId) {
        transformer.nodes([])
        transformer.getLayer()?.batchDraw()
        return
      }

      const node = nodeRefs.current.get(selectedId)
      if (node) {
        transformer.nodes([node])
        transformer.getLayer()?.batchDraw()
      } else {
        transformer.nodes([])
        transformer.getLayer()?.batchDraw()
      }
    }, [selectedId, scene.elements])

    const handleStageClick = useCallback(
      (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.target === e.target.getStage()) {
          onSelect(null)
        }
      },
      [onSelect]
    )

    const handleDragEnd = useCallback(
      (el: KanvasElement) => (e: Konva.KonvaEventObject<DragEvent>) => {
        onElementUpdate(el.id, { x: e.target.x(), y: e.target.y() })
      },
      [onElementUpdate]
    )

    const handleTransformEnd = useCallback(
      (el: KanvasElement) => (e: Konva.KonvaEventObject<Event>) => {
        const node = e.target
        onElementUpdate(el.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scaleX: node.scaleX(),
          scaleY: node.scaleY(),
        })
      },
      [onElementUpdate]
    )

    const setNodeRef = useCallback(
      (id: string) => (node: Konva.Node | null) => {
        if (node) {
          nodeRefs.current.set(id, node)
        } else {
          nodeRefs.current.delete(id)
        }
      },
      []
    )

    return (
      /* Outer centering shell — 360×640, clips scaled content */
      <div
        style={{
          width: '360px',
          height: '640px',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Inner wrapper at full 1080×1920, scaled down */}
        <div
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            transform: 'scale(0.3333)',
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Stage
            ref={stageRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            pixelRatio={2}
            onClick={handleStageClick}
            onTap={() => onSelect(null)}
          >
            <Layer>
              {/* Background */}
              <BackgroundRect scene={scene} />

              {/* Elements */}
              {scene.elements.map((el) => {
                const commonProps: ElementProps = {
                  el,
                  isSelected: selectedId === el.id,
                  onSelect: () => onSelect(el.id),
                  onDragEnd: handleDragEnd(el),
                  onTransformEnd: handleTransformEnd(el),
                  nodeRef: setNodeRef(el.id),
                }

                switch (el.type) {
                  case 'image':
                    return <ImageElement key={el.id} {...commonProps} />
                  case 'text':
                    return <TextElement key={el.id} {...commonProps} />
                  case 'rect':
                    return <RectElement key={el.id} {...commonProps} />
                  case 'circle':
                    return <CircleElement key={el.id} {...commonProps} />
                  case 'line':
                    return <LineElement key={el.id} {...commonProps} />
                  default:
                    return null
                }
              })}

              {/* Transformer (selection handles) */}
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Prevent collapsing to zero size
                  if (newBox.width < 10 || newBox.height < 10) return oldBox
                  return newBox
                }}
                anchorSize={16}
                borderStroke="#2563eb"
                borderStrokeWidth={2}
                anchorStroke="#2563eb"
                anchorFill="#ffffff"
                anchorCornerRadius={4}
                rotateAnchorOffset={32}
                enabledAnchors={[
                  'top-left',
                  'top-right',
                  'bottom-left',
                  'bottom-right',
                  'middle-left',
                  'middle-right',
                  'top-center',
                  'bottom-center',
                ]}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
)

KanvasEditor.displayName = 'KanvasEditor'

export default KanvasEditor
