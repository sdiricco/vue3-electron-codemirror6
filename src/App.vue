<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-menu mode="horizontal">
        <a-menu-item key="1"><router-link to="/">Home</router-link> </a-menu-item>
        <a-menu-item key="2"><router-link to="/about">About</router-link></a-menu-item>        
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>




<style scoped>
.layout{
  height: 100vh;
}

.header{
  padding: 0px;
}
.content{
  display: flex;
  padding: 32px;
  width: 100%;
  height: 100%;
}

</style>
