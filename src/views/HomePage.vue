<template>
  <CodeMirror6 :value="editorValue" class="cm6-editor" />
  <Dialog v-model:visible="visible" position="top" :modal="true" :draggable="false" :style="{width: '50vw'}">
    <template #header>
     <h3>Impostazioni</h3> 
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import { Menu } from "../types";
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();

const visible = ref(false)

const editorValue = computed(() => {
  return mainStore.file?.value || "";
});

onMenuAction(async (data: any) => {
  switch (data.id) {
    case Menu.openFile:
      await mainStore.openFile();
      break;
    case Menu.preferences:
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
</style>
