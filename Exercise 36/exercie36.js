// Exercise 36

const chooseColor = document.querySelector('#chooseColor');

const colorPreview = document.querySelector('#colorPreview');
const colorHistory = document.querySelector('#colorHistory');
const colorHistoryButton = document.querySelector('#clearHistoryButton');

chooseColor.addEventListener('input', function() {
    const selectedColor = chooseColor.value;
    colorPreview.style.backgroundColor = selectedColor;
    addColorHistory(selectedColor);
});

function addColorHistory (add) {
    const li = document.createElement('li');
    li.textContent = add;
    li.style.color = add;

    colorHistory.appendChild(li);
};

colorHistoryButton.addEventListener('click', function () {
    colorHistory.textContent = "";
})