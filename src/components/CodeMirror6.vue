<template>
  <div :id="editorId" class="editor"></div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onBeforeUnmount, watch, computed, reactive } from "vue";
import { basicSetup, EditorView} from "codemirror";
import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { Compartment } from '@codemirror/state'
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
  value: ''
})

/*********************************************************/
/* VARIABLES */
/*********************************************************/
let state: EditorState | null = null;
let view: EditorView | null = null;
let editorRef: HTMLElement | null = null;

const editorId = `editor-${uuidv4()}`

const themeConfig = new Compartment()

let extensions: Array<Extension> = [
  basicSetup,
  search({ top: true }),
  markdown({ codeLanguages: languages }),
  autocompletion({
    override: [],
  }),
  themeConfig.of(props.theme? [props.theme] : [])
];

/*********************************************************/
/* COMPUTED */
/*********************************************************/
const editorValue = computed(()=> props.value);
const theme = computed(()=> props.theme);

/*********************************************************/
/* WATCHER */
/*********************************************************/
watch(editorValue, (value) => {
  updateValue(value);
});

watch(theme, (value) => {
  value && updateTheme(value)
})

/*********************************************************/
/* EDITOR FUNCTIONS */
/*********************************************************/

//create editor
function createEditor(id: string, extensions:Array<Extension>) {
  editorRef = document.getElementById(id);
  if (!editorRef) {
    return;
  }
  state = createEditorState(extensions);
  view = createEditorView(editorRef, state);
}

//destroy editor
function destroyEditor(){
  view?.destroy();
}

//create editor state
function createEditorState(extensions:Array<Extension>) {
  return EditorState.create({
    doc: "",
    extensions: extensions,
  });
}

//create editor view
function createEditorView(editorRef: HTMLElement, state: EditorState) {
  return new EditorView({
    state,
    parent: editorRef
  });
}

//Update value
function updateValue(value: string) {
  view?.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  });
}

//Update theme
function updateTheme(theme: Extension) {
  console.log('theme', theme)

  view?.dispatch({
      effects: themeConfig.reconfigure([theme])
  });
}

/*********************************************************/
/* HOOKS */
/*********************************************************/
onMounted(() => {
  createEditor(editorId, extensions);
});

onBeforeUnmount(() => {
  destroyEditor();
});
</script>

<style scoped>


.editor :deep(.cm-editor) {
  height: 100%;
}

/*********************************************************/
/* DEFAULT SEARCH PANEL */
/*********************************************************/
.editor :deep(.cm-panels.cm-panels-top){
  border: none;
}

/*inputs*/
.editor :deep(.cm-search.cm-panel .cm-textfield){
  outline: none;
  border-radius: 2px;
}

/*buttons*/
.editor :deep(.cm-search.cm-panel .cm-button){
  background: transparent;
  cursor: pointer;
  border-radius: 2px;
  outline: none;
}

/*close button*/
.editor :deep(.cm-search.cm-panel button){
  color: inherit;
  
}
</style>
