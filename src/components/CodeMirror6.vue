<template>
  <div id="editor" class="editor"></div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark, color } from "@codemirror/theme-one-dark";
import { search } from "@codemirror/search";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";

let state = EditorState.create({
  doc: "",
  extensions: [
    basicSetup,
    search({ top: true }),
    oneDark,
    markdown({ codeLanguages: languages }),
    autocompletion({
      override: []
    })
    
  ],
});

let view: EditorView = new EditorView();

onMounted(() => {
  const el = document.getElementById("editor");
  if (el) {
    view = new EditorView({
      state,
      parent: el,
    });
    el.style.background = color.background;
  }
});

onBeforeUnmount(() => {
  view.destroy();
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100vh;
}
</style>
