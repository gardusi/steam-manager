import { css, keyframes } from 'styled-components'

export const reducedMotion = (rules) => css`
  @media (prefers-reduced-motion: reduce) {
    ${rules}
  }
`

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`
// Loading placeholder with a shimmer (static when the user prefers reduced motion)
export const skeleton = css`
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  ${reducedMotion('animation: none;')}
`

// Hidden on screen but still read by screen readers
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
