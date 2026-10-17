import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createPersistOptions, queryClient, removeLegacyCache } from './state/queryClient'
import { GlobalStyle } from './styles'
import App from './app'

removeLegacyCache()

createRoot(document.getElementById('react-root')).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <PersistQueryClientProvider client={queryClient} persistOptions={createPersistOptions()}>
        <App />
      </PersistQueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
