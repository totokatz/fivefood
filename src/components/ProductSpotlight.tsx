import productoQueso from '../assets/images/producto-queso.png'
import productoChocolate from '../assets/images/producto-chocolate.png'

export default function ProductSpotlight() {
  return (
    <>
      {/* Chocolate Spotlight */}
      <section id="shop" className="relative py-16 md:py-32 bg-inverse-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 relative reveal-left">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img
              alt="Five Food Sabor Chocolate"
              className="relative z-10 w-full max-w-xs md:max-w-md mx-auto -rotate-6 hover:rotate-0 transition-all duration-700 tap-active"
              src={productoChocolate}
            />
            <div className="absolute top-5 md:top-10 left-0 glass-badge rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 border border-white/10">
              <span className="material-symbols-outlined text-primary-container text-sm md:text-base">bolt</span>
              <span className="text-white font-bold text-xs md:text-sm">Energía Real</span>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-5 md:space-y-8 reveal-right">
            <span className="font-accent text-2xl md:text-3xl text-primary-container">Intenso & Crocante</span>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-bold text-on-primary leading-tight">
              Sabor Chocolate
            </h2>
            <p className="text-base md:text-xl text-on-primary/80 leading-relaxed font-light">
              Tu dosis de energía real, sin vueltas. Bocaditos saludables sabor chocolate: crujientes,
              intensos y llenos de proteína vegetal. Hechos con proteína de arveja y harina de maíz,
              sin TACC y 100% veganos.
            </p>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-3 md:gap-4 text-on-primary text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Proteína de Arveja
              </li>
              <li className="flex items-center gap-3 md:gap-4 text-on-primary text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Perfecto Post-Workout
              </li>
              <li className="flex items-center gap-3 md:gap-4 text-on-primary text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Sin Conservantes
              </li>
            </ul>
            <a
              href="https://www.fivefood.com.ar/productos/combo-team-chocolate-x12-unidades"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-on-primary px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-primary-dim transition-all shadow-xl shadow-primary/30 tap-active"
            >
              Comprar Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Queso Spotlight */}
      <section className="relative py-16 md:py-32 bg-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-5 md:space-y-8 reveal-left">
            <span className="font-accent text-2xl md:text-3xl text-primary">Bold & Sabroso</span>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-bold text-on-background leading-tight">
              Sabor Queso
            </h2>
            <p className="text-base md:text-xl text-on-surface-variant leading-relaxed font-light">
              Si sos del team que no negocia el sabor, este es para vos. Bocaditos saludables sabor
              queso: crujientes, proteicos y con ese gustito que no podés parar de comer. Hechos con
              proteína de arveja y harina de maíz pisingallo, sin TACC y 100% veganos.
            </p>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-3 md:gap-4 text-on-surface text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Harina de Maíz Pisingallo
              </li>
              <li className="flex items-center gap-3 md:gap-4 text-on-surface text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Alto en Fibra
              </li>
              <li className="flex items-center gap-3 md:gap-4 text-on-surface text-base md:text-lg">
                <span className="material-symbols-filled text-primary">done</span>
                Apto Vegano & Celíaco
              </li>
            </ul>
            <a
              href="https://www.fivefood.com.ar/productos/combo-team-queso-x12-unidades"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-on-primary px-8 md:px-12 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-primary-dim transition-all shadow-xl shadow-primary/30 tap-active"
            >
              Comprar Ahora
            </a>
          </div>
          <div className="relative reveal-right">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
            <img
              alt="Five Food Sabor Queso"
              className="relative z-10 w-full max-w-xs md:max-w-md mx-auto rotate-6 hover:rotate-0 transition-all duration-700 tap-active"
              src={productoQueso}
            />
            <div className="absolute bottom-5 md:bottom-10 right-0 glass-badge rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-sm md:text-base">local_fire_department</span>
              <span className="text-on-background font-bold text-xs md:text-base">Bold Crunch!</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
