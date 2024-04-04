


const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input[type='text']");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskName">${taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    // Increment task count after adding a new task
    taskCount++;
    displayCount(taskCount);

    // Clear input value after adding task
    newTaskInput.value = "";
};

const deleteTask = (button) => {
    const taskElement = button.closest(".task");
    taskElement.remove();
    taskCount--; // Decrement task count
    displayCount(taskCount);
};

const editTask = (button) => {
    const taskElement = button.closest(".task");
    const taskName = taskElement.querySelector(".taskName").innerText;
    newTaskInput.value = taskName;
    taskElement.remove();
    taskCount--; // Decrement task count
    displayCount(taskCount);
};

tasksContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
        deleteTask(target);
    } else if (target.classList.contains("edit")) {
        editTask(target);
    }
});

tasksContainer.addEventListener("change", (event) => {
    const target = event.target;
    if (target.classList.contains("task-check")) {
        const taskElement = target.closest(".task");
        const taskNameElement = taskElement.querySelector(".taskName");
        taskNameElement.classList.toggle("completed");

        if (target.checked) {
            taskCount--; // Decrement task count
        } else {
            taskCount++; // Increment task count
        }
        displayCount(taskCount);
    }
});


addBtn.addEventListener("click", addTask);
window.onload=()=>{
    taskCount=0;
    displayCount(taskCount);
    newTaskInput.value="";
}

