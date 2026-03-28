import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContext, useAuthProvider } from './hooks/useAuth'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { ArchivePage } from './pages/ArchivePage'
import { PaperPage } from './pages/PaperPage'
import { UploadPage } from './pages/UploadPage'
import { SignInPage } from './pages/SignInPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ConsentBanner } from './components/layout/ConsentBanner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/** Pages wrapped with Navbar + Footer */
function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <ConsentBanner />
        <Routes>
          {/* Sign-in has its own layout (no navbar/footer) */}
          <Route path="/signin" element={<SignInPage />} />

          {/* All other pages get navbar + footer */}
          <Route path="/" element={<WithLayout><ArchivePage /></WithLayout>} />
          <Route path="/privacy" element={<WithLayout><PrivacyPage /></WithLayout>} />
          <Route path="/paper/:id" element={<WithLayout><PaperPage /></WithLayout>} />
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
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
