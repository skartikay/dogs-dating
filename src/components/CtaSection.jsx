export default function CtaSection({ onJoin }) {
  return (
    <section className="py-20 px-[5%] bg-coral text-white text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-5xl mb-4">🐾</div>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black mb-4">Ready to Find a Match?</h2>
        <p className="text-white/90 text-base font-semibold mb-8 leading-relaxed">
          Join thousands of dog parents across India waiting for BarkMate. Be first in your city.
        </p>
        <button onClick={onJoin} className="bg-white text-coral font-black text-lg px-10 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border-none cursor-pointer">
          Join the Waitlist — It's Free 🐾
        </button>
        <p className="mt-4 text-white/70 text-sm font-bold">🔒 No spam. Unsubscribe any time.</p>
      </div>
    </section>
  )
}
