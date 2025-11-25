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
    return a / b;
}

let firstNum = undefined;
let operator = undefined;
let secondNum = undefined;
let displayNum = '';
let secondNumActive = false;

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
        handleEquals();
    }
}

function handleEquals () {
    secondNum = Number(displayNum);
    let result = operate(operator, firstNum, secondNum);
    displayNum = result;
    display.textContent = result;
}

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

        case 'CE':
        case 'C':
            handleClear();
    }
});