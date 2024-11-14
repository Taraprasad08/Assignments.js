// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
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

// Display a task in the list
function addTaskToList(task) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.textContent = task.text;
  li.className = task.completed ? "completed" : "";

  // Add "Complete" button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.onclick = () => toggleComplete(task.id);

  // Add "Delete" button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task.id);

  // Add "Edit" button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(task, li);

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  taskList.appendChild(li);
}

// Toggle the completion status of a task
function toggleComplete(taskId) {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = taskList.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    loadTasks();
  }
}

// Delete a task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Save a task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage and display them
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => addTaskToList(task));
}

// Filter tasks by search term
function searchTasks() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(searchTerm))
    .forEach(task => addTaskToList(task));
}

// Edit a task's text
function editTask(task, taskElement) {
  // Create an input field with the current task text
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;

  // Replace task text with input field
  taskElement.innerHTML = "";
  taskElement.appendChild(input);

  // Create a "Save" button to save changes
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => saveEdit(task, input, taskElement);

  // Add save button to task element
  taskElement.appendChild(saveBtn);
}

// Save the edited task
function saveEdit(task, inputField, taskElement) {
  const newText = inputField.value.trim();
  
  if (newText === "") {
    alert("Task text cannot be empty.");
    return;
  }

  // Update the task text and re-display it
  task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(JSON.parse(localStorage.getItem("tasks"))));
  
  // Re-render the task item
  loadTasks();
}

// Show all tasks
function showAllTasks() {
  loadTasks();
}

// Show only completed tasks
function showCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.filter(task => task.completed).forEach(task => addTaskToList(task));
}

// Show only active (not completed) tasks
function showActiveTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.filter(task => !task.completed).forEach(task => addTaskToList(task));
}
