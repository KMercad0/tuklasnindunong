import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-gray-900">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The page failed to load. Try refreshing or return to the archive.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={this.reset}
              className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    )
  }
}
