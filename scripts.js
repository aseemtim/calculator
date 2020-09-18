function sum(a,b) {
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

function operate(calculate,a,b) {
    if(calculate=="add"){
        return sum(a,b)
    }
    if(calculate=="subtract"){
        return subtract(a,b)
    }
    if(calculate=="multiply"){
        return multiply(a,b)
    }
    if(calculate=="divide"){
        return divide(a,b)
    }
}


let displayItems = document.querySelector('.displayItems');

let displayValue="";
let collectInput="";
let total=0;
let operator;
let operatorCounter=0;
let afterSplit;
let firstNumber;
let secondNumber;

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        // console.log(collectInput);
        if(button.className=='number'){
            displayValue+=button.textContent;
            displayItems.textContent=displayValue;
            collectInput+=button.textContent;
        }

        if(button.className=='operators') {
            operator=button.id;
            collectInput+=operator;
            displayValue="";
            operatorCounter++;
        }
        afterSplit = collectInput.split(operator);
        if(afterSplit[1]&&!afterSplit[2]) {
            firstNumber=Number(afterSplit[0].toString());
            secondNumber=Number(afterSplit[1].toString());
            total=operate(operator,firstNumber,secondNumber);
            operatorCounter=0;
        }
        
        console.log(operatorCounter,firstNumber,secondNumber,total);
    })
});


//1.display input on the screen.
    //show input until operator is pressed
//2.operator should not be shown.
//3.After operator is pressed next input should be shown.
//4.Equals should return the answer.