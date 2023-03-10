const list = document.getElementById("todoList");
const items = document.getElementsByTagName('li');
const draggableItem = document.querySelectorAll('li')
const textInput = document.getElementById('newItem');
const completed = document.getElementById("todoList").getElementsByClassName("complete")
const total = document.getElementById("todoList").getElementsByTagName("li")
const itemsLeft = document.querySelectorAll('.items-left')
const emptyMessage = document.getElementById("noTodoMsg")
const messageContainer = document.querySelector(".msg-container")
const statusNav = document.querySelectorAll('nav')
const clearButton = document.querySelectorAll(".clear-button")
const nightModeButton = document.getElementById('lightDarkMode');
const body = document.querySelector('body');

// Values
const EMPTY_STRING = ''
const EMPTY = 0
const ITEM_TEXT = 'LI'
const REMOVE_BUTTON = 'IMG'
const CLASS_COMPLETED = 'complete'
const CIRCLE = '0'
const CHECKED_ICON = 'div'
const WRAPPER = '0'
const ICON = '0'
const TODO_TEXT = '1'


// Locations
const CHECKBOX = 'circle'
const ACTIVE_CHECKBOX = 'check-icon'

// classes
const CLASS_WRAPPER = 'todo-wrapper'
const CLASS_CIRCLE = 'circle'
const removeButton = 'remove-button'
const BACKGROUND = 'checked'
const CLASS_CHECK_ICON = 'check-icon'
const CLASS_HIDE = 'hide'
const CLASS_LIGHT = 'light'
const CLASS_DARK = 'dark'
const CLASS_DRAGGING = 'dragging'




// When press "enter" inside input execute 
document.getElementById('newItem').onkeydown = function (e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter' || keyCode == 'NumpadEnter') {
        createNewTodo();
    }
}


// Create a new item and add it to the list
function createNewTodo() {
    const newItem = document.createElement("li")
    const newWrapper = document.createElement("div")
    let newTodoText = document.createTextNode(textInput.value);
    newWrapper.classList.add(CLASS_WRAPPER)
    newItem.appendChild(newTodoText);

    if (textInput.value.length === EMPTY) {
        alert("You must write something!");
        return;
    } else {
        newWrapper.appendChild(newItem)
        list.appendChild(newWrapper)
    }
    textInput.value = EMPTY_STRING;

    addCheckCircle(newWrapper);
    addRemoveButton(newItem);
    getRemoveButtons();
    updateItemsLeft()
}

function addCheckCircle(newWrapper) {
    const newCheckBox = document.createElement("div")
    newCheckBox.classList.add(CLASS_CIRCLE)
    newWrapper.insertBefore(newCheckBox, newWrapper.firstChild)
}

function addRemoveButton(newItem) {
    const newRemoveButton = document.createElement("img");
    newRemoveButton.src = "./images/icon-cross.svg";
    newRemoveButton.className = removeButton;
    newItem.appendChild(newRemoveButton);
}

function getRemoveButtons() {
    const buttonList = document.getElementsByClassName(removeButton);
    for (i = 0; i < buttonList.length; i++) {
        buttonList[i].onclick = function () {
            removeTodo(this)
        }
    }
};

function removeTodo(item) {
    let wrapper = item.parentElement.parentElement;
    wrapper.remove();
};



// Set the item as complete
list.addEventListener('click', function (event) {
    let wrapper = event.target.parentNode;

    if (event.target.tagName === ITEM_TEXT && event.target.tagName !== REMOVE_BUTTON) {
        event.target.classList.toggle(CLASS_COMPLETED);

        wrapper.childNodes[CIRCLE].classList.toggle(BACKGROUND);

        let checkIcon = createIcon()


        if (event.target.classList.contains(CLASS_COMPLETED)) {
            wrapper.childNodes[CIRCLE].appendChild(checkIcon);
        } else {
            let icon = wrapper.childNodes[CIRCLE].childNodes[ICON];
            wrapper.childNodes[CIRCLE].removeChild(icon);
        }
    }

    else if (event.target.classList.contains(CHECKBOX)) {
        let checkIcon = createIcon()

        event.target.classList.toggle(BACKGROUND);
        wrapper.childNodes[TODO_TEXT].classList.toggle(CLASS_COMPLETED);
        wrapper.childNodes[CIRCLE].appendChild(checkIcon)
    }

    else if (event.target.classList.contains(ACTIVE_CHECKBOX)) {
        let circle = event.target.parentNode;
        circle.classList.toggle(BACKGROUND)

        let wrapper = circle.parentNode;
        wrapper.childNodes[TODO_TEXT].classList.toggle(CLASS_COMPLETED)


        let icon = wrapper.childNodes[CIRCLE].childNodes[ICON]
        wrapper.childNodes[CIRCLE].removeChild(icon)
    }

    function createIcon() {
        let checkIcon = document.createElement(CHECKED_ICON);
        checkIcon.classList.add(CLASS_CHECK_ICON);
        return checkIcon
    }

    updateItemsLeft()
    updateNav()
});

