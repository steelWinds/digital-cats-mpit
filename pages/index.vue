<script lang="ts" setup>
const parallaxContainer = ref(null)

const { tilt, roll } = useParallax(parallaxContainer)
const { isSupported: isSupportedNDEF } = useNFC()

const parallaxStyle = computed(() => ({
  transform: `rotateX(${roll.value * 15}deg) rotateY(${tilt.value * 15}deg)`,
  transition: 'all .3s ease-out'
}))

const parallaxShadow = computed(() => ({
  filter: `drop-shadow(${roll.value * 10}px ${tilt.value * 10}px 3px rgb(108 146 143 / 0.4))`
}))
</script>

<template>
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

      <ClientOnly>
        <el-popover
          placement="top-start"
          title="Ой!"
          :width="210"
          trigger="hover"
          content="Your browser is not supported NFC reading"
          :show-arrow="false"
        >
          <template #reference>
            <UILink
              class="sm:text-2xl sm:px-10 sm:py-4 !mb-12"
              :to="!isSupportedNDEF ? '' : '/nfc-reader'"
              :class="{ 'disabled': !isSupportedNDEF }"
            >
              Попробовать
            </UILink>
          </template>
        </el-popover>
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
</template>
