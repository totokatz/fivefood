import simbolo from '../assets/logos/simbolo.svg'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-primary/10 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src={simbolo} alt="Five Food" className="w-6 h-6" />
          <span className="text-2xl font-black text-on-background font-headline">Five Food</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-headline text-sm">
          <a
            className="text-on-surface-variant hover:underline hover:text-primary transition-all"
            href="https://www.instagram.com/fivefood.ok/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="text-on-surface-variant hover:underline hover:text-primary transition-all"
            href="https://fivefood.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tienda
          </a>
          <a
            className="text-on-surface-variant hover:underline hover:text-primary transition-all"
            href="https://wa.me/5493416488488"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacto
          </a>
        </div>
        <div className="text-on-surface-variant font-headline text-sm">
          © 2025 Five Food. The Playful Epicurean.
        </div>
      </div>
    </footer>
  )
}
