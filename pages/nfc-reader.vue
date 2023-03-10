<script setup lang="ts">
const { scan, pending } = useNDEF()

definePageMeta({
  layout: false
})

const scanNDEF = async () => {
  try {
    const readerEvent = await scan()

    if (readerEvent.type === 'url') {
      readerEvent.type
    }
  } catch (error: any) {
    ElMessage({ message: error.message || 'Unhandled error, try different NFC module', type: 'error' })
  }
}

watch(pending, (val) => {
  if (!val) return

  ElMessage({ message: 'Идет чтение NFC чипа, приложите к нему телефон', type: 'success' })
})
</script>

<template>
  <NuxtLayout name="app-page">
    <template #header>
      <el-row
        justify="start"
        align="middle"
        class="h-full p-0 m-0"
      >
        <NuxtLink
          to="/"
          class="ml-[50px]"
        >
          <Icon
            name="material-symbols:arrow-back-ios-rounded"
            class="text-dark-gray"
            size="32"
          />
        </NuxtLink>
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
        :loading="pending"
        class="
          !px-8
          !py-3
          mt-12
          !rounded-base
          text-green
          !text-lg
          !h-auto
        "
        @click="scanNDEF()"
      >
        <template v-if="!pending">
          Запустить
        </template>
      </el-button>
    </article>
  </NuxtLayout>
</template>
