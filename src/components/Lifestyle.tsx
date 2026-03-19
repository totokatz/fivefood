import { useRef, useState, useCallback, useEffect } from 'react'
import lifestyleVideo from '../assets/video/lifestyle.mov'
import lifestyleVideo2 from '../assets/video/lifestyle2.mov'

const videos = [lifestyleVideo, lifestyleVideo2]

export default function Lifestyle() {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A')
  const nextIndex = useRef(1)

  useEffect(() => {
    if (videoBRef.current) {
      videoBRef.current.src = videos[1]
      videoBRef.current.load()
    }
  }, [])

  const handleEnded = useCallback(() => {
    const nextPlayer = activePlayer === 'A' ? 'B' : 'A'
    const nextRef = nextPlayer === 'A' ? videoARef : videoBRef
    const preloadRef = activePlayer === 'A' ? videoARef : videoBRef

    nextRef.current?.play()
    setActivePlayer(nextPlayer)

    nextIndex.current = (nextIndex.current + 1) % videos.length
    if (preloadRef.current) {
      preloadRef.current.src = videos[nextIndex.current]
      preloadRef.current.load()
    }
  }, [activePlayer])

  return (
    <section id="lifestyle" className="py-16 md:py-32 bg-secondary-container/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="font-accent text-2xl md:text-4xl text-primary">Viví tu Vitalidad</h2>
          <h3 className="text-3xl sm:text-4xl md:text-7xl font-headline font-bold text-on-background tracking-tighter">
            Energía Sin Límites
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Card */}
          <div className="relative group md:col-span-2">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all" />
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl aspect-[3/4] sm:aspect-[4/3] md:aspect-video">
              {/* Player A */}
              <video
                ref={videoARef}
                autoPlay
                muted
                playsInline
                onEnded={handleEnded}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: activePlayer === 'A' ? 1 : 0 }}
              >
                <source src={videos[0]} type="video/quicktime" />
                <source src={videos[0]} type="video/mp4" />
              </video>
              {/* Player B */}
              <video
                ref={videoBRef}
                muted
                playsInline
                onEnded={handleEnded}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: activePlayer === 'B' ? 1 : 0 }}
              />
              {/* Overlay */}
              <div className="video-overlay absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-12 z-10">
                <div className="max-w-2xl">
                  <p className="font-accent text-lg sm:text-xl md:text-3xl text-primary-container mb-1 md:mb-3">
                    Stay Crunchy, Stay Healthy
                  </p>
                  <p className="text-white font-headline text-lg sm:text-xl md:text-4xl font-bold leading-tight">
                    De la ola a la montaña, Five Food te acompaña.
                  </p>
                  <p className="text-white/70 text-sm md:text-lg mt-2 md:mt-4 font-light max-w-lg hidden sm:block">
                    Energía real para desafíos reales. Snacks que te acompañan en cada aventura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-20 text-center">
          <a
            href="https://fivefood.com.ar/productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-on-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-primary-dim transition-all shadow-2xl transform hover:-translate-y-1"
          >
            Unite a la Aventura
          </a>
        </div>
      </div>
    </section>
  )
}
