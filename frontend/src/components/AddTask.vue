<template>
  <div>
    <h1 class="main-title">Adicionar Nova Tarefa</h1>
    <form @submit.prevent="submitForm" class="form-container">
      <label class="title-form" for="title">Título:</label>
      <input type="text" id="title" v-model="title" required maxlength="30" />
      <label for="description">Descrição:</label>
      <textarea
        id="description"
        v-model="description"
        required
        style="width: 40%; height: 90px"
        maxlength="200"
      ></textarea>
      <button class="custom-button-positive" type="submit" :disabled="isLoading">Adicionar Tarefa</button>
      <div v-if="isLoading">Carregando...</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Definição de variáveis reativas para os campos do formulário e controle de estado de carregamento no VU3 utilizamos ref
const title = ref("");
const description = ref("");
const isLoading = ref(false);

const submitForm = async () => {
  try {
    // Define isLoading como true para exibir "Carregando..."
    isLoading.value = true;
    // Dispatch para a store para adicionar a tarefa
    await store.dispatch("addTask", {
      title: title.value,
      description: description.value,
    });
    // Limpa os campos do formulário após o envio bem-sucedido
    title.value = "";
    description.value = "";
    // Define isLoading como false após um pequeno atraso e recarrega a página
    setTimeout(() => {
      isLoading.value = false;
      window.location.reload();
    }, 300); 
  } catch (error) {
    // Tratamento de erro caso ocorra uma exceção durante a adição da tarefa
    console.error("Erro ao adicionar tarefa:", error);
    isLoading.value = false;
  }
};
</script>

<style>
.main-title {
  text-align: center;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
input {
  padding: 7px;
}
</style>
