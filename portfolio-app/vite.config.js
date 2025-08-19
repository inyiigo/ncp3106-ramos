import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use a relative base so the app works when served from a subpath (GitHub Pages project sites)
  base: './',
  // Output the production build to the "docs" folder so Pages can serve it from main/docs
  build: {
    outDir: 'docs'
  }
})
