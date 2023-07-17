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

/*********************************************************/
/* VARIABLES */
/*********************************************************/
let state: EditorState | null = null;
let view: EditorView | null= null;
let editorRef: HTMLElement | null = null; 

/*********************************************************/
/* PROPS */
/*********************************************************/
const props = defineProps({
  value: String
});

/*********************************************************/
/* WATCHER */
/*********************************************************/
watch(props, () => {
  updateValue(props.value);
});

/*********************************************************/
/* FUNCTIONS */
/*********************************************************/
function createEditorState() {
  return EditorState.create({
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
}

function createEditorView(editorRef:HTMLElement, state: EditorState){
  return new EditorView({
    state,
    parent: editorRef,
  });
}

function updateValue(value: string) {
  view?.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  });
}

function createEditor(id: string){
  editorRef = document.getElementById(id);
  if (!editorRef) {
    return;
  }
  editorRef.style.background = color.background;
  state = createEditorState();
  view = createEditorView(editorRef, state)
}

/*********************************************************/
/* HOOKS */
/*********************************************************/
onMounted(() => {
  createEditor('editor');
});

onBeforeUnmount(() => {
  view?.destroy();
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100vh;
}
</style>
