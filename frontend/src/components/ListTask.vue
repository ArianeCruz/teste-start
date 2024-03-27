<template>
  <div>
    <h1 class="list-tasks">Lista de Tarefas</h1>
    <div class="task-grid">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        
          <template v-if="!task.editing">
            <div class="task-square">
            <p><strong>Título:</strong> {{ task.title }}</p>
            <p><strong>Descrição:</strong><span class="description">{{ task.description }}</span></p>
          </div>
            <div class="task-buttons">
              <button class="custom-button-positive" @click="editTask(task)">Editar</button>
              <button class="custom-button-negative" @click="deleteTask(task.id)">Deletar</button>
            </div>
          </template>
          
          <template v-else>
            <div class="task-square">
            <div class="title-edit">
              <label for="title">Título:</label>
              <input v-model="task.title" type="text" />
            </div>
            <div class="desc-edit">
              <label for="description">Descrição:</label>
              <input v-model="task.description" />
            </div>
          </div>
            <div class="task-buttons">
              <button class="custom-button-positive" @click="saveTask(task)">Salvar</button>
              <button class="custom-button-negative" @click="cancelEdit(task)">Cancelar</button>
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

const store = useStore();

// Carregar as tarefas ao montar o componente
onMounted(() => {
  store.dispatch("getTasks");
});

// Variável computada para obter as tarefas do estado da store
const tasks = computed(() => store.state.tasks);

// Função para ativar o modo de editar uma tarefa
const editTask = (task) => {
  task.editing = true;
};

// Função para salvar as alterações feitas na tarefa
const saveTask = (task) => {
  store
    .dispatch("updateTask", { taskId: task.id, updatedTask: task })
    .then(() => {
      task.editing = false;
    })
    .catch((error) => {
      console.error("Erro ao salvar tarefa:", error);
    });
};

// Função para cancelar a edição de uma tarefa
const cancelEdit = (task) => {
  task.editing = false;
};

// Função para deletar uma tarefa
const deleteTask = (taskId) => {
  store.dispatch("deleteTask", taskId);
};
</script>

<style>
@media (min-width: 768px) {
  .task-grid {
    display: flex;
    flex-wrap: wrap;
  }
}

.list-tasks {
margin-left: 10px;
}

.title-edit {
  margin-left: 31px;
}

.desc-edit {
  margin-top: 10px;
}

.task-card {
  flex: 0 0 30%;
  margin: 10px;
}

.task-square {
  border: 1px solid #ccc;
  padding: 10px;
  max-width: 400px;
  height: 150px;
}

.task-buttons {
  margin-top: 10px;
}

button {
  margin-right: 5px;
}

.description {
overflow-wrap: break-word;
}

</style>
