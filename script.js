const todoValue = document.getElementById("inputText");
const todoAlert = document.getElementById("Element");
const listItems = document.getElementById("list-ideas");
const addUpdate = document.getElementById("AddUpdate");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

// Initialize the To-Do List
function initToDoList() {
  ReadToDoItems();
}

// Create a To-Do Item
function CreateToDoIdeas() {
  if (todoValue.value === "") {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
    return;
  }

  if (todo.some((item) => item.item === todoValue.value)) {
    setAlertMessage("This item already exists in the list!");
    return;
  }

  // Create the List Item
  const li = document.createElement("li");
  const todoItems = `
    <div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">
      ${todoValue.value}
    </div>
    <div>
      <img src="./images/pen.png" class="edit todo-controls" onclick="UpdateToDoItems(this)" />
      <img src="./images/trash.png" class="delete todo-controls" onclick="DeleteToDoItems(this)" />
    </div>`;
  li.innerHTML = todoItems;
  listItems.appendChild(li);

  // Update Local Storage
  todo.push({ item: todoValue.value, status: false });
  setLocalStorage();

  todoValue.value = "";
  setAlertMessage("Todo item created successfully!");
}

// Read To-Do Items from Local Storage
function ReadToDoItems() {
  listItems.innerHTML = ""; // Clear existing list
  todo.forEach((element) => {
    const li = document.createElement("li");
    const style = element.status ? "style='text-decoration: line-through'" : "";
    const todoItems = `
      <div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">
        ${element.item}
        ${element.status ? '<img class="todo-controls" src="./images/check.png" />' : ""}
      </div>
      <div>
        ${element.status ? "" : '<img class="edit todo-controls" src="./images/pen.png" onclick="UpdateToDoItems(this)" />'}
        <img class="delete todo-controls" src="./images/trash.png" onclick="DeleteToDoItems(this)" />
      </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

// Update a To-Do Item
function UpdateToDoItems(e) {
  const itemText = e.parentElement.parentElement.querySelector("div").innerText;
  todoValue.value = itemText.trim();
  updateText = e.parentElement.parentElement.querySelector("div");
  addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
  addUpdate.setAttribute("src", "./images/refresh.png");
  todoValue.focus();
}

// Apply Updates to a Selected To-Do Item
function UpdateOnSelectionItems() {
  if (todo.some((item) => item.item === todoValue.value)) {
    setAlertMessage("This item already exists in the list!");
    return;
  }

  todo.forEach((item) => {
    if (item.item === updateText.innerText.trim()) {
      item.item = todoValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoIdeas()");
  addUpdate.setAttribute("src", "./images/add.png");
  todoValue.value = "";
  setAlertMessage("Todo item updated successfully!");
}

// Delete a To-Do Item
function DeleteToDoItems(e) {
  const deleteValue = e.parentElement.parentElement.querySelector("div").innerText.trim();

  if (confirm(`Are you sure you want to delete "${deleteValue}"?`)) {
    e.parentElement.parentElement.classList.add("deleted-item");

    todo = todo.filter((item) => item.item !== deleteValue);
    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}

// Mark To-Do Item as Completed
function CompletedToDoItems(e) {
  const itemDiv = e.parentElement.querySelector("div");
  if (itemDiv.style.textDecoration === "") {
    itemDiv.style.textDecoration = "line-through";

    const img = document.createElement("img");
    img.src = "./images/check.png";
    img.className = "todo-controls";
    itemDiv.appendChild(img);

    e.parentElement.querySelector("img.edit")?.remove();

    todo.forEach((item) => {
      if (item.item === itemDiv.innerText.trim()) {
        item.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item marked as completed!");
  }
}

// Utility: Update Local Storage
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

// Utility: Display Alert Messages
function setAlertMessage(message) {
  todoAlert.classList.remove("toggleMe");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}

// Initialize the To-Do List
initToDoList();



// // IEFE
// (() => {
//     // state variables
//     let toDoListArray = [];
//     // ui variables
//     const form = document.querySelector(".form");
//     const input = form.querySelector(".form__input");
//     const ul = document.querySelector(".toDoList");
  
//     // event listeners
//     form.addEventListener('submit', e => {
//       // prevent default behaviour - Page reload
//       e.preventDefault();
//       // give item a unique ID
//       let itemId = String(Date.now());
//       // get/assign input value
//       let toDoItem = input.value;
//       //pass ID and item into functions
//       addItemToDOM(itemId , toDoItem);
//       addItemToArray(itemId, toDoItem);
//       // clear the input box. (this is default behaviour but we got rid of that)
//       input.value = '';
//     });
  
//     ul.addEventListener('click', e => {
//       let id = e.target.getAttribute('data-id')
//       if (!id) return // user clicked in something else
//       //pass id through to functions
//       removeItemFromDOM(id);
//       removeItemFromArray(id);
//     });
  
//     // functions
//     function addItemToDOM(itemId, toDoItem) {
//       // create an li
//       const li = document.createElement('li')
//       li.setAttribute("data-id", itemId);
//       // add toDoItem text to li
//       li.innerText = toDoItem
//       // add li to the DOM
//       ul.appendChild(li);
//     }
  
//     function addItemToArray(itemId, toDoItem) {
//       // add item to array as an object with an ID so we can find and delete it later
//       toDoListArray.push({ itemId, toDoItem});
//       console.log(toDoListArray)
//     }
  
//     function removeItemFromDOM(id) {
//       // get the list item by data ID
//       var li = document.querySelector('[data-id="' + id + '"]');
//       // remove list item
//       ul.removeChild(li);
//     }
  
//     function removeItemFromArray(id) {
//       // create a new toDoListArray with all li's that don't match the ID
//       toDoListArray = toDoListArray.filter(item => item.itemId !== id);
//       console.log(toDoListArray);
//     }
  
//   })();