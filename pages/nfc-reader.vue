<script setup lang="ts">
const { scan, pending } = useNDEF()

definePageMeta({
  layout: false
})

const scanNDEF = async () => {
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

      <NuxtLink
        to="/"
        class="
          !px-8
          !py-3
          mt-12
          !rounded-base
          text-green
          !text-lg
          !h-auto
          font-semibold
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
      >
        Прервать и вернуться
      </NuxtLink>
    </article>
  </NuxtLayout>
</template>
