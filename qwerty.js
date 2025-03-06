let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addToDoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let inputElement = document.getElementById("todoUserInput");
    let userInputValue = inputElement.value;

    if (userInputValue === "") {
        alert("Enter a valid task!");
        return;
    }

    let uniqueId = ++todoCount;
    let todo = { text: userInputValue, uniqueNo: uniqueId };
    
    todoList.push(todo);
    createAndAppendTodo(todo);
    inputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
}

function deleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let index = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
    if (index !== -1) {
        todoList.splice(index, 1);
    }
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };
    todoElement.appendChild(inputElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    todoElement.appendChild(labelElement);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodo(todoId);
    };
    todoElement.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
