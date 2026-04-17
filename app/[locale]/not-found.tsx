import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-electric-400 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page introuvable</h1>
        <p className="text-white/60 mb-8">
          La page que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/fr"
          className="inline-flex items-center gap-2 bg-electric-500 hover:bg-electric-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
