<script lang="ts" setup>
const parallaxContainer = ref(null)

const { tilt, roll } = useParallax(parallaxContainer)

const parallaxStyle = computed(() => ({
  transform: `rotateX(${roll.value * 30}deg) rotateY(${tilt.value * 40}deg)`
}))
</script>

<template>
  <article class="max-w-base mx-auto pt-28 pb-20 flex flex-col">
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

      <el-button class="!px-8 !py-3 sm:!px-10 sm:!py-4 rounded-sm !text-lg sm:!text-2xl !h-auto mb-11">
        Попробовать
      </el-button>

      <div :style="parallaxStyle">
        <nuxt-icon
          name="nfc"
          class="self-center sm:self-end text-7xl sm:text-[123px] text-light-green"
        />
      </div>
    </div>
  </article>

  <article class="max-w-base mx-auto py-[86px] sm:py-[172px] flex flex-col">
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
  </article>
</template>
