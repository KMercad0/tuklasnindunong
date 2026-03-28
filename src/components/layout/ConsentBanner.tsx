import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'tuklas_consent_accepted'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden">
        {/* Header accent */}
        <div className="h-1 scholarly-gradient" />

        <div className="p-5 md:p-8 space-y-5 md:space-y-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 scholarly-gradient rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span
                className="material-symbols-outlined text-white text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">
                Before You Continue
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                Please read and acknowledge the following
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
            <p>
              <strong className="text-on-surface">Tuklas nin Sining</strong> is
              an independent, volunteer-maintained research archive. It is{' '}
              <strong className="text-on-surface">
                not affiliated with, endorsed by, or authorized by
              </strong>{' '}
              any school, the Department of Education (DepEd), or any government
              institution.
            </p>

            <p>
              This site stores student research paper metadata and documents for
              educational reference. Student names are{' '}
              <strong className="text-on-surface">
                not visible to the public
              </strong>{' '}
              and are accessible only to authorized faculty members.
            </p>

            <p>
              By continuing, you acknowledge that you have read and understood
              our{' '}
              <Link
                to="/privacy"
                className="text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Action */}
          <button
            onClick={handleAccept}
            className="w-full scholarly-gradient text-on-primary font-semibold py-3.5 rounded-lg shadow-sm hover:translate-y-[-1px] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>I Understand</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
