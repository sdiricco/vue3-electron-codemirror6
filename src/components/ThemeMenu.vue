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
    appendTo="body">
    <Listbox
      filter
      @update:modelValue="onSelectTheme"
      :modelValue="props.theme"
      :options="themesFiltered"
      optionLabel="label"
      :pt="{
        item: {
          class: 'p-2',
        },
        header: {
          class: 'p-2',
        },
        filterInput: {
          style: {
            padding: '0.5rem',
            'padding-left': '2.25rem',
          },
        },
        filterIcon: {
          style: {
            left: '0.75rem',
          },
        },
      }" />
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["visible", "themes", "theme"]);
const emit = defineEmits(["update:visible", "update:theme"]);

function onSelectTheme(theme) {
  emit("update:theme", theme);
  emit("update:visible", false);
}

const searchText = ref("");

const themesFiltered = computed(() => {
  return props.themes.filter((theme) => theme.label.includes(searchText.value));
});
</script>
