import { Header, Footer } from './components/Layout';
import {
  Hero,
  Strengths,
  Career,
  Achievements,
  Activities,
  AIThoughts,
  Contact,
} from './components/Sections';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <Strengths />
        <Career />
        <Achievements />
        <Activities />
        <AIThoughts />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
