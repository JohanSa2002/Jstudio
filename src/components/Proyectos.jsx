import { Accent, ArrowIcon, Reveal, SectionHeader } from './ui.jsx';

const projects = [
  { num: '01', name: 'Estudio Fotográfico Ruddy', meta: '2025 · Estudio fotográfico', type: 'Landing · Web', url: 'https://fotografia-ruddy.vercel.app/' },
  { num: '02', name: 'Landing Constructora', meta: '2025 · Empresa constructora', type: 'Landing · Web', url: 'https://constructora-gules.vercel.app/' },
  { num: '03', name: 'Salón de Belleza', meta: '2025 · Salón de belleza', type: 'Landing · Web', url: 'https://beautysalondesign.vercel.app/' },
  { num: '04', name: 'Tienda de Ropa', meta: '2025 · Moda y retail', type: 'E-commerce · Web', url: 'https://tiendaropadesign.vercel.app/' },
  { num: '05', name: 'Sistema SIB Panamá', meta: '2025 · Transporte público', type: 'Web · App', url: 'https://sibpanama.com/' },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="mx-auto max-w-[1200px] px-4 py-28 sm:px-8">
      <SectionHeader
        label="02 · Proyectos"
        description="Una selección de proyectos donde combinamos desarrollo, diseño e IA para resolver problemas concretos."
      >
        Trabajo reciente que <Accent>hizo clic.</Accent>
      </SectionHeader>

      <Reveal className="mt-16">
        <div className="shell rounded-[2.25rem]">
          <ul className="core m-0 list-none rounded-[1.75rem] p-2">
            {projects.map((p) => (
              <li key={p.num} className="border-b border-white/7 last:border-b-0">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[1.25rem] px-5 py-6 transition-colors duration-[600ms] ease-spring hover:bg-white/5 sm:px-7"
                >
                  <span className="w-10 font-mono text-xs text-ink/50">{p.num}</span>
                  <span className="flex-[2_1_260px] text-[1.75rem] leading-tight font-semibold tracking-[-0.03em]">{p.name}</span>
                  <span className="flex-[1_1_200px] text-[0.9375rem] text-ink/62">{p.meta}</span>
                  <span className="font-mono text-xs text-cyan sm:w-[150px]">{p.type}</span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/14 bg-white/7 transition-transform duration-[600ms] ease-spring group-hover:translate-x-[3px] group-hover:-translate-y-px">
                    <ArrowIcon />
                    <span className="sr-only">Abrir {p.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
