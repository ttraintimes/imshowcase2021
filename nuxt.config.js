export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'IM Showcase 2021',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss',
    '@fontsource/orbitron/latin.css',
    '@fontsource/montserrat/latin.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/composition-api.js",
    "@/plugins/storyblok-rich-text-renderer.js",
    "@/plugins/lazyload.js",
    // {src: "@/plugins/identity.js", mode: "client"}
  ],

  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "active--exact",
    middleware: "modal-menu"
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    [
      "storyblok-nuxt",
      {
        accessToken: "GwnYXE6OO5qJpLkeATWT6gtt",
        cacheProvider: "memory"
      }
    ],
    "@nuxt/http",
    "vue-toastification/nuxt"
  ],

  toast: {
    maxToasts: 6,
  },

  //Use only to import variables! Any styles will be duplicated for every component
  styleResources: { scss: ["~/assets/_variables.scss"] },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

