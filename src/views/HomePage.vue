<template>
  <Splitter style="border: none" class="panel">
    <SplitterPanel :size="25" v-show="explorer">
      <SideBar></SideBar>
    </SplitterPanel>
    <SplitterPanel :size="75" class="overflow-x-auto">
      <!-- CODEMIRROR EDITOR -->
      <CodeMirror6
        ref="editorRef"
        class="cm6-editor"
        style="height: 100%"
        :theme="settingsStore.selectedTheme.value"
        :language="settingsStore.getSelectedCodemirrorLang"
        @input="(v:string) => mainStore.editorTempValue = v" />
    </SplitterPanel>
  </Splitter>

  <!-- THEME MENU -->
  <ThemeMenu v-model:visible="themeMenuModalVisible" v-model:theme="settingsStore.selectedTheme" :themes="settingsStore.themes" />
  <!-- LANGUAGE MENU -->
  <LanguageMenu
    v-model:visible="languageMenuModalVisible"
    :language="settingsStore.getSelectedLanguage"
    @update:language="(languageValue) => (settingsStore.selectedLanguageValue = languageValue)"
    :languages="settingsStore.languages" />

  <!-- FOOTER -->
  <Footer @click-language="languageMenuModalVisible = true" :language="settingsStore.getSelectedLanguage && settingsStore.getSelectedLanguage.label" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import LanguageMenu from "@/components/LanguageMenu.vue";
import ThemeMenu from "@/components/ThemeMenu.vue";
import SideBar from "@/components/SideBar.vue";
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
const explorer = ref(true)

onMenuAction(async (data: any) => {
  switch (data.id) {

    //File
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

    //View
    case Types.Menu.toggleExplorer:
      explorer.value = !explorer.value;
      break;
    default:
      break;
  }
});

const title = computed(() => mainStore.file.name);
const isFileChanged = computed(() => mainStore.isFileChanged);
const fileValue = computed(() => mainStore.file.value);

watch(title, mainStore.updateWindowTitle);
watch(isFileChanged, mainStore.updateWindowTitle);
watch(fileValue, (value) => {
  editorRef.value.updateValue(value);
});

onMounted(async () => {
  await mainStore.updateWindowTitle();
});
</script>
<style scoped>
.panel {
  height: calc(100vh - 2rem);
  width: 100%;
}
</style>
