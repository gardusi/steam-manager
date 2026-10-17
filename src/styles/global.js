import { createGlobalStyle } from 'styled-components'
import { colors } from './tokens'

// Base styles for the whole document. The page background is also set inline in
// index.html so there's no white flash before this loads.
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    scrollbar-gutter: stable;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: ${colors.text};
    background: ${colors.background} radial-gradient(ellipse at top, ${colors.surfaceRaised} 0%, ${colors.background} 60%) no-repeat;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p, h1, h2, h3, input {
    font-family: inherit;
    margin: 0;
  }
  a {
    color: inherit;
  }
  :focus-visible {
    outline: 2px solid ${colors.brand};
    outline-offset: 2px;
  }
  ::selection {
    background: ${colors.brand};
    color: ${colors.backgroundDeep};
  }
`
