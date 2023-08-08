<template>
  <Button
    text
    :pt="{
      root: { class: 'p-0 h-full border-noround px-2' },
    }"
    @click="emit('click')">
    <span class="text-xs text-white">
        <slot/>
    </span>
  </Button>
</template>

<script setup>
const emit = defineEmits(['click'])
</script>
<style scoped>
</style>