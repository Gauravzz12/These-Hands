import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('src/game/config.js') || id.includes('src\\game\\config.js')) {
            return 'game-config'
          }
          if (id.includes('src/game/artData.js') || id.includes('src\\game\\artData.js') ||
              id.includes('src/game/enemySpritesV2.js') || id.includes('src\\game\\enemySpritesV2.js')) {
            return 'game-art'
          }
        }
      }
    }
  }
})
