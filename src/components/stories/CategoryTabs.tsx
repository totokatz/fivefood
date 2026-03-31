import { CATEGORIES, type Category } from './templates/types'

interface Props {
  active: Category
  onChange: (cat: Category) => void
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`whitespace-nowrap rounded-full px-5 py-2 font-headline text-sm font-semibold transition-all ${
            active === cat.key
              ? 'bg-primary text-on-primary shadow-lg shadow-primary/25'
              : 'bg-inverse-surface/80 text-inverse-on-surface hover:bg-inverse-surface'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
