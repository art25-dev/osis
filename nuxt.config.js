
module.exports = {
  telemetry: false,
  mode: 'universal',
  // server: {
  //   port: 8000, // default: 3000
  //   host: '192.168.0.1' // default: localhost
  // },
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
  loading: { color: '#2c382c' },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    "@/assets/styles/index.scss",
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    '@/plugins/globals'
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-moment',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite'
  ],
  styleResources: {
    scss: ['@/assets/styles/variables.scss', '@/assets/styles/_mixin.scss']
  },
  axios: {
  },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      // Добавление обработки pdf
      const assetsLoader = config.module.rules.find (rule => rule.test.test ('.svg'));
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf)$/i;

      return config;
    }
  },
}
