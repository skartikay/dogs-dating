import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import HowItWorks from './components/HowItWorks'
import ShowcaseSection from './components/ShowcaseSection'
import PainPoints from './components/PainPoints'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [prefillEmail, setPrefillEmail] = useState('')

  const openModal = (email = '') => {
    setPrefillEmail(typeof email === 'string' ? email : '')
    setModalOpen(true)
  }

  return (
    <div className="font-nunito">
      <Navbar onJoin={openModal} />
      <Hero onJoin={openModal} />
      <StatsStrip />
      <HowItWorks />
      <ShowcaseSection />
      <PainPoints />
      <CtaSection onJoin={openModal} />
      <Footer />
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} prefillEmail={prefillEmail} />
    </div>
  )
}
