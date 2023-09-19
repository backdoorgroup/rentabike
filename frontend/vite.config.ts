import { defineConfig } from "vite"
import { URL, fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "_",
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@config": fileURLToPath(new URL("./config", import.meta.url))
    }
  },
  publicDir: "./src/public"
})
