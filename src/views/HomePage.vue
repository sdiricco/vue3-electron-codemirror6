<template>
  <CodeMirror6 :value="editorValue" class="cm6-editor" :theme="selectedTheme.value" />
  <Dialog
    v-model:visible="visible"
    position="top"
    :modal="true"
    :draggable="false"
    :style="{ width: '50vw'}"
    :pt="{
      header: {
        class: 'surface-200',
      },
    }">
    <template #header>
      <div>
      </div>
    </template>
    <div>
      <TabMenu v-model:activeIndex="active" :model="items" />
      <div v-if="active === 0" class="p-2">
        <p>Not yet available</p>
      </div>
      <div v-if="active === 1" class="p-2">
        <Listbox class="listbox w-full" v-model="selectedTheme" :options="themes" optionLabel="label" />
      </div>
      <div v-if="active === 2">
        <p>Info</p>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import * as Types from "../types";
import { useMainStore } from "@/store/main";

import { oneDark, color } from "@codemirror/theme-one-dark";
import { basicLight, basicLightHighlightStyle } from 'cm6-theme-basic-light'
import { basicDark } from 'cm6-theme-basic-dark'
import { solarizedDark } from 'cm6-theme-solarized-dark'
import { solarizedLight } from 'cm6-theme-solarized-light'
import { materialDark } from 'cm6-theme-material-dark'
import { nord } from 'cm6-theme-nord'
import { gruvboxLight } from 'cm6-theme-gruvbox-light'
import { gruvboxDark } from 'cm6-theme-gruvbox-dark'

const mainStore = useMainStore();

const visible = ref(false);

const active = ref(0);

const themes = ref([
  { label: "oneDark", icon: "pi pi-fw pi-plus", value: oneDark },
  { label: "basicLight", icon: "pi pi-fw pi-plus", value: basicLight },
  { label: "basicDark", icon: "pi pi-fw pi-trash", value: basicDark },
  { label: "solarizedDark", icon: "pi pi-fw pi-trash", value: solarizedDark },
  { label: "solarizedLight", icon: "pi pi-fw pi-trash", value: solarizedLight },
  { label: "materialDark", icon: "pi pi-fw pi-trash", value: materialDark },
  { label: "nord", icon: "pi pi-fw pi-trash", value: nord },
  { label: "gruvboxLight ", icon: "pi pi-fw pi-trash", value: gruvboxLight  },
  { label: "gruvboxDark ", icon: "pi pi-fw pi-trash", value: gruvboxDark  },
]);

const selectedTheme = ref(themes.value[0]);

const items = ref([
  {
    label: "Editor",
    icon: "pi pi-fw pi-code",
  },
  {
    label: "Temi",
    icon: "pi pi-fw pi-palette",
  },
  {
    label: "Info",
    icon: "pi pi-fw pi-info-circle",
  },
]);

const editorValue = computed(() => {
  return mainStore.file?.value || "";
});

onMenuAction(async (data: any) => {
  switch (data.id) {
    case Types.Menu.openFile:
      await mainStore.openFile();
      break;
    case Types.Menu.preferences:
      console.log('basicLightHighlightStyle', basicLightHighlightStyle)
      visible.value = true;
      break;
    default:
      break;
  }
});
</script>
<style scoped>
.cm6-editor {
  height: 100vh;
  width: 100%;
}

.listbox.p-listbox {
  border: none;
}
</style>
