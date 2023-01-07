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
    }
}

// Create the check circle before the todo name
/* for (i = 0; i < todoList.length; i++) {
    circle = document.createElement("div");
    circle.className = "circle";
    li = todoList[i]
    divPai = li.parentElement
    divPai.insertBefore(circle, li)
} */


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
        }
    }
}


// Click on close button to remove the element from the list



// Set the item as complete
ul.addEventListener('click', function (event) {
    if (event.target.tagName === "LI" && event.target.tagName !== "img") {
        event.target.classList.toggle('complete');

        let wrapper = event.target.parentNode;
        wrapper.childNodes[0].classList.toggle('complete');

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
    }

    else if (event.target.classList.contains("circle")) {
        event.target.classList.toggle('complete');
        let wrapper = event.target.parentNode;
        wrapper.childNodes[1].classList.toggle('complete');
        let checkIcon = document.createElement('div');
        checkIcon.classList.add('check-icon')
        wrapper.childNodes[0].appendChild(checkIcon)
    }

    else if (event.target.classList.contains("check-icon")) {
        let circle = event.target.parentNode;
        let wrapper = circle.parentNode;
        wrapper.childNodes[1].classList.toggle('complete')
        circle.classList.toggle('complete')
        let icon = wrapper.childNodes[0].childNodes[0]
        wrapper.childNodes[0].removeChild(icon)
    }



}, false);


// Count how many items on the list are left
