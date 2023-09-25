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
  <div v-if="!mainStore.tree.length" class="m-1 mt-3">
    <div class="text-color-secondary font-bold">No folder opened</div>
  </div>
  <Tree
    v-else
    class="custom-tree"
    @node-expand="onNodeExpand"
    @node-select="onNodeSelect"
    selectionMode="single"
    :value="mainStore.tree"
    style="border: none"
    scrollHeight="flex"
    :loading="mainStore.isTreeLoading"
    v-model:selectionKeys="selectedKey"
    v-model:expandedKeys="expandedKeys"
    :pt="{
      root: {
        class: 'p-0',
        style: {
          height: 'calc(100% - 42px)',
        },
      },
      node: {
        class: 'p-0',
      },
      content: {
        class: 'p-0',
        style: {
          'font-size': '0.9rem',
        },
      },
      toggler: {
        style: {
          height: '1.5rem',
          width: '1.5rem',
          'margin-right': '0px',
        },
      },
    }">
    <template #default="slotProps">
      <div class="flex align-content-center">
        <img :alt="slotProps.node.label" :src="getIcon(slotProps.node)" style="width: 18px" class="mr-1" />
        {{ slotProps.node.label }}
      </div>
    </template>
  </Tree>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/store/main";
import { toIcon } from "@/constants/languages";

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

async function onNodeExpand(node: any) {
  await mainStore.updateTreeNode(node);
}

async function onNodeSelect(node: any) {
  await mainStore.selectFileFromTree(node);
}

function getIcon(node: any) {
  return node.item.type === "directory" ? "assets/icons/default_folder.svg" : toIcon(node.item.language) || "assets/icons/default_file.svg";
}
</script>

<style scoped>
.listbox.p-listbox {
  border: none;
}
.custom-tree :deep(.p-treenode) {
  padding: 0px;
  cursor: pointer;
}

.disable-border {
  border: none;
}
/* 
.custom-input{
  caret-color: transparent;
} */

.custom-input:enabled:focus {
  box-shadow: none;
}
</style>
