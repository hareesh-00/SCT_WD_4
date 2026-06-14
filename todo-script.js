const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateCounter(){
    counter.textContent =
    `Total Tasks: ${tasks.length}`;
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        const top = document.createElement("div");
        top.className = "task-top";

        const text = document.createElement("span");
        text.textContent = task.text;

        if(task.completed){
            text.classList.add("completed");
        }

        text.onclick = ()=>{
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const priority = document.createElement("span");
        priority.className = "priority";
        priority.textContent =
        `${task.priority} Priority`;

        top.appendChild(text);
        top.appendChild(priority);

        const info = document.createElement("div");
        info.className = "task-info";
        info.textContent =
        `📅 ${task.date} ⏰ ${task.time}`;

        const btnGroup =
        document.createElement("div");
        btnGroup.className =
        "task-buttons";

        const editBtn =
        document.createElement("button");

        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = ()=>{

            const updated =
            prompt(
                "Edit Task",
                task.text
            );

            if(updated){
                task.text = updated;
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn =
        document.createElement("button");

        deleteBtn.textContent =
        "Delete";

        deleteBtn.className =
        "delete-btn";

        deleteBtn.onclick = ()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();
        };

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(top);
        li.appendChild(info);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask(){

    const value =
    taskInput.value.trim();

    if(value === ""){

        alert(
            "Please enter a task"
        );

        return;
    }

    const priority =
    prompt(
        "Enter Priority (High/Medium/Low)",
        "Medium"
    );

    tasks.push({

        text:value,

        completed:false,

        priority:
        priority || "Medium",

        date:
        taskDate.value || "No Date",

        time:
        taskTime.value || "No Time"
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

document
.getElementById("clearBtn")
.onclick = ()=>{

    tasks = [];

    saveTasks();

    renderTasks();
};

document
.getElementById("darkBtn")
.onclick = ()=>{

    document.body
    .classList.toggle("dark");
};

renderTasks();