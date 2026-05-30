import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { generateRefCode, getInboundRef } from '../../utils/referral'
import Step1 from './Step1'
import Step2 from './Step2'
import SuccessScreen from './SuccessScreen'

const EMPTY = {
  ownerName: '', email: '', phone: '', dogName: '', breed: '',
  gender: '', age: '', vaccination: '', city: '', pincode: '',
}

export default function WaitlistModal({ isOpen, onClose, prefillEmail = '' }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ ...EMPTY, email: prefillEmail })
  const [loading, setLoading] = useState(false)
  const [refCode, setRefCode] = useState('')
  const inboundRef = getInboundRef()

  // Sync prefill email
  useEffect(() => {
    if (prefillEmail) setData(d => ({ ...d, email: prefillEmail }))
  }, [prefillEmail])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const reset = () => {
    setStep(1)
    setData({ ...EMPTY })
    setRefCode('')
  }

  const handleClose = () => { reset(); onClose() }

  const handleSubmit = async () => {
    setLoading(true)
    const code = generateRefCode(data.ownerName, data.dogName, data.pincode, data.email)
    setRefCode(code)
    try {
      await addDoc(collection(db, 'waitlist'), {
        ...data,
        referralCode: code,
        referredBy: inboundRef || '—',
        createdAt: serverTimestamp(),
      })
      setStep('success')
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const stepTitles = {
    1: { title: 'Join the BarkMate Waitlist', sub: "Tell us about your dog — we'll find perfect matches nearby!" },
    2: { title: 'Almost there! 🐾', sub: 'Just a few more details about your pup.' },
    success: { title: "You're on the list!", sub: '' },
  }
  const current = stepTitles[step]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) handleClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-full max-w-[520px] bg-white rounded-[28px] shadow-2xl overflow-hidden flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            {step !== 'success' && (
              <div className="relative px-7 pt-6 pb-5" style={{ background: 'linear-gradient(135deg,#FF6B6B 0%,#FF8E53 100%)' }}>
                <button onClick={handleClose}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-base border-2 border-white/40 bg-white/20 cursor-pointer hover:bg-white/30 transition-colors">✕
                </button>

                {/* Inbound referral banner */}
                {inboundRef && (
                  <div className="mb-3 bg-white/20 rounded-xl px-3 py-2 text-xs font-extrabold text-white flex items-center gap-2">
                    🐾 Invited by a friend! Code: <span className="bg-white/30 rounded px-2 py-0.5 tracking-wider">{inboundRef}</span>
                  </div>
                )}

                <div className="text-3xl mb-2">🐾</div>
                <h2 className="text-white font-black text-xl mb-1">{current.title}</h2>
                {current.sub && <p className="text-white/90 text-sm font-semibold">{current.sub}</p>}

                {/* Progress bar */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="text-white/90 text-xs font-extrabold whitespace-nowrap">Step {step} of 2</span>
                </div>
              </div>
            )}

            {/* Steps */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <Step1 data={data} onChange={setData} onNext={() => setStep(2)} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                  <Step2 data={data} onChange={setData} onBack={() => setStep(1)} onSubmit={handleSubmit} loading={loading} />
                </motion.div>
              )}
              {step === 'success' && (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <SuccessScreen ownerName={data.ownerName} dogName={data.dogName} refCode={refCode} onClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
