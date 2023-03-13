<script setup lang="ts">
const { scan, pending } = useNFC()

definePageMeta({
  layout: false
})

const scanNFC = elMessage(async () => {
  const readerEvent = await scan()

  const records = readerEvent.message.records

  if (!records?.length || !records.map(r => r.mediaType).includes('url')) {
    return ElMessage.warning('Empty data')
  }
})

const writeNFC = elMessage(() => { })

watch(pending, (val) => {
  if (!val) return

  ElMessage.success('Reading NFC, attach to it your phone')
})

onMounted(() => {
  ElNotification.warning({
    title: 'Notify',
    message: 'Before start writing to the NFC chip, you should start scanning!',
  })
})

onBeforeRouteLeave(() => {
  ElNotification.closeAll()
})
</script>

<template>
  <div class="nfc-reader">
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

        <el-button-group class="mt-12 !flex !flex-col">
          <UIButton
            v-loading="pending"
            class="
              mb-3
              overflow-hidden
            "
            :disabled="pending"
            @click="scanNFC"
          >
            Сканировать
          </UIButton>

          <UIButton
            class="
              overflow-hidden
            "
            :disabled="!pending"
            @click="writeNFC"
          >
              Записать
            </UIButton>
        </el-button-group>
      </article>
    </NuxtLayout>
  </div>
</template>
