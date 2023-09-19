<template>
  <ul class="surface-card p-0 m-0 list-none flex select-none scroll-container"  >
    <li v-for="(file, index) in mainStore.tempFileList" :key="file?.path">
      <a
        style="height: 40px;"
        v-ripple
        class=" cursor-pointer px-2 py-2 flex align-items-center transition-colors transition-duration-150 p-ripple"
        :class="{ 'bg-primary-reverse': mainStore.activeIndex === index }"
        @click="mainStore.activeIndex = index">
        <span class="text-sm white-space-nowrap">{{ file.name }}</span>
        <Button
          @click.stop="removeFile"
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

<script setup lang="ts">
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();

function removeFile(file: any) {
  console.log('removeFile')
  mainStore.removeTempFile(file);
}
</script>
<style scoped>
.scroll-container{
  overflow: hidden;
}

.scroll-container::-webkit-scrollbar {
  width: 4px; /* Larghezza della scrollbar */
  height: 4px; /* Altezza della scrollbar orizzontale (se necessario) */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #333; /* Colore della maniglia della scrollbar */
}


.scroll-container:hover{
  overflow: overlay;
}
</style>
