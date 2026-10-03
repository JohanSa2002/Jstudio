import { useState } from 'react';
import { ArrowIcon } from './ui.jsx';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Stack' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-5 z-40 px-4 pt-5">
      <div className="mx-auto flex max-w-[960px] items-center justify-between rounded-full border border-white/12 bg-[#0e0f16]/55 py-2.5 pr-2.5 pl-5 shadow-[inset_0_1px_1px_rgb(255_255_255/0.16)] backdrop-blur-xl backdrop-saturate-150">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight" onClick={close}>
          <span className="flex size-[26px] items-center justify-center rounded-lg bg-gradient-to-br from-accent to-cyan font-mono text-[11px] font-medium text-base">
            JS
          </span>
          JStudio_IA
        </a>

        <nav className="hidden gap-7 text-sm text-ink/70 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors duration-500 ease-spring hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-base transition-transform duration-[600ms] ease-spring hover:-translate-y-0.5 active:scale-[0.98] sm:flex"
          >
            Agenda una llamada
            <span className="flex size-8 items-center justify-center rounded-full bg-base/8 transition-transform duration-[600ms] ease-spring group-hover:translate-x-[3px] group-hover:-translate-y-px">
              <ArrowIcon size={14} />
            </span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/14 bg-white/6 md:hidden"
          >
            <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-spring ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-spring ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        className={`fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-base/80 px-8 backdrop-blur-3xl transition-opacity duration-700 ease-spring md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {[...links, { href: '#contacto', label: 'Agenda una llamada' }].map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={close}
            style={{ transitionDelay: open ? `${100 + i * 50}ms` : '0ms' }}
            className={`py-2 text-5xl font-extrabold tracking-tight transition-all duration-700 ease-spring ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
