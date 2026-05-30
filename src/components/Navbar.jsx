import { useState } from 'react'

export default function Navbar({ onJoin }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b-2 border-orange-100 px-[5%] flex items-center justify-between h-[70px]">
      <a href="#" className="flex items-center gap-2 text-coral font-black text-2xl tracking-tight no-underline">
        <span className="text-3xl">🐾</span> BarkMate
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-7">
        {['How It Works', 'Features', 'The Problem'].map(label => (
          <a key={label} href="#" className="text-dark font-bold text-sm hover:text-coral transition-colors no-underline">{label}</a>
        ))}
        <button onClick={onJoin} className="btn-primary px-5 py-2.5 text-sm">
          Join Waitlist 🐾
        </button>
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-[3px] bg-dark rounded-sm transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-[3px] bg-dark rounded-sm transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-[3px] bg-dark rounded-sm transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-cream border-b-2 border-orange-100 p-5 flex flex-col gap-4 shadow-lg z-50">
          {['How It Works', 'Features', 'The Problem'].map(label => (
            <a key={label} href="#" onClick={() => setOpen(false)} className="text-dark font-bold text-base no-underline hover:text-coral">{label}</a>
          ))}
          <button onClick={() => { onJoin(); setOpen(false) }} className="btn-primary py-3 text-base">
            Join Waitlist 🐾
          </button>
        </div>
      )}
    </nav>
  )
}
