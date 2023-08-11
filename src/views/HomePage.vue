<template>
  <Splitter style="border: none" class="panel">
    <SplitterPanel :size="25">
      <Tree
        class="custom-tree"
        @node-expand="onNodeExpand"
        @node-select="onNodeSelect"
        selectionMode="single"
        :value="mainStore.tree"
        style="border: none"
        scrollHeight="flex"
        :loading="mainStore.isTreeLoading"
        v-model:selectionKeys="selectedKey"

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
              'font-size': '0.9rem'
            }
          },
          toggler: {
            style: {
              'height': '1.5rem',
              'width': '1.5rem',
              'margin-right': '0px'
            }
          }
        }">
            <template #default="slotProps">
              <div class="flex align-content-center">
                <img v-if="slotProps.node.item.type === 'file'" :alt="slotProps.node.label" :src="slotProps.node.iconPath" style="width: 18px" class="mr-1" /> {{ slotProps.node.label }}
              </div>
          </template>
        </Tree>
    </SplitterPanel>
    <SplitterPanel :size="75" class="overflow-x-auto">
      <!-- CODEMIRROR EDITOR -->
      <CodeMirror6
        ref="editorRef"
        class="cm6-editor"
        style="height: 100%;"
        :theme="settingsStore.selectedTheme.value"
        :language="settingsStore.selectedLanguage.codemirror"
        @input="(v:string) => mainStore.editorTempValue = v" />
    </SplitterPanel>
  </Splitter>

  <!-- THEME MENU -->
  <ThemeMenu v-model:visible="themeMenuModalVisible" v-model:theme="settingsStore.selectedTheme" :themes="settingsStore.themes" />
  <!-- LANGUAGE MENU -->
  <LanguageMenu v-model:visible="languageMenuModalVisible" v-model:language="settingsStore.selectedLanguage" :languages="settingsStore.languages" />

  <!-- FOOTER -->
  <Footer @click-language="languageMenuModalVisible = true" :language="settingsStore.selectedLanguage.label" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, TriggerOpTypes } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import LanguageMenu from "@/components/LanguageMenu.vue";
import ThemeMenu from "@/components/ThemeMenu.vue";
import Footer from "@/components/Footer.vue";
import { onMenuAction } from "@/electronRenderer";
import * as Types from "../types";
import { useMainStore } from "@/store/main";
import { useSettingsStore } from "@/store/settings";

const languageMenuModalVisible = ref(false);
const mainStore = useMainStore();
const settingsStore = useSettingsStore();
const themeMenuModalVisible = ref(false);
const editorRef = ref<any>(null);
const selectedKey = ref<any>(null);

onMenuAction(async (data: any) => {
  switch (data.id) {
    case Types.Menu.openFolder:
      await mainStore.openFolder();
      break;
    case Types.Menu.newFile:
      await mainStore.newFile();
      break;
    case Types.Menu.openFile:
      const success = await mainStore.openFile();
      if (success) {
        editorRef.value.updateValue(mainStore.file.value);
      }
      break;
    case Types.Menu.saveFile:
      await mainStore.saveFile();
      break;
    case Types.Menu.saveAsFile:
      await mainStore.saveAsFile();
      break;
    case Types.Menu.themes:
      themeMenuModalVisible.value = true;
      break;
    default:
      break;
  }
});

const title = computed(() => mainStore.file.name);
const isFileChanged = computed(() => mainStore.isFileChanged);

watch(title, mainStore.updateWindowTitle);
watch(isFileChanged, mainStore.updateWindowTitle);

async function onNodeExpand(node:any){
  await mainStore.updateTreeNode(node)

}

async function onNodeSelect(node:any){
  const success = await mainStore.selectNode(node)
  if (success) {
    editorRef.value.updateValue(mainStore.file.value);
  }
}

onMounted(async () => {
  await mainStore.updateWindowTitle();
});
</script>
<style scoped>
.panel {
  height: calc(100vh - 2rem);
  width: 100%;
}

.listbox.p-listbox {
  border: none;
}

.custom-tree :deep(.p-treenode){
  padding: 0px;
  cursor: pointer;
}
</style>
