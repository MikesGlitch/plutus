import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({
        template: "treemap",
        gzipSize: true,
        open: true
      })]
    }
  }
})
