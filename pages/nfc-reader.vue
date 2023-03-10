<script setup lang="ts">
const { scan, pending, abort } = useNDEF()

definePageMeta({
  layout: false
})

const scanNDEF = async () => {
  try {
    const readerEvent = await scan()

    console.log(readerEvent)
  } catch (error: any) {
    ElMessage({ message: error.message, type: 'error' })
  }
}
</script>

<template>
  <NuxtLayout name="app-page">
    <template #header>
      <el-row
        justify="center"
        align="middle"
        class="h-full bg-green p-0 m-0"
      >
        <Icon
          name="material-symbols:arrow-back-ios-rounded"
          class="text-dark-gray"
          size="24"
        />
      </el-row>
    </template>

    <article class="h-full flex justify-center items-center flex-col">
      <Icon
        name="fa6-brands:nfc-directional"
        class="text-green"
        :class="{'animate-pulse': pending}"
        size="124"
      />

      <el-button
        class="
          !px-8
          !py-3
          mt-12
          !rounded-base
          text-green
          !text-lg
          !h-auto
        "
        @click="scanNDEF"
      >
        <span v-if="!pending">Запустить</span>
        <span v-else>Прервать</span>
      </el-button>
    </article>
  </NuxtLayout>
</template>
