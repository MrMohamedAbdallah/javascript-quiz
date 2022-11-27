// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    {src: '~/plugins/flags.js', mode: 'client'},
    {src: '~/plugins/vue-i18n.js', mode: 'client'},
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
