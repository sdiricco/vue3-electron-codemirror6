<template>
  <div class="about">
    <h1>About</h1>
    <p>Vu3 - electron Boilerplate</p>
    <button @click="onClick">print</button>
    <div id="editor" class="editor">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from "vue";
import { basicSetup, EditorView, } from "codemirror";
import { EditorState, Compartment, } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import {javascript} from "@codemirror/lang-javascript"
import { markdown } from "@codemirror/lang-markdown";
import {oneDark} from "@codemirror/theme-one-dark";
import {search} from "@codemirror/search";

let language = new Compartment(),
  tabSize = new Compartment();

let state = EditorState.create({
  doc: 'initial',
  extensions: [basicSetup, search({top: true}), oneDark, language.of(markdown()), tabSize.of(EditorState.tabSize.of(8))],
});


let view: EditorView = new EditorView();

onMounted(() => {
  view = new EditorView({
    state,
    parent: document.getElementById("editor"),
  });
});

onBeforeUnmount(() => {
  view.destroy();
})

function onClick(){
  console.log(view.state.doc.toString())
}

</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.editor{
  width: 100%;  
}
</style>
