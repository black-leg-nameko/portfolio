import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Portfolio } from './sections/Portfolio';
import { Research } from './sections/Research';
import { Contact } from './sections/Contact';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <About />
        <Portfolio />
        <Research />
        <Contact />
      </main>
    </>
  );
}
