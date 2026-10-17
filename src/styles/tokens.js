// Design tokens: every color, size and breakpoint the UI uses comes from here.
// Text/background pairs are checked for WCAG AA (4.5:1) contrast.

export const colors = {
  // Backgrounds, darkest first
  backgroundDeep: '#171a21', // nav bar, tooltips
  background: '#1b2838', // page
  surface: 'rgba(0, 0, 0, 0.2)', // panels and cards
  surfaceHover: '#1e3044', // hovered card (keeps textMuted at AA)
  surfaceRaised: '#2a475e', // buttons, tags, focused options
  border: '#2a475e',
  overlayHover: 'rgba(255, 255, 255, 0.04)', // hovered row on any surface
  toolbar: 'rgba(23, 26, 33, 0.92)', // sticky list toolbar over scrolling content
  imageFallback: 'linear-gradient(#1b2838, #2a475e)',

  // Text
  textStrong: '#ffffff',
  text: '#c7d5e0',
  textMuted: '#8f98a0',

  // Accents
  brand: '#66c0f4', // links, active tab, focus ring
  chart: '#3d9be9', // validated for a single series on the dark background
  chartTrack: 'rgba(61, 155, 233, 0.2)', // unfilled part of a meter, same hue as chart
  chartTint: 'rgba(61, 155, 233, 0.08)', // highlighted item (e.g. unlocked achievement)
  chartGrid: 'rgba(255, 255, 255, 0.08)',
  chartCrosshair: 'rgba(255, 255, 255, 0.35)',
  play: 'linear-gradient(to right, #4c7a17 5%, #426b13 95%)',
  playHover: 'linear-gradient(to right, #4f8016 5%, #477214 95%)',
  discount: '#beee11',
  discountBg: '#476520',
  rare: '#e4c368', // "Rara" achievement tag (dark text on it)
  danger: '#f07070'
}

export const shadows = {
  bar: '0 2px 8px rgba(0, 0, 0, 0.4)',
  popover: '0 2px 8px rgba(0, 0, 0, 0.5)'
}

export const space = (n) => `${n * 4}px`
export const radius = '4px'

export const layout = {
  maxContentWidth: '1100px',
  navHeight: '64px'
}

// Max widths where the layout changes
export const breakpoints = {
  phone: 560, // single-column cards, 2-up stat tiles
  compactNav: 640, // short tab labels
  tablet: 860 // game page aside stacks above the content
}

export const media = Object.fromEntries(
  Object.entries(breakpoints).map(([name, width]) => [name, `@media (max-width: ${width}px)`])
)
