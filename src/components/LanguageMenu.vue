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
    @hide="
      visible1 = false;
    ">
    <div class="flex w-full surface-section align-items-center justify-content-between px-1">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-search text-500"></i>
        <InputText
          ref="input1"
          type="text"
          placeholder=""
          class="w-full border-none shadow-none outline-none" />
      </span>
    </div>
    <div class="border-y-1 surface-border px-2 py-2">
      <ul class="list-none m-0 p-0">
        <li class="select-none p-1 font-medium text-base cursor-pointer border-round-lg hover:surface-hover ">
            <Image src="/src/assets/icons/file_type_js.svg" alt="Image" width="20" class="vertical-align-middle"/> JavaScript
        </li>
        <li class="select-none p-1 font-medium text-base cursor-pointer border-round-lg hover:surface-hover">
            <Image src="/src/assets/icons/file_type_typescript.svg" alt="Image" width="20" class="vertical-align-middle"/> TypeScript
        </li>
        <li class="select-none p-1 font-medium text-base cursor-pointer border-round-lg hover:surface-hover">
            <Image src="/src/assets/icons/file_type_python.svg" alt="Image" width="20" class="vertical-align-middle"/> Python
        </li>
        <li class="select-none p-1 font-medium text-base cursor-pointer border-round-lg hover:surface-hover">
            <Image src="/src/assets/icons/file_type_c.svg" alt="Image" width="20" class="vertical-align-middle"/> C
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script setup>
import {ref} from "vue"

const props = defineProps(['visible'])
const emit = defineEmits(['update:visible']);
</script>
