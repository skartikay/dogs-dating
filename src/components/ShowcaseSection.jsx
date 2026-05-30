import { motion } from 'framer-motion'

const features = [
  { icon: '🧬', title: 'Breed Compatibility', desc: 'Smart matching based on breed characteristics, size, and temperament for healthy litters.' },
  { icon: '💉', title: 'Health Verified', desc: 'All dogs must have up-to-date vaccination records. Safety first, always.' },
  { icon: '📍', title: 'Nearby Matches', desc: 'Find compatible dogs within your city or neighbourhood — no long-distance hassle.' },
  { icon: '🔒', title: 'Private & Safe', desc: 'Your details are shared only when you choose to connect. Full control, always.' },
  { icon: '💬', title: 'In-App Chat', desc: 'Talk to other owners, share photos, and plan meet-ups — all in one place.' },
  { icon: '⭐', title: 'Owner Reviews', desc: 'Community ratings help you find responsible, caring dog parents near you.' },
]

export default function ShowcaseSection() {
  return (
    <section className="py-20 px-[5%] bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-orange-50 border-2 border-orange-200 text-coral font-extrabold text-xs px-4 py-1.5 rounded-full mb-4">Features</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-dark">Everything You Need</h2>
          <p className="text-grey mt-3 text-base max-w-lg mx-auto">Built specifically for Indian dog owners, by dog lovers.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border-2 border-orange-100 hover:border-coral/40 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-black text-dark text-base mb-2">{f.title}</h3>
              <p className="text-grey text-sm leading-relaxed font-semibold">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
