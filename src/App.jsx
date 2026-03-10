import { Navigation } from './components/Navigation'
import { Hero } from './components/sections/Hero'
import { WhyUpxel } from './components/sections/WhyUpxel'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { Founder } from './components/sections/Founder'
import { Results } from './components/sections/Results'
// import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navigation />
      <Hero />
      <WhyUpxel />
      <Services />
      <Process />
      <Founder />
      <Results />
      {/* <Contact /> */}
      <Footer />
    </main>
  )
}

export default App
