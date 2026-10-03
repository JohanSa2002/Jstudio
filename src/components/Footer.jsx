const serviceLinks = ['Software a medida', 'Integración IA', 'Sitios & E-commerce', 'Chatbots', 'Automatización'];

const studioLinks = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contacto', href: '#contacto' },
];

const link = 'transition-colors duration-500 ease-spring hover:text-white';
const heading = 'mb-4 font-mono text-[11px] font-medium tracking-[0.2em] text-ink/50 uppercase';

export default function Footer() {
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 border-t border-white/8 px-4 pt-14 text-[0.9375rem] text-ink/66 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="max-w-[280px] leading-relaxed">Estudio de ingeniería de software con inteligencia artificial integrada. Panamá, para el mundo.</p>
        </div>
        <div>
          <h2 className={heading}>Servicios</h2>
          <ul className="space-y-2.5">
            {serviceLinks.map((l) => (
              <li key={l}>
                <a href="#servicios" className={link}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={heading}>Estudio</h2>
          <ul className="space-y-2.5">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={heading}>Contacto directo</h2>
          <ul className="space-y-2.5">
            <li>
              <a href="mailto:2002samudiojohan@gmail.com" className={`${link} break-words`}>
                2002samudiojohan@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+50765247842" className={link}>
                +507 6524-7842
              </a>
            </li>
            <li>
              <a href="tel:+50768094813" className={link}>
                +507 6809-4813
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto max-w-[1200px] bg-gradient-to-b from-ink/95 to-ink/5 bg-clip-text px-4 pt-12 text-[clamp(4rem,15.5vw,14rem)] leading-[0.82] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent sm:px-8"
      >
        JStudio_IA
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-2 px-4 py-8 font-mono text-xs text-ink/50 sm:px-8">
        <span>&copy; 2026 JStudio_IA · Panamá</span>
        <span>Construido con criterio &amp; IA</span>
      </div>
    </footer>
  );
}
