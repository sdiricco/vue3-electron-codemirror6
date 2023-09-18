<template>
  <TabFileSelection style="height: 40px;" class="flex align-items-end"/>
  <!-- CODEMIRROR EDITOR -->
  <CodeMirror6
    ref="editorRef"
    class="cm6-editor"
    style="height: calc(100% - 40px)"
    :theme="settingsStore.selectedTheme.value"
    :language="settingsStore.getSelectedCodemirrorLang"
    @input="onCodeMirrorChange" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { useMainStore } from "@/store/main";
import { useSettingsStore } from "@/store/settings";
import TabFileSelection from "./TabFileSelection.vue";

const mainStore = useMainStore();
const settingsStore = useSettingsStore();
const editorRef = ref<any>(null);
const tempFilePath = computed(() => mainStore.getActiveFile && mainStore.getActiveFile.path);

function onCodeMirrorChange(value:any){
  if (mainStore.tempFileList.length && mainStore.activeIndex >= 0) {
    mainStore.tempFileList[mainStore.activeIndex].value = value
  }
}

watch(tempFilePath, () => {
  const value = mainStore.getActiveFile.value;
  editorRef.value.updateValue(value);
  const settingsStore = useSettingsStore();
  const selectedLanguage = settingsStore.languages.find((l) => l.value === mainStore.getActiveFile.info.language);
  if (selectedLanguage) {
    settingsStore.selectedLanguageValue = selectedLanguage.value;
  }
});
</script>
<style scoped>

.custom-tabs :deep(.p-tabview-panels) {
  padding: 0px;
}
</style>
