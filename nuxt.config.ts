// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
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
