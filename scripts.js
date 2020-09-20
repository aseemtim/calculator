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

function splitAndOperate(){
    afterSplit = collectInput.split(operator);
    firstNumber=Number(afterSplit[0].toString());
    secondNumber=Number(afterSplit[1].toString());
    return operate(operator,firstNumber,secondNumber);
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
            console.log(typeof Number(collectInput[collectInput.length-1]))
            if(typeof Number(collectInput[collectInput.length-1])=="number"){
                operatorCounter++;
                if(operatorCounter==2) {
                    total=splitAndOperate();
                    displayItems.textContent=total;
                    operatorCounter--;
                    collectInput=total.toString();
                    displayValue="";
                }
                operator=button.id;
                collectInput+=operator;
                displayValue="";
            }
        }

        if(button.id=='equals') {
            if(typeof Number(collectInput[collectInput.length-1])=="number"){
                total=splitAndOperate();
                displayItems.textContent=total; 
                collectInput=total.toString();
                operatorCounter--;
                
            }   
        }

        if(button.id=='allclear'){
            collectInput="";
            operator="";
            operatorCounter=0;
            displayValue="";
            displayItems.textContent="";
        }

        console.log(operator,collectInput,afterSplit,total);
    })
});

