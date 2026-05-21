import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContext, useAuthProvider } from './hooks/useAuth'
import { ThemeContext, useThemeProvider } from './hooks/useTheme'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import { ArchivePage } from './pages/ArchivePage'
import { PaperPage } from './pages/PaperPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ConsentBanner } from './components/layout/ConsentBanner'

const UploadPage = lazy(() =>
  import('./pages/UploadPage').then((m) => ({ default: m.UploadPage }))
)
const EditPage = lazy(() =>
  import('./pages/EditPage').then((m) => ({ default: m.EditPage }))
)
const SignInPage = lazy(() =>
  import('./pages/SignInPage').then((m) => ({ default: m.SignInPage }))
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-gray-500 dark:text-gray-400">
      Loading…
    </div>
  )
}

function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeProvider()
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <ConsentBanner />
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/signin" element={<SignInPage />} />

                  <Route path="/" element={<WithLayout><ArchivePage /></WithLayout>} />
                  <Route path="/privacy" element={<WithLayout><PrivacyPage /></WithLayout>} />
                  <Route path="/paper/:id" element={<WithLayout><PaperPage /></WithLayout>} />
                  <Route
                    path="/paper/:id/edit"
                    element={
                      <WithLayout>
                        <ProtectedRoute>
                          <EditPage />
                        </ProtectedRoute>
                      </WithLayout>
                    }
                  />
                  <Route
                    path="/upload"
                    element={
                      <WithLayout>
                        <ProtectedRoute>
                          <UploadPage />
                        </ProtectedRoute>
                      </WithLayout>
                    }
                  />
                  <Route path="*" element={<WithLayout><NotFoundPage /></WithLayout>} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
