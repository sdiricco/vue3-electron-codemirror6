<template>
  <div class="m-8">
    <div class="text-5xl font-bold mb-2">v-code</div>
    <div class="text-2xl text-color-secondary font-bold mb-8">Simple editor made with Vue.js and CodeMirror 6</div>
    <div class="text-2xl mb-2">Start</div>
    <div>
      <div class="text-primary mb-2 cursor-pointer" @click="mainStore.addNewFile">
        <font-awesome-icon icon="fa-solid fa-file-circle-plus"  class="w-1rem pr-1"/>
        <span>New file..</span>
      </div>
      <div class="text-primary mb-2 cursor-pointer" @click="mainStore.openFile">
        <font-awesome-icon icon="fa-solid fa-file"  class="w-1rem pr-1"/>
        <span>Open file..</span>
      </div>
      <div class="text-primary cursor-pointer" @click="mainStore.openFolder">
        <font-awesome-icon icon="fa-solid fa-folder-open"  class="w-1rem pr-1"/>
        <span>Open folder..</span>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {storeToRefs} from "pinia"
import { useMainStore } from '@/store/main';
const mainStore = useMainStore();

</script>

<style scoped>
</style>