function updateItemsLeft() {
    const HIDE_MESSAGE = "none"
    const SHOW_MESSAGE = "flex"
    const HIDE_BORDER = '0'
    const SHOW_BORDER = 'style'
    const MINIMUM_SIZE = 1
    const MAXIMUM_SIZE = 6
    const EMPTY = 0

    if (items.length >= MINIMUM_SIZE && items.length < MAXIMUM_SIZE) {
        contentToggle(HIDE_MESSAGE, SHOW_BORDER)

    } else if (items.length === EMPTY) {
        emptyMessage.innerText = "Looks like your To Do List is Empty..."
        contentToggle(SHOW_MESSAGE, SHOW_BORDER)
    }
    else {
        contentToggle(HIDE_MESSAGE, HIDE_BORDER)
    }

    function contentToggle(message, border) {
        messageContainer.style.display = message
        if (border === SHOW_BORDER)
            list.removeAttribute(border)
        else if (border === HIDE_BORDER) {
            list.style.border = border;
        }
    }

    itemsLeft.forEach(item => {
        item.innerText = items.length - completed.length
    })
}

// Navigation in footer
statusNav.forEach(item => { item.addEventListener('change', updateNav)})

function updateNav() {
    let selectedValue = document.querySelector('input[name="status"]:checked').value;
    for (const item of items) {
        let wrapper = item.parentNode
        if (selectedValue === 'completed') {
            wrapper.classList.remove(CLASS_HIDE)
            if (!item.classList.contains(CLASS_COMPLETED)) {
                wrapper.classList.add(CLASS_HIDE)
            }

        }
        else if (selectedValue === 'active') {
            wrapper.classList.remove(CLASS_HIDE)
            if (item.classList.contains(CLASS_COMPLETED)) {
                wrapper.classList.add(CLASS_HIDE)

            }
        } else {
            wrapper.classList.remove(CLASS_HIDE)
        }
    }
}

// Clear all todos button
clearButton.forEach(item => { item.addEventListener('click', clearAll)})

function clearAll() {
    areYouSure = window.confirm("Are you sure you wanna clear your completed todos?");
    if (areYouSure === true)
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].classList.contains(CLASS_COMPLETED)) {
                items[i].parentNode.remove();
            }
        }
}


// Light And Dark Mode
nightModeButton.addEventListener('click', toggleMode);

function toggleMode() {
    if (body.classList.contains(CLASS_LIGHT)) {
        body.classList.remove(CLASS_LIGHT);
        body.classList.add(CLASS_DARK);
        nightModeButton.src = ("./images/icon-sun.svg");
    } else if (body.classList.contains(CLASS_DARK)) {
        body.classList.remove(CLASS_DARK);
        body.classList.add(CLASS_LIGHT);
        nightModeButton.src = ("./images/icon-moon.svg");
    }
}

// Drag and Drop
list.addEventListener("dragover", dragOver)
document.addEventListener("dragstart", dragStarted)
document.addEventListener("dragend", dragEnded)

function dragStarted(e) {
    let emptyImg = new Image()
    e.dataTransfer.setDragImage(emptyImg, 0, 0)
    e.target.classList.add(CLASS_DRAGGING);
};

function dragEnded(e) {
    e.target.classList.remove(CLASS_DRAGGING);
};

function dragOver(e) {
    e.preventDefault()
    const draggingElement = document.querySelector('.' + CLASS_DRAGGING);
    const applyAfter = getNewPosition(e.clientY)

    if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", draggingElement);
    }
    else {
        list.prepend(draggingElement)
    }
};

function getNewPosition(posY) {
    const items = list.querySelectorAll(".todo-wrapper:not(.dragging)");
    let result;

    for (let item of items) {
        const container = item.getBoundingClientRect();
        const containerCenterY = container.y + container.height / 2;
        if (posY >= containerCenterY) result = item;
    }
    return result;
};

updateItemsLeft()
getRemoveButtons() 