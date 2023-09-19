<template>
  <TabView
    v-model:active-index="mainStore.activeIndex"
    :scrollable="true"
    :pt="{
      panelContainer: {
        class: 'p-0',
      },
    }"
    >
    <TabPanel
      v-for="file in mainStore.tempFileList"
      :key="file?.path"
      :pt="{
        headerAction: {
          class: 'p-2',
        },
      }">
      <template #header>
        <span class="mr-2 text-sm">{{ file.name }}</span>
        <Button
          @click="removeFile(file)"
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
      </template>
    </TabPanel>
  </TabView>
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
.custom-tabs :deep(.p-tabview-panels) {
  padding: 0px;
}
</style>
