<template>
  <el-container class="h-screen">
    <el-main>
      <slot />
    </el-main>

    <el-footer class="!p-0 !m-0">
      <slot name="footer" />
    </el-footer>
  </el-container>
</template>
