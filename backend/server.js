const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

let tasks = [];

// Rota para buscar e retornar todas as tarefas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: tasks.length + 1, title, description };
    
    tasks.push(newTask);

    res.status(201).json(newTask);
  });
  

// Rota para excluir uma tarefa
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    
    res.status(204).end();
  });
  

// Rota para atualizar uma tarefa existente
app.put("/tasks/:id", (req, res) => {

    const { id } = req.params;
    const { title, description } = req.body;

    // Procura o índice da tarefa no array de tarefas
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    // Verifica se a tarefa existe
    if (taskIndex !== -1) {
      // Atualiza os dados da tarefa com os novos dados fornecidos
      tasks[taskIndex].title = title;
      tasks[taskIndex].description = description;
      
      res.json(tasks[taskIndex]);
    } else {
      res.status(404).json({ message: "Tarefa não encontrada" });
    }
  });
  
  // Inicia o servidor e escuta a porta especificada
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
