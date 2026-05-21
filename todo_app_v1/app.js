const input = document.querySelector(".todo-field");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

const filterList = document.querySelectorAll("span");
const allFilterButton = document.querySelector(".all");
const inProgressButton = document.querySelector(".in-progress");
const doneFilter = document.querySelector(".done");

const footer = document.querySelector(".todo-footer");
const taskCount = document.querySelector(".task-count");
const taskRemainsContent = document.querySelector(".task-remains-content");

const deleteAllTaskDone = document.querySelector(".delete-all-done");
const toastMessege = document.querySelector(".toast-mess");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let filterStatus = "all";

addButton.addEventListener("click", () => {
    const data = input.value.trim();
    
    if (data === "") 
        return;

    todos.push({
        id : Date.now(),
        task : data,
        isCompleted : false
    })

    saveData();
    render();
    footerRender();
    showToast();

    input.value = "";
})

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addButton.click();
    }
})

allFilterButton.addEventListener("click", () => {
    filterStatus = "all";
    updateData(allFilterButton);

    render();
    footerRender();
})

inProgressButton.addEventListener("click", () => {
    filterStatus = "inProgress";
    updateData(inProgressButton);

    render();
})

doneFilter.addEventListener("click", () => {
    filterStatus = "done";
    updateData(doneFilter);

    render();
})

deleteAllTaskDone.addEventListener("click", () => {
    todos = todos.filter((item) => {
        return item.isCompleted === false;
    })

    saveData();
    render();
    footerRender();
})


function saveData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateData(element) {
    filterList.forEach((item) => {
        item.classList.remove("active");
    })

    element.classList.add("active");
}

function footerRender() {
    let temp = todos;

    temp = temp.filter((item) => {
        return item.isCompleted === false;
    })

    taskCount.textContent = temp.length;

    if (temp.length >= 2) 
        taskRemainsContent.textContent = "Tasks remains";
    else 
        taskRemainsContent.textContent = "Task remains";
        
}

function showToast() {
    toastMessege.classList.add("active");
    setTimeout(() => {
        toastMessege.classList.remove("active");
    }, 2000);
}

function render() {
    let filterTodos = todos;

    list.innerHTML = "";

    if (filterStatus === "done") {
        filterTodos = filterTodos.filter((item) => {
            return item.isCompleted === true;
        })
    }

    if (filterStatus === "inProgress") {
        filterTodos = filterTodos.filter((item) => {
            return item.isCompleted === false;
        })
    }

    filterTodos.forEach((todo) => {
        const li = document.createElement("li");

        li.innerHTML = `
                    <div class="todo-item">
                        <span class="checkbox ${todo.isCompleted ? "completed" : ""}">
                            <span class="check-icon">✓</span>
                        </span>
                        <span class="item-content ${todo.isCompleted ? "completed" : ""}" >${todo.task}</span>
                        <button class="del-btn">X</button>
                    </div>
        `
        list.appendChild(li);

        const delButton = li.querySelector(".del-btn");

        delButton.addEventListener("click", () => {
            console.log(delButton);
            todos = todos.filter((item) => {
                return todo.id !== item.id;
            })

            saveData();
            render();
            footerRender();
        })

        const checkbox = li.querySelector(".checkbox");

        checkbox.addEventListener("click", () => {
            console.log(checkbox);
            todos = todos.map((item) => {
                if(item.id === todo.id) {
                    return {
                        ...item,
                        isCompleted : !item.isCompleted
                    }
                }
                return item;
            })

            saveData();
            render();
            footerRender();
        })

    }) 

}

render();
footerRender();