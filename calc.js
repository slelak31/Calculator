function add (a, b) {
    return a + b;
}
function subtract (a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    if(b === 0) {
    impossibleMath = true;
    return "Cannot divide by zero"
    }
    else {
    return a / b;
    }
}

let firstNum = undefined;
let operator = undefined;
let secondNum = undefined;
let displayNum = '';
let secondNumActive = false;
let impossibleMath = false;

function operate (oper, num1, num2) {

    switch (oper) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

function handleDigit (chosenDigit) {
    if(displayNum === 0) {
        displayNum = '';
    }
    displayNum += chosenDigit
    display.textContent = displayNum;
}

function handleOperator (chosenOperator) {
    if(!secondNumActive) {
    firstNum = Number(displayNum);
    operator = chosenOperator;
    secondNumActive = true;
    displayNum = '';
    }
    else {
        secondNum = Number(displayNum);
        secondNumActive = false;
        handleSuccessiveOperatorEquals();
        operator = chosenOperator;
        secondNumActive = true;
        displayNum = '';
    }
}

function handleEquals () {
    if(displayNum === '') { /* handles +=, -= etc */
        secondNum = firstNum;
    }
    else {
    secondNum = Number(displayNum);
    }
    let result = operate(operator, firstNum, secondNum);
    if(!impossibleMath) {
    displayNum = result;
    display.textContent = result;
    firstNum = result;
    secondNumActive = false;
    }
    else {
    display.textContent = result;
    displayNum = '';
    firstNum = undefined;
    operator = undefined;
    secondNum = undefined;
    /*add functionality to make operator class buttons disabled*/
    }
}

function handleSuccessiveOperatorEquals () {
    let result = operate(operator, firstNum, secondNum);
    displayNum = result;
    display.textContent = result;
    firstNum = Number(displayNum);
    secondNumActive = false;
}

/*add different func for C vs CE*/
function handleClear () {
    secondNumActive = false;
    displayNum = '';
    firstNum = undefined;
    operator = undefined;
    secondNum = undefined;
    display.textContent = '0';
}



const buttons = document.querySelector(".buttons");
const display = document.querySelector(".digits");

buttons.addEventListener('click', (e) => {

    switch (e.target.innerText)  {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleDigit(e.target.innerText);
            break;
        
        case '+':
        case '-':
        case '*':
        case '÷':
        case '%':
            handleOperator(e.target.innerText);
            break;

        case '=':
            handleEquals();
            break;

        case 'CE':
        case 'C':
            handleClear();
            break;
    }
});