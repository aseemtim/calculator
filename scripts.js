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
let total;
let operator;
let operatorCounter=0;
let afterSplit;
let firstNumber;
let secondNumber;
let checkPosition;

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        // console.log(collectInput);
        //display input value and collect it in a string variable.
        if(button.className=='number'){
            total=null; //so that if the input is number after equals the display shows current input
            displayValue+=button.textContent;
            displayItems.textContent=displayValue;
            collectInput+=button.textContent;
        }
        //operators gives total if operatorCounter is more than 2
        if(button.className=='operators') {
            //total gets its value if the operatorCounter is 2 or the input is equals
            if(total){
                collectInput=total.toString(); //for storing total in collectInput if the input is operator after equals
            }
            if(typeof Number(collectInput[collectInput.length-1])=="number"){
                operatorCounter++;
                if(operatorCounter==2) {
                    total=splitAndOperate();
                    displayItems.textContent=total.toString();
                    operatorCounter--;
                    collectInput=total.toString();//store total in collectString when there is continous use of operators.
                    displayValue=""; //reset so that the number after an operator would not concat to the previous display value.
                }
                operator=button.id;
                collectInput+=operator;
                displayValue="";
            }
        }
        //equals calculates current info and displays it
        if(button.id=='equals') {
            if(collectInput){
                if(collectInput.includes(operator)){
                    if(typeof Number(collectInput[collectInput.length-1])=="number"){ //checks if the last value of array is number
                        if(collectInput.split(operator).pop()=="0"){ //pop() returs the popped item
                            displayItems.textContent="YUDoThis?:(";
                        }else{    
                        total=splitAndOperate();
                            displayItems.textContent=total.toString(); 
                            operatorCounter--;
                            displayValue="";
                            collectInput=""; 
                            console.log(typeof total);   
                        }
                    }
                }
            }   
        }
        //allclear resets everything
        if(button.id=='allclear'){
            collectInput="";
            operator=null;
            operatorCounter=null;
            afterSplit=null;
            checkPosition=null;
            total=null;
            displayValue="";
            displayItems.textContent="";
        }

        if(button.id=='backspace'){
            collectInput = collectInput.slice(0,collectInput.length-1);
            displayValue=collectInput.split(operator).pop();
            displayItems.textContent=displayValue;
        }

        //percent button should evaluate the percent value of the number and return it to the collectInput
        if(button.id=='percent'){
            if(collectInput){
                if(collectInput.includes(operator)){
                    console.log("true");
                    checkPosition = collectInput.split(operator);
                    if(checkPosition[1]!=""){
                        collectInput=checkPosition[0]+operator+(Number(checkPosition[1])/100).toString();
                    }
                }else{
                    collectInput=(Number(collectInput)/100).toString();
                }
            }
        } 

        console.log(operator,collectInput,afterSplit,checkPosition,total);
    })
});

