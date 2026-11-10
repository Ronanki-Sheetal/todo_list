const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const taskCount = document.querySelector("#taskCount");

let tasks = JSON.parse(localStorage.getItem("oceanTasks")) || [];

function saveTasks() {
  localStorage.setItem("oceanTasks", JSON.stringify(tasks));
}

function renderTasks() {
 
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  tasks.forEach((task, index) => {

    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(index));

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    if (task.completed) {
      span.classList.add("completed");
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  updateTaskCount();
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({ text: text, completed: false });

  taskInput.value = "";

  saveTasks();
  renderTasks();

  taskInput.focus();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1); // remove 1 item at that index
  saveTasks();
  renderTasks();
}

function updateTaskCount() {
  const pending = tasks.filter((task) => !task.completed).length;

  if (pending === 0) {
    taskCount.textContent = "No tasks pending 🎉";
  } else if (pending === 1) {
    taskCount.textContent = "1 task pending";
  } else {
    taskCount.textContent = `${pending} tasks pending`;
  }
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
