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
      <Reveal>
        <Eyebrow dot>Disponible para nuevos proyectos</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-8 max-w-[1000px] text-[clamp(3rem,8vw,7rem)] leading-[0.96] font-extrabold tracking-[-0.045em]">
          Software que <Accent gradient>piensa</Accent>, no que solo funciona.
        </h1>
      </Reveal>

      <div className="mt-16 flex flex-wrap items-end justify-between gap-14">
        <Reveal delay={160} className="max-w-[540px] flex-[1_1_440px]">
          <p className="text-[1.1875rem] leading-relaxed text-ink/70">
            Somos un estudio de ingeniería que integra inteligencia artificial en cada capa del producto. Diseñamos,
            construimos y automatizamos sistemas con resultados medibles para empresas, startups y PYMEs.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button href="#contacto">Iniciar un proyecto</Button>
            <Button href="#proyectos" variant="ghost" arrow={false}>
              Ver proyectos
            </Button>
          </div>
        </Reveal>

        <Reveal delay={240} className="min-w-[300px] flex-[0_1_440px]">
          <div className="shell">
            <div className="core p-2">
              <div className="rounded-[1.25rem] bg-[#0b0c12] p-6 sm:p-8">
                <LogoAnimation />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

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
