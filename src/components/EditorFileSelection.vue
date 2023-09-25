<template>
  <div class="flex justify-content-between">
    <ul class="surface-card p-0 m-0 list-none flex select-none scroll-container" style="height: 40px">
      <li v-for="(file, index) in mainStore.tempFileList" :key="file?.path">
        <a
          style="height: 40px"
          v-ripple
          class="cursor-pointer px-2 py-2 flex align-items-center transition-colors transition-duration-150 p-ripple"
          :class="{ 'bg-primary-reverse': mainStore.activeIndex === index, 'surface-overlay': mainStore.activeIndex !== index }"
          @click="mainStore.activeIndex = index">
          <div class="white-space-nowrap flex align-items-center">
            <span class="text-sm font-bold text-yellow-500 mr-2">{{ file.isChanged ? "M" : "" }}</span>
            <img :alt="file.name" :src="getIcon(file)" style="width: 18px" class="mr-1" />
            <span class="text-sm">{{ file.name }}</span>
          </div>

          <Button
            @click.stop="removeFile(index)"
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
    <div class="flex align-items-center px-2">
      <div
        class="cursor-pointer text-color-secondary p-1 border-round hover:surface-100 transition-colors transition-duration-150"
        @click="mainStore.addNewFile">
        <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
      </div>
      <div
        class="cursor-pointer text-color-secondary p-1 border-round hover:surface-100 transition-colors transition-duration-150"
        @click="mainStore.showFileExplorer = !mainStore.showFileExplorer">
        <font-awesome-icon icon="fa-solid fa-table-columns" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { toIcon } from "@/constants/languages";

const mainStore = useMainStore();

function removeFile(file: any) {
  console.log("removeFile");
  mainStore.removeTempFile(file);
}

function getIcon(file: any) {
  return toIcon(file.info.language) || "assets/icons/default_file.svg";
}
</script>
<style scoped>
.scroll-container {
  overflow: hidden;
}

.scroll-container::-webkit-scrollbar {
  width: 6px; /* Larghezza della scrollbar */
  height: 6px; /* Altezza della scrollbar orizzontale (se necessario) */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #333; /* Colore della maniglia della scrollbar */
}

.scroll-container:hover {
  overflow-x: auto;
}
</style>
