<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  disabled: boolean;
  externalClass: string;
}

const props = defineProps<Props>()
const attrs = useAttrs()

const { disabled, externalClass } = toRefs(props)
</script>

<template>
  <span :class="[{disabled}, externalClass]" >
    <NuxtLink
      v-bind="attrs"
      class="
        px-8
        py-3
        rounded-base
        text-green
        text-lg
        h-auto
        border-[1px]
        border-solid
        border-green
        rounded-[10px]
        hover:bg-green
        hover:text-white
        active:border-light-green
        transition
        duration-300
      "
      disabled
    >
      <slot />
    </NuxtLink>
  </span>
</template>
