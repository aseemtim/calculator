function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,a,b) {
    return operator(a,b);
}

function displayValue() {

}

let displayItems = document.querySelector('.displayItems');

let buttonValue;

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttonValue=button.textContent;
        displayItems.textContent=buttonValue;
    })
});
