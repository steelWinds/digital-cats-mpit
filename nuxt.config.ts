// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
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
