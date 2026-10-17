import { useEffect, useRef, useState } from 'react';

/* Logo animado (cerebro + navegador), portado desde "Logo animation preview" de Claude Design.
   Todo el movimiento se deriva de un único tiempo T (segundos) mediante tweens puros. */

const Easing = {
  linear: (t) => t,
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeOutCubic: (t) => (t - 1) ** 3 + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutBack: (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
};

const MOTION = { enter: Easing.easeOutCubic, draw: Easing.easeInOutCubic, pop: Easing.easeOutBack };

const tw = (T, start, end, ease, from = 0, to = 1) => {
  if (T <= start) return from;
  if (T >= end) return to;
  return from + (to - from) * ease((T - start) / (end - start));
};
const around = (cx, cy, s) => `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`;

/* Escenas en orden; CUES[nombre] = segundo en que empieza */
const SCENES = [
  ['Window', 1.4],
  ['Brain', 1.8],
  ['Circuits', 1.8],
  ['Type', 1.6],
  ['Click', 2.2],
  ['Hold', 1.4],
  ['Outro', 0.6],
];
const CUES = {};
let acc = 0;
for (const [name, dur] of SCENES) {
  CUES[name] = Math.round(acc * 1000) / 1000;
  acc += dur;
}
const TOTAL = Math.round(acc * 1000) / 1000;

const LOBES = [
  // [cx, cy, r, delayIndex]
  [1010, 760, 250, 0],
  [700, 960, 125, 1], [655, 815, 100, 2], [725, 690, 100, 3], [830, 590, 105, 4], [925, 535, 88, 5],
  [1330, 960, 115, 1], [1362, 815, 98, 2], [1300, 690, 95, 3], [1195, 600, 105, 4], [1090, 535, 88, 5],
];
const FOLDS = [
  'M716 598 Q720 625 728 642',
  'M748 772 Q712 716 640 712',
  'M630 935 Q600 925 582 905',
  'M1158 486 Q1100 510 1090 580 Q1088 600 1100 615 L1145 640',
  'M1265 773 Q1290 715 1345 718',
  'M1390 935 Q1420 925 1438 912',
  'M835 525 Q832 505 845 490',
];
const TRACES = [
  { d: 'M772 585 H825 L870 545 Q890 532 905 560', nodes: [[772, 585]] },
  { d: 'M938 500 L965 525 V600 H885 L825 662 H758', nodes: [[938, 500], [758, 662]] },
  { d: 'M958 672 H905 L850 718 H760', nodes: [[958, 672]] },
  { d: 'M958 745 H915 L878 772', nodes: [[958, 745], [876, 772]] },
  { d: 'M640 790 H722', nodes: [[640, 790]] },
  { d: 'M630 868 H690 Q712 868 715 840 L720 800 Q725 778 750 778 H805 V830 L905 862 L945 815 H1050 Q1075 815 1078 795', nodes: [[630, 868]] },
  { d: 'M772 855 L800 868 Q830 885 830 915', nodes: [[772, 855]] },
  { d: 'M1228 568 H1180 L1170 576 L1180 612 L1145 637 L1160 665 Q1150 682 1125 676 L1085 715 H1020', nodes: [[1228, 568]] },
  { d: 'M1212 728 V670 L1245 635 L1280 648 Q1300 640 1302 600', nodes: [[1212, 728]] },
  { d: 'M1085 715 L1100 760 Q1110 772 1140 772 L1180 810 H1300 L1328 845 L1380 800', nodes: [[1380, 800]] },
  { d: 'M1190 812 V915', nodes: [] },
  { d: 'M1240 840 V915', nodes: [] },
  { d: 'M1130 858 H1115 Q1095 860 1095 885 V915', nodes: [[1130, 858]] },
  { d: 'M1380 885 H1340 Q1315 885 1298 912', nodes: [[1380, 885]] },
];

/* Los "cortes" entre formas (pliegues, circuitos, borde de la ventana, contorno del cursor)
   son máscaras transparentes, así el logo funciona sobre cualquier fondo sin marco.
   ink: relleno de las formas · accent: centro del cerebro y destello · signal: pulso del clic */
const DEFAULT_COLORS = {
  ink: '#f4f5f7',
  accent: '#9ea0ff',
  signal: '#22d3ee',
  muted: '#8b8da0',
  cursorEdge: '#22d3ee',
};

const CURSOR = 'M1070 1185 L1225 1246 L1162 1262 L1192 1312 L1168 1332 L1136 1278 L1100 1320 Z';
const FRAME = { x: 652, y: 908, width: 706, height: 390, rx: 40 };
const INTERIOR = 'M682 1032 H1335 V1258 Q1335 1278 1315 1278 H1085 L1080 1282 H702 Q682 1282 682 1262 Z';

/* Máscara: blanco = visible, negro = recortado */
function Mask({ id, children }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="2100" height="1800">
      <rect x="0" y="0" width="2100" height="1800" fill="white" />
      {children}
    </mask>
  );
}

