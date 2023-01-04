

// Create a close button for each item in the list
const todoList = document.querySelectorAll('li')

for (i = 0; i < todoList.length; i++) {
    let crossIcon = document.createElement("img");
    crossIcon.src = "./images/icon-cross.svg";
    crossIcon.className = "remove-button";
    todoList[i].appendChild(crossIcon);
}

// Click on close button to remove the element from the list
const removeBtn = document.getElementsByClassName("remove-button");

for (i = 0; i < removeBtn.length; i++) {
    removeBtn[i].onclick = function() {
        let todo = this.parentElement;
        todo.remove();
  }
}
