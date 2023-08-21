<template>
  <Divider
    :pt="{
      root: {
        class: 'm-0',
      },
    }"></Divider>
  <div class="footer">
    <FooterButton @click="emit('click-language')"> {{ props.language }} </FooterButton>
  </div>
</template>

<script setup>
import FooterButton from "./FooterButton.vue";
const emit = defineEmits(["click-language"]);
const props = defineProps(["language"]);
</script>

<style scoped>
.footer {
  height: 2rem;
  background-color: var(--surface-card);
}
</style>
