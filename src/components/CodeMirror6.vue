<template>
  <div :id="editorId" class="editor"></div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onBeforeUnmount, watch, computed, ref } from "vue";
import { basicSetup, EditorView} from "codemirror";
import { EditorState, Extension, StateEffect } from "@codemirror/state";

import { Compartment } from '@codemirror/state'
import { search } from "@codemirror/search";
import { languages } from "@codemirror/language-data";
import { autocompletion } from "@codemirror/autocomplete";

const emit = defineEmits(['input'])

/*********************************************************/
/* PROPS */
/*********************************************************/
interface Props {
  initValue?: string,
  theme?: Extension,
  language?: Extension,
}

const props = withDefaults(defineProps<Props>(), {
  initValue: ''
})

/*********************************************************/
/* VARIABLES */
/*********************************************************/
let sync_val = ref('')



let state: EditorState | null = null;
let view: EditorView | null = null;
let editorRef: HTMLElement | null = null;

const editorId = `editor-${uuidv4()}`

const themeConfig = new Compartment();
const languageConfig = new Compartment();

let extensions: Array<Extension> = [
  basicSetup,
  search({ top: true }),
  // autocompletion({
  //   override: [],
  // }),
  EditorView.updateListener.of(function(e) {
    sync_val.value = e.state.doc.toString();
  }),
  themeConfig.of(props.theme? [props.theme] : []),
  languageConfig.of(props.language ? [props.language] : []),
];

/*********************************************************/
/* COMPUTED */
/*********************************************************/
const editorInitValue = computed(()=> props.initValue);
const theme = computed(()=> props.theme);
const language = computed(()=> props.language);

/*********************************************************/
/* WATCHER */
/*********************************************************/

//when change init editor value, update interna value
watch(editorInitValue, (value) => {
  updateValue(value);
});

//when change theme update theme
watch(theme, (value) => {
  value && updateTheme(value)
})

//when change language update language
watch(language, (value) => {
  value && updateLanguage(value)
})

watch(sync_val, (value)=> {
  emit('input', value)
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
    changes: { from: 0, to: view.state.doc.length, insert: value,  },
  });
}

//Update theme
function updateTheme(theme: Extension) {
  view?.dispatch({
    effects: themeConfig.reconfigure([theme])
  });
}

//Update theme
function updateLanguage(language: Extension) {
  view?.dispatch({
    effects: languageConfig.reconfigure([language])
  });
}

defineExpose({ updateValue });

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

.editor :deep(label){
  vertical-align: middle;
  cursor: pointer;

}

.editor :deep(label input){
  position: relative;
  top:2px;
}
</style>
