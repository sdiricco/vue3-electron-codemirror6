<template>
  <CodeMirror6 />
</template>

<script setup lang="ts">
import CodeMirror6 from "@/components/CodeMirror6.vue";
import { showMessageBox } from "@/electronRenderer";
async function onClickOpenDialog() {
  const response = await showMessageBox({
    message: "Hello, this is the message content",
    title: "Title",
    textWidth: 400,
    buttons: ["Ok", "Cancel"],
    type: "info",
  });
  console.log(response);
}
</script>

<style scoped></style>