import { forwardRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const StoryPreview = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
      <div className="relative" style={{ width: '360px', height: '640px' }}>
        <div
          ref={ref}
          className="absolute origin-top-left"
          style={{
            width: '1080px',
            height: '1920px',
            transform: 'scale(0.3333)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})

StoryPreview.displayName = 'StoryPreview'

export default StoryPreview
