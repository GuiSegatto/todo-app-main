

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
    removeBtn[i].onclick = function () {
        let todo = this.parentElement;
        let wrapper = todo.parentElement;
        wrapper.remove();
    }
}

// Create the check circle before the todo name
for (i = 0; i < todoList.length; i++) {
    circle = document.createElement("div");
    circle.className = "circle";
    li = todoList[i]
    divPai = li.parentElement
    divPai.insertBefore(circle, li)
}

// Toggle checked mark
const list = document.querySelector("ul");

list.addEventListener('click', function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle('checked');
        let wrapper = event.target.parentNode
        wrapper.childNodes[1].classList.toggle('checked');
        let checkIcon = document.createElement('div');
        checkIcon.classList.add('check-icon')

        toggleIcon()
        function toggleIcon() {
            if (event.target.classList.contains('checked')) {
                wrapper.childNodes[1].appendChild(checkIcon)
            } else {
                let icon = wrapper.childNodes[1].childNodes[0]
                wrapper.childNodes[1].removeChild(icon)
            }
        }
    }
    else if (event.target.classList.contains("circle")) {
        event.target.classList.toggle('checked');
        let wrapper = event.target.parentNode
        wrapper.childNodes[2].classList.toggle('checked');

        let checkIcon = document.createElement('div');
        checkIcon.classList.add('check-icon')
        wrapper.childNodes[1].appendChild(checkIcon)
    }
    else if (event.target.classList.contains("check-icon")) {
        let circle = event.target.parentNode
        let wrapper = circle.parentNode
        wrapper.childNodes[2].classList.toggle('checked');
        circle.classList.toggle('checked')
        let icon = wrapper.childNodes[1].childNodes[0]
        wrapper.childNodes[1].removeChild(icon)
    }
}, false);


// Create a new item and add it to the list