function windowState(T) {
  const w0 = CUES.Window;
  const e = tw(T, w0, w0 + 1.0, MOTION.enter);
  const s = tw(T, w0, w0 + 1.0, MOTION.pop, 0.85, 1);
  return { e, transform: `translate(0 ${(1 - e) * 140}) ${around(1005, 1100, s)}` };
}

function pointerState(T) {
  const k0 = CUES.Click;
  const fly = tw(T, k0, k0 + 0.65, MOTION.enter);
  const press = tw(T, k0 + 0.62, k0 + 0.75, MOTION.enter) - tw(T, k0 + 0.75, k0 + 0.95, MOTION.pop);
  return {
    opacity: tw(T, k0, k0 + 0.25, MOTION.enter),
    transform: `translate(${(1 - fly) * 520} ${(1 - fly) * 300}) ${around(1072, 1188, 1 - 0.14 * press)}`,
  };
}

/* Silueta del cursor con su borde, para recortar lo que tiene debajo */
function CursorCut({ T }) {
  const p = pointerState(T);
  return (
    <path d={CURSOR} fill="black" stroke="black" strokeWidth="18" strokeLinejoin="round" opacity={p.opacity} transform={p.transform} />
  );
}

function Brain({ T, c, pulse, id, rise }) {
  const b0 = CUES.Brain, c0 = CUES.Circuits, k0 = CUES.Click;
  const glow = tw(T, k0 + 0.8, k0 + 1.1, MOTION.enter) - tw(T, k0 + 1.1, k0 + 2.2, MOTION.draw);
  const folds = tw(T, b0 + 0.9, b0 + 1.6, MOTION.enter);
  const win = windowState(T);
  const lift = `translate(0 ${rise})`;
  const traces = TRACES.map((t, i) => {
    const a = c0 + i * 0.07;
    const pa = k0 + 0.75 + (i % 5) * 0.06;
    return {
      ...t,
      p: tw(T, a, a + 0.75, MOTION.draw),
      pp: tw(T, pa, pa + 1.1, MOTION.draw),
      nodeScale: t.nodes.map((_, j) => tw(T, a + 0.55 + j * 0.1, a + 0.95 + j * 0.1, MOTION.pop)),
    };
  });
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-brain`} gradientUnits="userSpaceOnUse" cx="1010" cy="720" r={320 + 140 * glow}>
          <stop offset="0" stopColor={c.accent} />
          <stop offset="1" stopColor={c.ink} />
        </radialGradient>
        <Mask id={`${id}-brain-cut`}>
          <g transform={lift}>
            <g opacity={folds}>
              <path d="M1008 440 V915" stroke="black" strokeWidth="22" fill="none" />
              {FOLDS.map((d, i) => (
                <path key={i} d={d} stroke="black" strokeWidth="14" fill="none" strokeLinecap="round" />
              ))}
            </g>
            {traces.map((t, i) => (
              <g key={i}>
                <path d={t.d} pathLength="1" stroke="black" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="1 1" strokeDashoffset={1 - t.p} />
                {t.nodes.map(([x, y], j) => (
                  <circle key={j} cx={x} cy={y} r="18.5" fill="black" transform={around(x, y, t.nodeScale[j])} />
                ))}
              </g>
            ))}
          </g>
          <rect {...FRAME} fill="black" stroke="black" strokeWidth="32" opacity={win.e} transform={win.transform} />
          <CursorCut T={T} />
        </Mask>
      </defs>
      <g mask={`url(#${id}-brain-cut)`}>
        <g transform={lift}>
          {LOBES.map(([cx, cy, r, i], n) => {
            const s = tw(T, b0 + i * 0.22, b0 + i * 0.22 + 0.7, MOTION.pop);
            return <circle key={n} cx={cx} cy={cy} r={r} fill={`url(#${id}-brain)`} transform={around(cx, cy, s)} />;
          })}
        </g>
      </g>
      <g transform={lift}>
        {traces.map((t, i) => (
          <g key={i}>
            {pulse && t.pp > 0 && t.pp < 1 && (
              <path d={t.d} pathLength="1" stroke={c.signal} strokeWidth="15" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="0.18 1.4" strokeDashoffset={0.18 - t.pp * 1.2} />
            )}
            {t.nodes.map(([x, y], j) => (
              <circle key={j} cx={x} cy={y} r="9.5" fill={c.ink} transform={around(x, y, t.nodeScale[j])} />
            ))}
          </g>
        ))}
      </g>
    </g>
  );
}

