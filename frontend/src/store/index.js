import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      // Estado inicial da store, propriedade 'tasks' inicializada como um array vazio.
      tasks: [],
    };
  },
  mutations: {
    // Mutação para adicionar uma nova tarefa ao estado 'tasks'.
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    // Mutação para definir todas as tarefas no estado 'tasks'.
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    // Mutação para atualizar uma tarefa existente no estado 'tasks'.
    updateTask(state, { taskId, updatedTask }) {
      // Procurando o índice da tarefa no array 'tasks' com base no 'taskId'.
      const index = state.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        // Se a tarefa for encontrada, atualiza-a com os dados fornecidos.
        state.tasks[index] = updatedTask;
      }
    },
    // Mutação para deletar uma tarefa do estado 'tasks'.
    deleteTask(state, taskId) {
      // Filtra o array 'tasks' para manter apenas as tarefas cujo 'id' seja diferente do 'taskId' fornecido.
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    // Ação para obter todas as tarefas do servidor e atualizar o estado 'tasks'.
    async getTasks({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        // Chama a mutação 'setTasks' para atualizar o estado 'tasks' com os dados recebidos do servidor.
        commit("setTasks", response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    },
    // Ação para adicionar uma nova tarefa ao servidor e ao estado 'tasks'.
    async addTask({ commit }, newTask) {
      try {
        const response = await axios.post(
          "http://localhost:3000/tasks",
          newTask
        );
        // Chama a mutação 'addTask' para adicionar a nova tarefa ao estado 'tasks'.
        commit("addTask", response.data);
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
        throw error;
      }
    },
    // Ação para atualizar uma tarefa no servidor e no estado 'tasks'.
    async updateTask({ commit }, { taskId, updatedTask }) {
      try {
        await axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTask);
        // Chama a mutação 'updateTask' para atualizar a tarefa no estado 'tasks' com os dados atualizados.
        commit("updateTask", { taskId, updatedTask });
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    },
    // Ação para deletar uma tarefa do servidor e do estado 'tasks'.
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        // Chama a mutação 'deleteTask' para deletar a tarefa do estado 'tasks'.
        commit("deleteTask", taskId);
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
      }
    },
  },
});
