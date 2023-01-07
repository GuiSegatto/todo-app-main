// Global Selectors
const ul = document.getElementById("todoList");
const li = document.querySelectorAll('li');
const removeBtn = document.getElementsByClassName("remove-button");

// Create a close button for each item in the list

for (i = 0; i < li.length; i++) {
    let crossIcon = document.createElement("img");
    crossIcon.src = "./images/icon-cross.svg";
    crossIcon.className = "remove-button";
    li[i].appendChild(crossIcon);
}

// Click on close button to remove the element from the list
for (i = 0; i < removeBtn.length; i++) {
    removeBtn[i].onclick = function () {
        let todo = this.parentElement;
        let wrapper = todo.parentElement;
        wrapper.remove();
        updateItems()
    }
}

// Create the check circle before the todo name
for (i = 0; i < li.length; i++) {
    let circle = document.createElement("div")
    circle.classList.add("circle")
    let wrapper = li[i].parentElement
    wrapper.insertBefore(circle, wrapper.firstChild)

}



// When press "enter" inside input execute newtodo function
document.getElementById('newItem').onkeydown = function (e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter' || keyCode == 'NumpadEnter') {
        newTodo();
        return false;
    }
}


// Create a new item and add it to the list
function newTodo() {
    let li = document.createElement("li")
    let wrapper = document.createElement("div")
    wrapper.classList.add('todo-wrapper')


    let inputValue = document.getElementById('newItem').value;

    let todo = document.createTextNode(inputValue);
    li.appendChild(todo);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        ul.appendChild(wrapper)
        wrapper.appendChild(li)
    }
    document.getElementById("newItem").value = "";

    // Create the check circle before the todo
    let circle = document.createElement("div")
    circle.classList.add("circle")
    wrapper.insertBefore(circle, wrapper.firstChild)




    // Create close button
    let crossIcon = document.createElement("img");
    crossIcon.src = "./images/icon-cross.svg";
    crossIcon.className = "remove-button";
    li.appendChild(crossIcon);

    for (i = 0; i < removeBtn.length; i++) {
        removeBtn[i].onclick = function () {
            let todo = this.parentElement;
            let wrapper = todo.parentElement;
            wrapper.remove();
            updateItems()
        }
    }
    updateItems()
}


// Click on close button to remove the element from the list



// Set the item as complete
ul.addEventListener('click', function (event) {
    if (event.target.tagName === "LI" && event.target.tagName !== "img") {
        event.target.classList.toggle('complete');

        let wrapper = event.target.parentNode;
        wrapper.childNodes[0].classList.toggle('checked');

        let checkIcon = document.createElement('div');
        checkIcon.classList.add('check-icon');

        toggleIcon()
        function toggleIcon() {
            if (event.target.classList.contains('complete')) {
                wrapper.childNodes[0].appendChild(checkIcon);
            } else {
                let icon = wrapper.childNodes[0].childNodes[0];
                wrapper.childNodes[0].removeChild(icon);
            }
        }
        updateItems()
    }

    else if (event.target.classList.contains("circle")) {
        event.target.classList.toggle('checked');
        let wrapper = event.target.parentNode;
        wrapper.childNodes[1].classList.toggle('complete');
        let checkIcon = document.createElement('div');
        checkIcon.classList.add('check-icon')
        wrapper.childNodes[0].appendChild(checkIcon)
        updateItems()
    }

    else if (event.target.classList.contains("check-icon")) {
        let circle = event.target.parentNode;
        let wrapper = circle.parentNode;
        wrapper.childNodes[1].classList.toggle('complete')
        circle.classList.toggle('checked')
        let icon = wrapper.childNodes[0].childNodes[0]
        wrapper.childNodes[0].removeChild(icon)
        updateItems()
    }



});


// Count how many items on the list are left
const completed = document.getElementById("todoList").getElementsByClassName("complete")
const total = document.getElementById("todoList").getElementsByTagName("li")

function countItemsLeft() {
    left = total.length - completed.length
    return left
}

function updateItems() {
    let itemsLeft = document.getElementById('itemsLeft')
    itemsLeft.innerText = countItemsLeft()
    countTodo()
}
updateItems()

// Looks like you have no todo on your list message
function countTodo() {
    let message = document.getElementById("noTodoMsg")
    let container = document.querySelector(".msg-container")
    if (total.length >= 1 && total.length !== 6) {
        container.style.display = "none"
        ul.removeAttribute("style")
    } else if (total.length === 6) {
        container.style.display = "none"
        ul.style.border = "0"
    }
    else {
        container.style.display = "flex"
        message.innerText = "Looks like your To Do List is Empty..."
        ul.removeAttribute("style")
    }
}

// Navigation in footer

const statusDiv = document.querySelector('#status')
statusDiv.addEventListener('change', function () {
    let value = document.querySelector('input[name="status"]:checked').value;
    if (value === 'completed') {
        for (const items of total) {
            let wrapper = items.parentNode
            wrapper.classList.remove('hide')
            if (!items.classList.contains('complete')) {
                wrapper.classList.add('hide')
            }
        }
    }
    else if (value === 'active') {
        for (const items of total) {
            let wrapper = items.parentNode
            wrapper.classList.remove('hide')
            if (items.classList.contains('complete')) {
                wrapper.classList.add('hide')
            }
        }
    } else {
        for (const items of total) {
            let wrapper = items.parentNode
            wrapper.classList.remove('hide')
        }
    }
})
