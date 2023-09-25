<template>
  <div class="my-1 flex justify-content-between align-items-center">
    <span class="m-1 mr-0 p-input-icon-right w-full">
      <InputText
        size="small"
        type="text"
        class="custom-input"
        @input="onInput"
        :value="mainStore.folderPath"
        :spellcheck="false"
        :pt="{
          root: {
            class: 'p-1 opacity-100 w-full text-overflow-ellipsis',
          },
        }" />
    </span>

    <Button
      @click="mainStore.openFolder"
      icon="pi pi-folder-open"
      class="text-color-secondary ml-1"
      text
      :pt="{
        root: {
          style: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
      }" />
    <Button
      @click="onRefreshTree"
      icon="pi pi-refresh"
      class="text-color-secondary"
      text
      :pt="{
        root: {
          style: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
      }" />
    <Button
      @click="mainStore.removeTree"
      icon="pi pi-times"
      class="text-color-secondary mr-1"
      text
      :pt="{
        root: {
          style: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
      }" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();
const selectedKey = ref<any>({});
const expandedKeys = ref<any>({});

function onInput(evt: any) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.value = mainStore.folderPath;
}

async function onRefreshTree() {
  await mainStore.refreshTree();
  selectedKey.value = {};
  expandedKeys.value = {};
}
</script>


