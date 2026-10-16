import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Proxies an API through the dev/preview server, injecting the API key server side
// so it never reaches the browser bundle.
const apiProxy = (target, apiKey) => ({
  target,
  changeOrigin: true,
  rewrite: (path) => {
    const url = new URL(path.replace(/^\/api\/[^/]+/, ''), 'http://localhost')
    if (apiKey) url.searchParams.set('key', apiKey)
    return url.pathname + url.search
  }
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxy = {
    '/api/steam': apiProxy('https://api.steampowered.com', env.STEAM_API_KEY),
    '/api/itad': apiProxy('https://api.isthereanydeal.com', env.ITAD_API_KEY)
  }

  return {
    plugins: [react()],
    define: {
      'import.meta.env.ITAD_ENABLED': JSON.stringify(Boolean(env.ITAD_API_KEY))
    },
    server: { port: 3000, proxy },
    preview: { proxy }
  }
})
