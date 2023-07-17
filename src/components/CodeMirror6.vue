<template>
  <div :id="editorId" class="editor"></div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onBeforeUnmount, watch, computed } from "vue";
import { basicSetup, EditorView} from "codemirror";
import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark, color } from "@codemirror/theme-one-dark";
/*********************************************************/
/* THEMES */
/*********************************************************/
import { basicLight } from 'cm6-theme-basic-light'
import { basicDark } from 'cm6-theme-basic-dark'
import { solarizedDark } from 'cm6-theme-solarized-dark'
import { solarizedLight } from 'cm6-theme-solarized-light'
import { materialDark } from 'cm6-theme-material-dark'
import { nord } from 'cm6-theme-nord'
import { gruvboxLight } from 'cm6-theme-gruvbox-light'
import { gruvboxDark } from 'cm6-theme-gruvbox-dark'

import { search } from "@codemirror/search";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";


/*********************************************************/
/* PROPS */
/*********************************************************/

interface Props {
  value?: string
  theme?: Extension
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  theme: () => oneDark
})

/*********************************************************/
/* VARIABLES */
/*********************************************************/
let state: EditorState | null = null;
let view: EditorView | null = null;
let editorRef: HTMLElement | null = null;

const editorId = `editor-${uuidv4()}`

let editorExtensions: Array<Extension> = [
  basicSetup,
  search({ top: true }),
  props.theme,
  markdown({ codeLanguages: languages }),
  autocompletion({
    override: [],
  }),
];





/*********************************************************/
/* COMPUTED */
/*********************************************************/
const editorValue = computed(()=> props.value);
const theme = computed(()=> props.theme);

/*********************************************************/
/* WATCHER */
/*********************************************************/
watch(editorValue, () => {
  updateValue(editorValue.value);
});

watch(theme, () => {
  updateExtensions()
})



/*********************************************************/
/* FUNCTIONS */
/*********************************************************/
function createEditorState() {
  return EditorState.create({
    doc: "",
    extensions: editorExtensions,
  });
}

function createEditorView(editorRef: HTMLElement, state: EditorState) {
  return new EditorView({
    state,
    parent: editorRef
  });
}

/*********************************************************/
/* UPDATE EDITOR FUNCTIONS */
/*********************************************************/
function updateValue(value: string) {
  view?.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  });
}

function updateExtensions(){
  view?.dispatch({
      effects: StateEffect.reconfigure.of(editorExtensions)
  });
}

function createEditor(id: string) {
  editorRef = document.getElementById(id);
  if (!editorRef) {
    return;
  }
  state = createEditorState();
  view = createEditorView(editorRef, state);
}

function destroyEditor(){
  view?.destroy();
}

/*********************************************************/
/* HOOKS */
/*********************************************************/
onMounted(() => {
  createEditor(editorId);
});

onBeforeUnmount(() => {
  destroyEditor();
});
</script>

<style scoped>


.editor :deep(.cm-editor) {
  height: 100%;
}
</style>
