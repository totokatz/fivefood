import { useRef, useState, useEffect } from 'react'
import lifestyleVideo from '../assets/video/lifestyle.mov'
import lifestyleVideo2 from '../assets/video/lifestyle2.mov'
import lifestyleVideo3 from '../assets/video/lifestyle3.mp4'

const srcs = [lifestyleVideo, lifestyleVideo2, lifestyleVideo3]

export default function Lifestyle() {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const active = useRef<'A' | 'B'>('A')
  const idx = useRef(0)
  const [visible, setVisible] = useState<'A' | 'B'>('A')

  // Preload B with second video
  useEffect(() => {
    const b = videoBRef.current
    if (b) {
      b.src = srcs[1]
      b.load()
    }
  }, [])

  const swap = () => {
    const nextIdx = (idx.current + 1) % srcs.length
    const isA = active.current === 'A'
    const nextPlayer = isA ? 'B' : 'A'
    const nextEl = isA ? videoBRef.current : videoARef.current
    const prevEl = isA ? videoARef.current : videoBRef.current

    if (!nextEl || !prevEl) return

    const go = () => {
      nextEl.play().then(() => {
        active.current = nextPlayer
        setVisible(nextPlayer)
        idx.current = nextIdx

        // Preload the FOLLOWING video into the now-hidden player
        const preloadIdx = (nextIdx + 1) % srcs.length
        prevEl.src = srcs[preloadIdx]
        prevEl.load()
      }).catch(() => {
        // Autoplay blocked — swap anyway
        active.current = nextPlayer
        setVisible(nextPlayer)
        idx.current = nextIdx
      })
    }

    if (nextEl.readyState >= 3) {
      go()
    } else {
      nextEl.addEventListener('canplay', go, { once: true })
    }
  }

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
          <div className="relative group md:col-span-2">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all" />
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl aspect-[3/4] sm:aspect-[4/3] md:aspect-video bg-black">
              <video
                ref={videoARef}
                autoPlay
                muted
                playsInline
                onEnded={swap}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: visible === 'A' ? 1 : 0 }}
              >
                <source src={srcs[0]} type="video/quicktime" />
                <source src={srcs[0]} type="video/mp4" />
              </video>
              <video
                ref={videoBRef}
                muted
                playsInline
                onEnded={swap}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: visible === 'B' ? 1 : 0 }}
              />
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
