import { Header } from './components/Header';
import { About } from './sections/About';
import { Portfolio } from './sections/Portfolio';
import { Research } from './sections/Research';
import { Contact } from './sections/Contact';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Portfolio />
        <Research />
        <Contact />
      </main>
    </>
  );
}
