
module.exports = {
  telemetry: false,
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2c382c' },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    "@/assets/styles/index.scss",
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/globals'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-moment',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite'
  ],

  styleResources: {
    // your settings here
    scss: ['@/assets/styles/variables.scss', '@/assets/styles/_mixin.scss']
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {

    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Добавление обработки pdf
      const assetsLoader = config.module.rules.find (rule => rule.test.test ('.svg'));
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf)$/i;

      return config;
    }
  },

}
