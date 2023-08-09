<template>
  <Splitter style="border: none" class="panel">
    <SplitterPanel :size="25">
      <Tree
        @node-expand="onNodeExpand"
        :value="nodesData"
        style="border: none"
        scrollHeight="flex"
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
              'height': '2rem',
              'width': '2rem'
            }
          }
        }"></Tree>
    </SplitterPanel>
    <SplitterPanel :size="75">
      <!-- CODEMIRROR EDITOR -->
      <CodeMirror6
        ref="editorRef"
        class="cm6-editor"
        style="height: 100%;"
        :theme="settingsStore.selectedTheme.value"
        :language="settingsStore.selectedLanguage.value"
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
import { computed, ref, onMounted, watch } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import LanguageMenu from "@/components/LanguageMenu.vue";
import ThemeMenu from "@/components/ThemeMenu.vue";
import Footer from "@/components/Footer.vue";
import { onMenuAction } from "@/electronRenderer";
import * as Types from "../types";
import { useMainStore } from "@/store/main";
import { useSettingsStore } from "@/store/settings";
import { readDir } from "@/services/nodeApi";
import {cloneDeep} from "lodash"
import {updateItem, arrayToTree, treeToArray,updateTreeNodeById} from "@/utils/tree"

const languageMenuModalVisible = ref(false);

const mainStore = useMainStore();
const settingsStore = useSettingsStore();
const themeMenuModalVisible = ref(false);

const editorRef = ref<any>(null);

const nodesData = ref<any>([]);

onMenuAction(async (data: any) => {
  switch (data.id) {
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
  if(node.children){
    return;
  }
  const items = await readDir({ dirPath: node.item.path });
  let _node = cloneDeep(node)
  _node.children = items.map((item:any, i:number) => {
    return {
      key: `${node.key}-${String(i)}`,
      id: `${node.id}-${String(i)}`,
      parentId: node.key,
      label: item.name,
      data: item.name,
      icon: "pi pi-fw pi-inbox",
      item: item,
      leaf: item.type === 'directory' ? false : true
    }
  })
  const newValues = updateTreeNodeById(nodesData.value, _node.id, _node)
  console.log(newValues)
  nodesData.value = cloneDeep(newValues);

}

onMounted(async () => {
  await mainStore.updateWindowTitle();
  const items = await readDir({ dirPath: "./" });
  nodesData.value = items.map((item:any, i:number) => {
    return {
      key: String(i),
      id: String(i),
      parentId: null,
      label: item.name,
      data: item.name,
      icon: "pi pi-fw pi-inbox",
      item: item,
      leaf: item.type === 'directory' ? false : true
    };
  });
  console.log(items);
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
</style>
