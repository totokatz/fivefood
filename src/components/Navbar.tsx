import simbolo from '../assets/logos/simbolo.svg'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-primary/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={simbolo} alt="Five Food" className="w-8 h-8" />
          <span className="text-2xl font-bold text-on-background tracking-tighter font-headline">
            Five Food
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline text-base tracking-tight">
          <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#shop">
            Shop
          </a>
          <a className="text-on-background/70 hover:text-primary transition-colors" href="#story">
            Nuestra Historia
          </a>
          <a className="text-on-background/70 hover:text-primary transition-colors" href="#nutrition">
            Nutrición
          </a>
          <a className="text-on-background/70 hover:text-primary transition-colors" href="#lifestyle">
            Lifestyle
          </a>
        </div>
        <a
          href="https://fivefood.com.ar/productos"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-on-primary px-8 py-2.5 rounded-full font-semibold text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-dim"
        >
          Shop Now
        </a>
      </div>
    </nav>
  )
}
