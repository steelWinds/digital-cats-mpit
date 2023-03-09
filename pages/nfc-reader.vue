<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<template>
  <NuxtLayout name="app-page">
    <article class="h-full flex justify-center items-center flex-col">
      <nuxt-icon
        name="nfc"
        class="text-[150px] text-light-green animate-pulse mb-12"
      />

      <el-button
        class="
          !px-8
          !py-3
          rounded-sm
          text-green
          !text-lg
          !h-auto
        "
      >
        Запустить
      </el-button>
    </article>

    <template #footer>
      <el-row
        justify="center"
        align="middle"
        class="h-full bg-green p-0 m-0"
      >
        <el-icon :size="32">
          <ElIconHouse class="text-white" />
        </el-icon>
      </el-row>
    </template>
  </NuxtLayout>
</template>
