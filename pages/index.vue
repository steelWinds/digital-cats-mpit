<script lang="ts" setup>
const parallaxContainer = ref(null)

const { tilt, roll } = useParallax(parallaxContainer)
const { isSupported: isSupportedNDEF } = useNFC()

const noSupportDialog = ref(!isSupportedNDEF.value)

const parallaxStyle = computed(() => ({
  transform: `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 15}deg)`,
  transition: 'all .3s ease-out'
}))

const parallaxShadow = computed(() => ({
  filter: `drop-shadow(${Math.round(tilt.value * 10)}px ${Math.round(roll.value * 10)}px 3px rgb(108 146 143 / 0.4))`
}))
</script>

<template>
  <div>
    <LayoutArticle
    ref="parallaxContainer"
    class="max-w-base mx-auto pt-48 flex-col"
  >
    <div
      ref="parallaxContainer"
      class="flex flex-col items-center sm:items-start"
    >
      <h1 class="text-base-gray dark:text-white text-4xl sm:text-[64px] mb-11 sm:mb-20 font-semibold">
        SakhaCultureTech
      </h1>

      <h3 class="text-2xl sm:text-[32px] max-w-xl mb-11 sm:mb-20 font-normal text-base-gray dark:text-white">
        Вся культура в NFC
      </h3>

      <UILink
        external-class="mb-12"
        class="sm:text-2xl sm:px-10 sm:py-4 font-medium"
        to=""
        disabled
      >
        Попробовать
      </UILink>

      <ClientOnly>
        <el-dialog
          v-model="noSupportDialog"
          title="Warning!"
          width="70%"
          class="max-w-lg"
          destroy-on-close
          center
        >
          <h3 class="text-center">
            Your broser doesn't supporting NFC reading, please, change it.
          </h3>
        </el-dialog>
      </ClientOnly>
    </div>

    <div
      class="self-center sm:self-end"
      :style="parallaxStyle"
    >
      <Icon
        :style="parallaxShadow"
        name="fa6-brands:nfc-directional"
        class="text-green"
        size="124"
      />
    </div>
  </LayoutArticle>

  <LayoutArticle class="flex-col">
    <h2 class="text-base-gray font-semibold text-3xl sm:text-[40px] text-center mb-[92px]">
      О нас
    </h2>

    <article
      class="
      border-y-[3px]
      border-light-green
      py-[32px]
      sm:py-[65px]
      text-xl
      sm:text-2xl
      max-w-[864px]
      mx-auto
      font-semibold
      text-center
      tracking-wide
      sm:tracking-wider
    "
    >
      Это веб приложение создано специально для считывания NFC чипов, чтобы вам было проще получать информацию о культуре Якутии
    </article>
  </LayoutArticle>
  </div>
</template>
