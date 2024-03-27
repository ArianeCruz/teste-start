<template>
  <mainHeader />

  <div id="app">
    <button class="custom-button-positive" @click="showAddTask = true" v-if="!showAddTask" style="float: right;margin-right: 20px;">Adicionar Nova Tarefa</button>
    <addTask v-if="showAddTask" @task-added="showAddTask = false" />
    <listTask v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import addTask from './components/AddTask.vue';
import listTask from './components/ListTask.vue';
import mainHeader from './components/MainHeader.vue'

const showAddTask = ref(false);
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
}

.custom-button-positive {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.custom-button-negative {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.custom-button-positive:hover {
  background-color: #45a049;
}

.custom-button-negative:hover {
  background-color: #f44336;
}
</style>
