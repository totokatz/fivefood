import logoBlue from '../assets/logos/logo-blue.svg'

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 px-4 md:px-6 border-t border-primary/10 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src={logoBlue} alt="Five Food" className="h-5 md:h-6 w-auto" />
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-headline text-sm">
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
            href="https://wa.me/5493412703863"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacto
          </a>
        </div>
        <div className="text-on-surface-variant font-headline text-xs md:text-sm">
          © 2025 Five Food.
        </div>
      </div>
    </footer>
  )
}
