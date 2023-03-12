<script setup lang="ts">
const { scan, pending } = useNFC()

definePageMeta({
  layout: false
})

const scanNFC = async () => {
  try {
    const readerEvent = await scan()

    const records = readerEvent.message.records

    if (!records?.length || !records.map(r => r.mediaType).includes('url')) {
      return ElMessage({ message: 'Чип не содержит данных', type: 'warning' })
    }

    console.log(readerEvent.message)
  } catch (error: any) {
    ElMessage({ message: error.message || 'Необычный тип ошибки ', type: 'error' })
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
      <NuxtLink
        to="/"
        class="block mt-[111px] ml-[35px]"
      >
        <ElIconArrowLeftBold class="fill-green w-8" />
      </NuxtLink>
    </template>

    <article class="h-full flex justify-center items-center flex-col">
      <Icon
        name="fa6-brands:nfc-directional"
        class="text-green"
        :class="{'animate-pulse': pending}"
        size="124"
      />

      <UIButton
        :loading="pending"
        class="
          mt-12
        "
        @click="scanNFC"
      >
        <template v-if="!pending">
          Чтение
        </template>
      </UIButton>
    </article>
  </NuxtLayout>
</template>