function BrowserWindow({ T, c, word, id }) {
  const w0 = CUES.Window, t0 = CUES.Type, k0 = CUES.Click;
  const win = windowState(T);
  const typed = Math.round(tw(T, t0 + 0.35, t0 + 1.2, Easing.linear, 0, word.length));
  const caretOn = T < t0 + 1.4 ? Math.floor(T * 2.6) % 2 === 0 : true;
  const boxFlash = tw(T, k0 + 0.75, k0 + 0.9, MOTION.enter) - tw(T, k0 + 0.9, k0 + 1.6, MOTION.draw);
  const mag = tw(T, t0, t0 + 0.45, MOTION.pop);
  const searchIn = tw(T, w0 + 0.6, w0 + 1.2, MOTION.enter);
  /* Reduce el texto para que palabras largas quepan en el buscador */
  const fontSize = 104 * Math.min(1, 6.2 / word.length);
  return (
    <g>
      <defs>
        <Mask id={`${id}-frame-cut`}>
          <rect x="652" y="1008" width="706" height="12" fill="black" />
          {[715, 762, 808].map((x, i) => (
            <circle key={x} cx={x} cy="963" r="13" fill="black"
              transform={around(x, 963, tw(T, w0 + 0.5 + i * 0.12, w0 + 0.85 + i * 0.12, MOTION.pop))} />
          ))}
          <path d={INTERIOR} fill="black" />
        </Mask>
        <Mask id={`${id}-cursor-cut`}>
          <CursorCut T={T} />
        </Mask>
      </defs>
      <g mask={`url(#${id}-cursor-cut)`}>
        <g opacity={win.e} transform={win.transform}>
          <rect {...FRAME} fill={c.ink} mask={`url(#${id}-frame-cut)`} />
          <g opacity={searchIn} transform={`translate(0 ${(1 - searchIn) * 20})`}>
            <rect x="703" y="1063" width="618" height="150" rx="30" fill="none" stroke={c.ink} strokeWidth="10" />
            <rect x="703" y="1063" width="618" height="150" rx="30" fill="none" stroke={c.accent} strokeWidth="10" opacity={boxFlash} />
            <g transform={around(780, 1135, mag)}>
              <circle cx="775" cy="1128" r="27" stroke={c.muted} strokeWidth="9" fill="none" />
              <path d="M796 1150 L820 1177" stroke={c.muted} strokeWidth="11" strokeLinecap="round" />
            </g>
            <rect x="857" y="1085" width="9" height="105" rx="4" fill={c.ink} opacity={caretOn ? 1 : 0} />
            <text x="884" y={1143 + fontSize * 0.36} fontFamily="'Bricolage Grotesque', system-ui, sans-serif" fontWeight="800"
              fontSize={fontSize} fill={c.ink} letterSpacing="-1">
              {word.slice(0, typed)}
            </text>
          </g>
        </g>
      </g>
    </g>
  );
}

function Pointer({ T, c, id }) {
  const k0 = CUES.Click;
  const p = pointerState(T);
  const ripple = tw(T, k0 + 0.72, k0 + 1.4, MOTION.enter);
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-cursor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.cursorEdge} />
          <stop offset="0.6" stopColor={c.accent} />
          <stop offset="1" stopColor={c.cursorEdge} />
        </linearGradient>
      </defs>
      {ripple > 0 && ripple < 1 && (
        <circle cx="1072" cy="1188" r={20 + ripple * 110} fill="none" stroke={c.signal} strokeWidth={12 * (1 - ripple)} opacity={1 - ripple} />
      )}
      <path d={CURSOR} fill={`url(#${id}-cursor)`} opacity={p.opacity} transform={p.transform} />
    </g>
  );
}

/* Reproduce la animación al entrar en pantalla.
   loop=false: se detiene en el logo terminado (inicio de "Outro").
   Con prefers-reduced-motion se muestra directamente el logo terminado. */
export default function LogoAnimation({ word = 'JS_Dev', loop = false, pulse = true, colors, className = '', title = 'Logo de JS_Dev' }) {
  const c = { ...DEFAULT_COLORS, ...colors };
  const id = useRef(`logo-${Math.random().toString(36).slice(2, 8)}`).current;
  const ref = useRef(null);
  const end = loop ? TOTAL : CUES.Outro;
  const [T, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(CUES.Outro);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      let t = (now - start) / 1000;
      if (loop) t %= TOTAL;
      else if (t >= end) {
        setT(end);
        return;
      }
      setT(t);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [loop, end]);

  const out = tw(T, CUES.Outro, TOTAL, MOTION.draw);
  const cam = tw(T, 0, CUES.Outro, Easing.easeOutSine, 0.93, 1.0) + out * 0.04;
  const rise = (1 - tw(T, CUES.Brain, CUES.Brain + 1.6, MOTION.enter)) * 60;

  return (
    <svg ref={ref} viewBox="470 400 1080 990" role="img" aria-label={title} className={`block h-auto w-full ${className}`}>
      <g opacity={1 - out} transform={around(1008, 888, cam)}>
        <Brain T={T} c={c} pulse={pulse} id={id} rise={rise} />
        <BrowserWindow T={T} c={c} word={word} id={id} />
        <Pointer T={T} c={c} id={id} />
      </g>
    </svg>
  );
}
