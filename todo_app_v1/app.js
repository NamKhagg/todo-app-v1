console.log("JS LOADED");

const input = document.querySelector(".todo-field");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

const filterList = document.querySelectorAll("span");
const allFilterButton = document.querySelector(".all");
const inProgressButton = document.querySelector(".in-progress");
const doneFilter = document.querySelector(".done");

const searchTask = document.querySelector(".search-field");
const searchIcon = document.querySelector(".search-icon");

const markAllAsDoneButton = document.querySelector(".mark-all-as-done-button")

const totalTask = document.querySelector(".total-number");
const inProgressTask = document.querySelector(".inProgress-number");
const doneTask = document.querySelector(".done-number");
const progressPercent = document.querySelector(".progress-percent");
const progressFill = document.querySelector(".progress-fill");

const footer = document.querySelector(".todo-footer");
const taskCount = document.querySelector(".task-count");
const taskRemainsContent = document.querySelector(".task-remains-content");

const deleteAllTaskDone = document.querySelector(".delete-all-done");
const toastMessege = document.querySelector(".toast-mess");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let filterStatus = "all";
let flat;
let searchValue = "";

allFilterButton.classList.add("active");

function renderStat() {
    const totalTaskNumber = todos.length;
    totalTask.textContent = `${totalTaskNumber}`;

    const inProgressNumber = todos.filter((item) => {
        return item.isCompleted === false;
    })
    inProgressTask.textContent = `${inProgressNumber.length}`;

    const doneNumber = todos.filter((item) => {
        return item.isCompleted === true;
    })
    doneTask.textContent = `${doneNumber.length}`;

    const progress = totalTask === 0 ? 0 : Math.round((doneNumber.length / totalTaskNumber) * 100);

    progressPercent.textContent = `${progress}%`;
    progressFill.style.width =  `${progress}%e`;


}


function addTask() {
    //console.log("add from:", source);
    const data = input.value.trim();
    
    if (data === "") 
        return;

    todos.push({
        id : Date.now(),
        task : data,
        isCompleted : false
    })

    saveData();
    renderStat();
    render();
    footerRender();
    showToast();

    input.value = "";
}
console.log(input);
addButton.addEventListener("click", addTask)

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !e.repeat) {
        e.preventDefault();
        addTask();
    }
})

allFilterButton.addEventListener("click", () => {
    filterStatus = "all";
    updateData(allFilterButton);

    renderStat();
    render();

    footerRender();
})

searchTask.addEventListener("input", () => {
    searchValue = searchTask.value.toLowerCase().trim();

    render();
})

searchIcon.addEventListener("click", () => {
    searchValue = searchTask.value.toLowerCase().trim();

    render();
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


markAllAsDoneButton.addEventListener("click", () => {
    let count = 0;
    todos.forEach((item) => {
        if (item.isCompleted === false) {
            count++;
        } 
    })

    if (count === 0) {
        flat = false;
    } else  {
        flat = true;
    }

    console.log(flat);

    if (flat === true) {
        todos = todos.map((item) => {
            return {
                ...item,
                isCompleted : true
            }
        })
        flat = false;
    } else if (flat === false){
        todos = todos.map((item) => {
            return {
                ...item,
                isCompleted : false
            }
        })
        flat = true;
    }

    saveData();
    renderStat();
    render();
    footerRender();

    console.log("now", flat);
})

deleteAllTaskDone.addEventListener("click", () => {
    todos = todos.filter((item) => {
        return item.isCompleted === false;
    })

    saveData();
    renderStat();
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

    if (searchValue !== "") {
        filterTodos = filterTodos.filter((item) => {
            return item.task.includes(searchValue);
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
            renderStat()
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
            renderStat()
            render();
            footerRender();
        })

    }) 

}
    
renderStat();
render();
footerRender();