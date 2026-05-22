import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getBasePath() {
  const explicitBase = process.env.BASE_PATH

  if (explicitBase) {
    return explicitBase.endsWith('/') ? explicitBase : `${explicitBase}/`
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

  if (!repository || !process.env.GITHUB_ACTIONS) {
    return '/'
  }

  return repository.endsWith('.github.io') ? '/' : `/${repository}/`
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
