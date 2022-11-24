// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  plugins: ['~/plugins/flags.js'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
