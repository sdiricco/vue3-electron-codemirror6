<template>
  <TabView
    :scrollable="true"
    :pt="{
      panelContainer: {
        class: 'p-0',
      },
    }">
    <TabPanel v-for="tab in scrollableTabs" :key="tab.title" :header="tab.title"> </TabPanel>
  </TabView>
</template>
<script setup>
const scrollableTabs = ref(Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` })));

</script> 