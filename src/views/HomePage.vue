<template>
  <CodeMirror6 :value="editorValue"/>
</template>

<script setup lang="ts">
import {computed} from "vue"
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import {Menu} from "../types"
import {useMainStore} from "@/store/main"

const mainStore = useMainStore();

const editorValue = computed(() => {
  return mainStore.file?.value || '';
})

onMenuAction(async(data:any)=> {
  console.log(data)
  switch (data.id) {
    case Menu.File.Open:
      await mainStore.openFile();
      break;
    default:
      break;
  }
})
</script>
6
<style scoped></style>
