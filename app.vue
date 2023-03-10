<template>
  <el-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
