<template>
  <div id="editorId" style="height: 100%"></div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import { onMounted, onBeforeUnmount } from "vue";
import * as monaco from "monaco-editor"

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

let myEditor:monaco.editor.IStandaloneCodeEditor | null = null;


/*********************************************************/
/* HOOKS */
/*********************************************************/
onMounted(() => {
  const editorContainer = document.getElementById('editorId')
  if (!editorContainer) {
    return;
  }
  myEditor = monaco.editor.create(editorContainer, {
    value: '',
    language: 'javascript',
    automaticLayout: true,
    readOnly: false,
	  theme: "vs-dark",
  });
});

onBeforeUnmount(() => {
  myEditor && myEditor.dispose()
})  
</script>

<style scoped>
</style>
