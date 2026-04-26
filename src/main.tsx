import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: 'https://eec15d65249b555fe66bd1c0004e2738@o4511098248888320.ingest.us.sentry.io/4511288251711489',
  environment: import.meta.env.MODE,
  enabled: import.meta.env.PROD,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', fontSize: '14px', color: '#888' }}>Something went wrong. Please refresh.</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
)
