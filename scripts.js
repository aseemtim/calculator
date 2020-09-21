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

function getCollectInputAndDisplay(button){
    total=null; //so that if the input is number after equals the display shows current input

    displayValue+=button.textContent;

    //halts collectInput if the entered numbers exceed 11
    if(displayValue.length>11){ 
        displayValue=displayValue.slice(0,11);
    }else{
        displayItems.textContent=displayValue;
        collectInput+=button.textContent;
    }
}

function getOperator(button){
    //total gets its value if the operatorCounter is 2 or the input is equals
    if(total){
        collectInput=total.toString(); //for storing total in collectInput if the input is operator after equals
    }
    if(typeof Number(collectInput[collectInput.length-1])=="number"){
        operatorCounter++;
        if(operatorCounter==2) {
            total=splitAndOperate();
            checkOverflow();
            displayItems.textContent=total;
            operatorCounter--;
            collectInput=total.toString();//store total in collectString when there is continous use of operators.
            displayValue=""; //reset so that the number after an operator would not concat to the previous display value.
        }
        operator=button.id;
        collectInput+=operator;
        displayValue="";
    }
}

function getEquals(button){
    if(collectInput){
        if(collectInput.includes(operator)){
            if(typeof Number(collectInput[collectInput.length-1])=="number"){ //checks if the last value of array is number
                if(collectInput.split(operator).pop()=="0"){ //pop() returns the popped item
                    displayItems.textContent="YUDoThis?:(";
                }else{    
                    total=splitAndOperate();
                    console.log("inside equals");
                    checkOverflow();
                    displayItems.textContent=total; 
                    operatorCounter--;
                    displayValue="";
                    collectInput="";
                    operrator="";    
                }
            }
        }
    }   
}

function clearAll(button){
    collectInput="";
    operator=null;
    operatorCounter=null;
    afterSplit=null;
    checkPosition=null;
    total=null;
    displayValue="";
    displayItems.textContent="";
}

function clearSingleNumber(){
    //only works on collectInput not on total
    if(collectInput!=""){
        collectInput = collectInput.slice(0,collectInput.length-1);
        displayValue=collectInput.split(operator).pop();
        displayItems.textContent=displayValue;
    }    
}

function getPercent(){
    //if the button is pressed after displaying total then work on that total
    if(total){ 
        if(displayItems.textContent==total.toString()){
            total=(total/100);
            checkOverflow();
            displayItems.textContent=total;
        }
    } 
    if(collectInput){
        if(collectInput.includes(operator)){
            checkPosition = collectInput.split(operator);
            if(checkPosition[1]!=""){
                collectInput=checkPosition[0]+operator+(Number(checkPosition[1])/100).toString();
                displayItems.textContent=Number(checkPosition[1]/100).toPrecision(2);
            }
        }else{
            collectInput=(Number(collectInput)/100).toPrecision(2);//toPrecision auto converts number to string
            displayItems.textContent=collectInput;
        }
    }
}

function splitAndOperate(){
    afterSplit = collectInput.split(operator);
    firstNumber=Number(afterSplit[0].toString());
    secondNumber=Number(afterSplit[1].toString());
    return operate(operator,firstNumber,secondNumber);
}

function checkOverflow(){
    if(total.toString().length>11){
        total = (total.toPrecision(2));
    }
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
        if(button.className=='number'){
            //display input value and collect it in a string variable.
            getCollectInputAndDisplay(button);
        }
        
        if(button.className=='operators') {
            //operators gives total if operatorCounter is more than 2
            getOperator(button);
        }
        
        if(button.id=='equals') {
            //equals calculates current info and displays it
            getEquals(button);
        }
        
        if(button.id=='allclear'){
            //allclear resets everything
            clearAll();
        }

        if(button.id=='backspace'){
            clearSingleNumber();
        }
    
        if(button.id=='percent'){
            //percent button should evaluate the percent value of the number and return it to the collectInput
            getPercent();
        } 

        
        
        console.log(operator,collectInput,afterSplit,checkPosition,total);
    })
});

window.addEventListener('keydown', function(e){
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`);

    if(!key){
        return ;
    }
    
    if(key.className=='number'){
        //display input value and collect it in a string variable.
        getCollectInputAndDisplay(key);
    }
    
    if(key.className=='operators') {
        //operators gives total if operatorCounter is more than 2
        getOperator(key);
    }
    
    if(key.id=='equals') {
        //equals calculates current info and displays it
        getEquals(key);
    }
    
    if(key.id=='allclear'){
        //allclear resets everything
        clearAll();
    }

    if(key.id=='backspace'){
        clearSingleNumber();
    }

    if(key.id=='percent'){
        //percent button should evaluate the percent value of the number and return it to the collectInput
        getPercent();
    } 
    console.log(operator,collectInput,afterSplit,checkPosition,total);
})

