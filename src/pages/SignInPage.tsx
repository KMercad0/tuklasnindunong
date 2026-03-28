import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function SignInPage() {
  const { isAuthenticated, signInWithMagicLink } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signInWithMagicLink(email)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface">
      <main className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-left space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 scholarly-gradient rounded-lg flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-primary">
              Tuklas nin Sining
            </h1>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">
            Faculty Portal
          </h2>
          <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
            Secure access for authorized faculty only.
          </p>
        </div>

        {/* Form card */}
        <section className="bg-surface-container-lowest p-8 lg:p-10 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full scholarly-gradient" />

          {sent ? (
            <div className="space-y-4 text-center py-4">
              <span
                className="material-symbols-outlined text-primary text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
              <h3 className="text-lg font-semibold text-on-surface">
                Check your email
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We sent a sign-in link to{' '}
                <strong className="text-on-surface">{email}</strong>. Click the
                link to access the archive.
              </p>
              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="text-sm text-primary hover:underline mt-4"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block ml-1"
                  >
                    Institutional Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-lg">
                        mail
                      </span>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@institution.edu"
                      className="w-full bg-surface-container-low border-none rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder-outline focus:ring-2 focus:ring-primary transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-error">{error}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full scholarly-gradient text-on-primary font-semibold py-4 rounded-lg shadow-sm hover:translate-y-[-2px] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span>{loading ? 'Sending...' : 'Sign In'}</span>
                  <span className="material-symbols-outlined text-lg">
                    login
                  </span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-10 pt-8 border-t border-outline-variant/10 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">
              verified_user
            </span>
            <p className="text-[11px] leading-normal text-on-surface-variant uppercase tracking-[0.05em]">
              Encrypted Session Management Enabled.
              <br />
              Unauthorized access attempts are monitored and logged.
            </p>
          </div>
        </section>
      </main>

      {/* Background watermark */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[80px] font-black tracking-tighter text-outline whitespace-nowrap uppercase">
          Archive Access
        </span>
      </div>
    </div>
  )
}
