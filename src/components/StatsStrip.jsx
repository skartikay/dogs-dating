const stats = [
  { icon: '🚀', value: 'Early Access', sub: 'Now Open — Be First In' },
  { icon: '🇮🇳', value: 'India-First', sub: 'Built for Indian Dog Owners' },
  { icon: '🐾', value: 'Coming Soon', sub: 'Launching in Your City' },
]

export default function StatsStrip() {
  return (
    <div className="bg-coral py-8 px-[5%]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
        {stats.map(s => (
          <div key={s.value}>
            <div className="text-2xl font-black">{s.icon} {s.value}</div>
            <div className="text-sm font-semibold opacity-90 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
