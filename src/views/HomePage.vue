<template>
  <Splitter style="height: 100%; border: none">
    <SplitterPanel :size="25">
      <Tree
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

onMounted(async () => {
  await mainStore.updateWindowTitle();
  const items = await readDir({ dirPath: "./" });
  nodesData.value = items.map((item:any, i:number) => {
    return {
      key: String(i),
      label: item.name,
      data: item.name,
      icon: "pi pi-fw pi-inbox",
      leaf: item.type === 'directory' ? false : true
    };
  });
  console.log(items);
});
</script>
<style scoped>
.cm6-editor {
  height: calc(100vh - 1.5rem);
  width: 100%;
}

.listbox.p-listbox {
  border: none;
}
</style>
