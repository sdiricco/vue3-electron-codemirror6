<template>
  <div class="flex justify-content-end">
    <Button
      @click="onRefreshTree"
      icon="pi pi-refresh"
      class="text-color-secondary"
      text
      :pt="{
        root: {
          class: 'm-1',

          style: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
      }" />
  </div>
  <Divider
    :pt="{
      root: {
        class: 'm-0',
      },
    }"></Divider>
  <Tree
    class="custom-tree pt-2"
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

async function onRefreshTree(){
  await mainStore.refreshTree();
  selectedKey.value = {}; 
  expandedKeys.value = {}; 
}

async function onNodeExpand(node: any) {
  await mainStore.updateTreeNode(node);
}

async function onNodeSelect(node: any) {
  await mainStore.selectNode(node);
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
</style>
