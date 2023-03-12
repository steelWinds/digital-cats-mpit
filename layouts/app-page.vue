<template>
  <el-container class="h-screen">
    <el-header class="fixed top-0 !p-0 !m-0">
      <slot name="header" />
    </el-header>

    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>
