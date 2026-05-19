const input = document.querySelector(".todo-field");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

const filterList = document.querySelectorAll("span");
const allFilterButton = document.querySelector(".all");
const inProgressButton = document.querySelector(".in-progress");
const doneFilter = document.querySelector(".done");

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
})

doneFilter.addEventListener("click", () => {
    filterStatus = "done";
    updateData(doneFilter);

    render();
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

function render() {
    let filterTodos = todos;

    list.innerHTML = "";

    if (filterStatus === "done") {
        filterTodos = filterTodos.filter((item) => {
            return item.isCompleted === true;
        })
    }

    filterTodos.forEach((todo) => {
        const li = document.createElement("li");

        li.innerHTML = `
                    <div class="todo-item">
                        <span class="checkbox ${todo.isCompleted ? "completed" : ""}"></span>
                        <span class="item-content">${todo.task}</span>
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
        })

    }) 
}

render();