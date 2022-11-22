import tailwindTypography from '@tailwindcss/typography';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    mode: 'jit',
    cssPath: '~/assets/css/tailwind.css',
    config: {
      plugins: [tailwindTypography]
    }
  }
})
