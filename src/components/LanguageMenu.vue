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
        @update:modelValue="onSelectLanguage"
        :modelValue="props.language"
        :options="languagesFiltered"
        optionLabel="label"
        listStyle="max-height:400px"
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
        }">
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img :alt="slotProps.option.label" :src="slotProps.option.iconPath" class="mr-2" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Listbox>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["visible", "languages", "language"]);
const emit = defineEmits(["update:visible", "update:language"]);

function onSelectLanguage(language) {
  emit("update:language", language.value);
  emit("update:visible", false);
}

const searchText = ref("");

const languagesFiltered = computed(() => {
  return props.languages.filter((language) => language.label.includes(searchText.value));
});
</script>
