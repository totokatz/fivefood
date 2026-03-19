import { useRef, useCallback } from 'react'
import lifestyleVideo from '../assets/video/lifestyle.mov'
import lifestyleVideo2 from '../assets/video/lifestyle2.mov'

const videos = [lifestyleVideo, lifestyleVideo2]

export default function Lifestyle() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentIndex = useRef(0)

  const handleEnded = useCallback(() => {
    currentIndex.current = (currentIndex.current + 1) % videos.length
    if (videoRef.current) {
      videoRef.current.src = videos[currentIndex.current]
      videoRef.current.play()
    }
  }, [])

  return (
    <section id="lifestyle" className="py-32 bg-secondary-container/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-accent text-4xl text-primary">Viví tu Vitalidad</h2>
          <h3 className="text-5xl md:text-7xl font-headline font-bold text-on-background tracking-tighter">
            Energía Sin Límites
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Card */}
          <div className="relative group md:col-span-2">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all" />
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                onEnded={handleEnded}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={lifestyleVideo} type="video/quicktime" />
                <source src={lifestyleVideo} type="video/mp4" />
              </video>
              {/* Overlay */}
              <div className="video-overlay absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-2xl">
                  <p className="font-accent text-2xl md:text-3xl text-primary-container mb-3">
                    Stay Crunchy, Stay Healthy
                  </p>
                  <p className="text-white font-headline text-2xl md:text-4xl font-bold leading-tight">
                    De la ola a la montaña, Five Food te acompaña.
                  </p>
                  <p className="text-white/70 text-lg mt-4 font-light max-w-lg">
                    Energía real para desafíos reales. Snacks que te acompañan en cada aventura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://fivefood.com.ar/productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-on-primary px-12 py-5 rounded-full font-bold text-xl hover:bg-primary-dim transition-all shadow-2xl transform hover:-translate-y-1"
          >
            Unite a la Aventura
          </a>
        </div>
      </div>
    </section>
  )
}
