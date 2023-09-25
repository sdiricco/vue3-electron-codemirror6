<template>
  <SidebarHeading />
	<EmptyTree v-if="!tree.length"/>
	<DirectoryTree v-else />
</template>
<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useMainStore} from "@/store/main"

import DirectoryTree from "./DirectoryTree.vue";
import EmptyTree from "./EmptyTree.vue";
import SidebarHeading from "./SidebarHeading.vue";

const {tree} = storeToRefs(useMainStore())
</script>
