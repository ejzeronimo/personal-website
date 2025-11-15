// @ts-check
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
const config = defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()], 
    assetsInclude: ['**/*.glb', '**/*.glsl', '**/*.inc'],
  },
  integrations: [react()],
})

export default config
