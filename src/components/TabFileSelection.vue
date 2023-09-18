<template>
  <TabView
    :active-index="activeIndexTab"
    :scrollable="true"
    @tab-change="onTabChange"
    :pt="{
      panelContainer: {
        class: 'p-0',
      },
    }">
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
import { computed,} from "vue";
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();

function onTabChange(evt: any) {
  const index: number = evt.index;
  mainStore.activeIndex = index;
}

function removeFile(file: any) {
  const index = mainStore.tempFileList.findIndex((f) => f.path === file.path);
  mainStore.tempFileList.splice(index, 1);
  //check if file is selected
  if (file.path === mainStore.getActiveFile.path) {
    mainStore.tempFileList[mainStore.activeIndex] = mainStore.tempFileList.length
      ? mainStore.tempFileList[0]
      : {
          ext: "",
          name: "",
          path: "",
          stat: {},
          value: "",
          info: {
            type: "",
            language: "",
          },
        };
  }
}

const activeIndexTab = computed(() => {
  const tempFilePath = mainStore.getActiveFile && mainStore.getActiveFile.path;
  return mainStore.tempFileList.findIndex((f) => f.path === tempFilePath);
});
</script>
<style scoped>
.custom-tabs :deep(.p-tabview-panels) {
  padding: 0px;
}
</style>
