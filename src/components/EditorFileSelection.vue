<template>
  <ul class="surface-card p-0 m-0 list-none flex overflow-x-auto select-none">
    <li>
      <a
        v-ripple
        class="cursor-pointer px-4 py-3 flex align-items-center border-bottom-2 hover:border-500 transition-colors transition-duration-150 p-ripple"
        :class="{ 'text-primary hover:border-primary': active1 === 0, 'text-700 border-transparent': active1 !== 0 }"
        @click="active1 = 0">
        <span class="font-medium">Overview</span>
        <Button
          class="text-color-secondary"
          icon="pi pi-times"
          text
          size="small"
          :pt="{
            root: {
              style: {
                height: '0.8rem',
                width: '0.8rem',
              },
            },
          }" />
      </a>
    </li>
  </ul>
</template>

<script setup>
import {ref} from "vue"

const active1 = ref(0)
</script>
