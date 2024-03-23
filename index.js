const unaryOperators = ['+/-', '%'];
const binaryOperators = ['+', '-', '*', '/'];
const screen = document.querySelector('.screen');
screen.textContent = '0';

const currentDigits = [];
const currentOperators = [];
let result = '0';
let currentValue = '0';

function unaryCalculate(a, operator) {
    if (operator == '+/-') { return (-a); }
    else if (operator == '%') { return (a / 100); }
}

function binaryCalculate(a, operator, b) {
    if (operator == '+') { return (a + b); }
    else if (operator == '-') { return (a - b); }
    else if (operator == '*') { return (a * b); }
    else if (operator == '/') { return (b !== 0 ? a / b : NaN); }
}

function showResult(x) {
    const absoluteValue = x >= 0 ? x : -x;
    const absoluteString = absoluteValue.toString();
    const position = absoluteString.indexOf('.');
    let numString = '';
    let part = [];
    if (absoluteValue >= 1000000000 || position >= 0 && absoluteValue < 0.000001) {
        numString = absoluteValue.toExponential();
        part = numString.split('e');
        if (part[0].length > 7) {
            part[0] = Number(part[0]).toFixed(5);
            numString = part.join('e');
        }
    }
    else if (position >= 0 && absoluteString.length > 11) {
        part = absoluteString.split('.');
        numString = Number(absoluteString).toFixed(10 - part[0].length);
    }
    else { numString = absoluteString; }
    return (!(absoluteValue == x) ? '-' + numString : numString);
}

document.querySelector('.calculator').addEventListener('click', event => {
    const value = event.target.value;
    if (value >= '0' && value <= '9') {
        if (currentDigits.length == 1 && currentDigits[0] == '0') { currentDigits[0] = value; }
        else if (currentDigits.length < 9 && !currentDigits.includes('.') || currentDigits.length < 11 && currentDigits.includes('.')) { currentDigits.push(value); }
        screen.textContent = currentDigits.join('');
    }
    else if (value == '.' && !currentDigits.includes('.')) {
        if (currentDigits.length == 0) {
            currentDigits.push('0', value);
            screen.textContent = '0.';
        }
        else {
            currentDigits.push(value);
            screen.textContent += '.';
        }
    }
    else if (value == 'del' && currentDigits[0]) {
        currentDigits.pop();
        if (!currentDigits[0]) { currentDigits[0] = '0'; }
        screen.textContent = currentDigits.join('');
    }
    else if (value == 'clear') {
        currentValue = '0';
        screen.textContent = '0';
        currentDigits.length = 0;
        currentOperators.length = 0;
        result = '0';
    }
    else if (unaryOperators.includes(value)) {
        if (currentDigits.length > 0) {
            currentValue = Number(currentDigits.join(''));
            currentDigits.length = 0;
        }
        else if (currentValue === '0') {
            currentValue = result;
            currentOperators.length = 0;
        }
        currentValue = unaryCalculate(currentValue, value);
        screen.textContent = showResult(currentValue);
    }
    else if (binaryOperators.includes(value)) {
        if (currentDigits.length > 0) {
            currentValue = Number(currentDigits.join(''));
            if (currentOperators.length > 0) { result = binaryCalculate(result, currentOperators[currentOperators.length - 1], currentValue); }
            else { result = currentValue; }
            screen.textContent = showResult(result);
            currentValue = '0';
            currentDigits.length = 0;
        }
        else if (!(currentValue === '0')) {
            if (currentOperators.length > 0) { result = binaryCalculate(result, currentOperators[currentOperators.length - 1], currentValue); }
            else { result = currentValue; }
            screen.textContent = showResult(result);
            currentValue = '0';
            currentDigits.length = 0;
        }
        currentOperators.push(value);
    }
    else if (value == '=') {
        if (currentDigits.length > 0) {
            currentValue = Number(currentDigits.join(''));
            if (currentOperators.length > 0) { result = binaryCalculate(result, currentOperators[currentOperators.length - 1], currentValue); }
            else { result = currentValue; }
            screen.textContent = showResult(result);
            currentValue = '0';
            currentDigits.length = 0;
            currentOperators.length = 0;
        }
        else if (!(currentValue === '0')) {
            if (currentOperators.length > 0) { result = binaryCalculate(result, currentOperators[currentOperators.length - 1], currentValue); }
            else { result = currentValue; }
            screen.textContent = showResult(result);
            currentValue = '0';
            currentDigits.length = 0;
            currentOperators.length = 0;
        }
    }
})