let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskList = document.getElementById("task-list");
    const pendingCount = document.getElementById("pending-count");
    const completedCount = document.getElementById("completed-count");

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateCounters();
    }

    function updateCounters() {
      const done = tasks.filter(t => t.completed).length;
      const total = tasks.length;
      pendingCount.textContent = total - done;
      completedCount.textContent = done;
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const actions = document.createElement("div");
        actions.className = "task-actions" + (task.completed ? " completed " : "");

        const span = document.createElement("span");
        span.textContent = task.text;

        const iconGroup = document.createElement("div");
        iconGroup.className = "icons";

        const completeBtn = document.createElement("i0");
        completeBtn.className = "fas fa-check text-success";
        completeBtn.title = "Complete";
        completeBtn.onclick = () => completeTask(index);

        const editBtn = document.createElement("i");
        editBtn.className = "fas fa-pen text-primary";
        editBtn.title = "Edit";
        editBtn.onclick = () => editTask(index);

        
       const deleteBtn = document.createElement("i1");
        deleteBtn.className = "fas fa-trash text-danger";
        deleteBtn.title = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        iconGroup.append(completeBtn,editBtn, deleteBtn);
        actions.append(span, iconGroup);

        li.appendChild(actions);

        const timestamp = document.createElement("div");
        timestamp.className = "timestamp";
        if (task.completed) {
          timestamp.textContent = "Completed:  " + task.completedAt;
        } else {
          timestamp.textContent = "Updated: " + task.updatedAt;
        }
        li.appendChild(timestamp);

        taskList.appendChild(li);
      });
      updateCounters();
    }

    function addTask() {
      const input = document.getElementById("task-input");
      const text = input.value.trim();
      if (!text) return;
      const now = new Date().toLocaleString();
      tasks.push({ text, completed: false, updatedAt: now });
      input.value = "";
      saveTasks();
      renderTasks();
    }

    function editTask(index) {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        tasks[index].updatedAt = new Date().toLocaleString();
        saveTasks();
        renderTasks();
      }
    }

    function completeTask(index) {
      tasks[index].completed = !tasks[index].completed;
      tasks[index].completedAt = new Date().toLocaleString();
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    }

    renderTasks();