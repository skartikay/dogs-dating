import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SuccessScreen({ ownerName, dogName, refCode, onClose }) {
  const [codeCopied, setCodeCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const refLink = `https://barkmate.org?ref=${encodeURIComponent(refCode)}`

  const copyCode = () => {
    navigator.clipboard.writeText(refCode).then(() => {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(refLink).then(() => {
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2500)
    })
  }

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      `I just joined BarkMate for ${dogName} — India's first dog mating app! 🐾\nJoin with my link: ${refLink}`
    )
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="p-7 sm:p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
        className="text-6xl mb-4"
      >🎉</motion.div>

      <h2 className="text-2xl font-black text-dark mb-2">You're on the list!</h2>
      <p className="text-grey font-semibold text-sm leading-relaxed mb-6">
        {ownerName}, {dogName} is going to love BarkMate! We'll reach out as soon as we launch in your city. 🐾
      </p>

      {/* Ref code block */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-5 mb-5">
        <p className="text-xs font-extrabold text-grey uppercase tracking-widest mb-3">Your Referral Code</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-black text-coral tracking-widest font-mono">{refCode}</span>
          <button onClick={copyCode}
            className="px-3 py-1.5 rounded-lg border-2 border-orange-200 bg-white text-dark text-xs font-extrabold cursor-pointer hover:border-coral transition-colors">
            {codeCopied ? '✅ Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-xs text-grey font-semibold mt-3">Share this code — every friend who joins gets matched to your city!</p>
      </div>

      {/* Share buttons */}
      <div className="bg-cream rounded-2xl p-4 mb-4">
        <p className="text-xs font-extrabold text-dark mb-3">🐕 Share your referral link</p>
        <div className="flex gap-3">
          <button onClick={shareWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-extrabold text-sm border-none cursor-pointer hover:-translate-y-0.5 transition-all"
            style={{ background: '#25D366' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
          <button onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-extrabold text-sm border-2 border-orange-200 bg-white text-dark cursor-pointer hover:border-coral transition-all">
            {linkCopied ? '✅ Copied!' : '🔗 Copy Link'}
          </button>
        </div>
      </div>

      <button onClick={onClose}
        className="w-full py-3 rounded-2xl border-2 border-orange-200 bg-white text-grey font-extrabold text-sm cursor-pointer hover:border-coral transition-colors">
        Done ✓
      </button>
    </motion.div>
  )
}
