const features = [
  { icon: 'fitness_center', value: '7.9g', label: 'Proteína' },
  { icon: 'grass', value: '6.6g', label: 'Fibra' },
  { icon: 'check_circle', value: 'Sin T.A.C.C.', label: 'Gluten Free' },
  { icon: 'verified', value: '0', label: 'Grasas Trans' },
]

export default function Features() {
  return (
    <section id="nutrition" className="py-16 md:py-24 bg-surface px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((f) => (
            <div
              key={f.label}
              className="bg-primary-container/20 p-4 md:p-8 rounded-xl flex flex-col items-center text-center group hover:bg-primary-container/40 transition-colors"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-primary text-xl md:text-3xl">
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-headline font-bold text-primary mb-1 md:mb-2">{f.value}</h3>
              <p className="font-label uppercase tracking-wider md:tracking-widest text-on-surface-variant text-[10px] md:text-sm font-bold">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
