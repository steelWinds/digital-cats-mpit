<script lang="ts" setup>
const parallaxContainer = ref(null)

const { tilt, roll } = useParallax(parallaxContainer)
const { isSupported: isSupportedNDEF } = useNDEF()
const router = useRouter()

const parallaxStyle = computed(() => ({
  transform: `rotateX(${roll.value * 30}deg) rotateY(${tilt.value * 60}deg)`
}))

const layer = computed(() => ({
  filter: `drop-shadow(${tilt.value * 30}px ${roll.value * 30}px 2px rgb(108 146 143 / 0.3))`
}))
</script>

<template>
  <article
    ref="parallaxContainer"
    class="max-w-base mx-auto pt-28 pb-20 flex flex-col"
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
          content="Ваш девайс или браузер не поддерживает чтение NFC!"
          :show-arrow="false"
        >
          <template #reference>
            <NuxtLink
              class="
                !px-8
                !py-3
                sm:!px-10 sm:!py-4
                rounded-sm
                text-green
                !text-lg sm:!text-2xl
                !h-auto
                mb-11
                border-[1px]
                border-solid
                border-green
                !rounded-[10px]
                hover:bg-green
                hover:text-white
                active:border-light-green
                transition
                duration-300
              "
              :class="{ 'disabled': !isSupportedNDEF }"
            >
              Попробовать
            </NuxtLink>
          </template>
        </el-popover>
      </ClientOnly>
    </div>

    <div class="self-center sm:self-end">
      <div :style="parallaxStyle">
        <nuxt-icon
          name="nfc"
          :style="layer"
          class="text-7xl sm:text-[123px] text-light-green"
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
