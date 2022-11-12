<template>
  <div class="home">
    <h1 class="center">Home</h1>
    <a-button type="secondary" @click="showMessageBox(msg)" :disabled="msg === ''">Electron</a-button>
    <a-input class="input" v-model:value="msg" placeholder="type a message and click on button" />
    <a-row align="center" justify="center" class="m-container">
      <a-col class="item" :span="2"><a-button type="primary" shape="circle" @click="counter.increase(1)">+</a-button></a-col>
      <a-col class="item" :span="4">Counter: {{ counter.count }}</a-col>
      <a-col class="item" :span="2"><a-button type="primary" shape="circle" @click="counter.decrease(1)">-</a-button></a-col>
    </a-row>
    
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {showMessageBox} from "../samples/node-api"
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
const msg = ref('')

</script>

<style scoped>

.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}

.m-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.item{
  display: flex;
  justify-content: center;
  align-items: center;
}

.center{
  text-align: center;
}

.input{
  margin: 12px;
  width: 50vw;
}
</style>
