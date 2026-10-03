import { Accent, Reveal, SectionHeader } from './ui.jsx';

const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const icons = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...icon} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  ai: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...icon} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
    </svg>
  ),
  web: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...icon} aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  auto: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...icon} aria-hidden="true">
      <path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.8 6.5 19.5l1-6.3L3 8.9 9 8z" />
    </svg>
  ),
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" {...icon} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

const services = [
  {
    num: '01',
    title: 'Desarrollo de software a medida',
    desc: 'Aplicaciones web, sistemas internos, APIs y productos digitales construidos desde cero, con arquitectura limpia, escalable y preparada para crecer.',
    tags: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    icon: 'code',
    size: 'large',
  },
  {
    num: '02',
    title: 'Integración de IA en el negocio',
    desc: 'Incorporamos modelos de lenguaje, visión por computadora y sistemas predictivos directamente en tus flujos de trabajo — no como un añadido, sino como parte del producto.',
    tags: ['OpenAI', 'LangChain', 'Embeddings'],
    icon: 'ai',
    size: 'large',
    featured: true,
  },
  {
    num: '03',
    title: 'Sitios web & e-commerce',
    desc: 'Landing pages, catálogos y tiendas online con rendimiento, SEO y un diseño cuidado hasta el último detalle.',
    tags: ['Next.js', 'Stripe', 'CMS'],
    icon: 'web',
  },
  {
    num: '04',
    title: 'Automatización de procesos',
    desc: 'Eliminamos el trabajo repetitivo: conectamos tus herramientas, procesamos documentos y automatizamos decisiones con reglas e IA.',
    tags: ['n8n', 'Zapier', 'RPA'],
    icon: 'auto',
  },
  {
    num: '05',
    title: 'Chatbots & IA conversacional',
    desc: 'Asistentes con memoria y contexto, entrenados con tus datos, para soporte, ventas y atención 24/7 en WhatsApp, web y más.',
    tags: ['GPT', 'WhatsApp API', 'RAG'],
    icon: 'chat',
  },
];

function Card({ s, i }) {
  const large = s.size === 'large';
  return (
    <Reveal
      delay={i * 80}
      className={large ? (i === 0 ? 'lg:col-span-7' : 'lg:col-span-5') : 'lg:col-span-4'}
    >
      <div
        className={`shell h-full ${s.featured ? 'border-accent/30 bg-accent-2/10' : ''}`}
      >
        <div
          className={`core flex flex-col ${large ? 'min-h-[340px] p-9' : 'p-8'} ${
            s.featured ? 'bg-gradient-to-br from-accent/30 to-cyan/10' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`flex items-center justify-center text-ink ${
                large ? 'size-[52px] rounded-2xl border border-white/14 bg-white/8' : ''
              }`}
            >
              {icons[s.icon]}
            </span>
            <span className="font-mono text-xs text-ink/50">{s.num}</span>
          </div>
          <h3
            className={`font-semibold tracking-[-0.03em] ${
              large ? 'mt-auto pt-12 text-[1.875rem] leading-[1.08]' : 'mt-10 text-[1.375rem] leading-[1.15]'
            }`}
          >
            {s.title}
          </h3>
          <p className={`mt-3.5 leading-relaxed ${large ? 'text-base' : 'text-[0.9375rem]'} ${s.featured ? 'text-ink/78' : 'text-ink/65'}`}>
            {s.desc}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-ink/80">
            {s.tags.map((t) => (
              <li key={t} className="rounded-full border border-white/16 bg-white/5 px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export default function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-[1200px] px-4 py-28 sm:px-8">
      <SectionHeader
        label="01 · Servicios"
        description="Acompañamos a empresas, startups y PYMEs a crecer con tecnología bien construida y bien pensada."
      >
        Cinco disciplinas, una sola obsesión: <Accent>resolver el problema correcto.</Accent>
      </SectionHeader>

      <div className="mt-[72px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {services.map((s, i) => (
          <Card key={s.num} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
