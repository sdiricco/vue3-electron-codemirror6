<template>
  <div class="m-5">
    <h2>Welcome to <code>v-code</code>!</h2>
    <p>Open file or folder to start.</p>

    <Button label="Open file" class="mr-1" @click="mainStore.openFile"/>
    <Button label="Open Folder" @click="mainStore.openFolder" />
  </div>
</template>
<script setup lang="ts">
import {storeToRefs} from "pinia"
import { useMainStore } from '@/store/main';
const mainStore = useMainStore();

</script>

<style scoped>
</style>
