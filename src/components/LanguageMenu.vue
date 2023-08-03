<template>
  <Dialog
    position="top"
    :visible="props.visible"
    @update:visible="(value) => emit('update:visible', value)"
    dismissableMask
    modal
    :showHeader="false"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
    contentClass="border-round-top p-0"
    appendTo="body"
    @hide="visible1 = false">
    <div class="flex w-full surface-section align-items-center justify-content-between px-1">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-search text-500"></i>
        <InputText ref="input1" type="text" placeholder="" class="w-full border-none shadow-none outline-none" />
      </span>
    </div>
    <div class="border-y-1 surface-border px-2 py-2">
      <ul class="list-none m-0 p-0">
        <li v-for="(language, idx) in languages" :key="idx" class="select-none p-1 font-medium text-base cursor-pointer border-round-lg hover:surface-hover" @click="onSelectLanguage(language)">
          <Image :src="language.iconPath" alt="Image" width="20" class="vertical-align-middle" /> {{ language.label }}
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["visible", "languages"]);
const emit = defineEmits(["update:visible", "update:language"]);

function onSelectLanguage(language){
  emit('update:language', language)
  emit('update:visible', false)
}
</script>
