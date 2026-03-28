export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto gap-4">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-lg font-semibold text-on-surface">
            Tuklas nin Sining
          </span>
          <p className="text-xs text-secondary uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Tuklas nin Sining. All Rights
            Reserved.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <a
            href="mailto:contact@example.com"
            className="text-xs font-medium uppercase tracking-wider text-secondary hover:text-primary underline underline-offset-4 transition-all duration-200"
          >
            Contact Faculty
          </a>
          <a
            href="/privacy"
            className="text-xs font-medium uppercase tracking-wider text-secondary hover:text-primary underline underline-offset-4 transition-all duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Disclaimer + Credit */}
      <div className="border-t border-outline-variant/10 px-4 md:px-8 py-4 max-w-7xl mx-auto space-y-2">
        <p className="text-[10px] text-outline text-center leading-relaxed">
          Tuklas nin Sining is an independent, volunteer-maintained academic
          archive. It is not affiliated with, endorsed by, or authorized by any
          school, the Department of Education (DepEd), or any government
          institution.
        </p>
        <p className="text-[10px] text-outline/60 text-center">
          by KMercad0
        </p>
      </div>
    </footer>
  )
}
