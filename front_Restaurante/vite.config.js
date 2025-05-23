// vite.config.js o vitest.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    }
  },
  resolve: {
    alias: {
      src: "/src"
    },
    extensions: ["js", "jsx", "ts", "tsx"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/components/**/*.{test,spec}.{js,jsx,ts,tsx}'], // Añade esta línea
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      statements: 99,
      branches: 99,
      function: 99,
      lines: 99,
    },
    checkCoverage: true,
  }
})