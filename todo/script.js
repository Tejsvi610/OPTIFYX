// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new task item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Add "Complete/Pending" toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Mark as Complete";
  toggleBtn.classList.add("complete-btn");
  toggleBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleBtn.textContent = li.classList.contains("completed")
      ? "Mark as Pending"
      : "Mark as Complete";
    saveTasks();
  });

  // Add "Delete" button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
  });

  // Append buttons to the task
  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);

  // Append the task to the list
  taskList.appendChild(li);

  // Save tasks to local storage
  saveTasks();

  // Clear input
  taskInput.value = "";
}

// Function to save tasks to local storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.textContent.replace("Mark as CompleteDelete", "").trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    // Mark task as completed if it was completed before
    if (task.completed) {
      li.classList.add("completed");
    }

    // Add "Complete/Pending" toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed
      ? "Mark as Pending"
      : "Mark as Complete";
    toggleBtn.classList.add("complete-btn");
    toggleBtn.addEventListener("click", () => {
      li.classList.toggle("completed");
      toggleBtn.textContent = li.classList.contains("completed")
        ? "Mark as Pending"
        : "Mark as Complete";
      saveTasks();
    });

    // Add "Delete" button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      saveTasks();
    });

    // Append buttons to the task
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);

    // Append the task to the list
    taskList.appendChild(li);
  });
}