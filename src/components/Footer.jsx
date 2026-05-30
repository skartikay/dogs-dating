export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 py-10 px-[5%] text-center">
      <div className="text-2xl font-black text-white mb-2">🐾 BarkMate</div>
      <p className="text-sm font-semibold mb-4">India's first dog mating app. Built with ❤️ for dog parents.</p>
      <p className="text-xs text-white/40">© {new Date().getFullYear()} BarkMate. All rights reserved.</p>
    </footer>
  )
}
