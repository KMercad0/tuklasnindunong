import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
      <span className="material-symbols-outlined text-7xl text-outline mb-6">
        explore_off
      </span>
      <h1 className="text-3xl font-bold text-on-surface mb-2">
        Page Not Found
      </h1>
      <p className="text-on-surface-variant mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 scholarly-gradient text-on-primary font-semibold rounded-lg hover:translate-y-[-2px] transition-all"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Archive
      </Link>
    </main>
  )
}
