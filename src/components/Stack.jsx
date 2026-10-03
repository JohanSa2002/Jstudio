import { Accent, Reveal, SectionHeader } from './ui.jsx';

const categories = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { name: 'IA & ML', items: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Hugging Face'] },
  { name: 'Infra & Cloud', items: ['AWS', 'Vercel', 'Docker', 'Supabase', 'Cloudflare'] },
];

const marquee = ['React', 'Next.js', 'TypeScript', 'Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'AWS', 'Vercel', 'Docker'];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-[1200px] px-4 py-28 sm:px-8">
      <SectionHeader
        label="03 · Stack"
        description="Herramientas probadas en producción para construir rápido, escalar sin romper nada y dejar la IA bien integrada."
      >
        El stack con el que trabajamos <Accent>cada día.</Accent>
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={i * 80}>
            <div className="shell h-full">
              <div className="core p-7">
                <h3 className="mb-5 font-mono text-[11px] font-medium tracking-[0.2em] text-cyan uppercase">{c.name}</h3>
                <ul className="flex flex-wrap gap-2 text-[0.9375rem]">
                  {c.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="shell overflow-hidden rounded-full p-1.5" aria-hidden="true">
          <div className="core overflow-hidden rounded-full py-4">
            <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 pr-10 text-xl font-semibold tracking-tight whitespace-nowrap text-ink/80 motion-reduce:animate-none">
              {[...marquee, ...marquee].map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
