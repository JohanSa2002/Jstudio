import { useState } from 'react';
import { Accent, ArrowIcon, Reveal, SectionHeader } from './ui.jsx';

/* TODO: reemplazar con tus datos reales (foto en public/assets, URLs y CV) */
const photo = '/assets/johan-samudio.jpg';

const links = [
  { label: 'GitHub', href: 'https://github.com/TU_USUARIO' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/TU_USUARIO' },
  { label: 'Descargar CV', href: '/assets/cv-johan-samudio.pdf', download: true },
];

const facts = [
  { label: 'Base', value: 'Panamá' },
  { label: 'Rol', value: 'Full-stack + IA' },
  { label: 'Idiomas', value: 'Español · Inglés' },
];

/* TODO: confirmar años y descripciones */
const timeline = [
  {
    year: '2025',
    title: 'Fundo JStudio_IA',
    desc: 'Mi estudio para llevar desarrollo a medida e IA aplicada a empresas, startups y PYMEs.',
  },
  {
    year: '2025',
    title: 'Sistema SIB Panamá',
    desc: 'Plataforma web para transporte público: de la idea al sistema en producción.',
  },
  {
    year: '2024',
    title: 'Desarrollo web freelance',
    desc: 'Landings, e-commerce y sitios para negocios locales: fotografía, construcción, belleza y retail.',
  },
];

function Photo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-accent/40 via-violet/25 to-cyan/30">
        <span className="font-serif text-[7rem] italic text-ink/90">JS</span>
      </div>
    );
  }
  return (
    <img
      src={photo}
      alt="Johan Samudio, fundador de JStudio_IA"
      onError={() => setFailed(true)}
      className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
      loading="lazy"
    />
  );
}

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-[1200px] px-4 py-28 sm:px-8">
      <SectionHeader
        label="01 · Sobre mí"
        description="Detrás de JStudio_IA hay una persona: yo. Tú hablas directamente con quien diseña y escribe el código."
      >
        Hola, soy Johan. <Accent>Construyo software con criterio.</Accent>
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="shell h-full">
            <div className="core flex h-full flex-col p-3">
              <Photo />
              <dl className="grid grid-cols-3 gap-2 px-3 pt-5 pb-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[11px] tracking-[0.14em] text-ink/50 uppercase">{f.label}</dt>
                    <dd className="mt-1 text-sm">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-7">
          <Reveal delay={80}>
            <div className="shell">
              <div className="core p-8 sm:p-9">
                <p className="text-[1.1875rem] leading-relaxed text-ink/80">
                  Soy desarrollador full-stack en Panamá y fundador de JStudio_IA. Me gusta tomar un problema de negocio
                  real y convertirlo en un producto que funcione: desde la interfaz hasta la base de datos, con IA donde
                  de verdad aporta.
                </p>
                <p className="mt-4 leading-relaxed text-ink/65">
                  Trabajo directo con cada cliente, sin intermediarios. Eso significa decisiones rápidas, comunicación
                  clara y código que entiendo de punta a punta.
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(l.download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/16 bg-white/6 py-1.5 pr-1.5 pl-5 text-sm font-semibold transition-transform duration-[600ms] ease-spring hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      {l.label}
                      <span className="flex size-8 items-center justify-center rounded-full bg-white/8 transition-transform duration-[600ms] ease-spring group-hover:translate-x-[3px] group-hover:-translate-y-px">
                        <ArrowIcon size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} className="flex-1">
            <div className="shell h-full">
              <div className="core h-full p-8 sm:p-9">
                <h3 className="font-mono text-[11px] font-medium tracking-[0.2em] text-cyan uppercase">Trayectoria</h3>
                <ol className="mt-6">
                  {timeline.map((t) => (
                    <li key={t.title} className="flex gap-6 border-t border-white/8 py-5 first:border-t-0 first:pt-0 last:pb-0">
                      <span className="w-12 shrink-0 font-mono text-xs text-ink/50">{t.year}</span>
                      <div>
                        <div className="text-lg font-semibold tracking-[-0.02em]">{t.title}</div>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/62">{t.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
