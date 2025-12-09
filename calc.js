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
    return "Cannot divide by 0"
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
let currentDisplayFontSize = 50;

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".digits");
const oper = document.querySelectorAll(".operator");

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
    if(displayNum.length >= 16) {
        return;
    }
    displayNum += chosenDigit
    drawDisplay(displayNum);
}

/*FIX BUG WHERE SELECTING OPERATOR TWICE IN A ROW WILL BREAK THINGS (IT MAKES 0 THE SECOND NUM, SO ADD AND MINUS SEEM FINE BUT * AND / ARE BROKEN)*/
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
    drawDisplay(result);
    firstNum = result;
    secondNumActive = false;
    }
    else {
    drawDisplay(result);
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
    result;
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
    impossibleMath = false;
    currentDisplayFontSize = 50;
    display.textContent = '0';
    display.style.fontSize = currentDisplayFontSize;
}

function handlebackspace () {
    displayNum = displayNum.slice(0, -1);
    drawDisplay(displayNum) || '0';
}

/*FIX re-enable buttons after / by 0 message*/
function drawDisplay (displayNum) {
    if(!impossibleMath) {
    let formattedDisplayNum = displayNum.toString();
    let tempArray = [];
    let negSign = '';
    let decimalNums = '';
    if(formattedDisplayNum.substring(0, 1) == '-') { //remove negative sign
        formattedDisplayNum = formattedDisplayNum.substring(1);
        negSign = '-';
    }

    if(formattedDisplayNum.includes(".")) {
        const decimalSplitarray = formattedDisplayNum.split(".");
        formattedDisplayNum = decimalSplitarray[0];
        decimalNums = '.' + decimalSplitarray[1];
    }

    while (formattedDisplayNum.length >= 3) {
        tempArray.push(formattedDisplayNum.substring(formattedDisplayNum.length - 3));
       formattedDisplayNum = formattedDisplayNum.slice(0, formattedDisplayNum.length - 3);
    }
    if(formattedDisplayNum.length >= 1) {
    tempArray.push(formattedDisplayNum);
    }
    tempArray.reverse();
    display.textContent = (negSign + tempArray.join(',') + decimalNums);
    }
    else {
        display.textContent = displayNum;
        oper.forEach(button => {
            button.disabled = true;
        });
        
    }   
    //round result after operation to less than 16 digits
    if(display.scrollWidth > 375) {
        currentDisplayFontSize -= 3;
        display.style.fontSize = `${currentDisplayFontSize}px`;
    }
    else if (display.scrollWidth < 350 && currentDisplayFontSize < 50) {
        currentDisplayFontSize += 3;
        display.style.fontSize = `${currentDisplayFontSize}px`;
    }
}

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

        case 'backspc':
            handlebackspace();
            break;
    }
});