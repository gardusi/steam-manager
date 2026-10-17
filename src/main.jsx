import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { OwnedGamesProvider } from './state/ownedGames'
import { WishlistProvider } from './state/wishlist'
import App from './app'
import './index.css'

createRoot(document.getElementById('react-root')).render(
  <StrictMode>
    <BrowserRouter>
      <OwnedGamesProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </OwnedGamesProvider>
    </BrowserRouter>
  </StrictMode>
)
