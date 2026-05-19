const input = document.querySelector(".todo-field");
const addButton = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

console.log(addButton);

let todos = JSON.parse(localStorage.getItem("todos")) || [];

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


function saveData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
    let filterTodos = todos;

    list.innerHTML = "";

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

        const checkbox = li.querySelector(".checkbox");

        
        checkbox.addEventListener("click", () => {
            console.log(checkbox);
            todos = todos.map((item) => {
                if(item.id == todo.id) {
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