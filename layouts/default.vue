<template>
  <el-container
    class="
      !bg-[url(~/assets/images/bg-main.png)]
      bg-no-repeat
      bg-origin-border
      main-bg
    "
  >
    <el-header>
      <UIHeader />
    </el-header>

    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<style scoped>
.main-bg {
  background-position: right 0px;

  @media (width < 1280px) {
    background-size: 100%;
    background-position: right 0px;
  }
}
</style>
