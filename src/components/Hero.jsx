import LogoAnimation from './LogoAnimation.jsx';
import { Accent, Button, Eyebrow, Reveal } from './ui.jsx';

const stats = [
  { value: '24', suffix: '+', label: 'Proyectos entregados' },
  { value: '5', suffix: '', label: 'Áreas de especialización' },
  { value: '<24', suffix: ' h', label: 'Tiempo de respuesta', small: true },
  { value: '100', suffix: '%', label: 'Código a medida' },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-4 pt-24 pb-24 sm:px-8 md:pt-32">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow dot>Disponible para nuevos proyectos</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 text-[clamp(3rem,6.4vw,5.75rem)] leading-[0.96] font-extrabold tracking-[-0.045em]">
              Software que <Accent gradient>piensa</Accent>, no que solo funciona.
            </h1>
          </Reveal>
        </div>

        <Reveal delay={160} className="mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:col-span-5 lg:max-w-none">
          <LogoAnimation />
        </Reveal>
      </div>

      <Reveal delay={240} className="mt-12 max-w-[640px] lg:mt-14">
        <p className="text-[1.1875rem] leading-relaxed text-ink/70">
          Soy Johan, desarrollador full-stack, y JS_Dev es mi estudio: integro inteligencia artificial en cada capa del producto. Diseño,
          construyo y automatizo sistemas con resultados medibles para empresas, startups y PYMEs.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Button href="#contacto">Iniciar un proyecto</Button>
          <Button href="#proyectos" variant="ghost" arrow={false}>
            Ver proyectos
          </Button>
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <div className="shell">
          <div className="core grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-7 py-9 ${i % 2 === 0 ? 'border-r border-white/8' : ''} ${
                  i < 2 ? 'border-b border-white/8 lg:border-b-0' : ''
                } ${i < 3 ? 'lg:border-r' : 'lg:border-r-0'} lg:border-white/8`}
              >
                <div className="text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em]">
                  {s.value}
                  <span className={`text-accent ${s.small ? 'text-[0.6em]' : ''}`}>{s.suffix}</span>
                </div>
                <div className="mt-2.5 text-sm text-ink/62">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
