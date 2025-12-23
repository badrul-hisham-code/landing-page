import './App.css';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
}

export default App;
