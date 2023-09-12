<template>
  <TabFileSelection/>
  <!-- CODEMIRROR EDITOR -->
  <CodeMirror6
    ref="editorRef"
    class="cm6-editor"
    style="height: 100%"
    :theme="settingsStore.selectedTheme.value"
    :language="settingsStore.getSelectedCodemirrorLang"
    @input="(v:string) => mainStore.editorTempValue = v" />
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
const tempFilePath = computed(() => mainStore.tempFile.path);

watch(tempFilePath, () => {
  const value = mainStore.tempFile.value;
  editorRef.value.updateValue(value);
  const settingsStore = useSettingsStore();
  const selectedLanguage = settingsStore.languages.find((l) => l.value === mainStore.tempFile.info.language);
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
