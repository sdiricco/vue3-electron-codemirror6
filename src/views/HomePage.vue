<template>
  <!-- TOAST MESSAGE -->
  <Toast>
    <template #icon>
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </template>
  </Toast>
  <!-- EDITOR -->
  <CodeMirror6
    ref="editorRef"
    class="cm6-editor"
    :theme="selectedTheme.value"
    :language="selectedLanguage.value"
    @input="(v:string) => mainStore.editorTempValue = v" />
  <!-- FOOTER -->
  <div class="footer">
    <Button
      text
      label="Language"
      :pt="{
        root: { class: 'p-0 h-full border-noround px-2' },
      }"
      @click="languageMenuModalVisible = true">
      <span class="text-xs text-white">{{ selectedLanguage.label }}</span>
    </Button>
  </div>
  <!-- SETTINGS PANEL -->
  <ThemeMenu v-model:visible="themeMenuModalVisible" v-model:theme="selectedTheme" :themes="themes" />
  <LanguageMenu v-model:visible="languageMenuModalVisible" v-model:language="selectedLanguage" :languages="languageList" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import LanguageMenu from "@/components/LanguageMenu.vue";
import ThemeMenu from "@/components/ThemeMenu.vue";
import { onMenuAction } from "@/electronRenderer";
import * as Types from "../types";
import { useMainStore } from "@/store/main";


import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { javascriptLanguage, jsxLanguage, typescriptLanguage, tsxLanguage, scopeCompletionSource } from "@codemirror/lang-javascript";
import { oneDark, color } from "@codemirror/theme-one-dark";
import { basicLight, basicLightHighlightStyle } from "cm6-theme-basic-light";
import { basicDark } from "cm6-theme-basic-dark";
import { solarizedDark } from "cm6-theme-solarized-dark";
import { solarizedLight } from "cm6-theme-solarized-light";
import { materialDark } from "cm6-theme-material-dark";
import { nord } from "cm6-theme-nord";
import { gruvboxLight } from "cm6-theme-gruvbox-light";
import { gruvboxDark } from "cm6-theme-gruvbox-dark";

import { useToast } from "primevue/usetoast";

const languageMenuModalVisible = ref(false);
const toast = useToast();

const showSuccess = () => {
  toast.add({ severity: "info", detail: "Salvataggio in corso..", life: 1000, closable: false, summary: "Salva" });
};

const mainStore = useMainStore();

const themeMenuModalVisible = ref(false);

const themes = ref([
  { label: "oneDark", icon: "pi pi-fw pi-plus", value: oneDark },
  { label: "basicLight", icon: "pi pi-fw pi-plus", value: basicLight },
  { label: "basicDark", icon: "pi pi-fw pi-trash", value: basicDark },
  { label: "solarizedDark", icon: "pi pi-fw pi-trash", value: solarizedDark },
  { label: "solarizedLight", icon: "pi pi-fw pi-trash", value: solarizedLight },
  { label: "materialDark", icon: "pi pi-fw pi-trash", value: materialDark },
  { label: "nord", icon: "pi pi-fw pi-trash", value: nord },
  { label: "gruvboxLight ", icon: "pi pi-fw pi-trash", value: gruvboxLight },
  { label: "gruvboxDark ", icon: "pi pi-fw pi-trash", value: gruvboxDark },
]);

const selectedTheme = ref(themes.value[0]);

const languageList = ref([
  { label: "JavaScript", iconPath: "assets/icons/file_type_js.svg", value: javascriptLanguage },
  { label: "TypeScript", iconPath: "assets/icons/file_type_typescript.svg", value: typescriptLanguage },
  { label: "React JSX", iconPath: "assets/icons/file_type_reactjs.svg", value: jsxLanguage },
  { label: "React TSX", iconPath: "assets/icons/file_type_reactts.svg", value: tsxLanguage },
  { label: "Markdown", iconPath: "assets/icons/file_type_markdown.svg", value: markdown({ codeLanguages: languages }) },
]);

const selectedLanguage = ref(languageList.value[0]);

const editorRef = ref<any>(null);

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
      showSuccess();
      break;
    case Types.Menu.saveAsFile:
      await mainStore.saveAsFile();
      showSuccess();
      break;
    case Types.Menu.themes:
      console.log("basicLightHighlightStyle", basicLightHighlightStyle);
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

.footer {
  height: 1.5rem;
  background-color: deepskyblue;
}
</style>
