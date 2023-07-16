<template>
  <div id="editor" class="editor"></div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark, color } from "@codemirror/theme-one-dark";
import { search } from "@codemirror/search";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";

const props = defineProps({
  file: {},
});

let editorState: EditorState | null = null;

function createEditor() {}

let state = EditorState.create({
  doc: "",
  extensions: [
    basicSetup,
    search({ top: true }),
    oneDark,
    markdown({ codeLanguages: languages }),
    autocompletion({
      override: [],
    }),
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

watch(props, () =>{
  updateValue(props.file.value)
})

function updateValue(value:string) {
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert:value },
  });
}

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
