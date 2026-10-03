import { useState } from 'react';
import { Accent, Button, Reveal, SectionHeader } from './ui.jsx';

const contactLinks = [
  { label: 'Email personal', value: '2002samudiojohan@gmail.com', href: 'mailto:2002samudiojohan@gmail.com' },
  { label: 'Email de trabajo', value: 'johan.samudiotrabajo@gmail.com', href: 'mailto:johan.samudiotrabajo@gmail.com' },
  { label: 'Teléfono principal', value: '+507 6524-7842', href: 'tel:+50765247842' },
  { label: 'Teléfono alterno', value: '+507 6809-4813', href: 'tel:+50768094813' },
];

const chipOptions = ['Software a medida', 'Integración IA', 'Web / E-commerce', 'Chatbot', 'Automatización'];

const label = 'flex flex-col gap-1.5 text-[13px] text-ink/65';

export default function Contacto() {
  const [chip, setChip] = useState(chipOptions[0]);

  return (
    <section id="contacto" className="mx-auto max-w-[1200px] px-4 py-28 sm:px-8">
      <SectionHeader
        label="04 · Contacto"
        description="Cuéntame qué quieres construir. Respondo en menos de 24 horas — casi siempre mucho antes."
      >
        Hablemos de tu <Accent>próximo proyecto.</Accent>
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="shell h-full">
            <div className="core p-8">
              <div className="flex items-center gap-4 border-b border-white/8 pb-6">
                <span className="flex size-14 items-center justify-center rounded-[1.125rem] bg-gradient-to-br from-accent to-cyan text-xl font-extrabold tracking-tight text-base">
                  JS
                </span>
                <div>
                  <div className="text-[1.375rem] font-semibold tracking-tight">Johan Samudio</div>
                  <div className="mt-0.5 text-sm text-ink/60">Fundador · Desarrollador</div>
                </div>
              </div>
              {contactLinks.map((l) => (
                <a key={l.label} href={l.href} className="block pt-5 transition-colors duration-500 ease-spring hover:text-white">
                  <div className="font-mono text-[11px] tracking-[0.14em] text-ink/50 uppercase">{l.label}</div>
                  <div className="mt-1 text-base break-words">{l.value}</div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-3">
          <div className="shell h-full">
            <form
              className="core p-7 sm:p-9"
              action="https://formsubmit.co/johan.samudiotrabajo@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Nuevo proyecto desde JStudio_IA" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="servicio" value={chip} />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

              <h3 className="text-[1.75rem] font-semibold tracking-[-0.03em]">Cuéntame tu idea.</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink/62">Responde unas preguntas rápidas y prepararé una propuesta.</p>

              <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Servicio de interés">
                {chipOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={chip === c}
                    onClick={() => setChip(c)}
                    className={`min-h-11 cursor-pointer rounded-full border px-[18px] text-sm transition-all duration-500 ease-spring active:scale-[0.98] ${
                      chip === c ? 'border-transparent bg-ink font-semibold text-base' : 'border-white/18 bg-white/5 text-ink hover:bg-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <label className={label}>
                  Nombre
                  <input type="text" name="nombre" required autoComplete="name" className="glass-input" />
                </label>
                <label className={label}>
                  Email
                  <input type="email" name="email" required autoComplete="email" className="glass-input" />
                </label>
                <label className={label}>
                  Empresa (opcional)
                  <input type="text" name="empresa" autoComplete="organization" className="glass-input" />
                </label>
                <label className={label}>
                  Presupuesto
                  <select name="presupuesto" required defaultValue="" className="glass-input">
                    <option value="" disabled>
                      Selecciona un rango
                    </option>
                    <option>$1k – $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $40k</option>
                    <option>$40k+</option>
                  </select>
                </label>
              </div>
              <label className={`${label} mt-3.5`}>
                Describe tu proyecto
                <textarea name="mensaje" rows={4} required className="glass-input resize-y" />
              </label>

              <Button as="button" type="submit" className="mt-6 border-0">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
