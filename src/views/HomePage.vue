<template>
  <Splitter style="border: none" class="panel">
    <SplitterPanel :size="25" v-show="explorer">
      <SideBar></SideBar>
    </SplitterPanel>
    <SplitterPanel :size="75" class="overflow-x-auto">
      <Editor/>
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
import LanguageMenu from "@/components/LanguageMenu.vue";
import ThemeMenu from "@/components/ThemeMenu.vue";
import SideBar from "@/components/SideBar.vue";
import Footer from "@/components/Footer.vue";
import Editor from "@/components/Editor.vue";
import { onMenuAction } from "@/electronRenderer";
import * as Types from "../types";
import { useMainStore } from "@/store/main";
import { useSettingsStore } from "@/store/settings";

const languageMenuModalVisible = ref(false);
const mainStore = useMainStore();
const settingsStore = useSettingsStore();
const themeMenuModalVisible = ref(false);
const explorer = ref(true);


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

const title = computed(() => mainStore.getActiveFile && mainStore.getActiveFile.name);
const isFileChanged = computed(() => mainStore.isFileChanged);

watch(title, mainStore.updateWindowTitle);
watch(isFileChanged, mainStore.updateWindowTitle);


onMounted(async () => {
  await mainStore.updateWindowTitle();
});
</script>
<style scoped>
.panel {
  height: calc(100vh - 2rem);
  width: 100%;
}

.custom-tabs :deep(.p-tabview-panels) {
  padding: 0px;
}
</style>
