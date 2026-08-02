// Exercise 24

const All = document.querySelector('.List');

function addItem () {

    const addedItem = document.createElement('li');

    addedItem.textContent = 'Add New Item'

    All.appendChild(addedItem)
};

function removeItem () {
    if (All.lastChild) {
        All.removeChild(All.lastChild)
    } else {
        alert(`Stop Bruh!`)
    }
}