// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Javascript Quiz Questions',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'Javascript quiz generated from the most popular JavaScript questions repo.' }
      ],
    }
  },
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
