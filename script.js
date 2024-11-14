document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = { text: taskText, completed: false, id: Date.now() };
  addTaskToList(task);
  saveTask(task);

  taskInput.value = "";
}

function addTaskToList(task) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.textContent = task.text;
  li.className = task.completed ? "completed" : "";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.onclick = () => toggleComplete(task.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task.id);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(task, li);

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  taskList.appendChild(li);
}

function toggleComplete(taskId) {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = taskList.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    loadTasks();
  }
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => addTaskToList(task));
}

function searchTasks() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(searchTerm))
    .forEach(task => addTaskToList(task));
}

function editTask(task, taskElement) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;

  taskElement.innerHTML = "";
  taskElement.appendChild(input);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => saveEdit(task, input, taskElement);

  taskElement.appendChild(saveBtn);
}

function saveEdit(task, inputField, taskElement) {
  const newText = inputField.value.trim();
  
  if (newText === "") {
    alert("Task text cannot be empty.");
    return;
  }

  task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(JSON.parse(localStorage.getItem("tasks"))));
  
  loadTasks();
}

function showAllTasks() {
  loadTasks();
}

function showCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.filter(task => task.completed).forEach(task => addTaskToList(task));
}

function showActiveTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.filter(task => !task.completed).forEach(task => addTaskToList(task));
}
