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

function operate (oper, num1, num2) {

    switch (oper) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '÷':
            divide(num1, num2);
            break;
    }
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
            displayNum += e.target.innerText
            display.textContent = displayNum;
            break;
        

        case '+':
            oper(e.target.innerText,)
            break;
        case '-':
            console.log(add(6, 5));
            break;
        case '*':
            console.log(add(7, 5));
            break;
        case '÷':
            console.log(add(8, 5));
            break;
    }
});