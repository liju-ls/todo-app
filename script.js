let todoList = [];
const addBtn = document.getElementById("add-btn");
const todoField = document.getElementById("new-todo");
const bottomContainer = document.getElementById("bottom-container");
const addedLists = bottomContainer.children;

retrieveLocalStorageData();
displayTodo();

// Generate random id for todo's

addBtn.addEventListener("click", () => {
  if (todoField.value != 0) {
    let index = Math.floor(Math.random() * 1000);
    todoList.push({ id: index, msg: todoField.value });
    todoField.value = null;
    displayTodo();
  }
});

function displayTodo() {
  if (addedLists.length < todoList.length) {
    for (i = addedLists.length; i < todoList.length; i++) {
      todoCreate(i);
      localStorageUpdate();
    }
  }
}

function todoCreate(i) {
  let wrapper = document.createElement("div");
  let content = document.createElement("input");

  let deleteBtn = document.createElement("button");
  let finishedBtn = document.createElement("input");

  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "X";

  finishedBtn.type = "checkbox";
  finishedBtn.className = "finished-btn";

  wrapper.className = `single-todo ${todoList[i].id}`;
  content.value = todoList[i].msg;
  content.className = "single-todo-content";
  wrapper.append(finishedBtn, content, deleteBtn);

  bottomContainer.appendChild(wrapper);

  deleteTodo(deleteBtn);
  updateTodoContent(content);
  markFinishedTodo(finishedBtn, content);
}

function deleteTodo(btn) {
  btn.addEventListener("click", (event) => {
    bottomContainer.removeChild(event.target.parentNode);
    todoList.forEach((todo, index) => {
      if (todo.id == event.target.parentNode.classList[1]) {
        todoList.splice(index, 1);
        localStorageUpdate();
      }
    });
  });
}

function updateTodoContent(contentField) {
  contentField.addEventListener("focusout", (event) => {
    todoList.forEach((todo) => {
      if (todo.id == contentField.parentNode.classList[1]) {
        todo.msg = contentField.value;
        localStorageUpdate();
      }
    });
  });
}

function markFinishedTodo(finishedCheckbox, content) {
  finishedCheckbox.addEventListener("click", (event) => {
    if (event.target.checked == true) {
      content.style.textDecoration = "line-through";
    } else {
      content.style.textDecoration = "none";
    }
  });
}

// upadte local storage

function localStorageUpdate() {
  localStorage.setItem("tasks", JSON.stringify(todoList));
}

function retrieveLocalStorageData() {
  if (localStorage["tasks"] != null) {
    todoList = JSON.parse(localStorage["tasks"]);
  }
}
