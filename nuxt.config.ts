// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { static: true }
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
    'nuxt-icons'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }
})
