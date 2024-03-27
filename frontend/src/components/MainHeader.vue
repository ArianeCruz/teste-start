<template>
    <header class="header">
      <div class="logo">
        <img src="../assets/logo-startlaw.png" alt="Logo" />
      </div>
      <div class="title">
        <h1>{{ title }}</h1>
      </div>
    </header>
  </template>
  
  <script setup>
import { ref } from 'vue';

const title = ref('ACME')
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #CFCFCF;
  }
  
.title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

  .logo img {
    width: 195px;
    height: auto;
  }
  </style>
  