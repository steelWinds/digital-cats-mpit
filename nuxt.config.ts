// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { static: true }
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: 'SakhaCultureTech',
      meta: [
        { name: 'description', content: 'Culture in the NFC' },
        { name: 'application-name', content: 'Sakha-Culture-Tech' }
      ]
    },
    layoutTransition: {
      name: 'fade',
      mode: 'out-in'
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  },
  imports: {
    dirs: [
      'composables/**',
      'utils/**'
    ]
  },
  css: [
    'element-plus/theme-chalk/dark/css-vars.css',
    '~/assets/css/main.css',
    '~/assets/css/fonts.css'
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      'postcss-preset-env': {
        features: { 'nesting-rules': false }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }
})
