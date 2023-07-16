<template>
  <CodeMirror6 :file="mainStore.file"/>
</template>

<script setup lang="ts">
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import {Menu} from "../types"
import {useMainStore} from "@/store/main"

const mainStore = useMainStore();

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
