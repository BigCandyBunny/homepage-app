import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  server: { host: true, strictPort: true },
  preview: { host: true },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
