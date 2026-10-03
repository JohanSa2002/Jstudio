import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Servicios from './components/Servicios.jsx';
import Proyectos from './components/Proyectos.jsx';
import Stack from './components/Stack.jsx';
import Contacto from './components/Contacto.jsx';
import Footer from './components/Footer.jsx';
import ParticleField from './components/ParticleField.jsx';

/* Orbes de luz: dan algo que desenfocar al vidrio de las tarjetas */
const orbs = [
  { top: '-220px', left: '-180px', color: 'bg-accent', opacity: 'opacity-30' },
  { top: '380px', right: '-240px', color: 'bg-cyan', opacity: 'opacity-15' },
  { top: '1500px', left: '-260px', color: 'bg-violet', opacity: 'opacity-25' },
  { top: '2600px', right: '-200px', color: 'bg-accent', opacity: 'opacity-25' },
  { top: '3700px', left: '-200px', color: 'bg-cyan', opacity: 'opacity-15' },
];

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-base">
      {orbs.map((o, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute size-[44rem] rounded-full blur-[140px] ${o.color} ${o.opacity}`}
          style={{ top: o.top, left: o.left, right: o.right }}
        />
      ))}
      <ParticleField />
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Servicios />
          <Proyectos />
          <Stack />
          <Contacto />
        </main>
        <Footer />
      </div>
    </div>
  );
}
