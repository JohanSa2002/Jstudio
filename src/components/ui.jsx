import { useEffect, useRef } from 'react';

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, dot }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-ink/80 uppercase">
      {dot && <span className="size-[7px] rounded-full bg-green-400" />}
      {children}
    </span>
  );
}

export function SectionHeader({ label, children, description }) {
  return (
    <Reveal>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="mt-7 max-w-[860px] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
        {children}
      </h2>
      <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-ink/65">{description}</p>
    </Reveal>
  );
}

export function Accent({ children, gradient = false }) {
  return (
    <span
      className={`font-serif font-normal italic tracking-[-0.02em] ${
        gradient ? 'bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent' : 'text-accent'
      }`}
    >
      {children}
    </span>
  );
}

export function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const variants = {
  primary: 'bg-gradient-to-br from-accent to-accent-2 text-base',
  light: 'bg-ink text-base',
  ghost: 'border border-white/16 bg-white/6 text-ink',
};

/* Botón "isla": píldora con el icono dentro de su propio círculo */
export function Button({ as: Tag = 'a', variant = 'primary', arrow = true, className = '', children, ...rest }) {
  return (
    <Tag
      className={`group inline-flex min-h-[52px] cursor-pointer items-center gap-3.5 rounded-full text-base font-semibold transition-transform duration-[600ms] ease-spring hover:-translate-y-0.5 active:scale-[0.98] ${
        arrow ? 'py-2 pr-2 pl-7' : 'px-7'
      } ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <span className="flex size-9 items-center justify-center rounded-full bg-base/14 transition-transform duration-[600ms] ease-spring group-hover:translate-x-[3px] group-hover:-translate-y-px group-hover:scale-105">
          <ArrowIcon />
        </span>
      )}
    </Tag>
  );
}
