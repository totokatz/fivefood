import productoQueso from '../assets/images/producto-queso.png'
import productoChocolate from '../assets/images/producto-chocolate.png'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-0 overflow-hidden bg-gradient-to-br from-primary via-primary-dim to-secondary">
      {/* Animated Flavor Scroll */}
      <div className="flavor-scroll top-1/4 text-7xl font-accent text-on-primary">
        Crunchy • Salty • Sweet • Healthy • Crunchy • Salty • Sweet • Healthy •
        Crunchy • Salty • Sweet • Healthy • Crunchy • Salty • Sweet • Healthy
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-primary leading-tight tracking-tighter">
            Una nueva forma de{' '}
            <span className="font-accent text-primary-container underline underline-offset-8">
              snackear
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-on-primary/90 max-w-lg font-light leading-relaxed">
            Snacks saludables, crocantes y con proteína. Sin TACC, apto vegano y sin conservantes.
            Ideales para entrenar, trabajar o picar algo rico sin culpa.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://fivefood.com.ar/productos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-on-primary text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-container transition-all shadow-xl"
            >
              Shop Now
            </a>
            <a
              href="#story"
              className="border-2 border-on-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-on-primary hover:text-primary transition-all"
            >
              Nuestra Historia
            </a>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[700px] flex justify-center items-center -mb-16 md:mb-0">
          {/* Queso */}
          <div className="absolute -left-10 md:left-0 top-1/2 -translate-y-1/2 -rotate-[15deg] hover:rotate-0 transition-transform duration-500 z-20">
            <img
              alt="Five Food Sabor Queso"
              className="w-80 md:w-[26rem] h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
              src={productoQueso}
            />
          </div>
          {/* Chocolate */}
          <div className="absolute -right-10 md:right-0 top-1/2 -translate-y-1/2 rotate-[15deg] hover:rotate-0 transition-transform duration-500 z-10">
            <img
              alt="Five Food Sabor Chocolate"
              className="w-80 md:w-[26rem] h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
              src={productoChocolate}
            />
          </div>
          {/* Badge */}
          <div className="absolute top-5 md:top-20 right-10 glass-badge px-6 py-3 rounded-full flex items-center gap-3">
            <span className="material-symbols-filled text-primary">star</span>
            <span className="font-headline font-bold text-on-background">100% Vegano!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
