import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

export function Navbar() {
  const { isAuthenticated, signOut } = useAuth()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
    setShowMenu(false)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-xl font-bold tracking-tighter text-primary"
        >
          Tuklas nin Sining
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`transition-colors ${
              isActive('/')
                ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Archive
          </Link>
          {isAuthenticated && (
            <Link
              to="/upload"
              className={`transition-colors ${
                isActive('/upload')
                  ? 'text-primary font-semibold border-b-2 border-primary pb-1'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Upload
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
{isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-surface-container-low transition-all duration-200"
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/20 py-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-outline-variant/20 px-6 py-4 space-y-3">
          <Link
            to="/"
            className="block text-secondary hover:text-primary transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Archive
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/upload"
                className="block text-secondary hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Upload
              </Link>
              <button
                onClick={handleSignOut}
                className="block text-secondary hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
