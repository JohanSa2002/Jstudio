import LogoAnimation from './LogoAnimation.jsx';
import { Accent, Button, Eyebrow, Reveal } from './ui.jsx';

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
    </section>
  );
}
