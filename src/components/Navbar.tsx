import logoBlue from '../assets/logos/logo-blue.svg'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-primary/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center">
          <img src={logoBlue} alt="Five Food" className="h-6 md:h-8 w-auto" />
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
          className="bg-primary text-on-primary px-5 md:px-8 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary-dim"
        >
          Shop Now
        </a>
      </div>
    </nav>
  )
}
